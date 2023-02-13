import { useSessionContext } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Link from 'next/link';

export default function Navigation() {
  const { session, supabaseClient } = useSessionContext();
  return (
    <ul className='flex space-x-4'>
      <li className='text-md'>
        <Link className='btn-link' href='/about'>
          About
        </Link>
      </li>
      <li className='text-md'>
        <Link className='btn-link' href='/books'>
          Books
        </Link>
      </li>
      {session ? (
        <>
          <li className='text-md'>
            <Link className='btn-link' href='/user/profile'>
              Profile
            </Link>
          </li>
          <li className='text-md'>
            <button
              className='btn-link'
              onClick={() => {
                supabaseClient.auth.signOut()
                Router.push('/')
              }}
            >
              Log-out
            </button>
          </li>
        </>
      ) : (
        <li className='text-md'>
          <Link className='btn-link' href='/user/auth'>
            Login/Register
          </Link>
        </li>
      )}
    </ul>
  )
}
