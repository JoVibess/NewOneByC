import Image from "next/image";
import clsx from "clsx";

export default function FigureImage({
  src,
  alt,
  ratio = "portrait",
  className,
  sizes = "(max-width: 980px) calc(100vw - 48px), 50vw"
}) {
  return (
    <div className={clsx("image-placeholder", `image-placeholder--${ratio}`, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="image-placeholder__image"
      />
    </div>
  );
}
