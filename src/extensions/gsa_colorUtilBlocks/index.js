const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Color = require('../../util/color');
const {validateJSON} = require('../../util/json-block-utilities');

/**
 * Class for TurboWarp blocks
 * @constructor
 */
class colorBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    HSV_BLACK = Color.rgbToHsv(Color.RGB_BLACK);
    DECIMAL_BLACK = Color.rgbToDecimal(Color.RGB_BLACK);
    HEX_BLACK = Color.rgbToHex(Color.RGB_BLACK);
    RGB_BLACK = Color.RGB_BLACK;

    deafultHsv = '{"h": 360, "s": 1, "v": 1}';
    deafultRgb = '{"r": 255, "g": 0, "b": 0}';
    deafultHex = '#ff0000';
    deafultDecimal = '16711680';

    _validateColor (json, shouldBe) {
        const parsedResult = validateJSON(json);
        const validJson = parsedResult.isValid;
        let parsed = parsedResult.object;
        const validCsbFull = () => !(typeof parsed.color === 'number') || 
            !(typeof parsed.saturation === 'number') || 
            !(typeof parsed.brightness === 'number');
        const validCsbPartial = () => !(typeof parsed.c === 'number') || 
            !(typeof parsed.s === 'number') || 
            !(typeof parsed.b === 'number');
        const validHsvObj = () => !(typeof parsed.h === 'number') || 
            !(typeof parsed.s === 'number') || 
            !(typeof parsed.v === 'number');

        const validHsv = () => !validCsbFull() && !validCsbPartial() && !validHsvObj();
        const validRgb = () => !(typeof parsed.r === 'number') || 
            !(typeof parsed.g === 'number') || 
            !(typeof parsed.b === 'number');
        const validHex = () => typeof json === 'string' && !validJson;
        const validDecimal = () => typeof json === 'number';

        const validAlphaSmall = () => typeof parsed.a === 'number';
        const validAlphaLarge = () => typeof parsed.alpha === 'number';
        const validtransparencySmall = () => typeof parsed.t === 'number';
        const validtransparencyLarge = () => typeof parsed.transparency === 'number';
        switch (shouldBe) {
        case 'rgbObj': {
            if (validHsv()) parsed = Color.hsvToRgb(this._validateColor(json, 'hsvObg'));
            if (validHex()) parsed = Color.hexToRgb(this._validateColor(json, 'hex'));
            if (validDecimal()) parsed = Color.decimalToRgb(this._validateColor(json, 'decimal'));
            if (!validRgb()) return this.RGB_BLACK;
            if (validAlphaLarge) {
                parsed.a = parsed.alpha;
            } else if (validtransparencySmall) {
                parsed.a = parsed.t / 100;
            } else if (validtransparencyLarge) {
                parsed.a = parsed.transparency / 100;
            }
            return parsed;
        }
        case 'hsvObj': {
            if (validRgb()) parsed = Color.rgbToHsv(this._validateColor(json, 'rgbObg'));
            if (validHex()) parsed = Color.rgbToHsv(Color.hexToRgb(this._validateColor(json, 'hex')));
            if (validDecimal()) parsed = Color.rgbToHsv(Color.decimalToRgb(this._validateColor(json, 'decimal')));
            if (!validHsv()) return this.HSV_BLACK;
            const res = {};
            if (validAlphaSmall()) {
                res.a = parsed.a;
            } else if (validAlphaLarge()) {
                res.a = parsed.alpha;
            } else if (validtransparencySmall()) {
                res.a = parsed.t / 100;
            } else if (validtransparencyLarge()) {
                res.a = parsed.transparency / 100;
            }
            if (validCsbFull()) {
                res.h = parsed.color * 360 / 100;
                res.s = parsed.saturation / 100;
                res.v = parsed.brightness / 100;
            } else if (validCsbPartial()) {
                res.h = parsed.c * 360 / 100;
                res.s = parsed.s / 100;
                res.v = parsed.b / 100;
            } else if (validHsvObj()) {
                res.h = parsed.h;
                res.s = parsed.s;
                res.v = parsed.v;
            }
            return res;
        }
        case 'decimal': {
            if (validRgb()) {
                parsed = Color.rgbToDecimal(this._validateColor(json, 'rgbObg'));
            } else if (validHsv()) {
                parsed = Color.rgbToDecimal(Color.hsvToRgb(this._validateColor(json, 'hsvObg')));
            } else if (validHex()) {
                parsed = Color.hexToDecimal(this._validateColor(json, 'hex'));
            } else {
                parsed = json;
            }

            return Number(parsed);
        }
        case 'hex': {
            if (validRgb()) {
                parsed = Color.rgbToHex(this._validateColor(json, 'rgbObg'));
            } else if (validHsv()) {
                parsed = Color.rgbToHex(Color.hsvToRgb(this._validateColor(json, 'hsvObg')));
            } else if (validDecimal()) {
                parsed = Color.decimalToHex(this._validateColor(json, 'decimal'));
            } else {
                parsed = json;
            }
            return String(parsed);
        }
        }
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'colors',
            name: 'Color Util',
            color1: '#ff4c4c',
            color2: '#e64444',
            blocks: [
                {
                    opcode: 'defaultBlack',
                    text: 'black',
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'defaultWhite',
                    text: 'white',
                    blockType: BlockType.REPORTER
                },
                {
                    type: BlockType.LABEL,
                    text: 'rgb'
                },
                {
                    opcode: 'rgbToDecimal',
                    text: 'rgb [color] to decimal',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultRgb
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'rgbToHex',
                    text: 'rgb [color] to hex',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultRgb
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'rgbToHsv',
                    text: 'rgb [color] to hsv',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultRgb
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    type: BlockType.LABEL,
                    text: 'hex'
                },
                {
                    opcode: 'hexToDecimal',
                    text: 'hex [color] to decimal',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultHex
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'hexToRgb',
                    text: 'hex [color] to rgb',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultHex
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'hexToHsv',
                    text: 'hex [color] to hsv',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultHex
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    type: BlockType.LABEL,
                    text: 'decimal'
                },
                {
                    opcode: 'decimalToHex',
                    text: 'decimal [color] to hex',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultDecimal
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'decimalToRgb',
                    text: 'decimal [color] to rgb',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultDecimal
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'decimalToHsv',
                    text: 'decimal [color] to hsv',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultDecimal
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    type: BlockType.LABEL,
                    text: 'hsv'
                },
                {
                    opcode: 'hsvToHex',
                    text: 'hsv [color] to hex',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultHsv
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'hsvToRgb',
                    text: 'hsv [color] to rgb',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultHsv
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'hsvToDecimal',
                    text: 'hsv [color] to decimal',
                    arguments: {
                        color: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultHsv
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                "---",
                {
                    type: BlockType.LABEL,
                    text: 'other'
                },
                {
                    opcode: 'csbMaker',
                    text: 'color: [h] saturation: [s] brightness: [v] transparency: [a]',
                    arguments: {
                        h: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        s: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        v: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'hsvMaker',
                    text: 'h: [h] s: [s] v: [v] s: [a]',
                    arguments: {
                        h: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        s: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        v: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'rgbMaker',
                    text: 'r: [h] g: [s] b: [v] s: [a]',
                    arguments: {
                        r: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        g: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        b: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        a: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        }
                    },
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'mixColors',
                    text: 'mix [color1] [color2] by [percent]',
                    arguments: {
                        color1: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultRgb
                        },
                        color2: {
                            type: ArgumentType.STRING,
                            defaultValue: this.deafultRgb
                        },
                        percent: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        }
                    },
                    blockType: BlockType.REPORTER
                }
            ]
        };
    }

    csbMaker (args) {
        const color = {
            color: args.h,
            saturation: args.s,
            brightness: args.v
        };
        if (!isNaN(args.a)) color.transparency = args.a;
        return JSON.stringify(color);
    }
    hsvMaker (args) {
        const color = {
            h: args.h,
            s: args.s,
            v: args.v
        };
        if (!isNaN(args.a)) color.a = args.a;
        return JSON.stringify(color);
    }
    rgbMaker (args) {
        const color = {
            r: args.h,
            g: args.s,
            b: args.v
        };
        if (!isNaN(args.a)) color.a = args.a;
        return JSON.stringify(color);
    }
    mixColors (args) {
        const color1 = this._validateColor(args.color1, 'rgbObj');
        const color2 = this._validateColor(args.color2, 'rgbObj');
        return Color.mixRgb(color1, color2, args.percent);
    }
    rgbToDecimal (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return Color.rgbToDecimal(color);
    }
    rgbToHex (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return Color.rgbToHex(color);
    }
    rgbToHsv (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return JSON.stringify(Color.rgbToHsv(color));
    }
    hexToDecimal (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return Color.rgbToDecimal(color);
    }
    hexToRgb (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return JSON.stringify(color);
    }
    hexToHsv (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return JSON.stringify(Color.rgbToHsv(color));
    }
    decimalToHex (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return Color.rgbToHex(color);
    }
    decimalToRgb (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return JSON.stringify(color);
    }
    decimalToHsv (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return JSON.stringify(Color.rgbToHsv(color));
    }
    hsvToHex (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return Color.rgbToHex(color);
    }
    hsvToRgb (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return JSON.stringify(color);
    }
    hsvToDecimal (args) {
        const color = this._validateColor(args.color, 'rgbObj');
        return Color.rgbToDecimal(color);
    }
}

module.exports = colorBlocks;
