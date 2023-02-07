import { useSessionContext } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Link from 'next/link';

export default function Navigation() {
  const { session, supabaseClient } = useSessionContext();
  return (
    <ul className='flex space-x-4'>
      <li className='text-md'>
        <Link href='/about'>
          <a className='btn-link'>About</a>
        </Link>
      </li>
      <li className='text-md'>
        <Link href='/books'>
          <a className='btn-link'>Books</a>
        </Link>
      </li>
      {session ? (
        <>
          <li className='text-md'>
            <Link href='/user/profile'>
              <a className='btn-link'>Profile</a>
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
          <Link href='/user/auth'>
            <a className='btn-link'>Login/Register</a>
          </Link>
        </li>
      )}
    </ul>
  )
}
