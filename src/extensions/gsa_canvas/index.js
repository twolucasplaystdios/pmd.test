const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const cstore = require('./canvasStorage');
const store = new cstore();

/**
 * Class
 * @constructor
 */
class canvas {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
        store.attachRuntime(runtime);
    }

    readAsImageElement (src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = function () {
                resolve(image);
                image.onload = null;
                image.onerror = null;
            };
            image.onerror = function () {
                reject(new Error('Costume load failed. Asset could not be read.'));
                image.onload = null;
                image.onerror = null;
            };
            image.src = src;
        });
    }

    spawnCreateCanvasMenu (name) {
        const modal = document.createElement('div');
        modal.id = 'new-canvas-modal';
        modal.innerHTML = `
        <div 
            class="ReactModal__Content ReactModal__Content--after-open modal_modal-content_1h3ll prompt_modal-content_1BfWj" 
            tabindex="-1" 
            role="dialog" 
            aria-label="New Variable"
        >
            <div class="box_box_2jjDp" dir="ltr" style="flex-direction: column; flex-grow: 1;">
                <div class="modal_header_1h7ps">
                    <div class="modal_header-item_2zQTd modal_header-item-title_tLOU5">New Canvas</div>
                    <div class="modal_header-item_2zQTd modal_header-item-close_2XDeL">
                        <div 
                            aria-label="Close" 
                            class="close-button_close-button_lOp2G close-button_large_2oadS" 
                            role="button" 
                            tabindex="0"
                        >
                            <img 
                                id="canvas-creator-close" 
                                class="close-button_close-icon_HBCuO" 
                                src="static/assets/cb666b99d3528f91b52f985dfb102afa.svg"
                            />
                        </div>
                    </div>
                </div>
                <div class="prompt_body_18Z-I box_box_2jjDp">
                    <div class="prompt_label_tWjYZ box_box_2jjDp">New canvas name:</div>
                    <div class="box_box_2jjDp">
                        <input 
                            id="canvas-creator-name" 
                            class="prompt_variable-name-text-input_1iu8-" 
                            name="New canvas name:" 
                            value="${name ? name : 'My Canvas'}"
                        />
                        <input id="canvas-creator-default" name="Default canvas content"/>
                    </div>
                    <div class="prompt_button-row_3Wc5Z box_box_2jjDp">
                        <button id="canvas-creator-cancel" class="prompt_cancel-button_36cPC">
                            <span>Cancel</span>
                        </button>
                        <button id="canvas-creator-ok" class="prompt_ok-button_3QFdD">
                            <span>OK</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        /*
        const closeFunc = () => {
            modal.remove();
        };
        const okButton = document.getElementById("canvas-creator-ok");
        const cancelButton = document.getElementById("canvas-creator-cancel");
        const closeButton = document.getElementById("canvas-creator-close");
        const nameInput = document.getElementById("canvas-creator-name");
        const defaultImageInput = document.getElementById("canvas-creator-default");
        const fileReader = new FileReader();
        let defaultImage;
        fileReader.onload = e => {
            this.readAsImageElement(e.target.result).then(img => {
                defaultImage = img;
            });
        };
        okButton.onclick = () => {
            store.newCanvas(nameInput.value, this.runtime.stageWidth, this.runtime.stageHeight, defaultImage);
            // eslint-disable-next-line no-undef
            vm.emitWorkspaceUpdate();
        };
        cancelButton.onclick = closeFunc;
        closeButton.onclick = closeFunc;
        defaultImageInput.onchange = () => {
            const file = defaultImageInput.files[0];
            if (!file) {
                return;
            } 
            fileReader.readAsDataURL(file);
        };
        defaultImageInput.onblur = () => {
            defaultImageInput.onchange();
        };*/
    }

    orderCategoryBlocks (blocks) {
        const button = blocks[0];
        const varBlock = blocks[1];
        delete blocks[0];
        delete blocks[1];
        // create the variable block xml's
        const varBlocks = store.getAllCanvases().map(canvas => varBlock
            .replace('{canvasId}', canvas.id)
            .replace('{canvasName}', canvas.name));
        // push the button to the top of the var list
        varBlocks
            .reverse()
            .push(button);
        // merge the category blocks and variable blocks into one block list
        blocks = varBlocks
            .reverse()
            .concat(blocks);
        return blocks;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'canvas',
            name: 'html canvas',
            color1: '#0069c2',
            color2: '#0060B4',
            color3: '#0060B4',
            isDynamic: true,
            orderBlocks: this.orderCategoryBlocks,
            blocks: [
                {
                    opcode: 'createNewCanvas',
                    blockType: BlockType.BUTTON,
                    text: 'create new canvas'
                },
                {
                    opcode: 'canvasGetter',
                    blockType: BlockType.REPORTER,
                    isDynamic: true,
                    canvasId: '{canvasId}',
                    text: '{canvasName}'
                },
                "---",
                {
                    opcode: 'printCanvas',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        canvas: {
                            type: ArgumentType.STRING,
                            menu: 'canvas'
                        }
                    },
                    text: 'stamp canvas [canvas] to pen'
                },
                {
                    blockType: BlockType.LABEL,
                    text: "2D"
                },
                {
                    opcode: 'dfsh',
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        json: {
                            type: ArgumentType.STRING,
                            defaultValue: "{}"
                        }
                    },
                    text: 'is json [json] valid?'
                },
                {
                    blockType: BlockType.LABEL,
                    text: "3D"
                }
            ],
            menus: {
                canvas: 'getCanvasMenuItems'
            }
        };
    }

    createNewCanvas () {
        this.spawnCreateCanvasMenu();
    }

    getCanvasMenuItems () {
        const canvases = store.getAllCanvases();
        if (canvases.length < 1) return [{text: '', value: ''}];
        return canvases.map(canvas => ({
            text: canvas.name,
            value: canvas.id
        }));
    }

    canvasGetter (args, util, mutation) {
        return store.getCanvas(mutation.canvasId).element.toDataURL('image/png');
    }

    printCanvas (args) {
        const penSkinId = this.runtime.renderer.getPenDrawableId();
        const canvas = store.getCanvas(args.canvas);
        this.runtime.renderer.penStamp(penSkinId, canvas.drawableId);
        this.runtime.requestRedraw();
    }
}

module.exports = canvas;
