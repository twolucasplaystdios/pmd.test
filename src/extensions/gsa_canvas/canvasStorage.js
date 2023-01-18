const uid = require('../../util/uid');
const StageLayering = require('../../engine/stage-layering');

class canvasStorage {
    /**
     * initiats the storage
     */
    constructor() {
        this.canvases = {}
    }

    attachRuntime(runtime) {
        this.runtime = runtime
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
    newCanvas(name, width, height) {
        const id = uid()
        const element = document.createElement('canvas')
        element.id = id
        element.width = width;
        element.height = height;

        const skin = this.runtime.renderer.createBitmapSkin(element, 1);
        const drawable = this.runtime.renderer.createDrawable(StageLayering.PEN_LAYER);
        this.runtime.renderer.updateDrawableSkinId(drawable, skin);
        this.runtime.renderer.updateDrawableVisible(drawable, false);

        const data = {
            name: name,
            id: id,
            element: element,
            skinId: skin,
            drawableId: drawable,
            width: width, 
            height: height,
            context: {
                '2d': element.getContext('2d'),
                '3d': element.getContext('webgl') || element.getContext("experimental-webgl")
            }
        }
        this.canvases[id] = data
        return data
    }

    /**
     * gets or creates a canvas with name equal to 
     * @param {String} name the name of the canvas
     */
    getCanvasByName(name) {
        return Object.values(this.canvases).find(canvas => canvas.name === name)
    }

    /**
     * updates the canvases renderer
     * @param {String} id the id of the canvas to update
     */
    updateCanvas(id) {
        const canvas = this.getCanvas(id)
        const printSkin = this.runtime.renderer._allSkins[canvas.skinId];
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        printSkin._setTexture(imageData);
        this.runtime.requestRedraw();
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