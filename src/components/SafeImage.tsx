import React from "react";

export type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

// 1x1 transparent PNG to preserve layout when an image fails.
const TRANSPARENT_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/ZXs6nEAAAAASUVORK5CYII=";

const SafeImage: React.FC<SafeImageProps> = ({ fallbackSrc, onError, ...props }) => {
  const [broken, setBroken] = React.useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!broken) setBroken(true);
    if (onError) onError(e);
  };

  const effectiveSrc = broken ? (fallbackSrc || TRANSPARENT_PLACEHOLDER) : props.src;

  return (
    <img
      {...props}
      src={effectiveSrc}
      onError={handleError}
      // Keep decoding async & lazy loading if provided by caller
    />
  );
};

export default SafeImage;
