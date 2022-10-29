const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

/**
 * Class for File blocks
 * @constructor
 */
class jwUnite {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jwUnite',
            name: 'Unite',
            color1: '#7ddcff',
            color2: '#4a98ff',
            blocks: [
                {
                    opcode: 'whenanything',
                    text: formatMessage({
                        id: 'jwUnite.blocks.whenanything',
                        default: 'when [ANYTHING]',
                        description: 'Runs blocks when set boolean is true'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.HAT,
                    arguments: {
                        ANYTHING: {
                            type: ArgumentType.BOOLEAN,
                        }
                    }
                }
            ]
        };
    }
    whenanything(args, util) {
        return Boolean(args.ANYTHING || false)
    }
}

module.exports = jwUnite;
