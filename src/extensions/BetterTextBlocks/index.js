const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const DefaultAnimateText = 'Look at me im animated!'
const DefaultText = 'Hello World!'
const FontIds = {
    SANS_SERIF: 'Sans Serif', 
    SERIF: 'Serif', 
    HANDWRITING: 'Handwriting', 
    MARKER: 'Marker', 
    CURLY: 'Curly', 
    PIXEL: 'Pixel',
    RANDOM: 'random'
}

class Scratch3TextBlocks{
    constructor (runtime){
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this._onTargetWillExit = this._onTargetWillExit.bind(this);
        this.runtime.on('targetWasRemoved', this._onTargetWillExit);
        this._onTargetCreated = this._onTargetCreated.bind(this);
        this.runtime.on('targetWasCreated', this._onTargetCreated);
        this.runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));
    }
    static get STATE_KEY (){
        return 'Scratch.text';
    }
    static get DEFAULT_TEXT_STATE (){
        return {
            skinId: null, 
            text: 'Welcome to my project!',
            font: 'Handwriting', 
            color: 'hsla(225, 15%, 40%, 1', 
            size: 24, 
            maxWidth: 480, 
            align: 'center', 
            strokeWidth: 0, 
            strokeColor: 'black', 
            rainbow: false, 
            visible: false, 
            targetSize: null, 
            fullText: null
        };
    }
    getInfo () {
        return {
            id: 'text',
            name: 'Animated Text',
            blocks: [
                {
                    opcode: 'setText',
                    text: formatMessage({
                        id: 'text.setText',
                        default: 'show text [TEXT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: DefaultText
                        }
                    }
                }, 
                {
                    opcode: 'animateText',
                    text: formatMessage({
                        id: 'text.animateText',
                        default: '[ANIMATE] text [TEXT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ANIMATE: {
                            type: ArgumentType.STRING,
                            menu: 'ANIMATE',
                            defaultValue: 'rainbow'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: DefaultAnimateText
                        }
                    }
                }, 
                {
                    opcode: 'clearText',
                    text: formatMessage({
                        id: 'text.clearText',
                        default: 'show sprite',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {}
                }, 
                '---', 
                {
                    opcode: 'setFont',
                    text: formatMessage({
                        id: 'text.setFont',
                        default: 'set font to [FONT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FONT: {
                            type: ArgumentType.STRING,
                            menu: 'FONT',
                            defaultValue: FontIds.PIXEL
                        }
                    }
                }, 
                {
                    opcode: 'setColor',
                    text: formatMessage({
                        id: 'text.setColor',
                        default: 'set text color to [COLOR]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                }, 
                {
                    opcode: 'setSize',
                    text: formatMessage({
                        id: 'text.setSize',
                        default: 'set text size to [SIZE]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SIZE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'setWidth',
                    text: formatMessage({
                        id: 'text.setWidth',
                        default: 'set width to [WIDTH] aligned [ALIGN]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        },
                        ALIGN: {
                            type: ArgumentType.STRING,
                            defaultValue: 'left',
                            menu: 'ALIGN'
                        }
                    }
                },
                {
                    opcode: 'setAlign',
                    text: formatMessage({
                        id: 'text.setAlign',
                        default: 'align text [ALIGN] width [WIDTH]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ALIGN: {
                            type: ArgumentType.STRING,
                            defaultValue: 'left',
                            menu: 'ALIGN'
                        },
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        }
                    }
                },
                {
                    opcode: 'rainbow',
                    text: formatMessage({
                        id: 'text.rainbow',
                        default: 'rainbow for [SECS] seconds',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SECS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                '---',
                {
                    opcode: 'addText',
                    text: formatMessage({
                        id: 'text.addText',
                        default: 'add text [TEXT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: ' and more!'
                        }
                    }
                },
                {
                    opcode: 'addLine',
                    text: formatMessage({
                        id: 'text.addLine',
                        default: 'add line [TEXT]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'more lines!'
                        }
                    }
                },
                '---',
                {
                    opcode: 'setOutlineWidth',
                    text: formatMessage({
                        id: 'text.setOutlineWidth',
                        default: 'set outline width to [WIDTH]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'setOutlineColor',
                    text: formatMessage({
                        id: 'text.setOutlineColor',
                        default: 'set outline color to [COLOR]',
                        description: ''
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                }
            ],
            menus: {
                FONT: {
                    items: [
                        {
                            text: 'Sans Serif',
                            value: FontIds.SANS_SERIF
                        }, 
                        {
                            text: 'Serif',
                            value: FontIds.SERIF
                        }, 
                        {
                            text: 'Handwriting',
                            value: FontIds.HANDWRITING
                        }, 
                        {
                            text: 'Marker',
                            value: FontIds.MARKER
                        }, 
                        {
                            text: 'Curly',
                            value: FontIds.CURLY
                        }, 
                        {
                            text: 'Pixel',
                            value: FontIds.PIXEL
                        }, 
                        {
                            text: 'random font',
                            value: FontIds.RANDOM
                        }
                    ]
                },
                ALIGN: {
                    items: [
                        {
                            text: 'left',
                            value: 'left'
                        }, 
                        {
                            text: 'center',
                            value: 'center'
                        }, 
                        {
                            text: 'right',
                            value: 'right'
                        }
                    ]
                },
                ANIMATE: {
                    items: [
                        {
                            text: 'type',
                            value: 'type'
                        }, 
                        {
                            text: 'rainbow',
                            value: 'rainbow'
                        }, 
                        {
                            text: 'zoom',
                            value: 'zoom'
                        }
                    ]
                }
            }
        };
    }
    FONT_IDS = Object.values(FontIds);
    setText (args, util) {
        const textState = this._getTextState(util.target);

        textState.text = this._formatText(args.TEXT);
        textState.visible = true;
        textState.animating = false;

         // Yield until the next tick.


        
    }
    clearText (args, util) {
        const target = util.target;

        const textState = this._getTextState(target);

        textState.visible = false; // Set state so that clones can know not to render text

        textState.animating = false;
        const costume = target.getCostumes()[target.currentCostume];
         // Yield until the next tick.

        
    }
    stopAll () {

        this.runtime.targets.forEach(target => {
            this.clearText({}, {
                target: target
            });
        });
    }
    addText (args, util) {
        const textState = this._getTextState(util.target);

        textState.text += this._formatText(args.TEXT);
        textState.visible = true;
        textState.animating = false;

         // Yield until the next tick.


        
    }
    addLine (args, util) {
        const textState = this._getTextState(util.target);

        textState.text += '\n'.concat(this._formatText(args.TEXT));
        textState.visible = true;
        textState.animating = false;

         // Yield until the next tick.


        
    }
    setFont (args, util) {
        const textState = this._getTextState(util.target);

        if (args.FONT === FontIds.RANDOM) {
            textState.font = this._randomFontOtherThan(textState.font);
        } else {
            textState.font = args.FONT;
        }

        
    }
    _randomFontOtherThan (currentFont) {
        const otherFonts = this.FONT_IDS.filter(id => id !== currentFont);
        return otherFonts[Math.floor(Math.random() * otherFonts.length)];
    }
    setColor (args, util) {
        const textState = this._getTextState(util.target);

        textState.color = args.COLOR;

        
    }
    setWidth (args, util) {
        const textState = this._getTextState(util.target);

        textState.maxWidth = Cast.toNumber(args.WIDTH);
        textState.align = args.ALIGN;

        
    }
    setSize (args, util) {
        const textState = this._getTextState(util.target);

        textState.size = Cast.toNumber(args.SIZE);

        
    }
    setAlign (args, util) {
        const textState = this._getTextState(util.target);

        textState.maxWidth = Cast.toNumber(args.WIDTH);
        textState.align = args.ALIGN;

        
    }
    setOutlineWidth (args, util) {
        const textState = this._getTextState(util.target);

        textState.strokeWidth = Cast.toNumber(args.WIDTH);

        
    }
    setOutlineColor (args, util) {
        const textState = this._getTextState(util.target);

        textState.strokeColor = args.COLOR;
        textState.visible = true;

        
    }
    _animateText (args, util) {

        const target = util.target;

        const textState = this._getTextState(target);

        if (textState.fullText !== null) return; // Let the running animation finish, do nothing
        // On "first tick", set the text and force animation flags on and render

        textState.fullText = this._formatText(args.TEXT);
        textState.text = textState.fullText[0]; // Start with first char visible

        textState.visible = true;
        textState.animating = true;

        this._renderText(target);

        this.runtime.requestRedraw();
        return new Promise(resolve => {
            var interval = setInterval(() => {
                if (textState.animating && textState.visible && textState.text !== textState.fullText) {
                    textState.text = textState.fullText.substring(0, textState.text.length + 1);
                } else {
                    // NB there is no need to update the .text state here, since it is at the end of the
                    // animation (when text == fullText), is being cancelled by force setting text,
                    // or is being cancelled by hitting the stop button which hides the text anyway.
                    textState.fullText = null;
                    clearInterval(interval);
                    resolve();
                }

                this._renderText(target);

                this.runtime.requestRedraw();
            }, 60
                /* ms, about 1 char every 2 frames */
            );
        });
    }
    _zoomText (args, util) {

        const target = util.target;

        const textState = this._getTextState(target);

        if (textState.targetSize !== null) return; // Let the running animation finish, do nothing

        const timer = new Timer();
        const durationMs = Cast.toNumber(args.SECS || 0.5) * 1000; // On "first tick", set the text and force animation flags on and render

        textState.text = this._formatText(args.TEXT);
        textState.visible = true;
        textState.animating = true;
        textState.targetSize = target.size;
        target.setSize(0);

        this._renderText(target);

        this.runtime.requestRedraw();
        timer.start();
        return new Promise(resolve => {
            var interval = setInterval(() => {
                const timeElapsed = timer.timeElapsed();

                if (textState.animating && textState.visible && timeElapsed < durationMs) {
                    target.setSize(textState.targetSize * timeElapsed / durationMs);
                } else {
                    target.setSize(textState.targetSize);
                    textState.targetSize = null;
                    clearInterval(interval);
                    resolve();
                }

                this._renderText(target);

                this.runtime.requestRedraw();
            }, this.runtime.currentStepTime);
        });
    }
    animateText (args, util) {
        switch (args.ANIMATE) {
        case 'rainbow':
            return this.rainbow(args, util);

        case 'type':
            return this._animateText(args, util);

        case 'zoom':
            return this._zoomText(args, util);
        }
    }
    rainbow (args, util) {
        const target = util.target;

        const textState = this._getTextState(target);

        if (textState.rainbow) return; // Let the running animation finish, do nothing

        const timer = new Timer();
        const durationMs = Cast.toNumber(args.SECS || 2) * 1000; // On "first tick", set the text and force animation flags on and render

        textState.text = this._formatText(args.TEXT);
        textState.visible = true;
        textState.animating = true;
        textState.rainbow = true;

        this._renderText(target);

        timer.start();
        return new Promise(resolve => {
            var interval = setInterval(() => {
                const timeElapsed = timer.timeElapsed();

                if (textState.animating && textState.visible && timeElapsed < durationMs) {
                    textState.rainbow = true;
                    target.setEffect('color', timeElapsed / -5);
                } else {
                    textState.rainbow = false;
                    target.setEffect('color', 0);
                    clearInterval(interval);
                    resolve();
                }

                this._renderText(target);
            }, this.runtime.currentStepTime);
        });
    }
    _getTextState (target) {
        let textState = target.getCustomState(text.STATE_KEY);

        if (!textState) {
            textState = Clone.simple(text.DEFAULT_TEXT_STATE);
            target.setCustomState(text.STATE_KEY, textState);
        }

        return textState;
    }
    _formatText (text) {
        if (text === '') return text; // Non-integers should be rounded to 2 decimal places (no more, no less), unless they're small enough that
        // rounding would display them as 0.00. This matches 2.0's behavior:
        // https://github.com/LLK/scratch-flash/blob/2e4a402ceb205a0428…7f54b26eebe1c2e6da6c0/src/scratch/ScratchSprite.as#L579-L585

        if (typeof text === 'number' && Math.abs(text) >= 0.01 && text % 1 !== 0) {
            text = text.toFixed(2);
        }

        text = Cast.toString(text);
        return text;
    }
    _renderText (target) {
        if (!this.runtime.renderer) return;

        const textState = this._getTextState(target);

        if (!textState.visible) return; // Resetting to costume is done in clear block, early return here is for clones

        textState.skinId = this.runtime.renderer.updateTextCostumeSkin(textState);
        this.runtime.renderer.updateDrawableSkinId(target.drawableID, textState.skinId);
    }
    _onTargetCreated (newTarget, sourceTarget) {
      

        if (sourceTarget) {
            const sourceTextState = sourceTarget.getCustomState(text.STATE_KEY);

            if (sourceTextState) {
                newTarget.setCustomState(text.STATE_KEY, Clone.simple(sourceTextState));
                const newTargetState = newTarget.getCustomState(text.STATE_KEY); // Note here that clones do not share skins with their original target. This is a subtle but important
                // departure from the rest of Scratch, where clones always stay in sync with the originals costume.
                // The "rule" is anything that can be done with the blocks is clone-specific, since that is where you make clones,
                // but anything outside of the blocks (costume/sounds) are shared.
                // For example, graphic effects are clone-specific, but changing the costume in the paint editor is shared.
                // Since you can change the text on the skin from the blocks, each clone needs its own skin.

                newTargetState.skinId = null; // Unset all of the animation flags

                newTargetState.rainbow = false;
                newTargetState.targetSize = null;
                newTargetState.fullText = null;
                newTargetState.animating = false; // Must wait until the drawable has been initialized, but before render. We can
                // wait for the first EVENT_TARGET_VISUAL_CHANGE for this.

                var onDrawableReady = () => {
                    this._renderText(newTarget);

                    newTarget.off('EVENT_TARGET_VISUAL_CHANGE', onDrawableReady);
                };

                newTarget.on('EVENT_TARGET_VISUAL_CHANGE', onDrawableReady);
            }
        }
    }
    _onTargetWillExit (target) {
        const textState = this._getTextState(target);

        if (textState.skinId) {
        // The drawable will get cleaned up by RenderedTarget#dispose, but that doesn't
        // automatically destroy attached skins (because they are usually shared between clones).
        // For text skins, however, all clones get their own, so we need to manually destroy them.
            this.runtime.renderer.destroySkin(textState.skinId);
            textState.skinId = null;
        }
    }
}

module.exports = text
