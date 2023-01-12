const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');

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
                    opcode: 'setSize',
                    text: 'set the text size to [size]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        size: {
                            type: ArgumentType.NUMBER,
                            menu: 28
                        }
                    }
                },
                {
                    opcode: 'displayText',
                    text: 'print text [TEXT] at X: [x], Y: [y]',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello World'
                        },
                        x: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
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
    }
    setHorizAlignment(args, util) {
    }
    setVertAlignment(args, util) {
    }
    setSize(args, util) {
        if (!document.fonts.check(args.size+'px '+this.font)) return
    }
}

module.exports = text
