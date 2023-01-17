const uid = require('../../util/uid');

class canvasStorage {
    /**
     * initiats the storage
     */
    constructor() {
        this.canvases = {}
    }

    /**
     * gets a canvas with a given id
     * @param {string} id the id of the canvas to get
     * @returns {Object} the canvas object with this id
     */
    getCanvas(id) {
        return this.canvases[id]
    }

    /**
     * deletes a canvas with a given id
     * @param {string} id the canvas id to delete
     * @returns {Object} the deleted canvas
     */
    deleteCanvas(id) {
        const orignal = this.canvases[id]
        delete this.canvases[id]
        return orignal
    }

    /**
     * creates a new canvas
     * @param {string} name the name to give the new canvas
     * @param {boolean} publik whether or not to make this canvas publik
     * @returns {Object} the new canvas object
     */
    newCanvas(name) {
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
            }
        }
        this.canvases[id] = data
        return data
    }

    /**
     * gets all canvases 
     * @returns {Array}
     */
    getAllCanvases() {
        return Object.values(this.canvases)
    }
}

module.exports = canvasStorage