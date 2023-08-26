const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');

// eslint-disable-next-line no-undef
const pathToMedia = ScratchBlocks.mainWorkspace.options.pathToMedia;

class PenguinModCamera {
    constructor(runtime) {
        this.runtime = runtime;

        this.pos = [0, 0];
        this.size = 100;
        this.dir = 90;
        this.bound = [];
        this.bindMouse = true;
        runtime.setRuntimeOptions({
            fencing: false
        });
        runtime.ioDevices.mouse.bindToCamera();
    }
    _updateRender() {
        this.runtime.updateCamera({
            pos: this.pos,
            dir: 90 - this.dir,
            scale: this.size / 100
        });
    }
    _fixDirection() {
        this.dir = MathUtil.wrapClamp(this.dir, -179, 180);
    }
    getInfo() {
        return {
            id: 'pmCamera',
            name: 'Camera',
            color1: '#0586FF',
            blocks: [
                {
                    opcode: 'moveSteps',
                    blockType: BlockType.COMMAND,
                    text: 'move camera [STEPS] steps',
                    arguments: {
                        STEPS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    }
                },
                {
                    opcode: 'turnRight',
                    blockType: BlockType.COMMAND,
                    text: 'turn camera [DIRECTION] [DEGREES] degrees',
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.IMAGE,
                            dataURI: `${pathToMedia}/rotate-right.svg`
                        },
                        DEGREES: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '15'
                        }
                    }
                },
                {
                    opcode: 'turnLeft',
                    blockType: BlockType.COMMAND,
                    text: 'turn camera [DIRECTION] [DEGREES] degrees',
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.IMAGE,
                            dataURI: `${pathToMedia}/rotate-left.svg`
                        },
                        DEGREES: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '15'
                        }
                    }
                },
                {
                    opcode: 'bindTarget',
                    blockType: BlockType.COMMAND,
                    text: 'bind [TARGET] to camera',
                    arguments: {
                        TARGET: {
                            type: ArgumentType.STRING,
                            menu: 'BINDABLE_TARGETS'
                        }
                    }
                },
                {
                    opcode: 'unbindTarget',
                    blockType: BlockType.COMMAND,
                    text: 'unbind [TARGET] to camera',
                    arguments: {
                        TARGET: {
                            type: ArgumentType.STRING,
                            menu: 'BINDABLE_TARGETS'
                        }
                    }
                },
                '---',
                {
                    opcode: 'gotoXY',
                    blockType: BlockType.COMMAND,
                    text: 'set camera x: [X] y: [Y]',
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'setSize',
                    blockType: BlockType.COMMAND,
                    text: 'set camera zoom to [ZOOM]%',
                    arguments: {
                        ZOOM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        }
                    }
                },
                {
                    opcode: 'changeSize',
                    blockType: BlockType.COMMAND,
                    text: 'change camera zoom by [ZOOM]%',
                    arguments: {
                        ZOOM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    }
                },
                '---',
                {
                    opcode: 'pointTowards',
                    blockType: BlockType.COMMAND,
                    text: 'point camera in direction [DIRECTION]',
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.ANGLE,
                            defaultValue: '90'
                        }
                    }
                },
                {
                    opcode: 'pointTowardsPoint',
                    blockType: BlockType.COMMAND,
                    text: 'point camera towards x: [X] y: [Y]',
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                '---',
                {
                    opcode: 'changeXpos',
                    blockType: BlockType.COMMAND,
                    text: 'change camera x by [X]',
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    }
                },
                {
                    opcode: 'setXpos',
                    blockType: BlockType.COMMAND,
                    text: 'set camera x to [X]',
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'changeYpos',
                    blockType: BlockType.COMMAND,
                    text: 'change camera y by [Y]',
                    arguments: {
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    }
                },
                {
                    opcode: 'setYpos',
                    blockType: BlockType.COMMAND,
                    text: 'set camera y to [Y]',
                    arguments: {
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                '---',
                {
                    opcode: 'xPosition',
                    blockType: BlockType.REPORTER,
                    text: 'camera x'
                },
                {
                    opcode: 'yPosition',
                    blockType: BlockType.REPORTER,
                    text: 'camera y'
                },
                {
                    opcode: 'direction',
                    blockType: BlockType.REPORTER,
                    text: 'camera direction'
                },
                {
                    // theres also a property named "size" so this one is special
                    opcode: 'getSize',
                    blockType: BlockType.REPORTER,
                    text: 'camera zoom'
                }
            ],
            menus: {
                BINDABLE_TARGETS: {
                    items: 'getBindableTargets',
                    acceotReports: true
                }
            }
        };
    }
    getBindableTargets() {
        const targets = this.runtime.targets
            .filter(target => !target.isStage && target.isOriginal)
            .map(target => target.getName());
        return [].concat([
            { text: 'this sprite', value: '__MYSELF__' },
            { text: 'mouse-pointer', value: '__MOUSEPOINTER__' },
            { text: 'pen layer', value: '__PEN__' },
            { text: 'backdrop', value: '__STAGE__' }
        ], targets);
    }
    moveSteps(args) {
        const steps = Cast.toNumber(args.STEPS);
        const radians = MathUtil.degToRad(90 - this.dir);
        const dx = steps * Math.cos(radians);
        const dy = steps * Math.sin(radians);
        this.pos[0] += dx;
        this.pos[1] += dy;
        this._updateRender();
    }
    turnRight(args) {
        const deg = Cast.toNumber(args.DEGREES);
        this.dir -= deg;
        this._fixDirection();
        this._updateRender();
    }
    turnLeft(args) {
        const deg = Cast.toNumber(args.DEGREES);
        this.dir += deg;
        this._fixDirection();
        this._updateRender();
    }
    bindTarget(args, util) {
        const target = Cast.toString(args.TARGET);
        switch (target) {
        case '__MYSELF__':
            const myself = util.target;
            myself.bindToCamera();
            break;
        case '__MOUSEPOINTER__':
            util.ioQuery('mouse', 'bindToCamera');
            break;
        case '__PEN__':
            const pen = this.runtime.ext_pen;
            if (!pen) break;
            pen.bindToCamera();
            break;
        case '__STAGE__':
            const stage = this.runtime.getTargetForStage();
            stage.bindToCamera();
            break;
        default:
            const sprite = this.runtime.getSpriteTargetByName(target);
            if (!sprite) throw `unkown target ${target}`;
            sprite.bindToCamera();
            break;
        }
        this._updateRender();
    }
    unbindTarget(args, util) {
        const target = Cast.toString(args.TARGET);
        switch (target) {
        case '__MYSELF__': {
            const myself = util.target;
            myself.removeCameraBinding();
            break;
        }
        case '__MOUSEPOINTER__':
            util.ioQuery('mouse', 'removeCameraBinding');
            break;
        case '__PEN__': {
            const pen = this.runtime.ext_pen;
            if (!pen) break;
            pen.removeCameraBinding();
            break;
        }
        case '__STAGE__': {
            const stage = this.runtime.getTargetForStage();
            stage.removeCameraBinding();
            break;
        }
        default: {
            const sprite = this.runtime.getSpriteTargetByName(target);
            if (!sprite) throw `unkown target ${target}`;
            sprite.removeCameraBinding();
            break;
        }
        }
        this._updateRender();
    }

    gotoXY(args) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        this.pos = [x, y];
        this._updateRender();
    }
    setSize(args) {
        const size = Cast.toNumber(args.ZOOM);
        this.size = size;
        this._updateRender();
    }
    changeSize(args) {
        const size = Cast.toNumber(args.ZOOM);
        this.size += size;
        this._updateRender();
    }

    pointTowards(args) {
        const direction = Cast.toNumber(args.DIRECTION);
        this.dir = direction;
        this._fixDirection();
        this._updateRender();
    }
    pointTowardsPoint(args) {
        const targetX = Cast.toNumber(args.X);
        const targetY = Cast.toNumber(args.Y);

        const dx = targetX - this.pos[0];
        const dy = targetY - this.pos[1];
        const direction = 90 - MathUtil.radToDeg(Math.atan2(dy, dx));
        this.dir = direction;
        // might not need to do this here but its prob better if we do
        this._fixDirection();
        this._updateRender();
    }

    changeXpos(args) {
        const nx = Cast.toNumber(args.X);
        this.pos[0] += nx;
        this._updateRender();
    }
    setXpos(args) {
        const nx = Cast.toNumber(args.X);
        this.pos[0] = nx;
        this._updateRender();
    }
    changeYpos(args) {
        const ny = Cast.toNumber(args.Y);
        this.pos[1] += ny;
        this._updateRender();
    }
    setYpos(args) {
        const ny = Cast.toNumber(args.Y);
        this.pos[1] = ny;
        this._updateRender();
    }

    xPosition() {
        return this.pos[0];
    }
    yPosition() {
        return this.pos[1];
    }
    direction() {
        return this.dir;
    }
    getSize() {
        return this.size;
    }
}

module.exports = PenguinModCamera;
