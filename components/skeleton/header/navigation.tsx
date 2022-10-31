import { useSessionContext } from '@supabase/auth-helpers-react'
import Router from 'next/router'
import Link from 'next/link'

export default function Navigation() {
  const { session, supabaseClient } = useSessionContext()

  return (
    <ul className="flex space-x-4">
      {session ? (
        <>
          <li>
            <Link href="/user/profile">
              <a className="btn-link">Profile</a>
            </Link>
          </li>
          <li>
            <button
              className="btn-link"
              onClick={() => {
                supabaseClient.auth.signOut()
                Router.push('/')
              }}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link href="/user/auth">
            <a className="btn-link">Login/Register</a>
          </Link>
        </li>
      )}
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
