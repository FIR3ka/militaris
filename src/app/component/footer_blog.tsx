import React from 'react';
import Link from 'next/link'

const Footer = () => {
    return(
    <div className='items-center bg-stone-50'>
        <div className='mx-auto container pb-[8.5em] pt-[3em] px-[1.1em] lg:px-[var(--standard)]'>
            <ul className='flex'>
                <li className='mr-3'><Link href={"/about-us"}>Chi siamo</Link></li>
                <li>© Copyright 2025 Militaris</li>
            </ul>
        </div>
    </div>
    )
}

export default Footer;