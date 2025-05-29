import { motion } from 'framer-motion';
import { useLoading } from '~/stores/useLoading';

function LoadingPage() {
    const { loading, loadingColor, loadingMessage } = useLoading(); // This can be replaced with a state or prop to control loading status

    return (
        <motion.div
            initial={{ top: 0 }}
            animate={{
                top: loading ? 0 : '-100vh',
                transition: { duration: 0.3 },
            }}
            className="fixed top-0 left-0 z-20 flex h-[100vh] w-[100vw] flex-col items-center justify-center"
            style={{
                background: `var(--color-gradient-${loadingColor})`,
            }}
        >
            <div className="flex flex-col justify-end">
                <span className="font-inter text-6xl leading-10 font-black">blavad</span>
                <p className="text-right">website</p>
                <p className="mt-4 text-sm font-light">{loadingMessage}</p>
            </div>
        </motion.div>
    );
}

export default LoadingPage;
