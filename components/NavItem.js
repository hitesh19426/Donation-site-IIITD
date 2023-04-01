import Link from "next/link";

export default function NavItem({key, item, path}) {
  return (
    <li className="nav-item" key={key}>
      <Link href={`/${path}/${item.id}`} className="nav-link">
        <span className="text-dark">{item.name}</span>
      </Link>
    </li>
  );
}
