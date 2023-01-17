const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const store = require('./canvasStorage');

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
        this.store = new store(runtime)
    }

    orderCategoryBlocks (blocks) {
        const button = blocks[0]
        const varBlock = blocks[1]
        delete blocks[0]
        delete blocks[1]
        // create the variable block xml's
        const varBlocks = this.store.getAllCanvases().map(canvas => varBlock
                .replace('{canvasId}', canvas.id)
                .replace('{canvasName}', canvas.name))
        // push the button to the top of the var list
        varBlocks
            .reverse()
            .push(button)
        // merge the category blocks and variable blocks into one block list
        blocks = varBlocks
            .reverse()
            .concat(blocks)
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
                    canvasId: '{canvasId}',
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
                    opcode: 'printCanvas',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas'
                        }
                    },
                    text: 'stamp canvas [canvas] to pen'
                }, 
            ],
            menus: {
                canvas: 'getCanvasMenuItems'
            },
        };
    }

    createNewCanvas(workspace) {
        const name = window.prompt('canvas name', 'my canvas')
        this.store.newCanvas(name)
        vm.emitWorkspaceUpdate()
    }

    getCanvasMenuItems() {
        return this.store.getAllCanvases().map(canvas => {
            return {
                text: canvas.name,
                value: canvas.id
            }
        })
    }

    canvasGetter(args, util, mutation) {
        return this.store.getCanvas(mutation.canvasId).element.toDataURL('image/png')
    }

    printCanvas(args) {
        const canvas = this.store.getCanvas(args.canvas)
        this.runtime.renderer.penStamp(penSkinId, canvas.drawableId);
        this.runtime.requestRedraw();
    }
}

module.exports = canvas;
