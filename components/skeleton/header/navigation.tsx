import Link from 'next/link';

export default function Navigation() {
  return (
    <ul className="flex space-x-4">
      <li>
        <Link href="/">
          <a className="btn-link">Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a className="btn-link">About</a>
        </Link>
      </li>
    </ul>
  )
}
