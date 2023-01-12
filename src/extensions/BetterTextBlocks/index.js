const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Looks = require('../../blocks/scratch3_looks');
const Clone = require('../../util/clone'); 

class text {
    constructor (runtime){
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */ 
        this.runtime = runtime;
        const state = this._getBubbleState(runtime._editingTarget)
        this.defaults = runtime.renderer.getTextBubbleProps(state.skinId)
    }

    _doesFontSuport(size, font) {
        return document.fonts.check(size+'px '+font)
    }
    _getBubbleState (target) {
        let bubbleState = target.getCustomState(Looks.STATE_KEY);
        if (!bubbleState) {
            bubbleState = Clone.simple(Looks.DEFAULT_BUBBLE_STATE);
            target.setCustomState(Looks.STATE_KEY, bubbleState);
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
                    text: 'set the text size to [size]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        size: {
                            type: ArgumentType.NUMBER,
                            menu: this.default.FONT_SIZE
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
        const props = runtime.renderer.getTextBubbleProps()
        if (!this._doesFontSuport(props.FONT_SIZE, args.font)) return
        runtime.renderer.setTextBubbleProp('FONT', args.font)
    }
    setSize(args, util) {
        const props = runtime.renderer.getTextBubbleProps()
        if (!this._doesFontSuport(args.size, props.FONT)) return
        runtime.renderer.setTextBubbleProp('FONT_SIZE', args.size)
    }
}

module.exports = text
