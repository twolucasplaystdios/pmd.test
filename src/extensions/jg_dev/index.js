const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class for Dev blocks
 * @constructor
 */
class JgDevBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    // util



    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgDev',
            name: 'Test Extension',
            color1: '#4275f5',
            color2: '#425df5',
            blocks: [
                {
                    opcode: 'stopSound',
                    text: 'stop sound [ID]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ID: { type: ArgumentType.STRING, defaultValue: "id" }
                    }
                },
                {
                    opcode: 'logArgs1',
                    text: 'costume input [INPUT] sound input [INPUT2]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        INPUT: { type: ArgumentType.COSTUME },
                        INPUT2: { type: ArgumentType.SOUND }
                    }
                }
            ]
        };
    }

    // blocks

    stopSound(args, util) {
        const target = util.target;
        const sprite = target.sprite;
        if (!sprite) return;

        const soundBank = sprite.soundBank
        if (!soundBank) return;

        const id = Cast.toString(args.ID);
        soundBank.stop(target, id);
    }

    logArgs1(args) {
        console.log(args)
        return JSON.stringify(args)
    }
}

module.exports = JgDevBlocks;
