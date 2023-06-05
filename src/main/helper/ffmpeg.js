//require the ffmpeg package so we can use ffmpeg using JS
import { setFfmpegPath, setFfprobePath } from 'fluent-ffmpeg';
//Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static').replace(
    'app.asar',
    'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
    'app.asar',
    'app.asar.unpacked'
);
//tell the ffmpeg package where it can find the needed binaries.
setFfmpegPath(ffmpegPath);
setFfprobePath(ffprobePath);