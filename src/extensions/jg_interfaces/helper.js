class Button {
    constructor(addToClient, { id, label, shown }) {
        this.id = id;
        this.label = label;
        this._element = document.createElement("button");
        if (shown === false) {
            this._element.style.display = "none";
        }

        addToClient.AddToCanvas(this._element);
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
        this._div.style.zIndex = 1000;
        this.runtime.renderer.canvas.parentElement.prepend(element);
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