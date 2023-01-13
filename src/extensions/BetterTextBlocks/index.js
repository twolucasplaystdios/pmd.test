const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Scratch3LooksBlocks = require('../../blocks/scratch3_looks');
const Clone = require('../../util/clone');

class text {
    constructor (runtime){
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */ 
        this.runtime = runtime;
        this.defaults = runtime.renderer.getBubbleDefaults()
        console.log(this)
    }

    _percentToRatio(percent) {
        return Number(percent.slice(-1)) / 100
    }
    _getLineHeight(size, font) {
        var temp = document.createElement('span'), ret;
        temp.setAttribute("style", `
            margin:0; 
            padding:0;
            font-family: ${font};
            font-size: ${size};`);
        temp.innerHTML = "A";
        temp.style.display = 'none'
    
        ret = temp.clientHeight;
        temp.remove()
        return ret;
    }
    _doesFontSuport(size, font) {
        const check = size+'px '+font
        return document.fonts.check(check)
    }
    _getBubbleState (target) {
        let bubbleState = target.getCustomState(Scratch3LooksBlocks.STATE_KEY);
        if (!bubbleState) {
            bubbleState = Clone.simple(Scratch3LooksBlocks.DEFAULT_BUBBLE_STATE);
            target.setCustomState(Scratch3LooksBlocks.STATE_KEY, bubbleState);
        }
        return bubbleState;
    }

    getInfo () {
        return {
            id: 'text',
            name: 'text bubble control',
            blocks: [
                { 
                    opcode: 'setFont',
                    text: 'set font to [font]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        font: {
                            type: ArgumentType.STRING,
                            menu: 'FONT',
                            defaultValue: this.defaults.FONT
                        }
                    }
                },
                {
                    opcode: 'setSize',
                    text: 'set text size to [size]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        size: {
                            type: ArgumentType.NUMBER,
                            defaultValue: this.defaults.FONT_SIZE
                        }
                    }
                },
                {
                    opcode: 'setMinMaxBubbleSize',
                    text: 'set [mm] width to [num]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        mm: {
                            type: ArgumentType.STRING,
                            menu: 'minmax',
                            defaultValue: 'minimum'
                        },
                        num: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'setColor',
                    text: 'set [prop] color to [color]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        prop: {
                            type: ArgumentType.STRING,
                            menu: 'colorProps',
                            defaultValue: 'boarder'
                        },
                        color: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                {
                    opcode: 'setShape',
                    text: 'set [prop] to [color]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        prop: {
                            type: ArgumentType.STRING,
                            menu: 'shapeProps',
                            defaultValue: 'boarder line width'
                        },
                        color: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                }
            ],
            menus: {
                FONT: {
                    items: this.getAllFonts(),
                    acceptReporters: true
                },
                minmax: {
                    items: [
                        {
                            text: 'minimum',
                            value: 'MIN_WIDTH'
                        },
                        {
                            text: 'maximum',
                            value: 'MAX_LINE_WIDTH'
                        }
                    ]
                },
                colorProps: {
                    items: [
                        {
                            text: 'boarder',
                            value: 'BUBBLE_STROKE'
                        },
                        {
                            text: 'fill',
                            value: 'BUBBLE_FILL'
                        },
                        {
                            text: 'text',
                            value: 'TEXT_FILL'
                        }
                    ]
                },
                shapeProps: {
                    items: [
                        {
                            text: "boarder line width",
                            value: "STROKE_WIDTH"
                        },
                        {
                            text: "padding",
                            value: "PADDING"
                        },
                        {
                            text: "corner radius",
                            value: "CORNER_RADIUS"
                        },
                        {
                            text: "tail height",
                            value: "TAIL_HEIGHT"
                        }
                    ]
                }
            }
        };
    }

    getAllFonts() {
        let fonts = document.fonts.values()
        let res = []
        let font = fonts.next()
        while (!font.done) {
            res.push({
                text: font.value.family,
                value: font.value.family
            })
            console.log(font.value)
            font = fonts.next()
        }

        return res
    }
    setFont(args, util) {
        const state = this._getBubbleState(util.target)
        if (!this._doesFontSuport(state.props.FONT_SIZE, args.font)) return
        
        state.props.FONT = args.font

        state.props.LINE_HIEGHT = this._getLineHeight(state.props.FONT_SIZE, args.font)
        // @TODO make this get the actual font ratio
        state.props.FONT_HEIGHT_RATIO = 1
        util.target.setCustomState(Scratch3LooksBlocks.STATE_KEY, state);
    }
    setSize(args, util) {
        const state = this._getBubbleState(util.target)
        if (!this._doesFontSuport(args.size, state.props.FONT)) return

        state.props.FONT_SIZE = args.size

        state.props.LINE_HIEGHT = this._getLineHeight(args.size, state.props.FONT)
        // @TODO make this get the actual font ratio
        state.props.FONT_HEIGHT_RATIO = 1
        util.target.setCustomState(Scratch3LooksBlocks.STATE_KEY, state);
    }
    setMinMaxBubbleSize(args, util) {
        const state = this._getBubbleState(util.target)

        state.props[args.mm] = args.num
        util.target.setCustomState(Scratch3LooksBlocks.STATE_KEY, state);
    }
    setColor(args, util) {
        const state = this._getBubbleState(util.target)

        state.props.COLORS[args.prop] = args.color
        util.target.setCustomState(Scratch3LooksBlocks.STATE_KEY, state);
    }
    setShape(args, util) {
        const state = this._getBubbleState(util.target)

        state.props[args.prop] = args.color
        util.target.setCustomState(Scratch3LooksBlocks.STATE_KEY, state);
    }
}

module.exports = text
