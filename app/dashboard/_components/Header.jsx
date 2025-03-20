'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function Header() {
    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]); // Add 'path' as a dependency

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} width={50} height={10} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li>
                    <Link href="/dashboard" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/learndashboard" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/learndashboard' && 'text-primary font-bold'}`}>
                        Course Generator
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/how" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>
                        How it works
                    </Link>
                </li>
            </ul>
            <UserButton />
        </div>
    );
}

export default Header;
