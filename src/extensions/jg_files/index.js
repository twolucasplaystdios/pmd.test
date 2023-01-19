const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');
const { validateArray } = require('../../util/json-block-utilities')

/**
 * Class for File blocks
 * @constructor
 */
class JgFilesBlocks {
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
            id: 'jgFiles',
            name: 'Files',
            color1: '#ffbb00',
            color2: '#ffaa00',
            // docsURI: 'https://docs.turbowarp.org/blocks',
            blocks: [
                {
                    opcode: 'isFileReaderSupported',
                    text: formatMessage({
                        id: 'jgFiles.blocks.canFilesBeUsed',
                        default: 'can files be used?',
                        description: 'Block that returns whether the user\'s machine allows for Scratch to read their files'
                    }),
                    disableMonitor: false,
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'askUserForFileOfType',
                    text: formatMessage({
                        id: 'jgFiles.blocks.askUserForFileOfType',
                        default: 'ask user for a file of type [FILE_TYPE]',
                        description: 'Block that returns the contents of a file the user provides. The file picker will only allow the file types specified. The block will return no text if it was rejected.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    arguments: {
                        FILE_TYPE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgFiles.file_type_accept_area',
                                default: 'txt savefile',
                                description: 'Default file types accepted for the file picker on the ask user for file block'
                            })
                        }
                    }
                },
                {
                    opcode: 'fileSaveAs',
                    text: formatMessage({
                        id: 'jgFiles.blocks.fileSaveAs',
                        default: 'save [FILE_CONTENT] as file with suggested name [FILE_NAME]',
                        description: 'Block that downloads a file. The content is what the file has inside, and the file name is what the file will save as on the user\'s computer.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FILE_CONTENT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgFiles.file_content_name_area',
                                default: 'Hello!',
                                description: 'Default text for the file\'s content'
                            })
                        },
                        FILE_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgFiles.file_name_name_area',
                                default: 'World.txt',
                                description: 'Default text for the file\'s name'
                            })
                        }
                    },
                {
                    opcode: 'downloadFile',
                    text: formatMessage({
                        id: 'jgFiles.blocks.downloadFile',
                        default: 'download content [FILE_CONTENT] as file name [FILE_NAME]',
                        description: 'Block that downloads a file. The content is what the file has inside, and the file name is what the file will save as on the user\'s computer.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        FILE_CONTENT: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgFiles.file_content_name_area',
                                default: 'Hello!',
                                description: 'Default text for the file\'s content'
                            })
                        },
                        FILE_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'jgFiles.file_name_name_area',
                                default: 'text.txt',
                                description: 'Default text for the file\'s name'
                            })
                        }
                    }
                    }
                }
            ]
        };
    }

    isFileReaderSupported(/*args, util*/) {
        return (window.FileReader != null) && (window.document != null);
    }

    __askUserForFile(acceptTypes) {
        return new Promise((resolve, _) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(JSON.stringify(e.target.result));
            }
            const input = document.createElement("input");
            input.type = "file";
            if (acceptTypes != null) {
                input.accept = acceptTypes
            }
            input.style.display = "none";
            document.body.append(input);
            input.onchange = () => {
                const file = input.files[0];
                if (!file) {
                    resolve("[]");
                    return;
                } else {
                    fileReader.readAsArrayBuffer(file)
                }
                input.remove();
            }
            input.onblur = () => {
                input.onchange();
            }
            input.focus();
            input.click();
        })
    }

    askUserForFileOfType(args, util) {
        const fileTypesAllowed = [];
        const input = String(args.FILE_TYPE).toLowerCase().replace(/.,/gmi, "");
        if (input == "any")
            return this.__askUserForFile(null);
        input.split(" ").forEach(type => {
            fileTypesAllowed.push("." + type);
        })
        return this.__askUserForFile(fileTypesAllowed.join(","));
    }
    fileSaveAs(args,util) {
        var myArray = args.FILE_NAME.split('.').length - 1;;
        var myArray = args.FILE_NAME.split('.')[myArray]
        const handle = await showSaveFilePicker({
        suggestedName: `${args.FILE_NAME}`,
        types: [{
            description: 'file',
            accept: {'text/plain': [`.${myArray}`]},
        }],
        });

        const blob = new Blob([args.FILE_CONTENT]);

        const writableStream = await handle.createWritable();
        await writableStream.write(blob);
        await writableStream.close();
    }

    downloadFile(args, util) {
        let content = "";
        let fileName = "text.txt";

        content = String(args.FILE_CONTENT) || content;
        fileName = String(args.FILE_NAME) || fileName;

        const array = validateArray(args.FILE_CONTENT)
        if (array.length > 0 && typeof array[0] == 'number') {
            content = array
            fileName = (fileName == 'text.txt' ? 'raw.bin' : fileName)
        }

        const blob = new Blob([content]);
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.append(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}

module.exports = JgFilesBlocks;
