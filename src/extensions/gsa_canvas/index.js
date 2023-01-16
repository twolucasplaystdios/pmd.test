const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const uid = require('../../util/uid');

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
        runtime.editingTarget.setCustomState(this.stateKey, [])
        this.publik = []
    }

    /**
     * the custome state key
     * @type {string}
     */
    get stateKey () {
        return 'canvas.canvases'
    }

    /**
     * gets whether or nto a canvas is publik
     * @param {Target} target the target to get any private canvases from
     * @param {string} id the canvas id to check
     * @returns {boolean} whether or not the canvas is publik
     */
    canvaspublik(target, id) {
        return this.getCanvas(target, id).publik
    }

    /**
     * gets a canvas with a given id
     * @param {Target} target the target to get the canvas from
     * @param {string} id the id of the canvas to get
     * @returns {Object} the canvas object with this id
     */
    getCanvas(target, id) {
        return Array.concat(target.getCustomState(this.stateKey), this.publik).find(canvas => canvas.id === id)
    }

    /**
     * deletes a canvas with a given id
     * @param {Target} target the target to delete the canvas from
     * @param {string} id the canvas id to delete
     */
    deleteCanvas(target, id) {
        const pindex = this.publik.findIndex(canvas => canvas.id === id)
        if (this.canvaspublik(target, id)) {
            delete this.publik[pindex]
            return
        }
        const state = target.getCustomState(this.stateKey)
        const index = state.findIndex(canvas => canvas.id === id)
        delete state[index]
        delete this.publik[pindex]
        target.setCustomState(this.stateKey, state)
    }

    /**
     * creates a new canvas
     * @param {Target} target the target to create the canvas in
     * @param {string} name the name to give the new canvas
     * @param {boolean} publik whether or not to make this canvas publik
     * @returns {Object} the new canvas object
     */
    newCanvas(target, name, publik) {
        const state = target.getCustomState(this.stateKey)
        const id = uid()
        const element = document.createElement('canvas')
        element.id = id
        const data = {
            name: name,
            id: id,
            element: element,
            context: {
                '2d': element.getContext('2d'),
                '3d': element.getContext('webgl') || element.getContext("experimental-webgl")
            },
            publik: publik
        }
        if (publik) {
            this.publik.push(data);
            return
        }
        state.push(data)
        target.setCustomState(this.stateKey, state)
        return data
    }

    /**
     * gets all canvases 
     * @returns {Array}
     */
    getCanvasMenuItems() {
        return Array.concat(this.runtime.editingTarget.getCustomState(this.stateKey), this.publik).map(canvas => {
            return {
                text: canvas.name,
                value: canvas.id
            }
        })
    }

    orderCategoryBlocks (blocks) {
        console.log(blocks)
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
                            defaultValue: "{}"
                        }
                    },
                    text: '[canvas]'
                }, 
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

    }
}

module.exports = canvas;
