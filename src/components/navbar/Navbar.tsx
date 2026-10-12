import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import useNavigate from '~/hooks/useNavigate';
import RotatingIconButton from '../ui/buttons/RotatingIconButton';
import DarkModeButton from '../ui/buttons/DarkModeButton';
import { useMenu } from '~/stores/useMenu';
import { getNavHref, isPlainLeftClick, scrollToSection } from '~/lib/utils';

function Navbar({ children }: PropsWithChildren<{}>) {
    const navigate = useNavigate();
    const { isOpen, open, close } = useMenu();
    const { t } = useTranslation();

    const NavData: Array<{ title: string; path: string }> = [
        { title: t('nav.mvp'), path: '/tech' },
        { title: t('nav.teaching'), path: '/teaching' },
        { title: t('nav.contact'), path: 'contact' },
    ];

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (!isPlainLeftClick(event)) return;
        event.preventDefault();
        handleNavigate(path);
    };

    const handleNavigate = (path: string) => {
        if (path.startsWith('/')) {
            navigate(path);
        } else {
            scrollToSection(path);
        }
    };

    return (
        <>
            <a
                href="/"
                className="fixed top-0 left-0 z-10 cursor-pointer pt-6 pl-4 text-3xl font-bold sm:pl-14"
                onClick={(event) => handleClick(event, '/')}
            >
                blavad
            </a>
            <nav className="fixed top-0 right-0 z-10 pt-6 pr-4 sm:pr-14">
                <div className="items-center justify-center md:flex">
                    {!isOpen && (
                        <div className="hidden items-center md:flex">
                            {NavData.map((item) => (
                                <a
                                    key={item.path}
                                    href={getNavHref(item.path)}
                                    className="hover:text-text/50 cursor-pointer pr-6 font-bold"
                                    onClick={(event) => handleClick(event, item.path)}
                                >
                                    {item.title}
                                </a>
                            ))}
                            {/* <LanguageSwitcher className="pr-6" /> */}
                        </div>
                    )}
                    <DarkModeButton className="mr-3" />
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
