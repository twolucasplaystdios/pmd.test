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
                },
                {
                    opcode: 'setEffectName',
                    text: 'set [EFFECT] to [VALUE]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        EFFECT: { type: ArgumentType.STRING, defaultValue: "color" },
                        VALUE: { type: ArgumentType.NUMBER, defaultValue: 0 },
                    }
                },
                {
                    opcode: 'setBlurEffect',
                    text: 'set blur [PX]px',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PX: { type: ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'doodooBlockLolol',
                    text: 'ignore blocks inside [INPUT]',
                    branchCount: 1,
                    blockType: BlockType.CONDITIONAL,
                    arguments: {
                        INPUT: { type: ArgumentType.BOOLEAN }
                    }
                },
                // {
                //     opcode: 'whatthescallop',
                //     text: 'bruh',
                //     branchCount: 85,
                //     blockType: BlockType.CONDITIONAL
                // }
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

    setEffectName(args, util) {
        const PX = Cast.toNumber(args.VALUE)
        util.target.setEffect(args.EFFECT, PX)
    }
    setBlurEffect(args, util) {
        const PX = Cast.toNumber(args.PX)
        util.target.setEffect("blur", PX)
    }

    doodooBlockLolol(args, util) {
        if (args.INPUT === true) return
        console.log(args, util)
        util.startBranch(1, false)
        console.log(util.target.getCurrentCostume())
    }

    whatthescallop(_, util) {
        for (let i = 0; i < 85; i++) {
            util.startBranch(i + 1, false)
        }
    }
}

module.exports = JgDevBlocks;
