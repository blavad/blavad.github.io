import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { MENU_ANIMATION_DURATION } from '~/config/global';
import { isExternalLink, scrollToSection, sleep } from '~/lib/utils';
import socials from '~/data/socials.json';
import BlavadIcon from '~/components/ui/BlavadIcon';
import LanguageSwitcher from '~/components/ui/LanguageSwitcher';
import useNavigate from '~/hooks/useNavigate';
import { useMenu } from '~/stores/useMenu';

function MenuPage() {
    const { isOpen, variant, close } = useMenu();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const NavData: Array<{ title: string; path: string }> = [
        { title: t('nav.home'), path: '/' },
        { title: t('nav.mvp'), path: '/tech' },
        { title: t('nav.teaching'), path: '/teaching' },
        { title: t('nav.unboared'), path: 'https://unboared.com/' },
        { title: t('nav.contact'), path: 'contact' },
    ];

    const handleNavigate = (path: string) => {
        if (isExternalLink(path)) {
            open(path, '_blank', 'noopener,noreferrer');
        } else if (path.startsWith('/')) {
            navigate(path);
            sleep(MENU_ANIMATION_DURATION).then(() => {
                close();
            });
        } else {
            close();
            scrollToSection(path);
        }
    };

    return (
        <motion.div
            initial={{ top: 0 }}
            animate={{
                top: isOpen && variant !== 'hero' ? 0 : '-100vh',
                transition: { duration: MENU_ANIMATION_DURATION / 1000 },
            }}
            className="bg-bg fixed top-0 left-0 z-10 flex h-[100vh] w-[100vw] flex-col items-center justify-center"
        >
            <div className="flex h-full w-[80%] flex-col justify-center sm:w-1/3">
                <h1 className="">{t('nav.menu')}</h1>
                <div className="mt-4 flex flex-col items-center gap-3 sm:mt-6">
                    {NavData.map((item) => (
                        <div key={item.path} className="flex items-center justify-center">
                            <a
                                className="hover:text-text/50 decoration-black2 decoration-1.5 cursor-pointer text-3xl font-bold underline"
                                onClick={() => {
                                    handleNavigate(item.path);
                                }}
                            >
                                {item.title}
                            </a>
                            {isExternalLink(item.path) && <ExternalLink className="ml-3" />}
                        </div>
                    ))}
                    <LanguageSwitcher className="text-3xl" />
                </div>
                <div className="mt-20 flex w-full items-center justify-between gap-3">
                    {(socials as any).map((item: any) => (
                        <motion.div
                            key={item.name}
                            whileHover={{ scale: 1.2 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <BlavadIcon
                                name={item.icon}
                                size={36}
                                className="hover:text-text/50 decoration-black2 decoration-1.5 cursor-pointer text-3xl font-bold underline"
                                onClick={() => {
                                    handleNavigate(item.url);
                                }}
                            />
                            <small>{item.name}</small>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default MenuPage;
