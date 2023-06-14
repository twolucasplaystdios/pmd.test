const uid = require('./uid');

// probably good
const generateQuadUid = () => uid() + uid() + uid() + uid();

// idk i just copied this lol
const none = "'none'";
const featurePolicy = {
    'accelerometer': none,
    'ambient-light-sensor': none,
    'battery': none,
    'camera': none,
    'display-capture': none,
    'document-domain': none,
    'encrypted-media': none,
    'fullscreen': none,
    'geolocation': none,
    'gyroscope': none,
    'magnetometer': none,
    'microphone': none,
    'midi': none,
    'payment': none,
    'picture-in-picture': none,
    'publickey-credentials-get': none,
    'speaker-selection': none,
    'usb': none,
    'vibrate': none,
    'vr': none,
    'screen-wake-lock': none,
    'web-share': none,
    'interest-cohort': none
};

// idk i just copied this lol
const generateAllow = () => Object.entries(featurePolicy)
    .map(([name, permission]) => `${name} ${permission}`)
    .join('; ');

const createFrame = () => {
    const element = document.createElement("iframe");
    const frameId = generateQuadUid(); // this is how we differentiate iframe messages from other messages
    // hopefully pm doesnt do sonme stupid shit that makes this not work lol
    // console.log(frameId); // remove later lol
    element.dataset.id = frameId;
    element.style.display = "none";
    element.setAttribute('aria-hidden', 'true');
    element.sandbox = 'allow-scripts allow-modals';
    element.allow = generateAllow();
    document.body.append(element);
    return element;
};

const origin = location.origin;

/**
 * vscode give me autofill
 * @param {MessageEvent} event 
 * @param {HTMLIFrameElement} iframe 
 * @param {Function} removeHandler 
 * @returns fuck you
 */
const messageHandler = (event, iframe, removeHandler) => new Promise(resolve => {
    // console.log(event.origin) // remove later
    // this might not work first try cuz idk what event.origin is
    // if (event.origin !== iframe.contentDocument.location.origin) return; 
    // yea event origin is just location
    // console.log(event.origin, origin)
    // why the hell is event.origin null
    // ok we arent checking origin because its just null for some reason
    // if (event.origin !== origin) return;
    // console.log(event.data.payload)
    if (!event.data.payload) return;

    // console.log({ payload: event.data.payload.id, iframe: iframe.dataset.id })
    if (event.data.payload.id !== iframe.dataset.id) return;
    const data = event.data.payload;

    window.removeEventListener('message', removeHandler);
    try {
        const url = iframe.src;
        // delete object url
        URL.revokeObjectURL(url);
    } catch {
        // honestly idk how this could fail im just doing this incase
        // something stupid happens and people cant use eval anymore
        console.warn('failed to revoke url of iframe sandboxed eval');
    }
    iframe.remove();

    // send back data
    resolve(data);
});

/**
 * yeah this doesnt actually check if its a promise
 * just returns the code that lets you do that lmao
 */
const isPromiseFunction = () => `function isPromise(p) {
    if (typeof p !== "object") return;
    if (!p.__proto__) return;
    if (!p.__proto__.toString) return;
    return p.__proto__.toString() === "[object Promise]";
};`;

const generateEvaluateSrc = (code, frame) => {
    // this puts some funny stuff in the iframe src
    // so that it actually works
    const runnerCode = `(async () => {
    const parent = window.parent;
    const origin = ${JSON.stringify(origin)};

    let result = null;
    let success = true;
    try {
        result = eval(${JSON.stringify(code)});
    } catch (err) {
        success = false;
        result = err;
    }

    ${isPromiseFunction()}

    if (isPromise(result)) {
        result = await result;
    }

    // console.log(result,success);
    // console.log(origin);

    try {
        parent.postMessage({
            payload: {
                success: success,
                value: result,
                id: ${JSON.stringify(frame.dataset.id)}
            },
        }, origin);
    } catch (topLevelError) {
        // couldnt clone likely
        try {
            parent.postMessage({
                payload: {
                    success: success,
                    value: JSON.stringify(result),
                    id: ${JSON.stringify(frame.dataset.id)}
                },
            }, origin);
        } catch (err) {
            // ok we cant stringify it just error lmao
            parent.postMessage({
                payload: {
                    success: false,
                    value: [String(topLevelError), String(err)].join("; "),
                    id: ${JSON.stringify(frame.dataset.id)}
                },
            }, origin);
        }
    }
})();`;

    const html = [
        '<!DOCTYPE html>',
        '<html lang="en-US">',
        '<head>', // the html head isnt required i just think its funny to add
        '<title>the an one of an iframe</title>',
        '</head>',
        '<body>',
        '<h1><p>epic computing in progress...</p></h1>',
        // '<img src="https://media.tenor.com/jXQiJUuqfM8AAAAd/type-emoji.gif">', // hehe haw
        '<script>',
        runnerCode,
        '</script>',
        '</body>',
        '</html>'
    ].join("\n");

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    return url;
};

class SandboxRunner {
    static execute(code) {
        return new Promise(resolve => {
            const frame = createFrame();
            /**
             * please vscode show me the fucking autofill
             * @param {MessageEvent} e 
             */
            const trueHandler = e => {
                // this shit stupid but we need to remove
                // event handler ladter
                // also i want to die after this shit
                // console.log(e); // idk its being weird so
                messageHandler(e, frame, trueHandler).then(payload => {
                    // console.log(payload)
                    resolve({
                        success: payload.success,
                        value: payload.value
                    });
                });
            };
            window.addEventListener('message', trueHandler);
            frame.src = generateEvaluateSrc(code, frame);
        });
    }
}

module.exports = SandboxRunner;
