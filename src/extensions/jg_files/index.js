const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');

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
            id: 'jgFiles,
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
                    opcode: 'askUserForFile',
                    text: formatMessage({
                        id: 'jgFiles.blocks.askUserForFile',
                        default: 'ask user for a file',
                        description: 'Block that returns the contents of a file the user provides. The block will return no text if it was rejected.'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
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
                                default: 'any',
                                description: 'Default file types accepted for the file picker on the ask user for file block'
                            })
                        }
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
            ]
            // menus: {
            // mouseButton: {
            // items: [
            // {
            // text: formatMessage({
            // id: 'tw.blocks.mouseButton.primary',
            // default: '(0) primary',
            // description: 'Dropdown item to select primary (usually left) mouse button'
            // }),
            // value: '0'
            // },
            // {
            // text: formatMessage({
            // id: 'tw.blocks.mouseButton.middle',
            // default: '(1) middle',
            // description: 'Dropdown item to select middle mouse button'
            // }),
            // value: '1'
            // },
            // {
            // text: formatMessage({
            // id: 'tw.blocks.mouseButton.secondary',
            // default: '(2) secondary',
            // description: 'Dropdown item to select secondary (usually right) mouse button'
            // }),
            // value: '2'
            // }
            // ],
            // acceptReporters: true
            // }
            // }
        };
    }

    isFileReaderSupported(/*args, util*/) {
        return (window.FileReader != null) && (window.document != null);
    }

    __askUserForFile(acceptTypes) {
        return new Promise((resolve, _) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(e.target.result);
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
                    resolve("");
                    return;
                } else {
                    fileReader.readAsText(file);
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

    askUserForFile(args, util) {
        return this.__askUserForFile(null);
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

    downloadFile(args, util) {
        let content = "";
        let fileName = "text.txt";

        content = String(args.FILE_CONTENT);
        fileName = String(args.FILE_NAME);

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
