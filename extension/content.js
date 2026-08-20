console.log("Streaming Dual Subtitles loaded!");

let lastSubtitle = "";

function observeSubtitles(subtitleElement) {
    const observer = new MutationObserver(() => {
        const current = subtitleElement.innerText.trim();

        if (current && current !== lastSubtitle) {
            lastSubtitle = current;
            console.log("Subtitle changed:", current);
        }
    });

    observer.observe(subtitleElement, {
        childList: true,
        subtree: true,
        characterData: true
    });

    console.log("Subtitle observer started.");
}

function waitForSubtitleElement() {
    const interval = setInterval(() => {
        const subtitle = document.querySelector(".player-timedtext");

        if (subtitle) {
            clearInterval(interval);

            console.log("Subtitle container found!");
            observeSubtitles(subtitle);
        }
    }, 500);
}

waitForSubtitleElement();