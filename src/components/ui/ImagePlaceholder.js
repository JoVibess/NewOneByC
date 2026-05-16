import clsx from "clsx";

export default function ImagePlaceholder({
  ratio = "landscape",
  label = "Image à venir",
  className
}) {
  return (
    <div className={clsx("image-placeholder", `image-placeholder--${ratio}`, className)}>
      <span>{label}</span>
    </div>
  );
}
