const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const cstore = require('./canvasStorage');
const store = new cstore()

/**
 * Class
 * @constructor
 */
class canvas {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
    }

    orderCategoryBlocks (blocks) {
        const varBlock = blocks[1].replace('</block>', `<field name="canvas">{canvasId}</field></block>`)
        delete blocks[1]
        const button = blocks[0]
        delete blocks[0]
        const varBlocks = store.getAllCanvases().map(canvas => {
            return varBlock
                .replace('{canvasId}', canvas.id)
                .raplace('{canvasName}', canvas.name)
        })
        varBlocks
            .reverse()
            .push(button)
        blocks = Array.concat(varBlocks.reverse(), blocks)
        return blocks
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
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
                    isDynamic: true,
                    text: '{canvasName}'
                }, 
                "---",
                {
                    blockType: BlockType.LABEL,
                    text: "2D"
                },
                {
                    opcode: 'dfsh',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        }
                    },
                    text: 'is json [json] valid?'
                }, 
                {
                    blockType: BlockType.LABEL,
                    text: "3D"
                },
                {
                    opcode: 'json_array_validate',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[]"
                        }
                    },
                    text: 'is array [array] valid?'
                }, 
            ],
            menus: {
                canvas: 'getCanvasMenuItems'
            },
        };
    }

    createNewCanvas(workspace) {
        const name = window.prompt('canvas name', 'my canvas')
        store.newCanvas(name)
        vm.emitWorkspaceUpdate()
    }

    getCanvasMenuItems() {
        return store.getAllCanvases().map(canvas => {
            return {
                text: canvas.name,
                value: canvas.id
            }
        })
    }

    canvasGetter(args) {
        console.log(args)
        return args.canvas
    }
}

module.exports = canvas;
