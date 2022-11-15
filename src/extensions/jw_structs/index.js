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
        console.log("Welcome to the Structs extension!");
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.structs = {"None": {}};
        this.objects = {"None": {}};
        this.cur_object = null;
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
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'addStructProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.addStructProperty',
                        default: 'Add Property [NAME] to Struct [STRUCT] with a default value of [VALUE]',
                        description: 'Adds a property to a struct.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        STRUCT: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                            menu: structs,
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'createObject',
                    text: formatMessage({
                        id: 'jwStructs.blocks.createObject',
                        default: 'Create Object named [NAME] of Struct [STRUCT]',
                        description: 'Creates an object of a struct.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        STRUCT: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'setObjectProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.setObjectProperty',
                        default: 'Set [PROPERTY] of [OBJECT] to [VALUE]',
                        description: 'Sets a property of an object.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PROPERTY: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                        },
                        OBJECT: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'returnObjectProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.returnObjectProperty',
                        default: 'Return [PROPERTY] of [OBJECT]',
                        description: 'Returns a property of an object.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PROPERTY: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                        },
                        OBJECT: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                        }
                    }
                },
            ],
            menus: {
                structs: 'getStructs',
                objects: 'getObjects'
            }
        };
    }

    getStructs() {
        return Object.keys(this.structs);
    }

    getObjects() {
        return Object.keys(this.objects);
    }

    createStruct(args, util) {
        let name = String(args.NAME);
        if (!this.structs[name]) {
            this.structs[name] = {};
        }
    }
    addStructProperty(args, util) {
        let name = String(args.NAME);
        let struct = String(args.STRUCT);
        let value = String(args.VALUE);
        if (this.structs[struct]) {
            this.structs[struct][name] = value;
        }
    }
    createObject(args, util) {
        let name = String(args.NAME);
        let struct = String(args.STRUCT);
        if (this.structs[struct]) {
            this.objects[name] = JSON.parse(JSON.stringify(this.structs[struct]));
            this.cur_object = name;
        }
    }
    setObjectProperty(args, util) {
        let property = String(args.PROPERTY);
        let object = String(args.OBJECT);
        let value = String(args.VALUE);
        if (this.objects[object]) {
            this.objects[object][property] = value;
        }
    }
    returnObjectProperty(args, util) {
        let property = String(args.PROPERTY);
        let object = String(args.OBJECT);
        if (this.objects[object]) {
            return this.objects[object][property];
        }
    }
}

module.exports = jwStructs;