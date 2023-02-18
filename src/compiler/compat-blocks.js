/**
 * @fileoverview List of blocks to be supported in the compiler compatibility layer.
 * This is only for native blocks. Extensions should not be listed here.
 */

// Please keep these lists alphabetical.

const stacked = [
    'control_clear_counter',
    'control_incr_counter',
    'looks_hideallsprites',
    'looks_say',
    'looks_sayforsecs',
    'looks_setstretchto',
    'looks_switchbackdroptoandwait',
    'looks_think',
    'looks_thinkforsecs',
    'motion_align_scene',
    'motion_glidesecstoxy',
    'motion_glideto',
    'motion_goto',
    'motion_pointtowards',
    'motion_scroll_right',
    'motion_scroll_up',
    'sensing_askandwait',
    'sensing_setdragmode',
    'sound_changeeffectby',
    'sound_changevolumeby',
    'sound_cleareffects',
    'sound_play',
    'sound_playuntildone',
    'sound_seteffectto',
    'sound_setvolumeto',
    'sound_stopallsounds',
    "looks_setStretch",
    "data_reverselist",
    "data_arraylist",
    "looks_sayHeight",
    "looks_sayWidth"

];

const inputs = [
    'control_get_counter',
    'motion_xscroll',
    'motion_yscroll',
    'sensing_loud',
    'sensing_loudness',
    'sensing_userid',
    'sound_volume',
    "control_if_return_else_return",
    "looks_stretchGetX",
    "looks_stretchGetY",
    "sensing_getspritewithattrib",
    "sensing_thing_is_text",
    "sensing_mobile",
    "sensing_thing_is_number",
    "sensing_regextest",
    "operator_indexOfTextInText",
    "operator_randomBoolean",
    "operator_falseBoolean",
    "operator_trueBoolean",
    "operator_constrainnumber",
    "operator_advMath",
    "operator_lerpFunc",
    "operator_stringify",
    "operator_newLine",
    "operator_readLineInMultilineText",
    "operator_getLettersFromIndexToIndexInText",
    "operator_replaceAll",
    "operator_regexmatch",
    "data_itemexistslist",
    "data_listisempty",
    "data_listarray",
    "sensing_directionTo",
    "sensing_distanceTo",
    "looks_sayHeight",
    "looks_sayWidth"
];

module.exports = {
    stacked,
    inputs
};
