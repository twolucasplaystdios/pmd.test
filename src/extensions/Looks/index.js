const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class for TurboWarp blocks
 * @constructor
 */
class TurboWarpBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            modifies: 'Looks',
            id: 'looks',
            blocks: [
                {
                    opcode: 'transformSprite',
                    text: formatMessage({
                        id: 'Looks.blocks.transformSprite',
                        default: 'transform sprite [skewX] [skewY]',
                        description: 'Block that returns the last key that was pressed'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        skewX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        skewY: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 20
                        }
                    }
                }
            ]
        };
    }

    transformSprite (args, util) {
        
    }
}

module.exports = TurboWarpBlocks;
