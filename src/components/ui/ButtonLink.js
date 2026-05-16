import Link from "next/link";
import clsx from "clsx";

export default function ButtonLink({ href, label, secondary = false }) {
  return (
    <Link href={href} className={clsx("button-link", secondary && "button-link--secondary")}>
      {label}
    </Link>
  );
}
