const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');

function _valuetoraw(value) {
    // is the value a valid json? if so convert to one else do nothing
    try {
        if (!(value.startsWith('{') || value.startsWith('['))) throw new error('not actualy a json!!!!!!!!!!')
        value = JSON.parse(value)
    } catch {
        // well its not a json so what is it?
        if (String(Number(value)) == value) {
            value = Number(value)
        } else if (value.toLowerCase() == 'true') {
            value = true
        } else if (value.toLowerCase() == 'false') {
            value = false
        } else if (value == 'undefined') {
            value = undefined
        } else if (value == 'null') {
            value = null
        }
    }

    return value;
}
function _rawtovalue(value) {
    if (typeof value == 'object') {
        value = JSON.stringify(value)
    } else {
        value = String(value)
    }

    return value;
}
function _validatejson(json) {
    try {
        json = JSON.parse(json)
    } catch {
        json = {}
    }

    return json
}
function _validatejsonarray(array) {
    try {
        if (!array.startsWith('[')) throw new error('error lol')
        array = JSON.parse(array)
    } catch {
        array = []
    }

    return array
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
                        default: 'set [KEY] to [VALUE] in [JSON]',
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
                }, 
                {
                    opcode: 'json_values',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        },
                    },
                    text: 'get all values from json [json]'
                }, 
                {
                    opcode: 'json_keys',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        },
                    },
                    text: 'get all keys from json [json]'
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
                },
                "---Arrays",
                {
                    opcode: 'json_array_split',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        text: {
                            type: ArgumentType.STRING,
                            defaultValue: "A, B, C"
                        },
                        delimeter: {
                            type: ArgumentType.STRING,
                            defaultValue: ', '
                        }
                    },
                    text: 'create an array from text [text] with delimeter [delimeter]'
                }, 
                {
                    opcode: 'json_array_join',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        delimeter: {
                            type: ArgumentType.STRING,
                            defaultValue: ', '
                        }
                    },
                    text: 'create text from array [array] with delimeter [delimeter]'
                }, 
                "---",
                {
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
                }, 
                "---",
                {
                    opcode: 'json_array_delete',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        index: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2
                        },
                    },
                    text: 'in array [array] delete [index]'
                },
                {
                    opcode: 'json_array_reverse',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        }
                    },
                    text: 'reverse array [array]'
                }, 
                {
                    opcode: 'json_array_insert',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        index: {
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
                    text: 'in array [array] insert [value] at [index]'
                },
                {
                    opcode: 'json_array_set',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        },
                        index: {
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
                    text: 'in array [array] set [index] to [value]'
                },  
                "---",
                {
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
                }, 
                {
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
                }, 
                {
                    opcode: 'json_array_length',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        }
                    },
                    text: 'length of array [array]'
                }, 
                {
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
                }, 
                "---",
                {
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
                }, 
                "---",
                {
                    opcode: 'json_array_isempty',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[\"A\", \"B\", \"C\"]"
                        }
                    },
                    text: 'is array [array] empty?'
                }, 
                "---",
                {
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
                },
                {
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
                }
            ],
            menus: {
                lists: 'getAllLists'
            }
        };
    }

    getAllLists() {
        const variables = [].concat(
            Object.values(vm.runtime.getTargetForStage().variables),
            Object.values(vm.editingTarget.variables)
        );
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
        const json = _validatejson(args.JSON);

        return _rawtovalue(json[key]);
    }
    setValueToKeyInJSON(args) {
        let json = _validatejson(args.JSON);
        const key = args.KEY;
        const value = args.VALUE;

        json[key] = _valuetoraw(value)

        return JSON.stringify(json)
    }

    json_has(args, util) {
        const json = _validatejson(args.json);
        const key = args.key;

        return json.hasOwnProperty(key);
    }

    json_delete(args, util) {
        let json = _validatejson(args.json);
        const key = args.key;

        if (!json.hasOwnProperty(key)) return json

        delete json[key]

        return json;
    }

    json_values(args, util) {
        const json = _validatejson(args.json);

        return JSON.stringify(Object.keys(json));
    }

    json_keys(args, util) {
        const json = _validatejson(args.json);

        return JSON.stringify(Object.values(json));
    }

    json_array_length(args, util) {
        const array = _validatejsonarray(args.array);

        return array.length;
    }

    json_array_isempty(args, util) {
        const array = _validatejsonarray(args.array);

        return !array.length;
    }

    json_array_contains(args, util) {
        const array = _validatejsonarray(args.array);
        const value = args.value;

        return array.includes(_valuetoraw(value));
    }

    json_array_reverse(args, util) {
        let array = _validatejsonarray(args.array);

        return JSON.stringify(array.reverse());
    }

    json_array_indexof(args, util) {
        const array = _validatejsonarray(args.array);
        const number = args.number;
        const value = args.value;

        return array.indexOf(_valuetoraw(value), number);
    }

    json_array_set(args, util) {
        let array = _validatejsonarray(args.array);
        const index = args.index;
        const value = args.value;

        array[index] = _valuetoraw(value)

        return JSON.stringify(array);
    }

    json_array_insert(args, util) {
        let array = _validatejsonarray(args.array);
        const index = args.index;
        const value = args.value;

        array.splice(index, 0, _valuetoraw(value))

        return JSON.stringify(array);
    }

    json_array_get(args, util) {
        const array = _validatejsonarray(args.array);
        const index = args.index;

        return _rawtovalue(array[index]);
    }

    json_array_getrange(args, util) {
        let array = _validatejsonarray(args.array);
        const index1 = args.index1;
        const index2 = args.index2;

        return JSON.stringify(array.slice(index1, index2));
    }

    json_array_push(args, util) {
        let array = _validatejsonarray(args.array);
        const value = args.item;

        array.push(_valuetoraw(value))

        return JSON.stringify(array);
    }

    json_array_tolist(args, util) {
        let list;
        try {
            list = JSON.parse(args.list);
        } catch {
            return
        }
        const array = _validatejsonarray(args.array);
        const content = util.target.lookupOrCreateList(list.id, list.name)

        content.value = array.map(x => {
            return _rawtovalue(x)
        })
    }

    json_array_listtoarray(args, util) {
        let list;
        try {
            list = JSON.parse(args.list);
        } catch {
            return
        }
        const content = util.target.lookupOrCreateList(list.id, list.name).value

        return JSON.stringify(content.map(x => {
            return _valuetoraw(x)
        }));
    }

    json_array_delete(args, util) {
        let array = _validatejsonarray(args.array)
        const index = args.index

        delete array[index]

        return JSON.stringify(array)
    }

    json_array_split(args) {
        return JSON.stringify(args.text.split(args.delimeter))
    }
    json_array_join(args) {
        return _validatejsonarray(args.array).join(args.delimeter)
    }
}

module.exports = JgJSONBlocks;
