const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

class text {
    constructor (runtime){
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }
    getInfo () {
        return {
            id: 'text',
            name: 'Better Text Engine',
            blocks: [
                {
                    opcode: 'setText',
                    text: 'print text [TEXT]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            menu: 'FONT',
                            //defaultValue: 'Hello World'
                        }
                    }
                }
            ],
            menus: {
                FONT: {
                    items: 'getAllFonts',
                    acceptReporters: true
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
                }
            }
        };
    }

    getAllFonts() {
        let fonts = document.fonts.values()
        for (let font = fonts.next(); !font.done; font = fonts.next()) console.log(font)
    }
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
}

module.exports = text
