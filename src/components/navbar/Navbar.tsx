import { PropsWithChildren } from 'react';
import useNavigate from '~/hooks/useNavigate';
import RotatingIconButton from '../ui/buttons/RotatingIconButton';
import { useMenu } from '~/stores/useMenu';
import { scrollToSection } from '~/lib/utils';

const NavData: Array<{ title: string; path: string }> = [
    { title: 'Créer un MVP', path: '/tech' },
    { title: 'Formations', path: '/teaching' },
    { title: 'Contact', path: 'contact' },
];

function Navbar({ children }: PropsWithChildren<{}>) {
    const navigate = useNavigate();
    const { isOpen, open, close } = useMenu();

    const handleNavigate = (path: string) => {
        if (path.startsWith('/')) {
            navigate(path);
        } else {
            scrollToSection(path);
        }
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 z-10 cursor-pointer pt-6 pl-4 text-3xl font-bold sm:pl-14"
                onClick={() => {
                    handleNavigate('/');
                }}
            >
                blavad
            </div>
            <nav className="fixed top-0 right-0 z-10 pt-6 pr-4 sm:pr-14">
                <div className="items-center justify-center md:flex">
                    {!isOpen && (
                        <div className="hidden items-center md:flex">
                            {NavData.map((item) => (
                                <a
                                    className="hover:text-black2/50 cursor-pointer pr-6 font-bold"
                                    onClick={() => {
                                        handleNavigate(item.path);
                                    }}
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    )}
                    <RotatingIconButton
                        open={isOpen}
                        onClick={isOpen ? () => close() : () => open()}
                    />
                    {children}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
