const defaultCameraState = require('../engine/default-camera-state');

const getOrCreateScreen = (runtime, screen) => {
    const cameraState = runtime.cameraStates[screen]
    if (!cameraState) {
        runtime.updateCamera(screen, defaultCameraState)
        return defaultCameraState
    }
    return cameraState
};

const translateForCamera = (runtime, screen, x, y) => {
    const {pos, scale, dir} = getOrCreateScreen(runtime, screen);
    const radians = (dir / 180) * Math.PI;
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    const offX = x - pos[0];
    const offY = y - pos[1];
    return [
        scale * (offX * cos - offY * sin),
        scale * (offX * sin + offY * cos)
    ];
};

const translateScreenPos = (runtime, screen, x, y) => {
    const {pos, scale, dir} = getOrCreateScreen(runtime, screen);
    const radians = (-dir / 180) * Math.PI;
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    let cx = pos[0];
    let cy = pos[1];
    cx *= scale;
    cy *= scale;
    cx += scale * (x * cos - y * sin);
    cy += scale * (x * sin + y * cos);
    return [cx, cy];
};

module.exports = {
    translateForCamera,
    translateScreenPos,
    getOrCreateScreen
};
