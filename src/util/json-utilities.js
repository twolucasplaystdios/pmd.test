class jsonUtilities {
    validateJSON(json) {
        try {
            json = JSON.parse(json)
        } catch {
            json = {}
        }

        return json
    }
    validateArray(array) {
        try {
            if (!array.startsWith('[')) throw new error('error lol')
            array = JSON.parse(array)
        } catch {
            array = []
        }

        return array
    }

    stringToEqivalint(value) {
        // is the value a valid json? if so convert to one else do nothing
        try {
            if (!(value.startsWith('{') || value.startsWith('['))) throw new error('not actualy a json!!!!!!!!!!')
            value = JSON.parse(value)
        } catch {
            // well its not a json so what is it?
            if (String(Number(value)) == value) {
                value = Number(value)
            } else if (value.toLowerCase() == 'true') {
                value = true
            } else if (value.toLowerCase() == 'false') {
                value = false
            } else if (value == 'undefined') {
                value = undefined
            } else if (value == 'null') {
                value = null
            }
        }

        return value;
    }
    valueToString(value) {
        if (typeof value == 'object') {
            value = JSON.stringify(value)
        } else {
            value = String(value)
        }

        return value;
    }
}

module.exports = jsonUtilities