class Button {
    constructor(addToClient, { id, label, shown }) {
        this.id = id;
        this.label = label;
        this._element = document.createElement("button");
        if (shown === false) {
            this._element.style.display = "none";
        }
        if (label) {
            this._element.innerText = label;
        } else {
            this._element.innerText = "Button";
        }

        addToClient.AddToCanvas(this._element);
    }
    show() {
        this._element.style.display = "";
    }
    hide() {
        this._element.style.display = "none";
    }
}

class UI {
    constructor(runtime) {
        this.runtime = runtime;
        this._div = document.createElement("div");
        this.Realign();
    }

    static Button = Button;

    /**
     * If we switch from editor to project page, our element div gets hidden away somewhere.
     * This function puts it back in place.
     */
    Realign() {
        this._div.style = `position: absolute;left: 0px;width: 100%;height: 100%;top: 0px;z-index: 1000;`
        this.runtime.renderer.canvas.parentElement.prepend(this._div);
    }
    /**
     * Append an element to the div containing all UI elements.
     * @param {Element} element The element to add to the div.
     */
    AddToCanvas(element) {
        this._div.append(element);
        this.Realign();
    }
}

module.exports = UI;