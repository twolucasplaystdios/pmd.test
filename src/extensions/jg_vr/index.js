const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class of 2025
 * @constructor
 */
class jgVr {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
        this.open = false;
        this.session = null;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgVr',
            name: 'Virtual Reality',
            color1: '#3888cf',
            blocks: [
                {
                    opcode: 'isSupported',
                    text: 'is vr supported?',
                    blockType: BlockType.BOOLEAN,
                    disableMonitor: true
                },
                {
                    opcode: 'createSession',
                    text: 'create vr session',
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'closeSession',
                    text: 'close vr session',
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'isOpened',
                    text: 'is vr open?',
                    blockType: BlockType.BOOLEAN,
                    disableMonitor: true
                },
            ]
        };
    }

    _getCanvas() {
        if (!this.runtime) return;
        if (!this.runtime.renderer) return;
        return this.runtime.renderer.canvas;
    }
    _getContext() {
        if (!this.runtime) return;
        if (!this.runtime.renderer) return;
        return this.runtime.renderer.gl;
    }
    async _createImmersive() {
        if (!('xr' in navigator)) return false;
        const session = await navigator.xr.requestSession("immersive-vr");
        this.session = session;
        this.open = true;

        session.addEventListener("end", () => {
            this.open = false;
        });
        
        const gl = this._getContext();
        if (!gl) return session;

        session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, gl)
        });
        return session;
    }

    isSupported() {
        if (!('xr' in navigator)) return false;
        return navigator.xr.isSessionSupported("immersive-vr");
    }
    isOpened() {
        return this.open;
    }

    createSession() {
        if (this.open) return;
        this.open = true;
        return this._createImmersive();
    }
    closeSession() {
        if (!this.session) return;
        this.open = false;
        return this.session.end();
    }
}

module.exports = jgVr;
