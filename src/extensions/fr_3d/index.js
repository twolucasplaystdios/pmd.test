const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const { Physics } = require('@react-three/cannon');
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
    enablePhysicsForObject(objectName) {
        if (!this._3d.scene){return;}
        const object = this._3d.scene.getObjectByName(objectName);

        if (!object) {
        console.error(`Object with name '${objectName}' not found.`);
        return;
        }

        if (!object.userData.physicsEnabled) {
        this.physics.addBody(object);
        object.userData.physicsEnabled = true;
        }
    };

    disablePhysicsForObject(objectName) {
        if (!this._3d.scene){return;}
        const object = this._3d.scene.getObjectByName(objectName);

        if (!object) {
            console.error(`Object with name '${objectName}' not found.`);
            return;
        }

        if (object.userData.physicsEnabled) {
            this.physics.removeBody(object);
            object.userData.physicsEnabled = false;
        }
    };

    addp(objectName) {
        this.enablePhysicsForObject(objectName)
    }
    
    rmp(objectName) {
        this.disablePhysicsForObject(objectName)
    }
    step() {
        if (!this._3d.scene){return;}
        const fixedTimeStep = 1 / 60; 
        const maxSubSteps = 10;
      
        this.physics.world.step(fixedTimeStep, undefined, maxSubSteps);
      };
    
    
}

module.exports = Fr3DBlocks;
