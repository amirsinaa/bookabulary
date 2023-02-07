import { useColorMode } from '@/context/color-mode.context'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/common/button';
import Router from 'next/router'
import Link from 'next/link'

export default function Navigation() {
  const { session, supabaseClient } = useSessionContext()
  // const { isDarkMode, toggle } = useDarkMode()
  const { colorMode, setColorMode } = useColorMode();
  return (
    <ul className='flex space-x-4'>
      <li>
        <Link href='/'>
          <a className='btn-link'>Home</a>
        </Link>
      </li>
      <li>
        <Link href='/about'>
          <a className='btn-link'>About</a>
        </Link>
      </li>
      <li>
        <Link href='/books'>
          <a className='btn-link'>Books</a>
        </Link>
      </li>
      {session ? (
        <>
          <li>
            <Link href='/user/profile'>
              <a className='btn-link'>Profile</a>
            </Link>
          </li>
          <li>
            <button
              className='btn-link'
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
          <Link href='/user/auth'>
            <a className='btn-link'>Login/Register</a>
          </Link>
        </li>
      )}
      <li>
        <Button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')} extraConfig='ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110'>{colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}</Button>
      </li>
    </ul>
  )
}
