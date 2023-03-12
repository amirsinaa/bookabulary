import { mainMenuItems, profileMenuItems } from "@/constant/data";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { AvatarIcon } from '@radix-ui/react-icons';
import Router from 'next/router';
import Link from 'next/link';

export default function Navigation() {
  const { session, supabaseClient } = useSessionContext();
  return (
    <div className="navbar bg-white dark:bg-gray-800 relative mx-auto shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="text-lime-500 dark:text-white mx-2 px-2 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52 text-md">
            {mainMenuItems.map(item => <li>
              <Link className='btn-link no-underline hover:no-underline' href={item.link}>
                {item.title}
              </Link>
            </li>)}
          </ul>
        </div>
        <Link href="/" className="text-xl text-lime-600">Bookabulary</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl">
          {mainMenuItems.map(item => <li>
            <Link className='btn-link no-underline hover:no-underline' href={item.link}>
              {item.title}
            </Link>
          </li>)}
        </ul>
      </div>
      <div className="navbar-end">
        {session ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn-circle">
              <div className="w-full rounded-full p-2 flex items-center justify-center self-center hover:cursor-pointer hover:bg-gray-300">
                <AvatarIcon width={34} height={34} />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow-lg menu menu-compact dropdown-content bg-white dark:bg-gray-800 rounded-box w-52">
              {profileMenuItems.map(item => <li className='border-b-2 dark:border-gray-600'>
                <Link href={item.link}>
                  {item.title}
                </Link>
              </li>)}
              <button
                className='btn-link text-md py-2 mt-3 text-sm no-underline hover:no-underline'
                onClick={() => {
                  supabaseClient.auth.signOut()
                  Router.push('/')
                }}
              >
                Logout
              </button>
            </ul>
          </div>
        ) : (
          <Link className='btn' href='/user/auth'>
            Login/Register
          </Link>
        )}
      </div>
    </div>

  )
}
