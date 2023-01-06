const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const { 
    validateJSON, 
    validateArray, 
    stringToEqivalint, 
    valueToString,
    validateRegex 
} = require('../../util/json-block-utilities')

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
                    opcode: 'json_validate',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        }
                    },
                    text: 'is json [json] valid?'
                }, 
                "---",
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
                {
<<<<<<< HEAD
                    blockType: BlockType.LABEL,
                    text: "Arrays"
                },
                {
=======
>>>>>>> parent of 42990e22 (Update index.js)
                    opcode: 'json_array_validate',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        array: {
                            type: ArgumentType.STRING,
                            defaultValue: "[]"
                        }
                    },
                    text: 'is array [array] valid?'
                }, 
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
        console.log('your fat')
        const key = args.VALUE;
        const json = validateJSON(args.JSON).object;

        return valueToString(json[key]);
    }
    setValueToKeyInJSON(args) {
        let json = validateJSON(args.JSON).object;
        const key = args.KEY;
        const value = args.VALUE;

        json[key] = stringToEqivalint(value)

        return JSON.stringify(json)
    }

    json_has(args, util) {
        const json = validateJSON(args.json).object;
        const key = args.key;

        return json.hasOwnProperty(key);
    }

    json_delete(args, util) {
        let json = validateJSON(args.json).object;
        const key = args.key;

        if (!json.hasOwnProperty(key)) return json

        delete json[key]

        return JSON.stringify(json);
    }

    json_values(args, util) {
        const json = validateJSON(args.json).object;

        return JSON.stringify(Object.values(json));
    }

    json_keys(args, util) {
        const json = validateJSON(args.json).object;

        return JSON.stringify(Object.keys(json));
    }

    json_array_length(args, util) {
        const array = validateArray(args.array).array;

        return array.length;
    }

    json_array_isempty(args, util) {
        const array = validateArray(args.array).array;

        return !array.length;
    }

    json_array_contains(args, util) {
        const array = validateArray(args.array).array;
        const value = args.value;

        return array.includes(stringToEqivalint(value));
    }

    json_array_reverse(args, util) {
        let array = validateArray(args.array).array;

        return JSON.stringify(array.reverse());
    }

    json_array_indexof(args, util) {
        const array = validateArray(args.array).array;
        const number = args.number;
        const value = args.value;

        return array.indexOf(stringToEqivalint(value), number);
    }

    json_array_set(args, util) {
        let array = validateArray(args.array).array;
        const index = args.index;
        const value = args.value;

        array[index] = stringToEqivalint(value)

        return JSON.stringify(array);
    }

    json_array_insert(args, util) {
        let array = validateArray(args.array).array;
        const index = args.index;
        const value = args.value;

        array.splice(index, 0, stringToEqivalint(value))

        return JSON.stringify(array);
    }

    json_array_get(args, util) {
        const array = validateArray(args.array).array;
        const index = args.index;

        return valueToString(array[index]);
    }

    json_array_getrange(args, util) {
        let array = validateArray(args.array).array;
        const index1 = args.index1;
        const index2 = args.index2;

        return JSON.stringify(array.slice(index1, index2));
    }

    json_array_push(args, util) {
        let array = validateArray(args.array).array;
        const value = args.item;

        array.push(stringToEqivalint(value))

        return JSON.stringify(array);
    }

    json_array_tolist(args, util) {
        let list;
        try {
            list = JSON.parse(args.list);
        } catch {
            return
        }
        const array = validateArray(args.array).array;
        const content = util.target.lookupOrCreateList(list.id, list.name)

        content.value = array.map(x => {
            return valueToString(x)
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
            return stringToEqivalint(x)
        }));
    }

    json_array_delete(args, util) {
        let array = validateArray(args.array).array
        const index = args.index

        delete array[index]

        return JSON.stringify(array.filter(x => Boolean(x)))
    }

    json_array_split(args) {
        if (validateRegex(args.delimeter)) args.delimeter = new RegExp(args.delimeter)
        return JSON.stringify(args.text.split(args.delimeter))
    }
    json_array_join(args) {
        return validateArray(args.array).array.join(args.delimeter)
    }

    json_validate(args) {
        return validateJSON(args.json).isValid
    }
    json_array_validate(args) {
        return validateArray(args.array).isValid
    }
}

module.exports = JgJSONBlocks;
