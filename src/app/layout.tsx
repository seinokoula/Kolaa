'use client';

import { Dialog, Menu, Popover } from '@headlessui/react';
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ThemeProvider } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { JSX, SVGProps, useState } from 'react';
import { supabase } from '../../src/app/components/Server/supabase';
import './globals.css';
import Modal from './components/modal';

const navigation = {
  company: [
    { name: 'Faq', href: '#' },
  ],
  legal: [
    { name: 'Content privacy', href: '#' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/seinokoula/open_new_teck_a4',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState<string | undefined>('');
  const [isLogout, setIsLogout] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
    else {
    setIsLogout(true);
  };
  }

  const checkAuth = async () => {
    try {
      const authenticated = await supabase.auth.getUser()
      setEmail(authenticated?.data?.user?.email);
      console.log(authenticated);
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification :", error);
    }
  };
  checkAuth();

  return (
    <html>
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          <div>
          {isLogout && <Modal modalText={'Vous etes deconnecté !'} locationHref='/login' />}

            <header className="">
              <nav className="mx-auto flex max-w-7xl items-center justify-between relative  px-6 py-12 lg:px-16" aria-label="Global">
                <div className="flex">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Open Tech</span>
                    <Image width={350} height={350} className="h-8 w-auto" src="https://lkhayewnehhxhqkckehs.supabase.co/storage/v1/object/public/logo/Logo.png?t=2024-02-13T10%3A19%3A59.018Z" alt="" />
                  </Link>
                </div>
                <div className="flex lg:hidden">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className=" absolute hidden lg:flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Popover.Group className="max-sm:invisible flex gap-x-6 rounded-full bg-[rgba(39,39,42,.9)] px-4 py-2 border-2 border-secondary_200">
                    <div>
                      <Link href="profile" className="text-sm font-medium leading-6 py-2  hover:text-primary_300 transition">Profile</Link>
                    </div>
                    <div>
                      <Link href="faq" className="text-sm font-medium leading-6 py-2  hover:text-primary_300 transition">Faq</Link>
                    </div>
                  </Popover.Group>
                </div>
                <div className="flex gap-x-4">
                  {email ? (
                    <Link href="login" className="text-sm font-semibold leading-6 border-secondary_200 border-2 rounded-md px-3 py-2" onClick={handleSignOut}>
                      Log Out
                    </Link>
                  ) : (
                    <>
                      <Link href="signup" className="text-sm font-semibold leading-6 border-secondary_200 border-2 rounded-md px-3 py-2">
                        Sign Up
                      </Link>
                      <Link href="login" className="text-sm font-semibold leading-6 py-2">
                        Log In
                      </Link>
                    </>
                  )}
                </div>
              </nav>
              <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                    <Link href="#" className="-m-1.5 p-1.5">
                      <span className="sr-only">Kolaa</span>
                      <Image
                        width={350}
                        height={350}
                        className="h-8 w-auto"
                        src="https://lkhayewnehhxhqkckehs.supabase.co/storage/v1/object/public/logo/Logo.png?t=2024-02-13T10%3A19%3A59.018Z"
                        alt=""
                      />
                    </Link>
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        <Link
                          href="profile"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                        >
                          Profile
                        </Link>
                        <Link
                          href="faq"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                        >
                          Faq
                        </Link>
                        <Link
                          href="signup"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                        >
                          SignUp
                        </Link>
                        <Link
                          href="login"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                        >
                          LogIn
                        </Link>

                      </div>
                      <div className="py-6">
                        <Link
                          href="#"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
                        >
                          <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Profile
                                {/* <ChevronDownIcon className="-mr-1 h-5 w-5 " aria-hidden="true" /> */}
                              </Menu.Button>
                            </div>
                          </Menu>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Dialog>
            </header>
              <main data-barba="container" data-barba-namespace="basic" className="flex-auto md:mx-16 lg:mx-36">{children}</main>
            <footer aria-labelledby="footer-heading">
              <h2 id="footer-heading" className="sr-only">
                Footer
              </h2>
              <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                  <div className="space-y-8">
                    <Image
                      width={40}
                      height={35}
                      className="h-8"
                      src="https://lkhayewnehhxhqkckehs.supabase.co/storage/v1/object/public/logo/Logo.png?t=2024-02-13T10%3A19%3A59.018Z"
                      alt="Company name"
                    />
                    <p className="text-sm leading-6">
                    Pour voir votre nouvelle veille technologique.
                    </p>
                    <div className="flex space-x-6">
                      {navigation.social.map((item) => (
                        <Link key={item.name} href={item.href} className="hover:text-gray-500">
                          <span className="sr-only">{item.name}</span>
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                      <div>
                        <h3 className="text-sm font-semibold leading-6">Company</h3>
                        <ul role="list" className="mt-6 space-y-4">
                          {navigation.company.map((item) => (
                            <li key={item.name}>
                              <Link href={item.href} className="text-sm leading-6">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-10 md:mt-0">
                        <h3 className="text-sm font-semibold leading-6">Legal</h3>
                        <ul role="list" className="mt-6 space-y-4">
                          {navigation.legal.map((item) => (
                            <li key={item.name}>
                              <Link href={item.href} className="text-sm leading-6">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-16 border-t border-secondary_200 pt-8 sm:mt-20 lg:mt-24">
                  <p className="text-xs leading-5 text-gray-500">&copy; 2024 Kalo, Inc. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
