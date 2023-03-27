import Link from "next/link";

export default function NavItem({item, path}) {
  return (
    <li className="nav-item">
      <Link href={`/${path}/${item.id}`} className="nav-link">
        <span className="text-dark">{item.name}</span>
      </Link>
    </li>
  );
}
