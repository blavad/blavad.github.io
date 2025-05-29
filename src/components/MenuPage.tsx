import { motion } from 'framer-motion';
import { MENU_ANIMATION_DURATION } from '~/config/global';
import useNavigate from '~/hooks/useNavigate';
import { scrollToSection, sleep } from '~/lib/utils';
import { useMenu } from '~/stores/useMenu';

const NavData: Array<{ title: string; path: string }> = [
    { title: 'Créer un MVP', path: '/tech' },
    { title: 'Formations', path: '/teaching' },
    { title: "Let's talk", path: 'contact' },
];

function MenuPage() {
    const { isOpen, variant, close } = useMenu();
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        if (path.startsWith('/')) {
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
            className="fixed top-0 left-0 z-10 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-white"
        >
            <div className="flex flex-col justify-end">
                <div className="flex flex-col items-center">
                    {NavData.map((item) => (
                        <a
                            className="hover:text-black2/50 cursor-pointer pr-6 text-3xl font-bold"
                            onClick={() => {
                                handleNavigate(item.path);
                            }}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default MenuPage;
