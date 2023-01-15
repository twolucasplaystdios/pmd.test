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
    "looks_stretchGetY",
    "looks_stretchGetX",
    "looks_setStretch",
    "looks_setShape",
    "looks_setColor",
    "looks_setFont",
    "sensing_regextest",
    "sensing_thing_is_number",
    "sensing_mobile",
    "sensing_thing_is_text",
    "sensing_getspritewithattrib",
    "operator_regexmatch",
    "operator_replaceAll",
    "operator_getLettersFromIndexToIndexInText",
    "operator_readLineInMultilineText",
    "operator_newLine",
    "operator_stringify",
    "operator_lerpFunc",
    "operator_advMath",
    "operator_constrainnumber",
    "operator_trueBoolean",
    "operator_falseBoolean",
    "operator_randomBoolean",
    "operator_indexOfTextInText",
    "event_always",
    "event_whenanything",
    "control_backToGreenFlag",
    "control_if_return_else_return"
];

const inputs = [
    'control_get_counter',
    'motion_xscroll',
    'motion_yscroll',
    'sensing_loud',
    'sensing_loudness',
    'sensing_userid',
    'sound_volume'
];

module.exports = {
    stacked,
    inputs
};
