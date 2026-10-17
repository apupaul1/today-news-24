"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export interface NavLinksProps {
    href: string,
    children: React.ReactNode
}

const NavLinks = ({href, children}: NavLinksProps) => {

    const pathname = usePathname();

    const isActive = href === pathname

    return (
        <Link href={href} className={`${isActive ? 'text-red-600 font-bold' : ''}`}>
            {children}
        </Link>
    );
};

export default NavLinks;