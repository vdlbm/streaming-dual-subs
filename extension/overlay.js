let spanishElement = null;

function createOverlay() {
    if (spanishElement) {
        return;
    }

    spanishElement = document.createElement("div");

    spanishElement.id = "nds-spanish-subtitle";

    document.body.appendChild(spanishElement);

    console.log("Spanish overlay created.");
}

function getGermanContainer() {
    return document.querySelector(
        ".player-timedtext-text-container"
    );
}

function positionOverlay() {
    if (!spanishElement) {
        return;
    }

    const germanContainer = getGermanContainer();

    if (!germanContainer) {
        return;
    }

    const rect = germanContainer.getBoundingClientRect();

    spanishElement.style.left = `${rect.left + rect.width / 2}px`;
    spanishElement.style.top = `${rect.bottom + 8}px`;
}

export function updateOverlay(text) {
    createOverlay();

    spanishElement.textContent = text;
    spanishElement.style.display = "block";

    positionOverlay();

    console.log("Updating Spanish:", text);
}

export function clearOverlay() {
    if (!spanishElement) {
        return;
    }

    spanishElement.textContent = "";
    spanishElement.style.display = "none";

    console.log("Spanish overlay cleared.");
}

function startPositionUpdater() {
    function update() {
        if (spanishElement) {
            positionOverlay();
        }

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

startPositionUpdater();