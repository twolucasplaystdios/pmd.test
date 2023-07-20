const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const CANNON = require('cannon-es');
const Icon = require('./icon.png');

/**
 * Class for 3D Physics blocks
 */
class Fr3DBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        this.world = {};
        this._3d = {};
        this.Three = {};

        // Initialize CANNON.js world
        this.physicsWorld = null;

        // Array to store the mappings between Three.js objects and CANNON.js bodies
        this.objectToBodyMap = [];

        if (!vm.runtime.ext_jg3d) {
            vm.extensionManager.loadExtensionURL('jg3d').then(() => {
                this._3d = vm.runtime.ext_jg3d;
                this.Three = this._3d.three;
            });
        } else {
            this._3d = vm.runtime.ext_jg3d;
            this.Three = this._3d.three;
        }
    }

    /**
     * metadata for this extension and its blocks.
     * @returns {object}
     */
    getInfo() {
        return {
            id: 'fr3d',
            name: '3D Physics',
            color1: '#D066FE',
            color2: '#8000BC',
            blockIconURI: Icon,
            blocks: [
                {
                    opcode: 'step',
                    text: 'step simulation',
                    blockType: BlockType.COMMAND,
                },
                {
                    opcode: 'addp',
                    text: 'enable physics for [NAME1]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME1: { type: ArgumentType.STRING, defaultValue: 'Cube1' },
                    },
                },
                {
                    opcode: 'rmp',
                    text: 'disable physics for [NAME1]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME1: { type: ArgumentType.STRING, defaultValue: 'Plane1' },
                    },
                },
            ],
        };
    }

    createShapeFromGeometry(geometry) {
        if (geometry instanceof this.Three.BufferGeometry) {
            const vertices = geometry.attributes.position.array;
            const indices = [];

            for (let i = 0; i < vertices.length / 3; i++) {
                indices.push(i);
            }

            return new CANNON.Trimesh(vertices, indices);
        } else if (geometry instanceof this.Three.Geometry) {
            return new CANNON.ConvexPolyhedron(
                geometry.vertices.map((v) => new CANNON.Vec3(v.x, v.y, v.z)),
                geometry.faces.map((f) => [f.a, f.b, f.c])
            );
        } else {
            console.warn('Unsupported geometry type for collision shape creation:', geometry.type);
            return null;
        }
    }

    enablePhysicsForObject(objectName) {
        if (!this._3d.scene) return;
        const object = this._3d.scene.getObjectByName(objectName);
        if (!object) return;

        const shape = this.createShapeFromGeometry(object.geometry);

        if (!shape) {
            console.warn('Failed to create a valid shape for the object:', object.name);
            return;
        }

        const body = new CANNON.Body({
            mass: 1,
            shape: shape,
        });

        const position = new CANNON.Vec3(object.position.x, object.position.y, object.position.z);
        const quaternion = new CANNON.Quaternion();
        quaternion.setFromEuler(object.rotation.x, object.rotation.y, object.rotation.z, 'XYZ');

        body.position.copy(position);
        body.quaternion.copy(quaternion);

        object.userData.physicsBody = body;
        this.objectToBodyMap.push({ object, body });

        if (!this.physicsWorld) {
            // Use the Three.js scene as the physics world
            this.physicsWorld = new CANNON.World();
            this.physicsWorld.gravity.set(0, -9.81, 0);
            this.physicsWorld.broadphase = new CANNON.NaiveBroadphase();
        }

        this.physicsWorld.addBody(body);
    }

    disablePhysicsForObject(objectName) {
        if (!this._3d.scene) return;
        const object = this._3d.scene.getObjectByName(objectName);
        if (!object || !object.userData || !object.userData.physicsBody) return;

        const index = this.objectToBodyMap.findIndex((mapping) => mapping.object === object);
        if (index !== -1) {
            this.objectToBodyMap.splice(index, 1);
        }

        this.physicsWorld.removeBody(object.userData.physicsBody);
        delete object.userData.physicsBody;
    }

    step() {
        if (!this.physicsWorld) return;

        // Step the physics simulation forward
        this.physicsWorld.step(1.0 / 60.0);

        // Update Three.js objects based on CANNON.js bodies
        this.objectToBodyMap.forEach((mapping) => {
            const { object, body } = mapping;
            object.position.copy(body.position);
            object.quaternion.copy(body.quaternion);
        });
    }

    addp(args) {
        this.enablePhysicsForObject(Cast.toString(args.NAME1));
    }

    rmp(args) {
        this.disablePhysicsForObject(Cast.toString(args.NAME1));
    }
}

module.exports = Fr3DBlocks;
