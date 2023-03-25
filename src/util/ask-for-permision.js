const uid = require('./uid');
const alwaysUnsafe = [
    "jgPrism_evaluate",
    "jgPrism_evaluate2",
    "jgPrism_evaluate3",
    "jgFiles_downloadFile",
    "videoSensing_videoToggle",
    "jgPrism_screenshotStage"
];

const workspaceContains = (blockOpcodes, targets) => {
    for (const target of targets) {
        for (const block of Object.keys(target.blocks._blocks)) {
            if (blockOpcodes.includes(block.opcode)) return true;
        }
    }
    return false;
};

const ask = (msg, targets) => {
    if (workspaceContains(alwaysUnsafe, targets)) {
        const confirmId = uid();
        const userAccepts = prompt(
            `${msg}\nto confirm type "${confirmId}"`, 
            `to confirm type the text above`
        );
        return userAccepts === confirmId;
    }
    const userAccepts = prompt(msg, 'i decline');
    return userAccepts === 'yes' || userAccepts === 'i accept';
};

module.exports = ask;
