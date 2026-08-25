let spanishSubtitle;

export function createOverlay() {
    if (spanishSubtitle) return;

    spanishSubtitle = document.createElement("div");
    spanishSubtitle.id = "nds-spanish-subtitle";

    document.body.appendChild(spanishSubtitle);

    console.log("Spanish overlay created.");
}

export function updateOverlay(text) {
    if (!spanishSubtitle) return;

    spanishSubtitle.textContent = text;
}