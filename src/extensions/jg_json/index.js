const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');

function _valuetoraw(value) {
    // is the value a valid json? if so convert to one else do nothing
    try {
        value = JSON.parse(value)
    } catch {
        // well its not a json so what is it?
        if (String(Number(value)) == value) {
            value = Number(value)
        } else if (value.toLowerCase() == 'true' || value.toLowerCase() == 'false') {
            value = value == 'true'
        } else if (value.toLowerCase() == 'undefined') {
            value = undefined
        } else if (value.toLowerCase() == 'null') {
            value = null
        }
    }

    return value;
}
function _rawtovalue(value) {
    try {
        value = JSON.stringify(value)
    } catch {
        value = String(value)
    }

    return value;
}

// const Cast = require('../../util/cast');

/**
 * Class for JSON blocks
 * @constructor
 */
class JgJSONBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgJSON',
            name: 'JSON',
            color1: '#0FBD8C',
            color2: '#0EAF82',
            blocks: [
                {
                    opcode: 'getValueFromJSON',
                    text: formatMessage({
                        id: 'jgJSON.blocks.getValueFromJSON',
                        default: 'get [VALUE] from [JSON]',
                        description: 'Gets a value from a JSON object.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.getValueFromJSON_value',
                                default: 'key',
                                description: 'The name of the item you want to get from the JSON.'
                            })
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: '{"key": "value"}'
                        }
                    }
                },
                {
                    opcode: 'setValueToKeyInJSON',
                    text: formatMessage({
                        id: 'jgJSON.blocks.setValueToKeyInJSON',
                        default: 'set [VALUE] to [KEY] in [JSON]',
                        description: 'Returns the JSON with the key set to the value.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_value',
                                default: 'value',
                                description: 'The value of the key you are setting.'
                            })
                        },
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_key',
                                default: 'key',
                                description: 'The key you are setting in the JSON.'
                            })
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        }
                    }
                },
                {
                    opcode: 'json_has',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        },
                        key: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_key',
                                default: 'key',
                                description: 'The key you are setting in the JSON.'
                            })
                        },
                    },
                    text: 'json [json] has key [key] ?'
                }, {
                    opcode: 'json_delete',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        },
                        key: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_key',
                                default: 'key',
                                description: 'The key you are setting in the JSON.'
                            })
                        },
                    },
                    text: 'in json [json] delete key [key]'
                }, {
                    opcode: 'json_values',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        },
                    },
                    text: 'get all values from json [json]'
                }, {
                    opcode: 'json_keys',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        },
                    },
                    text: 'get all keys from json [json]'
                }, {
                    opcode: 'json_array_length',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        }
                    },
                    text: 'length of array [array]'
                }, {
                    opcode: 'json_array_isempty',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        }
                    },
                    text: 'is array [array] empty?'
                }, {
                    opcode: 'json_array_contains',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        value: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_value',
                                default: 'value',
                                description: 'The value of the key you are setting.'
                            })
                        }
                    },
                    text: 'array [array] contains [value] ?'
                }, {
                    opcode: 'json_array_reverse',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        }
                    },
                    text: 'reverse array [array]'
                }, {
                    opcode: 'json_array_indexof',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        number: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        value: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_value',
                                default: 'value',
                                description: 'The value of the key you are setting.'
                            })
                        }
                    },
                    text: 'in array [array] get [number] index of [value]'
                }, {
                    opcode: 'json_array_set',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        index: {
                            type: ArgumentType.STRING,
                            defaultValue: 2
                        },
                        value: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_value',
                                default: 'value',
                                description: 'The value of the key you are setting.'
                            })
                        }
                    },
                    text: 'in array [array] set [index] to [value]'
                }, {
                    opcode: 'json_array_get',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    text: 'in array [array] get [index]'
                }, {
                    opcode: 'json_array_getrange',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        index1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                        index2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    },
                    text: 'in array [array] get all items from [index1] to [index2]'
                }, {
                    opcode: 'json_array_push',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        item: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgJSON.setValueToKeyInJSON_value',
                                default: 'value',
                                description: 'The value of the key you are setting.'
                            })
                        }
                    },
                    text: 'in array [array] add [item]'
                }, {
                    opcode: 'json_array_tolist',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        list: {
                            type: ArgumentType.STRING,
                            defaultValue: 'select a list',
                            menu: 'lists'
                        },
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        }
                    },
                    text: 'set contents of list [list] to contents of array [array]'
                }, {
                    opcode: 'json_array_listtoarray',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        list: {
                            type: ArgumentType.STRING,
                            defaultValue: 'select a list',
                            menu: 'lists'
                        }
                    },
                    text: 'get contents of list [list] as array'
                }
            ],
            menus: {
                lists: 'getAllLists'
            }
        };
    }

    getAllLists() {
        const variables = [
            ...Object.values(vm.runtime.getTargetForStage().variables),
            ...Object.values(vm.editingTarget.variables)
        ];
        const lists = variables.filter(i => i.type === 'list');
        if (lists.length === 0) {
            return [
                {
                    text: 'select a list',
                    value: 'select a list'
                }
            ];
        }
        return lists.map(i => ({
            text: i.name,
            value: JSON.stringify({
                id: i.id,
                name: i.name
            })
        }));
    }

    getValueFromJSON(args) {
        const key = args.VALUE;
        const json = args.JSON;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        return _rawtovalue(object[key]);
    }
    setValueToKeyInJSON(args) {
        const json = String(args.JSON);
        const key = args.KEY;
        const value = args.VALUE;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        object[key] = _valuetoraw(value)

        return JSON.stringify(object)
    }

    json_has(args, util) {
        const json = args.json;
        const key = args.key;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        return object.hasOwnProperty(key);
    }

    json_delete(args, util) {
        const json = args.json;
        const key = args.key;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        if (!object.hasOwnProperty(key)) return object

        delete object[key]

        return object;
    }

    json_values(args, util) {
        const json = args.json;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        return JSON.stringify(Object.keys(object));
    }

    json_keys(args, util) {
        const json = args.json;

        // is this json valid? if not create an empty one
        let object;
        try {
            object = JSON.parse(json)
        } catch {
            object = {}
        }

        return JSON.stringify(Object.values(object));
    }

    json_array_length(args, util) {
        const array = args.array;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return object.length;
    }

    json_array_isempty(args, util) {
        const array = args.array;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return !object.length;
    }

    json_array_contains(args, util) {
        const array = args.array;
        const value = args.value;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return object.includes(_valuetoraw(value));
    }

    json_array_reverse(args, util) {
        const array = args.array;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return JSON.stringify(object.reverse());
    }

    json_array_indexof(args, util) {
        const array = args.array;
        const number = args.number;
        const value = args.value;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return object.indexOf(_valuetoraw(value), number);
    }

    json_array_set(args, util) {
        const array = args.array;
        const index = args.index;
        const value = args.value;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        object[index] = _valuetoraw(value)

        return JSON.stringify(object);
    }

    json_array_get(args, util) {
        const array = args.array;
        const index = args.index;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return _rawtovalue(object[index]);
    }

    json_array_getrange(args, util) {
        const array = args.array;
        const index1 = args.index1;
        const index2 = args.index2;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        return JSON.stringify(object.slice(index1, index2));
    }

    json_array_push(args, util) {
        const array = args.array;
        const value = args.item;

        // is this json valid? if not create an empty one
        let object;
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }

        object.push(_valuetoraw(value))

        return JSON.stringify(object);
    }

    json_array_tolist(args, util) {
        const list = JSON.parse(args.list);
        const array = args.array;
        const content = util.target.lookupOrCreateList(list.id, list.name)

        // is this json valid? if not create an empty one
        let object
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            object = JSON.parse(array)
        } catch {
            object = []
        }
        content.value = object.map(x => {
            return _rawtovalue(x)
        })
    }

    json_array_listtoarray(args, util) {
        const list = JSON.parse(args.list);
        const content = util.target.lookupOrCreateList(list.id, list.name).value

        content.map(x => {
            return _valuetoraw(x)
        })

        return JSON.stringify(content);
    }
}

module.exports = JgJSONBlocks;
