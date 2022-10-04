import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import Router from 'next/router'
import { supabase } from '../../../api/supabase-client'

export interface Props {
  session: AuthSession | null
}

export default function Navigation({ session }: Props) {
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
                supabase.auth.signOut()
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
