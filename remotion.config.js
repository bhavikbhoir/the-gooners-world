/**
 * Remotion render config. Applies to `npm run video:studio` and
 * `npm run video:render`; Remotion Lambda reads the same settings from the
 * deployed site bundle.
 */
const { Config } = require('@remotion/cli/config');

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
// 9:16 for Reels and Shorts. Both re-encode, so ship a high-quality source.
Config.setCrf(18);
