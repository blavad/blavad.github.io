import { PropsWithChildren } from 'react';

function Navbar({ children }: PropsWithChildren<{}>) {
    return (
        <>
            <div className="fixed top-0 left-0 z-10 pt-8 pl-10 text-3xl font-bold">blavad</div>
            <nav className="fixed top-0 right-0 z-10 pt-8 pr-10">
                <div className="flex items-center justify-center">
                    <a href="/tech" className="hover:text-black2/50 font-bold">
                        Tech Lead
                    </a>
                    <a href="/teaching" className="hover:text-black2/50 pl-6 font-bold">
                        Formateur
                    </a>
                    <a href="/#contact" className="hover:text-black2/50 pl-6 font-bold">
                        Let's talk
                    </a>
                    <div className="pl-6">{children}</div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
