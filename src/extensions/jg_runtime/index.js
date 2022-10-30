const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

/**
 * Class for Runtime blocks
 * @constructor
 */
class JgRuntimeBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.deleted_sprites = {};
        this._sprites = [];
        this._costumes = [];
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgRuntime',
            name: 'Runtime',
            color1: '#777777',
            color2: '#555555',
            blocks: [
                {
                    opcode: 'addCostumeUrl',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.addCostumeUrl',
                        default: 'add costume from [URL]',
                        description: 'Adds a costume to the current sprite using the image at the URL.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://en.scratch-wiki.info/w/images/ScratchCat3.0.svg'
                        }
                    }
                },
                {
                    opcode: 'deleteCostume',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.deleteCostume',
                        default: 'delete costume with name [COSTUME]',
                        description: 'Deletes a costume with the specified name.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COSTUME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'costume1'
                        }
                    }
                },
                {
                    opcode: 'setStageSize',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.setStageSize',
                        default: 'set stage width: [WIDTH] height: [HEIGHT]',
                        description: 'Sets the width and height of the stage.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 480
                        },
                        HEIGHT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 360
                        }
                    }
                },
                {
                    opcode: 'turboModeEnabled',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.turboModeEnabled',
                        default: 'turbo mode enabled?',
                        description: 'Block that returns whether Turbo Mode is enabled on the project or not.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'amountOfClones',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.amountOfClones',
                        default: 'clone count',
                        description: 'Block that returns the amount of clones that currently exist.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getStageWidth',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.getStageWidth',
                        default: 'stage width',
                        description: 'Block that returns the width of the stage.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getStageHeight',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.getStageHeight',
                        default: 'stage height',
                        description: 'Block that returns the height of the stage.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'setMaxFrameRate',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.setMaxFrameRate',
                        default: 'set max framerate to: [FRAMERATE]',
                        description: 'Sets the max allowed framerate.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FRAMERATE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'getMaxFrameRate',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.getMaxFrameRate',
                        default: 'max framerate',
                        description: 'Block that returns the amount of FPS allowed.'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.REPORTER
                }
            ]
        };
    }
    addCostumeUrl(args, util) {
        try {
            if (util.target.isSprite) {
                const sprite = util.target.sprite;
                fetch(args.URL).then(req => {
                    if (req.status == 200) {
                        req.blob().then(blob => {
                            vm.addCostume(blob, sprite.id).then(costume => {
                                this._costumes.push(costume.id);
                            })
                        })
                    } else {
                        console.warn("Failed to fetch costume");
                    }
                })
            }
        } catch (e) {
            console.warn(e);
        }
    }
    deleteCostume(args, util) {
        try {
            if (util.target.isSprite) {
                var sprite = util.target.sprite;
                vm.deleteCostume(sprite.costumes[args.COSTUME].id).then(deleted => {
                    this.deleted_costumes[args.COSTUME] = deleted;
                    this._costumes.splice(this._costumes.indexOf(args.COSTUME), 1);
                })
            }
        } catch (e) {
            console.warn(e);
        }
    }
    setStageSize(args, util) {
        let width = Number(args.WIDTH) || 480;
        let height = Number(args.HEIGHT) || 360;
        if (width <= 0) width = 1;
        if (height <= 0) height = 1;
        if (vm) vm.setStageSize(width, height);
    }
    turboModeEnabled() {
        return vm.runtime.turboMode;
    }
    amountOfClones() {
        return vm.runtime._cloneCounter;
    }
    getStageWidth() {
        return vm.runtime.stageWidth;
    }
    getStageHeight() {
        return vm.runtime.stageHeight;
    }
    getMaxFrameRate() {
        return vm.runtime.frameLoop.framerate;
    }
    setMaxFrameRate(args, util) {
        let frameRate = Number(args.FRAMERATE) || 1;
        if (frameRate <= 0) frameRate = 1;
        if (vm) vm.runtime.frameLoop.setFramerate(frameRate);
    }
}

module.exports = JgRuntimeBlocks;
