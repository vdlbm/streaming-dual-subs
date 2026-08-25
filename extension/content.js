import { startSubtitleObserver } from "./subtitles.js";
import { translateText } from "./translator.js";
import { createOverlay, updateOverlay } from "./overlay.js";

console.log("Streaming Dual Subtitles v0.1.0 loaded!");

createOverlay();

startSubtitleObserver(async (subtitle) => {
    console.log("German:", subtitle);

    try {
        const translation = await translateText(subtitle);

        console.log("Spanish:", translation);

        updateOverlay(translation);
    } catch (error) {
        console.error("Translation error:", error);
    }
});