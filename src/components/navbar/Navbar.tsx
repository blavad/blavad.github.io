import { PropsWithChildren } from 'react';
import useNavigate from '~/hooks/useNavigate';

function Navbar({ children }: PropsWithChildren<{}>) {
    const navigate = useNavigate();
    const scrollToSection = (sectionID: string) => {
        const el = document.getElementById(sectionID);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 z-10 cursor-pointer pt-6 pl-4 text-3xl font-bold sm:pl-14"
                onClick={() => {
                    navigate('/');
                }}
            >
                blavad
            </div>
            <nav className="fixed top-0 right-0 z-10 pt-6 pr-4 sm:pr-14">
                <div className="items-center justify-center md:flex">
                    <div className="hidden items-center md:flex">
                        <a
                            className="hover:text-black2/50 cursor-pointer pr-6 font-bold"
                            onClick={() => {
                                navigate('/tech');
                            }}
                        >
                            Créer un MVP
                        </a>
                        <a
                            className="hover:text-black2/50 cursor-pointer pr-6 font-bold"
                            onClick={() => {
                                navigate('/teaching');
                            }}
                        >
                            Formations
                        </a>
                        <a
                            className="hover:text-black2/50 cursor-pointer pr-6 font-bold"
                            onClick={() => {
                                scrollToSection('contact');
                            }}
                        >
                            Let's talk
                        </a>
                    </div>
                    <div>{children}</div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
