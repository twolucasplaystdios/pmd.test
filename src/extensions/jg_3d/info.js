const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');

const blockIconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAT6SURBVHhe7ZtdqBVVFMfXnHuvXG9i9/ZhWYGVYWoggqGVFSV9ywUpohch+lARFXwRAu1BEB97kNAKheiphyAKEqKXICIyKuhFS0Qh+yKvZqLXj+sZ//+99syZU/ecMx975pzDzA/WzFpzzszstWatvfeZmSMV3WXArkvHOMSPyFJIKRiChI6PL2kKAsWDFEqRJ6SDhgGcdeoAFG4ZRCNeNpujFNauIk40AblBVZH6fpx0mrPW6wjMOmson0OeUTU/anadB9sgvMbG+fdfhYGrPp3zpIaW8PMDr9kNIk9DuP+LxsqJPDLgRsgpVUXunyfy3ZtQkpwJbt/9hsjx8CiG6yAXVHWH6wCEdT42InJ6D5QsZ8DRZm8SOXfJ2orTNrs62J+QW1QVmXxHZJj9vSPOToqMbraG8gfkNlWzkbUPWA/hVTfO/7gTBurYpfPk+pl63P2v2A0icyE87xPGykDGBFWW3ynyLeu8CHDWFbtEDp2wtpLaj6Q78vsYsJQhTGQvvwvFVSElZAjD5lTYGkPiliTZ4STkdlVxIT7A4orqXQUeeBhiIxyGLFa1M3H6gNUQprtxft9aGJzF9YLzBC1je7Zx1qAsgrC9DxurA+0yYAxyWlWRNfi58jF74i6leyzg9sLtIj//ZW1lFHJW1f/Tyh1uN9U1MkPk/F67pV9AIGZsQJJetXab1rf6gAk+OPUZ5ucc4fuUr4+hDnYb9RBkhdH+Q9s+YGA+FisRUFZUH1FnezFTWLlK7XbEmgh57E4ozUNO70HHMT+sJZgjxp8J8uCPQB4wVu/Bn2B0PGG2Jp8K8y4ey4J9aw9QH8aCE2N01mlIHgCLdx8WCIQ0etpCMf0SHK9xsM5A6gCEPGolYeqlJXDcc/Jb0EUACLMAnaT/kJp54c9x53iAmwBYzO0u9g/skBxSH8SCVz2HpwhOAxDgLcSCgch4dJ+ZxTq/We08yCUAAd6DWLCjTDp/YJ0j1b071MyTXAMQgvmDv8zqHTDlk2I8T0sxAQAex2uWRYtOrM5xnHWecjxPS2EBCPDuwoKBsPMHn+XBOnfcccal8AAEeJw74MeWF95j6g5dC0CvUAXArktLFQC7Li1VAOy6tFQBsOvSUgXArktLFQC7Li3tA8B7cf3MrM5PdFt9YzYkfKTs/4JFHo/F+ODV+YtvYACONd4XIC0j0SoD/oWE92a8BSL3PAmloNtUWVjwenznSbsS4CNy7mxuYh37FcYikYkLndOqG5ycQPueEzn6u92AAoB0bGwSbw5CnlUVycD0/Uf11LgoAVxCr/mN4rchW1TtTJrLeRli3gQcRpFM/kQtJRkDUFuNC9Fclon9STMMsm8wL0BfRCj4EOSlrbQKAg4v3YzzIt0jzs+EpKrNVDtF4NsC36gq8ulekfEYb2WEJM2A4Zp4q5qGo3shHKNSkzUAAXwva46quDK/YXFO9bbEDcAIGvqY1RUG3cmjWFcBCAiT8qYxkb/D3GhBjADMel7k/EVrKE7bnKYPaAcbN4/KqTMw0D+89yGt5GzZh/1R5xHn50JcXzD3B4zwAuQjVTGt/B7TS/7lIco0GfDFDyJP7bCGwkcoX6nqnjwDENA0UPnHsQj+ABENAPpx73GrK8ihxn+N+h2WGgNhZPF8jGBHIF9CDop/62jjMyuuS7NnQH/ecPSTPUNRpyml4S1I1PGNkIqKiqIRuQYHeAEU9sBGCQAAAABJRU5ErkJggg==";

const seperator = "---";

function infoMenu(array) {
    return {
        acceptReporters: true,
        items: array.map(item => ({ text: item, value: item }))
    }
}
function infoLabel(text) {
    return {
        blockType: BlockType.LABEL,
        text: text
    }
}
function infoArgument(value, extra, extra2) {
    switch (typeof value) {
        case "number":
            return { type: ArgumentType.NUMBER, defaultValue: value };
        case "boolean":
            return { type: ArgumentType.BOOLEAN, defaultValue: value };
        case "string":
            switch (value) {
                case "COLOR":
                    return { type: ArgumentType.COLOR };
                case "ANGLE":
                    return { type: ArgumentType.ANGLE };
                case "MATRIX":
                    return { type: ArgumentType.MATRIX };
                case "NOTE":
                    return { type: ArgumentType.NOTE, defaultValue: 60 };
                case "POLYGON":
                    return { type: ArgumentType.POLYGON, nodes: extra };
                case "IMAGE":
                    return { type: ArgumentType.IMAGE, dataURI: extra, alt: extra2 };
                default:
                    return { type: ArgumentType.STRING, defaultValue: value };
            }
    }
}
function infoArgumentMenu(type, menu) {
    return {
        type: type,
        menu: menu
    }
}

