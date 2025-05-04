import React from 'react';
import Link from 'next/link'

const Header = () => {
    return(
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2">
        <div className="bg-black-noise text-white-noise">
           <div className="py-[3.3em] px-[1.1em] lg:px-[var(--standard)] flex container m-auto ">
              <div>
                  <h1 className="uppercase font-semibold tracking-wide"><Link href="/home">Militaris</Link></h1>
              </div>
           </div>
        </div>
      </main>
    </div>
    )
}

export default Header;