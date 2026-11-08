import { useRef, useState } from "react";
import { flowers } from "../../data/flowers";

/** Safari needs HEVC-with-alpha; VP9-with-alpha is used by Chromium/Firefox. */
function preferredFormat() {
  const webkit = /AppleWebKit/.test(navigator.userAgent);
  const ios =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const safari =
    webkit && !/Chrome|Chromium|Android|Edg\//.test(navigator.userAgent);
  return (safari || ios) &&
    document.createElement("video").canPlayType('video/mp4; codecs="hvc1"')
    ? "mov"
    : "webm";
}

/** Verify decoded alpha before revealing a video, so unsupported decoders never show a black rectangle. */
function hasTransparency(video) {
  if (!video.videoWidth || !video.videoHeight) return false;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 32;
  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!context) return false;
  try {
    context.drawImage(video, 0, 0, 32, 32);
    const pixels = context.getImageData(0, 0, 32, 32).data;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 16) return true;
    }
  } catch {
    return false;
  }
  return false;
}
export default function FlowerVideo({ variant }) {
  const flower = flowers[variant];
  const [format] = useState(preferredFormat);
  const [ready, setReady] = useState(false);
  const failed = useRef(false);
  function reveal(event) {
    const video = event.currentTarget;
    const transparent = hasTransparency(video);
    failed.current = !transparent;
    setReady(transparent);
    if (!transparent) video.pause();
  }
  return (
    <span
      className="flower-media"
      aria-hidden="true"
      data-flower={variant}
      data-alpha-ready={ready ? "true" : "false"}
    >
      <img className="flower-media__poster" src={flower.poster} alt="" />
      <video
        className="video flower-media__video"
        src={flower[format]}
        poster={flower.poster}
        preload="metadata"
        muted
        playsInline
        loop
        disablePictureInPicture
        onLoadStart={() => setReady(false)}
        onLoadedData={reveal}
        onError={() => {
          failed.current = true;
          setReady(false);
        }}
        onPlay={(event) => {
          if (failed.current) event.currentTarget.pause();
        }}
      />
    </span>
  );
}
