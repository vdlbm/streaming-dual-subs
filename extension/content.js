import { startSubtitleObserver } from "./subtitles.js";

console.log("Streaming Dual Subtitles loaded!");

startSubtitleObserver((subtitle) => {
    console.log("Subtitle changed:", subtitle);
});