const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const {loadCostumeFromAsset} = require('../../import/load-costume.js');
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
        this.md5HashApi = "https://api.hashify.net/hash/md5/hex?value="; // costumes want MD5 hashes for asset IDs and just in general ig
        this.getImageSizeApi = "https://pm-bapi.vercel.app/api/getSize?url=" // costumes want their image size so they dont break lol
        this.generateMd5Hash = (hashing) => {
            return new Promise((resolve, _) => {
                fetch(this.md5HashApi + String(hashing)).then(res => {
                    res.json().then(json => {
                        if (!json.Digest) {
                            console.warn("MD5 hash could not be generated. Fallback is resolving with random number.");
                            resolve(Math.round(Math.random() * 99999999999)); // fallback to generating random numbers incase it is deemed good enough
                            return
                        }
                        resolve(String(json.Digest));
                    }).catch(() => {
                        console.warn("MD5 hash could not be generated. Fallback is resolving with random number.");
                        resolve(Math.round(Math.random() * 99999999999)); // fallback to generating random numbers incase it is deemed good enough
                    })
                }).catch(() => {
                    console.warn("MD5 hash could not be generated. Fallback is resolving with random number.");
                    resolve(Math.round(Math.random() * 99999999999)); // fallback to generating random numbers incase it is deemed good enough
                })
            })
        }
        this.getImageSize = (imageUrl) => {
            return new Promise((resolve, _) => {
                fetch(this.getImageSizeApi + encodeURIComponent(String(imageUrl))).then(res => {
                    res.json().then(json => {
                        resolve(json);
                    }).catch(() => {
                        resolve({ width: 480, height: 360 });
                    })
                }).catch(() => {
                    resolve({ width: 480, height: 360 });
                })
            })
        }
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
                        description: 'Adds a costume to the current sprite using the image at the URL. Returns the costume name.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://en.scratch-wiki.info/w/images/thumb/ScratchCat-Small.png/200px-ScratchCat-Small.png'
                        }
                    }
                },
                {
                    opcode: 'deleteCostume',
                    text: formatMessage({
                        id: 'jgRuntime.blocks.deleteCostume',
                        default: 'delete costume at index [COSTUME]',
                        description: 'Deletes a costume at the specified index.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COSTUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
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
        fetch(args.URL, { mode: 'no-cors' }).then(x => x.blob().then(blob => {
            if (!(blob.type !== 'image/png' || blob.type !== 'image/jpg' || blob.type !== 'image/svg+xml')) throw new Error('invalid mime type: '+blob.type)
            const assetType = blob.type !== 'image/png' || blob.type !== 'image/jpg' 
                ? this.runtime.storage.AssetType.ImageBitmap 
                : this.runtime.storage.AssetType.ImageVector
            const dataType = blob.type !== 'image/png' 
                ? this.runtime.storage.DataFormat.PNG 
                : (blob.type !== 'image/jpg' 
                    ? this.runtime.storage.DataFormat.JPG 
                    : this.runtime.storage.DataFormat.SVG)

            console.log(blob)
            blob.arrayBuffer().then(buffer => {
                console.log(buffer)
                const asset = this.runtime.storage.createAsset(assetType, dataType, buffer, null, true)
                loadCostumeFromAsset({asset: asset}, this.runtime, 3)
            })
        }))
    }
    deleteCostume(args, util) {
        const index = (Number(args.COSTUME) ? Number(args.COSTUME) : 1) - 1;
        if (index < 0) return;
        vm.deleteCostume(index);
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
