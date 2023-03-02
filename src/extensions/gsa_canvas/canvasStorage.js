const uid = require('../../util/uid');

class canvasStorage {
    /**
     * initiats the storage
     */
    constructor () {
        this.canvases = {};
    }

    attachRuntime (runtime) {
        this.runtime = runtime;
    }

    /**
     * gets a canvas with a given id
     * @param {string} id the id of the canvas to get
     * @returns {Object} the canvas object with this id
     */
    getCanvas (id) {
        return this.canvases[id];
    }

    /**
     * deletes a canvas with a given id
     * @param {string} id the canvas id to delete
     * @returns {Object} the deleted canvas
     */
    deleteCanvas (id) {
        const orignal = this.canvases[id];
        delete this.canvases[id];
        return orignal;
    }

    /**
     * creates a new canvas
     * @param {string} name the name to give the new canvas
     * @param {boolean} publik whether or not to make this canvas publik
     * @returns {Object} the new canvas object
     */
    newCanvas (name, width, height) {
        width = width || this.runtime.stageWidth;
        height = height || this.runtime.stageHeight;
        
        const id = uid();
        const element = document.createElement('canvas');
        element.id = id;
        element.width = width;
        element.height = height;

        const skin = this.runtime.renderer.createBitmapSkin(element, 1);

        const data = {
            name: name,
            id: id,
            element: element,
            skinId: skin,
            width: width, 
            height: height,
            context: element.getContext('2d')
        };
        this.canvases[id] = data;
        return data;
    }

    /**
     * gets or creates a canvas with name equal to 
     * @param {String} name the name of the canvas
     */
    getCanvasByName (name) {
        return Object.values(this.canvases).find(canvas => canvas.name === name);
    }

    /**
     * gets all canvases 
     * @returns {Array}
     */
    getAllCanvases () {
        return Object.values(this.canvases);
    }
}

module.exports = canvasStorage;
