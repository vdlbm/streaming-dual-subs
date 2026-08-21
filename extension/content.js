import { startSubtitleObserver } from "./subtitles.js";

console.log("Streaming Dual Subtitles v0.1.0 loaded!");
startSubtitleObserver((subtitle) => {
    console.log("Subtitle changed:", subtitle);
});