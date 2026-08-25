import { startSubtitleObserver } from "./subtitles.js";
import { translateText } from "./translator.js";
import {
    updateOverlay,
    clearOverlay
} from "./overlay.js";

console.log("Streaming Dual Subtitles loaded");

let translationRequestId = 0;

startSubtitleObserver(
    async (subtitle) => {
        const requestId = ++translationRequestId;

        console.log("Received subtitle:", subtitle);

        try {
            console.log("Calling translator...");

            const translation = await translateText(subtitle);

            // Si mientras traducíamos llegó otra frase,
            // ignoramos esta traducción porque ya está obsoleta.
            if (requestId !== translationRequestId) {
                console.log("Ignoring outdated translation.");
                return;
            }

            console.log("Translation received:", translation);

            updateOverlay(translation);
        } catch (error) {
            console.error("Translation error:", error);
        }
    },
    () => {
        translationRequestId++;

        clearOverlay();
    }
);