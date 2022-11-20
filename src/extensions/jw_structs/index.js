const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

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
        this.structs = {};
        this.objects = {};
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        console.log("Getting info for the Structs extension!");
        return {
            id: 'jwStructs',
            name: 'Structs',
            color1: '#7ddcff',
            color2: '#4a98ff',
            blocks: [
                {
                    opcode: 'createStruct',
                    text: formatMessage({
                        id: 'jwStructs.blocks.createStruct',
                        default: 'create struct [NAME]',
                        description: 'Creates a struct.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                        }
                    }
                },
                {
                    opcode: 'createStructProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.createStructProperty',
                        default: 'property [NAME] in struct [STRUCT] with value [VALUE]',
                        description: 'Creates a property in a struct.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'property'
                        },
                        STRUCT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'struct'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'value'
                        }
                    }
                },
                {
                    opcode: 'newObject',
                    text: formatMessage({
                        id: 'jwStructs.blocks.newObject',
                        default: 'set [NAME] to new [STRUCT]',
                        description: 'Creates an object out of a struct.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "foo"
                        },
                        STRUCT: {
                            type: ArgumentType.STRING,
                            defaultValue: "bar"
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
                            defaultValue: "foo",
                        },
                        OBJECT: {
                            type: ArgumentType.STRING,
                            defaultValue: "bar",
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: "foobar"
                        }
                    }
                },
                {
                    opcode: 'returnObjectProperty',
                    text: formatMessage({
                        id: 'jwStructs.blocks.returnObjectProperty',
                        default: '[PROPERTY] of [OBJECT]',
                        description: 'Returns a property of an object.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        PROPERTY: {
                            type: ArgumentType.STRING,
                            defaultValue: "foo",
                        },
                        OBJECT: {
                            type: ArgumentType.STRING,
                            defaultValue: "bar",
                        }
                    }
                },
            ]
        };
    }

    createStruct(args, util) {
        let name = String(args.NAME);
        this.structs[name] = {};
    }
    createStructProperty(args, util) {
        let name = String(args.NAME);
        let value = String(args.VALUE);
        let struct = String(args.STRUCT);
        if (this.structs[struct] && !this.structs[struct][name]) {
            this.structs[struct][name] = value;
        }
    }
    newObject(args, util) {
        let name = String(args.NAME);
        let struct = String(args.STRUCT);
        if (this.structs[struct]) {    
            this.objects[name] = this.structs[struct];
        }
    }
    setObjectProperty(args, util) {
        let property = String(args.PROPERTY);
        let object = String(args.OBJECT);
        let value = String(args.VALUE);
        if (this.objects[object] && this.objects[object][property]) {
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