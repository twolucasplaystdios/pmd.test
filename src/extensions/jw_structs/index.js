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
        this.menus = {
            structsMenu: {},
            objects: {}
        }
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
                    opcode: 'createStructProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.createStructProperty',
                        default: 'create property [PROP_NAME] and add it to stuct [STRUCT_NAME] with a default value [VALUE]',
                        description: 'Creates a structs property with a default value.'
                    }),
                    arguments: {
                        PROP_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        STRUCT_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                            menu: 'structsMenu'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    },
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                },
                {
                    opcode: 'createObject',
                    text: formatMessage({
                        id: 'jwStructs.blocks.createObject',
                        default: 'create object [NAME] from struct [STRUCT_NAME]',
                        description: 'Creates an object from a struct.'
                    }),
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        STRUCT_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                            menu: 'structsMenu'
                        }
                    },
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                },
                {
                    opcode: 'setObjectProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.setObjectProperty',
                        default: 'set property [PROP_NAME] of object [OBJECT_NAME] to [VALUE]',
                        description: 'Sets the value of an object property.'
                    }),
                    arguments: {
                        PROP_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        OBJECT_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                            menu: 'objects'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    },
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                },
                {
                    opcode: 'getObjectProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.getObjectProperty',
                        default: 'get property [PROP_NAME] of object [OBJECT_NAME]',
                        description: 'Gets the value of an object property.'
                    }),
                    arguments: {
                        PROP_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        OBJECT_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "",
                            menu: 'objects'
                        }
                    },
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                }

            ],
            menus: this.menus
        };
    }

    createStruct(args,util) {
        if (args.NAME == "default") {
            return;
        }
        if (this.menus.structsMenu.default[args.NAME] != undefined) {
            return;
        }
        this.menus.structsMenu[args.NAME] = args.NAME;
    }
    createStructProperty(args,util) {
        if (this.menus.structsMenu[args.STRUCT_NAME] == undefined) {
            this.menus.structsMenu[args.STRUCT_NAME] = {};
        }
        this.menus.structsMenu[args.STRUCT_NAME][args.PROP_NAME] = args.VALUE;
    }
    createObject(args,util) {
        if (this.menus.objects[args.NAME] != undefined) {
            return;
        }
        this.menus.objects[args.NAME] = this.menus.structsMenu[args.STRUCT_NAME];
    }
    setObjectProperty(args,util) {
        this.menus.objects[args.OBJECT_NAME][args.PROP_NAME] = args.VALUE;
    }
    getObjectProperty(args,util) {
        return this.menus.objects[args.OBJECT_NAME][args.PROP_NAME];
    }
}

module.exports = jwStructs;