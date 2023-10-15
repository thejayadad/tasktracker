'use client'
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { text: 'Dashboard', href: '/' },
    { text: 'Task', href: '/task' },
  ];

  return (
    <header className="px-4 py-12 w-full">
      <div className="flex justify-between max-w-screen-xl mx-auto">
        <Link className="text-md" href={'/'}>
          TaskManagement
        </Link>
        <div className="flex justify-between items-center">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              <span
                className={`${
                  link.href === currentPath
                    ? 'text-zinc-900' // Apply this class for the active link
                    : 'text-gray-500'
                } mr-4 hover:text-gray-800 transition-colors`}
              >
                {link.text}
              </span>
            </Link>
          ))}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
