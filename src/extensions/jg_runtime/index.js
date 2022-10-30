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
        this.md5HashApi = "https://api.hashify.net/hash/md5/hex?value="; // costumes want MD5 hashes for asset IDs and just in general ig
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
        // console.warn('Runtime Block "add costume" is currently broken. Please avoid using it until the block is updated.');
        const URL = String(args.URL);
        const COSTUME_SIZE_X = 480; // this will be changed in the future to the ACTUAL image size
        const COSTUME_SIZE_Y = 360; // this will be changed in the future to the ACTUAL image size
        try {
            if (util.target.isSprite) {
                const sprite = util.target.sprite;
                const COSTUMES_CURRENTLY_IN_THE_SPRITE = sprite.costumes.length;
                const LAST_SKIN_ID = sprite.costumes[sprite.costumes.length - 1].skinId
                const COSTUME_NAME = "runtime_" + String(encodeURIComponent(URL)).replace(/[^A-Za-z0-9]/gmi, "_") + String(10000 + (Math.random() * 99999)) + String(((COSTUMES_CURRENTLY_IN_THE_SPRITE + LAST_SKIN_ID) * 3) + 11);
                this.generateMd5Hash(COSTUME_NAME).then(GENERATED_MD5 => {
                    fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(URL)).then(req => {
                        if (req.headers.get("Content-Type") != "image/png" && req.headers.get("Content-Type") != "image/svg+xml") return console.warn('Format', req.headers.get("Content-Type"), 'is not supported for costumes');
                        if (req.status == 200) {
                            req.blob().then(blob => {
                                blob.arrayBuffer().then(arrayBuffer => {
                                    const UINT8ARRAY_COSTUME_DATA = new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
                                    const CONTENT_TYPE = req.headers.get("Content-Type");
                                    const IMAGE_CONTENT_TYPE = CONTENT_TYPE == "image/png" ? "ImageBitmap" : "ImageVector";
                                    const FILE_EXTENSION = CONTENT_TYPE == "image/png" ? "png" : "svg";
                                    const costumeObject = {
                                        asset: {
                                            assetId: GENERATED_MD5,
                                            assetType: {
                                                contentType: CONTENT_TYPE,
                                                immutable: true,
                                                name: IMAGE_CONTENT_TYPE,
                                                runtimeFormat: FILE_EXTENSION
                                            },
                                            clean: true,
                                            data: UINT8ARRAY_COSTUME_DATA,
                                            dataFormat: FILE_EXTENSION,
                                            dependencies: []
                                        },
                                        assetId: GENERATED_MD5,
                                        bitmapResolution: 1,
                                        dataFormat: FILE_EXTENSION,
                                        md5: GENERATED_MD5 + "." + FILE_EXTENSION,
                                        name: COSTUME_NAME,
                                        rotationCenterX: Math.round(COSTUME_SIZE_X) / 2,
                                        rotationCenterY: Math.round(COSTUME_SIZE_Y) / 2,
                                        size: [
                                            COSTUME_SIZE_X,
                                            COSTUME_SIZE_Y
                                        ],
                                        skinId: LAST_SKIN_ID + 1
                                    }
                                    sprite.addCostumeAt(costumeObject, COSTUMES_CURRENTLY_IN_THE_SPRITE);
                                })
                            })
                        } else {
                            console.warn("Failed to fetch costume");
                        }
                    })
                })
            }
        } catch (e) {
            console.warn(e);
        }
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
