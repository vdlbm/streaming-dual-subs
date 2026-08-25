let lastSubtitle = "";
let hideTimeout = null;

export function startSubtitleObserver(onSubtitleChange, onSubtitleClear) {
    function getSubtitleContainer() {
        return document.querySelector(
            ".player-timedtext-text-container"
        );
    }

    function processCurrentSubtitle() {
        const container = getSubtitleContainer();

        if (!container) {
            scheduleClear();
            return;
        }

        const current = container.innerText.trim();

        if (!current) {
            scheduleClear();
            return;
        }

        // Ha aparecido un subtítulo.
        clearTimeout(hideTimeout);

        if (current !== lastSubtitle) {
            lastSubtitle = current;

            console.log("New German subtitle:", current);

            onSubtitleChange(current);
        }
    }

    function scheduleClear() {
        clearTimeout(hideTimeout);

        hideTimeout = setTimeout(() => {
            if (!getSubtitleContainer()) {
                lastSubtitle = "";

                console.log("German subtitle disappeared.");

                onSubtitleClear();
            }
        }, 100);
    }

    const observer = new MutationObserver(() => {
        processCurrentSubtitle();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    console.log("Global subtitle observer started.");

    processCurrentSubtitle();
}