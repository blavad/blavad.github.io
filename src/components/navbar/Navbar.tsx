import { PropsWithChildren } from 'react';
import useNavigate from '~/hooks/useNavigate';

function Navbar({ children }: PropsWithChildren<{}>) {
    const navigate = useNavigate();

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
                            Tech Lead
                        </a>
                        <a
                            className="hover:text-black2/50 cursor-pointer pr-6 font-bold"
                            onClick={() => {
                                navigate('/teaching');
                            }}
                        >
                            Formateur
                        </a>
                        <a href="#contact" className="hover:text-black2/50 pr-6 font-bold">
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
