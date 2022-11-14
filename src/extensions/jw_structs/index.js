const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

const blockIconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAP+xNQDiGgCU/wAAAJEQGGoAAAAFdFJOU/////8A+7YOUwAAAAlwSFlzAAAOwwAADsMBx2+oZAAABA5JREFUeF7t0EtuW0EUA9F8vP81Z8JRAwzbLuk5COoMBb1LdP34EGJAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEHos4M+HZfbtDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0KPBfxfGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEZsBfh/z8z/r9SfnsywwIGRAyIGRAyICQASEDQp8OeMrfvk06vEzOXjPgIWevGfCQs9cMeMjZawY85Ow1Ax5y9poBDzl7zYCHnL2GA57y2dvlvW+TmcmARWYmAxaZmQxYZGYyYJGZyYBFZiYDFpmZDFhkZnp5wFPOvFze+TaZmQxYZGYyYJGZyYBFZiYDFpmZDFhkZjJgkZnJgEVmprcHPOXsl+V9j8lsZcAhs5UBh8xWBhwyWxlwyGxlwCGzlQGHzFYGHDJbPR7wlJlreddjMlsZcMhsZcAhs5UBh8xWBhwyWxlwyGxlwCGzlQGHzFbfHvCU2SrvekxmKwMOma0MOGS2MuCQ2cqAQ2YrAw6ZrQw4ZLYy4JDZyoBDZisDDpmtDDhktjLgkNnKgENmKwMOma0MOGS2MuCQ2erbA2bmWt71mMxWBhwyWxlwyGxlwCGzlQGHzFYGHDJbGXDIbGXAIbPV4wFz9svyrsdktjLgkNnKgENmKwMOma0MOGS2MuCQ2cqAQ2YrAw6Zrd4eMGdeLu97m8xMBiwyMxmwyMxkwCIzkwGLzEwGLDIzGbDIzGTAIjPTywPms7fLO98mM5MBi8xMBiwyMxmwyMxkwCIzkwGLzEwGLDIzGbDIzIQD5m/fJu99mZy9ZsBDzl4z4CFnrxnwkLPXDHjI2WsGPOTsNQMecvaaAQ85e+3TAfPzPysdruWzLzMgZEDIgJABIQNCBoQMCM2A+jsDQgaEDAgZEDIgZEDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgZEDIgZEDIgMjHxx+IPExM0h8siAAAAABJRU5ErkJggg=="

/**
 * Class for Structs
 * @constructor
 */
class jwStructs {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.structs = {};
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jwStructs',
            name: 'Structs',
            blockIconURI: blockIconURI,
            color1: '#7ddcff',
            color2: '#4a98ff',
            blocks: [
                {
                    opcode: 'createStruct',
                    text: formatMessage({
                        id: 'jwStructs.blocks.createStruct',
                        default: 'Create Struct [NAME]',
                        description: 'Creates a struct.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "hi!"
                        }
                    }
                },
                {
                    opcode: 'returnProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.returnProperty',
                        default: 'return property, [PROP_NAME], from struct [STRUCT_NAME]',
                        description: 'Gets a property from a struct.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PROP_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "hi!"
                        },
                        STRUCT_NAME: {
                            type: ArgumentType.STRING,
                        }
                    }
                },
                {
                    opcode: 'setStructProperty',
                    text: formatMessage({
                        id: 'jwUnite.blocks.setStructProperty',
                        default: 'set property [PROP_NAME], of stuct [STRUCT_NAME], to [VALUE]',
                        description: 'Sets a struct property to a value.'
                    }),
                    arguments: {
                        PROP_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "hi!",
                        },
                        STRUCT_NAME: {
                            type: ArgumentType.STRING
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello!"
                        }
                    },
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                },
            ]
        };
    }

    createStruct(args, util) {
        let name = String(args.NAME);
        if (!this.structs[name]) {
            this.structs[name] = {};
        }
    }
    returnProperty(args, util) {
        let prop_name = String(args.PROP_NAME);
        let struct_name = String(args.STRUCT_NAME);
        if (this.structs.hasOwnProperty(struct_name)) {
            let struct = this.structs[struct_name];
            if (struct.hasOwnProperty(prop_name)) {
                console.log("GOT THIS FAR, HERES THE STRUCT: " + struct);
                return struct[prop_name];
            }
        }
        return 'undefined';
    }
    setStructProperty(args, util) {
        let prop_name = String(args.PROP_NAME);
        let struct_name = String(args.STRUCT_NAME);
        let value = String(args.VALUE);
        this.structs[struct_name][prop_name] = value;
    }
}

module.exports = jwStructs;