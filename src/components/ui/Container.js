import clsx from "clsx";

export default function Container({ children, narrow = false, className }) {
  return (
    <div className={clsx("container", narrow && "container--narrow", className)}>
      {children}
    </div>
  );
}
