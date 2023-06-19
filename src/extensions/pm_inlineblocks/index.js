const blocks = `
<block type="control_inline_stack_output"></block>
`

/**
 * Class of 2024
 * @constructor
 */
class pmInlineBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
    }

    orderCategoryBlocks() {
        let categoryBlocks = blocks;

        // let idx = 0;
        // for (const block of extensionBlocks) {
        //     categoryBlocks = categoryBlocks.replace('%b' + idx + '>', block);
        //     idx++;
        // }

        return [categoryBlocks];
    }

    /**
     * @returns {object} metadata for deez nuts
     * this extension really only exists to seperate the block
     */
    getInfo() {
        return {
            id: 'pmInlineBlocks',
            name: 'Inline Blocks',
            color1: '#59C059',
            color2: '#46B946',
            color3: '#389438',
            isDynamic: true,
            orderBlocks: this.orderCategoryBlocks,
            blocks: []
        };
    }
}

module.exports = pmInlineBlocks;
