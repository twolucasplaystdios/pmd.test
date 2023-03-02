const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Color = require('../../util/color');
const cstore = require('./canvasStorage');
const store = new cstore();

/**
 * Class
 * @constructor
 */
class canvas {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
        store.attachRuntime(runtime);
    }

    readAsImageElement (src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = function () {
                resolve(image);
                image.onload = null;
                image.onerror = null;
            };
            image.onerror = function () {
                reject(new Error('Costume load failed. Asset could not be read.'));
                image.onload = null;
                image.onerror = null;
            };
            image.src = src;
        });
    }

    orderCategoryBlocks (blocks) {
        const button = blocks[0];
        const varBlock = blocks[1];
        delete blocks[0];
        delete blocks[1];
        // create the variable block xml's
        const varBlocks = store.getAllCanvases().map(canvas => varBlock
            .replace('{canvasId}', canvas.id)
            .replace('{canvasName}', canvas.name));
        if (!varBlocks.length) {
            return [button];
        }
        // push the button to the top of the var list
        varBlocks
            .reverse()
            .push(button);
        // merge the category blocks and variable blocks into one block list
        blocks = varBlocks
            .reverse()
            .concat(blocks);
        return blocks;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'canvas',
            name: 'html canvas',
            color1: '#0069c2',
            color2: '#0060B4',
            color3: '#0060B4',
            isDynamic: true,
            orderBlocks: this.orderCategoryBlocks,
            blocks: [
                {
                    opcode: 'createNewCanvas',
                    blockType: BlockType.BUTTON,
                    text: 'create new canvas'
                },
                {
                    opcode: 'canvasGetter',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas'
                        }
                    },
                    text: '[canvas]'
                },
                {
                    blockType: BlockType.LABEL,
                    text: "config"
                },
                {
                    opcode: 'setGlobalCompositeOperation',
                    text: 'set composite operation of [canvas] to [CompositeOperation]',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        },
                        CompositeOperation: {
                            type: ArgumentType.STRING,
                            menu: 'CompositeOperation',
                            defaultValue: ""
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setSize',
                    text: 'set width: [width] height: [height] of [canvas]',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        },
                        width: {
                            type: ArgumentType.NUMBER,
                            defaultValue: this.runtime.stageWidth
                        },
                        height: {
                            type: ArgumentType.NUMBER,
                            defaultValue: this.runtime.stageHeight
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setTransparency',
                    text: 'set transparency of [canvas] to [transparency]',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        },
                        transparency: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setFill',
                    text: 'set fill color of [canvas] to [color]',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        },
                        color: {
                            type: ArgumentType.COLOR
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'setBorderColor',
                    text: 'set border color of [canvas] to [color]',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        },
                        color: {
                            type: ArgumentType.COLOR
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    blockType: BlockType.LABEL,
                    text: "drawing"
                },
                {
                    opcode: 'drawRect',
                    text: 'draw rectangle at x: [x] y: [y] with width: [width] height: [height] on [canvas]',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        },
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        width: {
                            type: ArgumentType.NUMBER,
                            defaultValue: this.runtime.stageWidth
                        },
                        height: {
                            type: ArgumentType.NUMBER,
                            defaultValue: this.runtime.stageHeight
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'drawImage',
                    text: 'draw image [src] at x: [x] y: [y] on [canvas]',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        },
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        src: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://penguinmod.site/favicon.ico'
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    blockType: BlockType.LABEL,
                    text: "using"
                },
                {
                    opcode: 'printCanvas',
                    text: 'print canvas [canvas] to pen',
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas',
                            defaultValue: ""
                        }
                    },
                    blockType: BlockType.COMMAND
                }
            ],
            menus: {
                canvas: 'getCanvasMenuItems',
                CompositeOperation: {
                    items: [
                        {
                            "text": "source-over",
                            "value": "source-over"
                        },
                        {
                            "text": "source-in",
                            "value": "source-in"
                        },
                        {
                            "text": "source-out",
                            "value": "source-out"
                        },
                        {
                            "text": "source-atop",
                            "value": "source-atop"
                        },
                        {
                            "text": "destination-over",
                            "value": "destination-over"
                        },
                        {
                            "text": "destination-in",
                            "value": "destination-in"
                        },
                        {
                            "text": "destination-out",
                            "value": "destination-out"
                        },
                        {
                            "text": "destination-atop",
                            "value": "destination-atop"
                        },
                        {
                            "text": "lighter",
                            "value": "lighter"
                        },
                        {
                            "text": "copy",
                            "value": "copy"
                        },
                        {
                            "text": "xor",
                            "value": "xor"
                        },
                        {
                            "text": "multiply",
                            "value": "multiply"
                        },
                        {
                            "text": "screen",
                            "value": "screen"
                        },
                        {
                            "text": "overlay",
                            "value": "overlay"
                        },
                        {
                            "text": "darken",
                            "value": "darken"
                        },
                        {
                            "text": "lighten",
                            "value": "lighten"
                        },
                        {
                            "text": "color-dodge",
                            "value": "color-dodge"
                        },
                        {
                            "text": "color-burn",
                            "value": "color-burn"
                        },
                        {
                            "text": "hard-light",
                            "value": "hard-light"
                        },
                        {
                            "text": "soft-light",
                            "value": "soft-light"
                        },
                        {
                            "text": "difference",
                            "value": "difference"
                        },
                        {
                            "text": "exclusion",
                            "value": "exclusion"
                        },
                        {
                            "text": "hue",
                            "value": "hue"
                        },
                        {
                            "text": "saturation",
                            "value": "saturation"
                        },
                        {
                            "text": "color",
                            "value": "color"
                        },
                        {
                            "text": "luminosity",
                            "value": "luminosity"
                        }
                    ]
                }
            }
        };
    }

    createNewCanvas () {
        const newCanvas = prompt('canvas name?', 'newCanvas');
        store.newCanvas(newCanvas);
        vm.emitWorkspaceUpdate();
    }

    getCanvasMenuItems () {
        const canvases = store.getAllCanvases();
        if (canvases.length < 1) return [{text: '', value: ''}];
        return canvases.map(canvas => ({
            text: canvas.name,
            value: canvas.id
        }));
    }

    canvasGetter (args) {
        const canvasObj = store.getCanvas(args.canvas);
        return canvasObj.element.toDataURL();
    }

    setGlobalCompositeOperation (args) {
        const canvasObj = store.getCanvas(args.canvas);
        canvasObj.context.globalCompositeOperation = args.CompositeOperation;
    }

    setBorderColor (args) {
        const color = Color.decimalToHex(args.color);
        const canvasObj = store.getCanvas(args.canvas);
        canvasObj.context.strokeStyle = color;
    }

    setFill (args) {
        const color = Color.decimalToHex(args.color);
        const canvasObj = store.getCanvas(args.canvas);
        canvasObj.context.fillStyle = color;
    }

    setSize (args) {
        const canvasObj = store.getCanvas(args.canvas);
        canvasObj.element.width = args.width;
        canvasObj.element.height = args.height;
        canvasObj.context = canvasObj.element.getContext('2d');
    }

    drawRect (args) {
        const canvasObj = store.getCanvas(args.canvas);
        canvasObj.context.fillRect(args.x, args.y, args.width, args.height);
    }

    drawImage (args) {
        const canvasObj = store.getCanvas(args.canvas);
        const image = new Image();
        image.src = args.src;
        canvasObj.context.drawImage(image, args.x, args.y);
    }

    setTransparency (args) {
        const canvasObj = store.getCanvas(args.canvas);
        canvasObj.context.globalAlpha = args.transparency / 100;
    }

    printCanvas (args) {
        store.printCanvas(args.canvas);
    }
}

module.exports = canvas;
