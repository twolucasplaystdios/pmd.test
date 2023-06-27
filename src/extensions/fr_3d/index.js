const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const Ammoconst = require('ammojs3');
const Icon = require('./icon.png');



/**
 * Class for 3d++ blocks
 * @constructor
 */
class Fr3DBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.world = {}
        this._3d = {}
        this.Three = {}
        this.Ammo = Ammoconst;
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
     * @returns {object} metadata for this extension and its blocks.
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
        requestAnimationFrame(() => {
            this.world.stepSimulation(1 / 60, 10)
        });
    }
    addp (objectName) {
        if (this._3d.scene) {
            const object = this._3d.scene.getObjectByName(objectName);
            if (object) {

            const collisionShape = new this.Ammo.btBoxShape(new this.Ammo.btVector3(object.scale.x / 2, object.scale.y / 2, object.scale.z / 2));

            const mass = 1; 
            const startTransform = new this.Ammo.btTransform();
            startTransform.setIdentity();
            const localInertia = new this.Ammo.btVector3(0, 0, 0);
            collisionShape.calculateLocalInertia(mass, localInertia);
            startTransform.setOrigin(new this.Ammo.btVector3(object.position.x, object.position.y, object.position.z));
            const motionState = new this.Ammo.btDefaultMotionState(startTransform);
            const rbInfo = new this.Ammo.btRigidBodyConstructionInfo(mass, motionState, collisionShape, localInertia);
            const rigidBody = new this.Ammo.btRigidBody(rbInfo);

            this.world.addRigidBody(rigidBody);

            object.onBeforeRender = () => {
                    const transform = new this.Ammo.btTransform();
                    rigidBody.getMotionState().getWorldTransform(transform);
                    const origin = transform.getOrigin();
                    object.position.set(origin.x(), origin.y(), origin.z());
                };
            }
        }
    }
    rmp (name) {
        const object = this._3d.scene.getObjectByName(name);
        if (object) {
            this.world.removeRigidBody(object.userData.rigidBody);
            object.onBeforeRender = null;
        }
    }
    setupworld () {
        alert(typeof this.Ammo.btDefaultCollisionConfiguration)
        const collisionConfiguration = this.Ammo.btDefaultCollisionConfiguration;
        const dispatcher = new this.Ammo.btCollisionDispatcher(collisionConfiguration);
        const overlappingPairCache = new this.Ammo.btDbvtBroadphase();
        const solver = new this.Ammo.btSequentialImpulseConstraintSolver();
        this.world = new this.Ammo.btDiscreteDynamicsWorld(
            dispatcher,
            overlappingPairCache,
            solver,
            collisionConfiguration
        );
        this.world.setGravity(new this.Ammo.btVector3(0, -9.8, 0));
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
