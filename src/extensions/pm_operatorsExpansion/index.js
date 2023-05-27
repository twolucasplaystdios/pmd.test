const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const blocks = `
<block type="operator_randomBoolean" />
${blockSeparator}
<block type="operator_nand" />
<block type="operator_nor" />
<block type="operator_xor" />
<block type="operator_xnor" />
${blockSeparator}
<block type="operator_join">
    <value name="STRING1">
        <shadow type="text">
            <field name="TEXT">apple </field>
        </shadow>
    </value>
    <value name="STRING2">
        <shadow type="text">
            <field name="TEXT">banana</field>
        </shadow>
    </value>
</block>
<block type="operator_join3">
    <value name="STRING1">
        <shadow type="text">
            <field name="TEXT">apple </field>
        </shadow>
    </value>
    <value name="STRING2">
        <shadow type="text">
            <field name="TEXT">banana </field>
        </shadow>
    </value>
    <value name="STRING3">
        <shadow type="text">
            <field name="TEXT">pear</field>
        </shadow>
    </value>
</block>
%b0
%b1
%b2
%b3
%b4
%b5
${blockSeparator}
<block type="operator_countAppearTimes">
    <value name="TEXT1">
        <shadow type="text">
            <field name="TEXT">a</field>
        </shadow>
    </value>
    <value name="TEXT2">
        <shadow type="text">
            <field name="TEXT">abc abc abc</field>
        </shadow>
    </value>
</block>
<block type="operator_readLineInMultilineText">
    <value name="LINE">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
    <value name="TEXT">
        <shadow type="text">
            <field name="TEXT">Text with multiple lines here</field>
        </shadow>
    </value>
</block>
<block type="operator_textIncludesLetterFrom">
    <value name="TEXT1">
        <shadow type="text">
            <field name="TEXT">abcdef</field>
        </shadow>
    </value>
    <value name="TEXT2">
        <shadow type="text">
            <field name="TEXT">fgh</field>
        </shadow>
    </value>
</block>
${blockSeparator}
<block type="operator_character_to_code">
    <value name="ONE">
        <shadow type="text">
            <field name="TEXT">a</field>
        </shadow>
    </value>
</block>
<block type="operator_code_to_character">
    <value name="ONE">
        <shadow type="text">
            <field name="TEXT">97</field>
        </shadow>
    </value>
</block>
`

function generateJoin(amount) {
    const joinWords = [
        'apple',
        'banana',
        'pear',
        'orange',
        'mango',
        'strawberry',
        'pineapple',
        'grape',
        'kiwi'
    ]

    const argumentTextArray = [];
    const argumentss = {};

    for (let i = 0; i < amount; i++) {
        argumentTextArray.push('[STRING' + (i + 1) + ']');
        argumentss['STRING' + (i + 1)] = {
            type: ArgumentType.STRING,
            defaultValue: joinWords[i] + ((i === (amount - 1)) ? '' : ' ')
        }
    }

    return {
        opcode: 'join' + amount,
        text: 'join ' + argumentTextArray.join(' '),
        blockType: BlockType.REPORTER,
        disableMonitor: true,
        arguments: argumentss
    }
}

/**
 * Class of 2023
 * @constructor
 */
class pmOperatorsExpansion {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {runtime}
         */
        this.runtime = runtime;
    }

    orderCategoryBlocks(extensionBlocks) {
        let categoryBlocks = blocks;

        let idx = 0;
        for (const block of extensionBlocks) {
            categoryBlocks = categoryBlocks.replace('%b' + idx, block);
            idx++;
        }

        return [categoryBlocks];
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'pmOperatorsExpansion',
            name: 'Operators Expansion',
            color1: '#59C059',
            color2: '#46B946',
            color3: '#389438',
            isDynamic: true,
            orderBlocks: this.orderCategoryBlocks,
            blocks: [
                generateJoin(4),
                generateJoin(5),
                generateJoin(6),
                generateJoin(7),
                generateJoin(8),
                generateJoin(9),
            ]
        };
    }

    join4(args) {
        return Cast.toString(args.STRING1)
            + Cast.toString(args.STRING2)
            + Cast.toString(args.STRING3)
            + Cast.toString(args.STRING4);
    }
    join5(args) {
        return Cast.toString(args.STRING1)
            + Cast.toString(args.STRING2)
            + Cast.toString(args.STRING3)
            + Cast.toString(args.STRING4)
            + Cast.toString(args.STRING5);
    }
    join6(args) {
        return Cast.toString(args.STRING1)
            + Cast.toString(args.STRING2)
            + Cast.toString(args.STRING3)
            + Cast.toString(args.STRING4)
            + Cast.toString(args.STRING5)
            + Cast.toString(args.STRING6);
    }
    join7(args) {
        return Cast.toString(args.STRING1)
            + Cast.toString(args.STRING2)
            + Cast.toString(args.STRING3)
            + Cast.toString(args.STRING4)
            + Cast.toString(args.STRING5)
            + Cast.toString(args.STRING6)
            + Cast.toString(args.STRING7);
    }
    join8(args) {
        return Cast.toString(args.STRING1)
            + Cast.toString(args.STRING2)
            + Cast.toString(args.STRING3)
            + Cast.toString(args.STRING4)
            + Cast.toString(args.STRING5)
            + Cast.toString(args.STRING6)
            + Cast.toString(args.STRING7)
            + Cast.toString(args.STRING8);
    }
    join9(args) {
        return Cast.toString(args.STRING1)
            + Cast.toString(args.STRING2)
            + Cast.toString(args.STRING3)
            + Cast.toString(args.STRING4)
            + Cast.toString(args.STRING5)
            + Cast.toString(args.STRING6)
            + Cast.toString(args.STRING7)
            + Cast.toString(args.STRING8)
            + Cast.toString(args.STRING9);
    }
}

module.exports = pmOperatorsExpansion;
