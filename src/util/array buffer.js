class bufferUtil {
    /**
     * converts an array buffer into an array
     * @param {ArrayBuffer} buffer the buffer to convert
     * @param {Function|undefined} process a function to run on every item before converting it
     * @returns {Array} the converted array
     */
    bufferToArray (buffer, process) {
        buffer = buffer.Int8Array;
        const array = [];
        const processNum = typeof process === 'function' 
            ? process 
            : num => num;
        for (let idx = 0; idx < buffer.length; idx++) {
            const number = Number(buffer[idx]) + 0;
            array.push(processNum(number));
        }
        return array;
    }
    
    /**
     * converts a buffer into a string of hex bytes
     * @param {ArrayBuffer} buffer the array buffer to convert
     * @param {String|undefined} spacer what to put inbetween each byte
     * @param {Function|undefined} process a function to run on every item before converting it
     * @returns {String} the string of bytes
     */
    bufferToString (buffer, spacer, process) {
        if (!spacer) spacer = ' ';
        const array = this.bufferToArray(buffer)
            .map(typeof process === 'function' 
                ? process 
                : num => num.toString(16))
            .map(byte => {
                if (byte.length < 2) return `0${byte}`;
                return byte;
            });
        return array.join(spacer);
    }
}

module.exports = bufferUtil;
