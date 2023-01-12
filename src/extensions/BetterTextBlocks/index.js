const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Looks = require('../../blocks/scratch3_looks');

class text {
    constructor (runtime){
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */ 
        this.looks = new Looks(runtime)
        this.runtime = runtime;
        this.defaults = runtime.renderer.getBubbleDefaults()
        console.log(this)
    }

    _doesFontSuport(size, font) {
        return document.fonts.check(size+'px '+font)
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
                    text: 'set the text size to [size]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        size: {
                            type: ArgumentType.NUMBER,
                            menu: this.defaults.FONT_SIZE
                        }
                    }
                }
            ],
            menus: {
                FONT: {
                    items: 'getAllFonts',
                    acceptReporters: true
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
            font = fonts.next()
        }

        return res
    }
    setFont(args, util) {
        const state = this.looks._getBubbleState(util.target)
        if (!this._doesFontSuport(state.props.FONT_SIZE, args.font)) return
        state.props.FONT = args.font
        util.target.setCustomState(this.looks.STATE_KEY, state);
    }
    setSize(args, util) {
        const state = this.looks._getBubbleState(util.target)
        if (!this._doesFontSuport(args.size, state.props.FONT)) return
        state.props.FONT_SIZE = args.font
        util.target.setCustomState(this.looks.STATE_KEY, state);
    }
}

module.exports = text
