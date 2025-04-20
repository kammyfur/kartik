// @ts-nocheck

let item = {
    context: null,

    dom: {
        document: null,
        window: null,
    },

};

if (typeof HTML !== "undefined") {
    if (typeof HTML.document !== "undefined") {
        item.dom.document = HTML.document;
    }

    if (typeof window !== "undefined") {
        item.dom.window = HTML.window;
    }
}

module.exports = item;