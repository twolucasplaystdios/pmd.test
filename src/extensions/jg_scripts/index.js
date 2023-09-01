const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class for Script blocks
 * @constructor
 */
class JgScriptsBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        this.scripts = {};

        // register compiled blocks
        this.runtime.registerCompiledExtensionBlocks('jgScripts', this.getCompileInfo());
    }

    getExtension_() {
        return `runtime.ext_jgScripts`;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgScripts',
            name: 'Scripts',
            color1: '#8c8c8c',
            color2: '#7a7a7a',
            blocks: [
                {
                    opcode: 'createScript',
                    text: formatMessage({
                        id: 'jgScripts.blocks.createScript',
                        default: 'create script named [NAME]',
                        description: "Block that creates a blank script with the specified name."
                    }),
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "Script1"
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'deleteScript',
                    text: formatMessage({
                        id: 'jgScripts.blocks.deleteScript',
                        default: 'delete script named [NAME]',
                        description: "Block that deletes a script with the specified name."
                    }),
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "Script1"
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'scriptExists',
                    text: formatMessage({
                        id: 'jgScripts.blocks.scriptExists',
                        default: 'script named [NAME] exists?',
                        description: "Block that checks whether a script with the specified name exists."
                    }),
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "Script1"
                        }
                    },
                    blockType: BlockType.BOOLEAN
                },
                '---',
                {
                    opcode: 'addBlocksTo',
                    text: [
                        formatMessage({
                            id: 'jgScripts.blocks.addBlocksTo1',
                            default: 'add blocks',
                            description: "Block that sets a script to the inserted blocks."
                        }),
                        formatMessage({
                            id: 'jgScripts.blocks.addBlocksTo2',
                            default: 'to script [NAME]',
                            description: "Block that sets a script to the inserted blocks."
                        }),
                    ],
                    branchCount: 1,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "Script1"
                        }
                    },
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'runBlocks',
                    text: formatMessage({
                        id: 'jgScripts.blocks.runBlocks',
                        default: 'run script [NAME]',
                        description: "Block that runs a script."
                    }),
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "Script1"
                        }
                    },
                    blockType: BlockType.COMMAND
                },
            ]
        };
    }
    /**
     * This function is used for any compiled blocks in the extension if they exist.
     * Data in this function is given to the IR & JS generators.
     * Data must be valid otherwise errors may occur.
     * @returns {object} functions that create data for compiled blocks.
     */
    getCompileInfo() {
        return {
            ir: {
                createScript: (generator, block) => ({
                    kind: 'stack',
                    name: generator.descendInputOfBlock(block, 'NAME'),
                }),
                deleteScript: (generator, block) => ({
                    kind: 'stack',
                    name: generator.descendInputOfBlock(block, 'NAME'),
                }),
                scriptExists: (generator, block) => ({
                    kind: 'input',
                    name: generator.descendInputOfBlock(block, 'NAME'),
                }),
                addBlocksTo: (generator, block) => ({
                    kind: 'stack',
                    name: generator.descendInputOfBlock(block, 'NAME'),
                    blocks: generator.descendSubstack(block, 'SUBSTACK'),
                }),
                // TODO: this block should cause the script to always recompile
                runBlocks: (generator, block) => ({
                    kind: 'stack',
                    name: generator.descendInputOfBlock(block, 'NAME'),
                }),
            },
            js: {
                createScript: (node, compiler, imports) => {
                    const name = compiler.descendInput(node.name).asString();
                    compiler.source += `${this.getExtension_()}.scripts[${name}] = [];\n`;
                },
                deleteScript: (node, compiler, imports) => {
                    const name = compiler.descendInput(node.name).asString();
                    compiler.source += `delete ${this.getExtension_()}.scripts[${name}];\n`;
                },
                scriptExists: (node, compiler, imports) => {
                    const name = compiler.descendInput(node.name).asString();
                    return new imports.TypedInput(`(${name} in ${this.getExtension_()}.scripts)`, imports.TYPE_BOOLEAN);
                },
                addBlocksTo: (node, compiler, imports) => {
                    const name = compiler.descendInput(node.name).asString();
                    const blocks = JSON.stringify(node.blocks); // dont compile, save the node

                    const scriptObject = `${this.getExtension_()}.scripts[${name}]`;
                    compiler.source += `if (${scriptObject}) {\n`;
                    compiler.source += `${scriptObject} = [].concat(${scriptObject}, ${blocks});\n`;
                    compiler.source += `}\n`;
                },
                // TODO: this block should cause the script to always recompile
                runBlocks: (node, compiler, imports) => {
                    const name = compiler.descendInput(node.name).asString();
                    const realName = eval(name); // do we really need to use eval for this?
                    const realScriptObject = this.scripts[realName];
                    if (realScriptObject) {
                        compiler.source += `{\n`; // new grouping
                        compiler.descendStack(realScriptObject, new imports.Frame(false));
                        compiler.source += `}\n`;
                    }
                },
            }
        }
    }

    createScript() {
        return; // no-op, extension doesn't work fully in interpreter.
    }
    deleteScript() {
        return; // no-op, extension doesn't work fully in interpreter.
    }
    scriptExists() {
        return; // no-op, extension doesn't work fully in interpreter.
    }
    addBlocksTo() {
        return; // no-op, extension doesn't work fully in interpreter.
    }
}

module.exports = JgScriptsBlocks;
