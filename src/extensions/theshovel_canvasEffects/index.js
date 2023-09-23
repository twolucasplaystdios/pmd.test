// Created by TheShovel
// https://github.com/TheShovel
//
// 99% of the code here was not created by a PenguinMod developer!
// Look above for proper crediting :)

const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");

let borderRadius = 0;
let rotation = 0;
let offsetY = 0;
let offsetX = 0;
let skewY = 0;
let skewX = 0;
let scale = 100;

// Thanks SharkPool for telling me about these
let transparency = 0;
let sepia = 0;
let blur = 0;
let contrast = 100;
let saturation = 100;
let color = 0;
let brightness = 100;
let invert = 0;
let resizeMode = "default";

let canvas;
const updateStyle = () => {
    // Gotta keep the translation to % because of the stage size, window size and so on
    const transform = `rotate(${rotation}deg) scale(${scale}%) skew(${skewX}deg, ${skewY}deg) translate(${offsetX}%, ${0 - offsetY
        }%)`;
    if (canvas.style.transform !== transform) {
        canvas.style.transform = transform;
    }
    const filter = `blur(${blur}px) contrast(${contrast / 100
        }) saturate(${saturation}%) hue-rotate(${color}deg) brightness(${brightness}%) invert(${invert}%) sepia(${sepia}%) opacity(${100 - transparency
        }%)`;
    if (canvas.style.filter !== filter) {
        canvas.style.filter = filter;
    }
    const cssBorderRadius = borderRadius === 0 ? "" : `${borderRadius}%`;
    if (canvas.style.borderRadius !== cssBorderRadius) {
        canvas.style.borderRadius = cssBorderRadius;
    }
    const imageRendering = resizeMode === "pixelated" ? "pixelated" : "";
    if (canvas.style.imageRendering !== imageRendering) {
        canvas.style.imageRendering = imageRendering;
    }
}

class CanvasEffects {
    constructor(runtime) {
        this.runtime = runtime;
        this.canvas = runtime.renderer.canvas;
        canvas = this.canvas;
        // scratch-gui may reset canvas styles when resizing the window or going in/out of fullscreen
        new MutationObserver(updateStyle).observe(this.canvas, {
            attributeFilter: ["style"],
            attributes: true,
        });
    }

    getInfo() {
        return {
            id: "theshovelcanvaseffects",
            name: "Canvas Effects",
            blocks: [
                {
                    opcode: "seteffect",
                    blockType: BlockType.COMMAND,
                    text: "set canvas [EFFECT] to [NUMBER]",
                    arguments: {
                        EFFECT: {
                            type: ArgumentType.STRING,
                            menu: "EFFECTMENU",
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                        },
                    },
                },
                {
                    opcode: "geteffect",
                    blockType: BlockType.REPORTER,
                    text: "get canvas [EFFECT]",
                    arguments: {
                        EFFECT: {
                            type: ArgumentType.STRING,
                            menu: "EFFECTGETMENU",
                        },
                    },
                },
                {
                    opcode: "cleareffects",
                    blockType: BlockType.COMMAND,
                    text: "clear canvas effects",
                },
                {
                    opcode: "renderscale",
                    blockType: BlockType.COMMAND,
                    text: "set canvas render size to width:[X] height:[Y]",
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100,
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100,
                        },
                    },
                },
                {
                    opcode: "setrendermode",
                    blockType: BlockType.COMMAND,
                    text: "set canvas resize rendering mode [EFFECT]",
                    arguments: {
                        EFFECT: {
                            type: ArgumentType.STRING,
                            menu: "RENDERMODE",
                        },
                    },
                },
            ],
            menus: {
                EFFECTMENU: {
                    acceptReporters: true,
                    items: [
                        "blur",
                        "contrast",
                        "saturation",
                        "color shift",
                        "brightness",
                        "invert",
                        "sepia",
                        "transparency",
                        "scale",
                        "skew X",
                        "skew Y",
                        "offset X",
                        "offset Y",
                        "rotation",
                        "border radius",
                    ],
                },
                RENDERMODE: {
                    acceptReporters: true,
                    items: ["pixelated", "default"],
                },
                EFFECTGETMENU: {
                    acceptReporters: true,
                    // this contains 'resize rendering mode', EFFECTMENU does not
                    items: [
                        "blur",
                        "contrast",
                        "saturation",
                        "color shift",
                        "brightness",
                        "invert",
                        "resize rendering mode",
                        "sepia",
                        "transparency",
                        "scale",
                        "skew X",
                        "skew Y",
                        "offset X",
                        "offset Y",
                        "rotation",
                        "border radius",
                    ],
                },
            },
        };
    }
    geteffect({ EFFECT }) {
        if (EFFECT === "blur") {
            return blur;
        } else if (EFFECT === "contrast") {
            return contrast;
        } else if (EFFECT === "saturation") {
            return saturation;
        } else if (EFFECT === "color shift") {
            return color;
        } else if (EFFECT === "brightness") {
            return brightness;
        } else if (EFFECT === "invert") {
            return invert;
        } else if (EFFECT === "resize rendering mode") {
            return resizeMode;
        } else if (EFFECT === "sepia") {
            return sepia;
        } else if (EFFECT === "transparency") {
            return transparency;
        } else if (EFFECT === "scale") {
            return scale;
        } else if (EFFECT === "skew X") {
            return skewX;
        } else if (EFFECT === "skew Y") {
            return skewY;
        } else if (EFFECT === "offset X") {
            return offsetX;
        } else if (EFFECT === "offset Y") {
            return offsetY;
        } else if (EFFECT === "rotation") {
            return rotation;
        } else if (EFFECT === "border radius") {
            return borderRadius;
        }
        return "";
    }
    seteffect({ EFFECT, NUMBER }) {
        NUMBER = Cast.toNumber(NUMBER);
        if (EFFECT === "blur") {
            blur = NUMBER;
        } else if (EFFECT === "contrast") {
            contrast = NUMBER;
        } else if (EFFECT === "saturation") {
            saturation = NUMBER;
        } else if (EFFECT === "color shift") {
            color = NUMBER;
        } else if (EFFECT === "brightness") {
            brightness = NUMBER;
        } else if (EFFECT === "invert") {
            invert = NUMBER;
        } else if (EFFECT === "sepia") {
            sepia = NUMBER;
        } else if (EFFECT === "transparency") {
            transparency = NUMBER;
        } else if (EFFECT === "scale") {
            scale = NUMBER;
        } else if (EFFECT === "skew X") {
            skewX = NUMBER;
        } else if (EFFECT === "skew Y") {
            skewY = NUMBER;
        } else if (EFFECT === "offset X") {
            offsetX = NUMBER;
        } else if (EFFECT === "offset Y") {
            offsetY = NUMBER;
        } else if (EFFECT === "rotation") {
            rotation = NUMBER;
        } else if (EFFECT === "border radius") {
            borderRadius = NUMBER;
        }
        updateStyle();
    }
    cleareffects() {
        borderRadius = 0;
        rotation = 0;
        offsetY = 0;
        offsetX = 0;
        skewY = 0;
        skewX = 0;
        scale = 100;
        transparency = 0;
        sepia = 0;
        blur = 0;
        contrast = 100;
        saturation = 100;
        color = 0;
        brightness = 100;
        invert = 0;
        resizeMode = "default";
        updateStyle();
    }
    setrendermode({ EFFECT }) {
        resizeMode = EFFECT;
        updateStyle();
    }
    renderscale({ X, Y }) {
        this.runtime.renderer.resize(X, Y);
    }
}

module.exports = CanvasEffects;