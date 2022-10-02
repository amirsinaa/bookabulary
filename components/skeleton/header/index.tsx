import Navigation from './navigation';
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-white border-b">
      <h1>
        <Link href="/">
          <a className="text-green-600 hover:text-green-600">
            Bookabulary
          </a>
        </Link>
      </h1>
      <Navigation />
    </header>
  )
}
