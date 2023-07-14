const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

const SESSION_TYPE = "immersive-vr";

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
    _getRenderer() {
        if (!this.runtime) return;
        return this.runtime.renderer;
    }

    _disposeImmersive() {
        const gl = this._getContext();
        if (!gl) return;
        // bind frame buffer to canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        // reset renderer info
        const renderer = this._getRenderer();
        if (!renderer) return;
        renderer.xrEnabled = false;
        renderer.xrLayer = null;
    }
    async _createImmersive() {
        if (!('xr' in navigator)) return false;
        const gl = this._getContext();
        if (!gl) return;
        const renderer = this._getRenderer();
        if (!renderer) return;

        await gl.makeXRCompatible();
        const session = await navigator.xr.requestSession(SESSION_TYPE);
        this.session = session;
        this.open = true;

        renderer.xrEnabled = true;

        // we need to make sure stuff is back to normal once the vr session is done
        // but this isnt always triggered by the close session block
        // the user can also close it themselves, so we need to handle that
        // this is also triggered by the close session block btw so we dont need
        // to repeat
        session.addEventListener("end", () => {
            this.open = false;
            this._disposeImmersive();
        });

        // set render state to use a new layer for the vr session
        // renderer will handle this
        session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, gl)
        });
        renderer.xrLayer = session.renderState.baseLayer;
        return session;
    }

    isSupported() {
        if (!('xr' in navigator)) return false;
        return navigator.xr.isSessionSupported(SESSION_TYPE);
    }
    isOpened() {
        return this.open;
    }

    createSession() {
        if (this.open) return;
        if (this.session) return;
        return this._createImmersive();
    }
    closeSession() {
        this.open = false;
        if (!this.session) return;
        return this.session.end();
    }
}

module.exports = jgVr;
