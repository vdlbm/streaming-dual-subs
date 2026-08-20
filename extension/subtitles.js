let lastSubtitle = "";

export function startSubtitleObserver(onSubtitleChange) {
    function observeSubtitles(subtitleElement) {
        const observer = new MutationObserver(() => {
            const current = subtitleElement.innerText.trim();

            if (current && current !== lastSubtitle) {
                lastSubtitle = current;
                onSubtitleChange(current);
            }
        });

        observer.observe(subtitleElement, {
            childList: true,
            subtree: true,
            characterData: true
        });

        console.log("Subtitle observer started.");
    }

    const interval = setInterval(() => {
        const subtitle = document.querySelector(".player-timedtext");

        if (subtitle) {
            clearInterval(interval);

            console.log("Subtitle container found!");
            observeSubtitles(subtitle);
        }
    }, 500);
}