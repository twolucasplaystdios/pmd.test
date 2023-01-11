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
        this.alignment = ['center', 'center']
        this.font = 'Arial'
        this.size = '28px'
    }
    getInfo () {
        return {
            id: 'text',
            name: 'Better Text Engine',
            blocks: [
                {
                    opcode: 'setFont',
                    text: 'set font to [font]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        font: {
                            type: ArgumentType.STRING,
                            menu: 'FONT',
                            defaultValue: 'Arial'
                        }
                    }
                },
                {
                    opcode: 'setHorizAlignment',
                    text: 'set the horizontal alignment to [align]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        align: {
                            type: ArgumentType.STRING,
                            menu: 'ALIGNHORIZ'
                        }
                    }
                },
                {
                    opcode: 'setVertAlignment',
                    text: 'set the vertical alignment to [align]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        align: {
                            type: ArgumentType.STRING,
                            menu: 'ALIGNVERT'
                        }
                    }
                },
                {
                    opcode: 'displayText',
                    text: 'print text [TEXT]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello World'
                        }
                    }
                }
            ],
            menus: {
                FONT: {
                    items: 'getAllFonts',
                    acceptReporters: true
                },
                ALIGNVERT: {
                    items: [
                        {
                            text: 'up',
                            value: 'up'
                        }, 
                        {
                            text: 'center',
                            value: 'center'
                        }, 
                        {
                            text: 'down',
                            value: 'down'
                        }
                    ]
                },
                ALIGNHORIZ: {
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
        if (!document.fonts.check(this.size+' '+args.font)) return
        this.font = args.font
    }
    setHorizAlignment(args, util) {
        this.alignment[0] = args.align
    }
    setVertAlignment(args, util) {
        this.alignment[1] = args.align
    }
    displayText(args, util) {
        console.log(this.font, this.alignment, args)
    }
}

module.exports = text
