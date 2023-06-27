const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const Ammo = require('three/examples/jsm/libs/ammo.wasm');
const Icon = require('./icon.png');



/**
 * Class for 3d Physics blocks
 */
class Fr3DBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         */
        this.runtime = runtime;
        this.world = {}
        this._3d = {}
        this.Three = {}
        if (!vm.runtime.ext_jg3d) {
            vm.extensionManager.loadExtensionURL('jg3d')
                .then(() => {
                    this._3d = vm.runtime.ext_jg3d;
                    this.Three = this._3d.three;
                })
        } else {
            this._3d = vm.runtime.ext_jg3d;
            this.Three = this._3d.three
        }
    }
    /**
     * metadata for this extension and its blocks.
     * @returns {object}
     */
    getInfo() {
        return {
            id: 'fr3d',
            name: '3d Physics',
            color1: '#D066FE',
            color2: '#8000BC',
            blockIconURI: Icon,
            blocks: [
                {
                    opcode: 'setup',
                    text: 'setup simulation',
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'step',
                    text: 'step simulation',
                    blockType: BlockType.COMMAND,
                },
                {
                    opcode: 'enablep',
                    text: 'enable physics for [NAME1]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME1: { type: ArgumentType.STRING, defaultValue: "Cube1" }
                    }
                },
                {
                    opcode: 'disablep',
                    text: 'disable physics for [NAME1]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME1: { type: ArgumentType.STRING, defaultValue: "Plane1" }
                    }
                }
            ]
        };
    }
    animate () {
        Ammo().then(function(){
        requestAnimationFrame(() => {
            this.world.stepSimulation(1 / 60, 10)
        })})
    }
    addp (objectName) {
        Ammo().then(function(){
        if (this._3d.scene) {
            const object = this._3d.scene.getObjectByName(objectName);
            if (object) {

            const collisionShape = new Ammo().btBoxShape(new Ammo().btVector3(object.scale.x / 2, object.scale.y / 2, object.scale.z / 2));

            const mass = 1; 
            const startTransform = new Ammo().btTransform();
            startTransform.setIdentity();
            const localInertia = new Ammo().btVector3(0, 0, 0);
            collisionShape.calculateLocalInertia(mass, localInertia);
            startTransform.setOrigin(new Ammo().btVector3(object.position.x, object.position.y, object.position.z));
            const motionState = new Ammo().btDefaultMotionState(startTransform);
            const rbInfo = new Ammo().btRigidBodyConstructionInfo(mass, motionState, collisionShape, localInertia);
            const rigidBody = new Ammo().btRigidBody(rbInfo);

            this.world.addRigidBody(rigidBody);

            object.onBeforeRender = () => {
                    const transform = new Ammo().btTransform();
                    rigidBody.getMotionState().getWorldTransform(transform);
                    const origin = transform.getOrigin();
                    object.position.set(origin.x(), origin.y(), origin.z());
                };
            }
        }})
    }
    rmp (name) {
        Ammo().then(function(){
        const object = this._3d.scene.getObjectByName(name);
        if (object) {
            this.world.removeRigidBody(object.userData.rigidBody);
            object.onBeforeRender = null;
        }})
    }
    setupworld () {
        Ammo().then(function(){
        const collisionConfiguration = Ammo().btDefaultCollisionConfiguration;
        const dispatcher = new Ammo().btCollisionDispatcher(collisionConfiguration);
        const overlappingPairCache = new Ammo().btDbvtBroadphase();
        const solver = new Ammo().btSequentialImpulseConstraintSolver();
        this.world = new Ammo().btDiscreteDynamicsWorld(
            dispatcher,
            overlappingPairCache,
            solver,
            collisionConfiguration
        );
        this.world.setGravity(new Ammo().btVector3(0, -9.8, 0))})
    }
    setup () {
        this.setupworld();
    }
    enablep (args) {
        this.addp(Cast.toString(args.NAME1));
    }
    disablep (args) {
        this.rmp(Cast.toString(args.NAME1));
    }
    step () {
        this.animate();
    }
}

module.exports = Fr3DBlocks;
