const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const Ammovar = require('ammojs3');



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
        this.world = function(){return null}
        this._3d = function(){return null}
        this.Three = function(){return null}
        this.Ammo = Ammovar;
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
    animate() {
        requestAnimationFrame(() => {
            this.world.stepSimulation(1 / 60, 10)
        });
    }
    addp(objectName){
        if(this._3d.scene){
        var object = this._3d.scene.getObjectByName(objectName);
        if (object) {

            var collisionShape = new this.Ammo.btBoxShape(new this.Ammo.btVector3(object.scale.x / 2, object.scale.y / 2, object.scale.z / 2));

            var mass = 1; 
            var startTransform = new this.Ammo.btTransform();
            startTransform.setIdentity();
            var localInertia = new this.Ammo.btVector3(0, 0, 0);
            collisionShape.calculateLocalInertia(mass, localInertia);
            startTransform.setOrigin(new this.Ammo.btVector3(object.position.x, object.position.y, object.position.z));
            var motionState = new this.Ammo.btDefaultMotionState(startTransform);
            var rbInfo = new this.Ammo.btRigidBodyConstructionInfo(mass, motionState, collisionShape, localInertia);
            var rigidBody = new this.Ammo.btRigidBody(rbInfo);

            this.world.addRigidBody(rigidBody);

            object.onBeforeRender = () => {
                var transform = new this.Ammo.btTransform();
                rigidBody.getMotionState().getWorldTransform(transform);
                var origin = transform.getOrigin();
                object.position.set(origin.x(), origin.y(), origin.z());
                };
            }
        }
    }
    rmp (name) {
        var object = this._3d.scene.getObjectByName(name);
        if (object) {
            this.world.removeRigidBody(object.userData.rigidBody);
            object.onBeforeRender = null;
        }
    }
    setupworld () {
        var collisionConfiguration = this.Ammo.btDefaultCollisionConfiguration;
        var dispatcher = new this.Ammo.btCollisionDispatcher(collisionConfiguration);
        var overlappingPairCache = new this.Ammo.btDbvtBroadphase();
        var solver = new this.Ammo.btSequentialImpulseConstraintSolver();
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
