const Cast = require('../../util/cast');
const Clone = require('../../util/clone');
const ExtensionInfo = require("./info");
const Three = require("three")

/**
 * Class for 3D blocks
 * @constructor
 */
class Jg3DBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // prism has screenshots, lets tell it to use OUR canvas for them
        this.runtime.prism_screenshot_checkForExternalCanvas = true;
        this.runtime.prism_screenshot_externalCanvas = null;

        // Three.js requirements
        this.scene = null;
        this.camera = null;
        this.renderer = null;

        // extras
        this.lastStageSizeWhenRendering = {
            width: 0,
            height: 0
        }

        // event recievers
        this.runtime.on('PROJECT_STOP_ALL', () => {
            // stop button clicked or project restarted, dispose of all objects
            if (this.scene) {
                this.scene.remove();
                this.scene = null;
            }
            if (this.camera) {
                this.camera.remove();
                this.camera = null;
            }
            if (this.renderer) {
                this.renderer.domElement.remove();
                this.renderer.dispose();
                this.renderer = null;
                this.runtime.prism_screenshot_externalCanvas = null;
            }
        });
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return ExtensionInfo;
    }

    // utilities
    getScratchCanvas() {
        return this.runtime.renderer.canvas;
    }
    restyleExternalCanvas(canvas) {
        canvas.style.position = "absolute"; // position above canvas without pushing it down
        canvas.style.width = "100%";
        canvas.style.height = "100%";
    }
    appendElementAboveScratchCanvas(element) {
        element.style.zIndex = 450;
        this.getScratchCanvas().parentElement.prepend(element);
    }
    needsToResizeCanvas() {
        const stage = {
            width: this.runtime.stageWidth,
            height: this.runtime.stageHeight
        }
        return stage !== this.lastStageSizeWhenRendering;
    }

    initialize() {
        this.scene = new Three.Scene();
        this.renderer = new Three.WebGLRenderer({ preserveDrawingBuffer: true });
        // add renderer canvas ontop of scratch canvas
        const canvas = this.renderer.domElement;
        this.runtime.prism_screenshot_externalCanvas = canvas;

        this.restyleExternalCanvas(canvas);
        this.appendElementAboveScratchCanvas(canvas);
        // we dont need to set renderer size since the render function will do that for us

        /* dev: test rendering by drawing a cube and see if it appears

        const geometry = new Three.BoxGeometry(1, 1, 1);
        const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Three.Mesh(geometry, material);
        this.scene.add(cube);

        dev update: it worked W

        */
    }
    render() {
        if (!this.renderer) return;
        if (!this.scene) return;
        if (!this.camera) return;
        if (this.needsToResizeCanvas()) {
            this.lastStageSizeWhenRendering = {
                width: this.runtime.stageWidth,
                height: this.runtime.stageHeight
            }
            /*
                multiply sizes because the stage looks like doo doo xd
                we dont need to worry about multiplying 1920 * 2 since projects
                shouldnt be using that large of a stage but instead a smaller size
                with the same aspect ratio, penguinmod even says that
            */
            this.renderer.setSize(this.lastStageSizeWhenRendering.width * 2, this.lastStageSizeWhenRendering.height * 2);
            this.restyleExternalCanvas(this.renderer.domElement);
        }
        // when switching between project page & editor, we need to move the canvas again since it gets lost
        /* todo: create layers so that iframe appears above 3d every time this is done */
        this.appendElementAboveScratchCanvas(this.renderer.domElement);
        return new Promise((resolve) => {
            // we do this to avoid HUGE lag when not waiting 1 tick
            // and because it waits if the tab isnt focused
            requestAnimationFrame(() => {
                // renderer might not exist anymore
                if (!this.renderer) return;
                resolve(this.renderer.render(this.scene, this.camera));
            })
        })
    }

    setCameraPerspective2(args) {
        if (this.camera) {
            // remove existing camera
            this.camera.remove();
            this.camera = null;
        }

        const fov = Cast.toNumber(args.FOV);
        const aspect = Cast.toNumber(args.AR);
        const near = Cast.toNumber(args.NEAR);
        const far = Cast.toNumber(args.FAR);

        this.camera = new Three.PerspectiveCamera(fov, aspect, near, far);
    }
    setCameraPerspective1(args) {
        /* todo: make near and far be the same as the existing camera if there is one */
        const near = 0.1;
        const far = 1000;
        return this.setCameraPerspective2({
            FOV: args.FOV,
            AR: args.AR,
            NEAR: near,
            FAR: far
        })
    }
    setCameraPerspective0(args) {
        /* todo: make ar, near and far be the same as the existing camera if there is one */
        const ar = this.runtime.stageWidth / this.runtime.stageHeight;
        const near = 0.1;
        const far = 1000;
        return this.setCameraPerspective2({
            FOV: args.FOV,
            AR: ar,
            NEAR: near,
            FAR: far
        })
    }

    setCameraPosition(args) {
        if (!this.camera) return;
        const position = {
            x: Cast.toNumber(args.X),
            y: Cast.toNumber(args.Y),
            z: Cast.toNumber(args.Z),
        }
        this.camera.position.set(position.x, position.y, position.z);
    }
    getCameraPosition(args) {
        if (!this.camera) return "";
        const v = args.VECTOR3;
        if (!v) return "";
        if (!["x", "y", "z"].includes(v)) return "";
        return Cast.toNumber(this.camera.position[v]);
    }

    setSceneBackgroundColor(args) {
        if (!this.scene) return;
        const color = Cast.toNumber(args.COLOR);
        this.scene.background = new Three.Color(color);
    }

    getCameraZoom() {
        if (!this.camera) return "";
        return Cast.toNumber(this.camera.zoom) * 100;
    }
    setCameraZoom(args) {
        if (!this.camera) return;
        this.camera.zoom = Cast.toNumber(args.ZOOM) / 100;
    }

    getCameraClipPlane(args) {
        if (!this.camera) return "";
        const plane = args.CLIPPLANE;
        if (!["near", "far"].includes(plane)) return "";
        return this.camera[plane];
    }

    getCameraAspectRatio() {
        if (!this.camera) return "";
        return Cast.toNumber(this.camera.aspect);
    }
    getCameraFov() {
        if (!this.camera) return "";
        return Cast.toNumber(this.camera.fov);
    }

    isCameraPerspective() {
        if (!this.camera) return false;
        return Cast.toBoolean(this.camera.isPerspectiveCamera);
    }
    isCameraOrthographic() {
        if (!this.camera) return false;
        return Cast.toBoolean(!this.camera.isPerspectiveCamera);
    }
}

module.exports = Jg3DBlocks;