function createCommandBlock(opcode, text, args) {
    const obj = {
        opcode: opcode,
        text: text ? text : opcode,
        blockType: BlockType.COMMAND
    }
    if (args) {
        obj.arguments = args;
    }
    return obj;
}
function createReporterBlock(opcode, text, args) {
    const obj = {
        opcode: opcode,
        text: text ? text : opcode,
        blockType: BlockType.REPORTER,
        disableMonitor: false
    }
    if (args) {
        obj.arguments = args;
    }
    return obj;
}
function createBooleanBlock(opcode, text, args) {
    const obj = {
        opcode: opcode,
        text: text ? text : opcode,
        blockType: BlockType.BOOLEAN,
        disableMonitor: true
    }
    if (args) {
        obj.arguments = args;
    }
    return obj;
}

module.exports = {
    id: 'jg3d',
    name: '3D',
    color1: '#B100FE',
    color2: '#8000BC',
    blockIconURI: blockIconURI,
    blocks: [
        infoLabel("Initializing your scene"),

        createCommandBlock('initialize', 'create 3D scene'),
        seperator,
        createCommandBlock(
            'setCameraPerspective0',
            'set scene camera to perspective camera with fov: [FOV]',
            {
                FOV: infoArgument(70)
            }
        ),
        createCommandBlock(
            'setCameraPerspective1',
            'set scene camera to perspective camera with fov: [FOV] aspect ratio: [AR]',
            {
                FOV: infoArgument(70),
                AR: infoArgument(480 / 360)
            }
        ),
        createCommandBlock(
            'setCameraPerspective2',
            'set scene camera to perspective camera with fov: [FOV] aspect ratio: [AR] and only render objects within [NEAR] and [FAR] units of the camera',
            {
                FOV: infoArgument(70),
                AR: infoArgument(480 / 360),
                NEAR: infoArgument(0.1),
                FAR: infoArgument(1000)
            }
        ),
        seperator,
        createCommandBlock('setCameraOrthographic0', 'set scene camera to orthographic camera'),
        createCommandBlock(
            'setCameraOrthographic1',
            'set scene camera to orthographic camera with left plane: [LEFT] right plane: [RIGHT] top plane: [TOP] bottom plane: [BOTTOM]',
            {
                LEFT: infoArgument(-480 / 2),
                RIGHT: infoArgument(480 / 2),
                TOP: infoArgument(360 / 2),
                BOTTOM: infoArgument(-360 / 2)
            }
        ),
        createCommandBlock(
            'setCameraOrthographic2',
            'set scene camera to orthographic camera with left plane: [LEFT] right plane: [RIGHT] top plane: [TOP] bottom plane: [BOTTOM] and only render objects within [NEAR] and [FAR] units of the camera',
            {
                LEFT: infoArgument(-480 / 2),
                RIGHT: infoArgument(480 / 2),
                TOP: infoArgument(360 / 2),
                BOTTOM: infoArgument(-360 / 2),
                NEAR: infoArgument(1),
                FAR: infoArgument(1000)
            }
        ),
        seperator,
        createCommandBlock('render'),

        infoLabel("Camera controls"),

        createCommandBlock(
            'setCameraPosition',
            'set camera position to x: [X] y: [Y] z: [Z]',
            {
                X: infoArgument(0),
                Y: infoArgument(0),
                Z: infoArgument(0)
            }
        ),
        createCommandBlock('setCameraZoom', 'set camera zoom to [ZOOM]%', {
            ZOOM: infoArgument(100)
        }),
        createReporterBlock("getCameraClipPlane", "camera [CLIPPLANE]", {
            CLIPPLANE: infoArgumentMenu(ArgumentType.STRING, "clippingPlanes")
        }),
        createReporterBlock("getCameraPosition", "camera [VECTOR3]", {
            VECTOR3: infoArgumentMenu(ArgumentType.STRING, "vector3")
        }),
        createReporterBlock("getCameraAspectRatio", "camera aspect ratio"),
        createReporterBlock("getCameraZoom", "camera zoom"),
        createReporterBlock("getCameraFov", "camera fov"),
        seperator,
        createBooleanBlock("isCameraPerspective", "is scene camera a perspective camera?"),
        createBooleanBlock("isCameraOrthographic", "is scene camera an orthographic camera?"),
    ],
    menus: {
        cameraType: infoMenu(["perspective", "orthographic"]),
        clippingPlanes: infoMenu(["near", "far"]),
        vector3: infoMenu(["x", "y", "z"]),
        vector2: infoMenu(["x", "y"])
    }
}