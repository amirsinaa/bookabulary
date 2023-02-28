import Navigation from './navigation';
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-900">
      <h1>
        <Link className="text-green-700 dark:text-green-300 hover:text-green-600" href="/">
          Bookabulary
        </Link>
      </h1>
      <Navigation />
    </header>
  )
}
