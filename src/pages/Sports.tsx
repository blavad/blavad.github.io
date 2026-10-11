import { useTranslation } from 'react-i18next';

import { cn, scrollToSection } from '~/lib/utils';
import { motion } from 'framer-motion';
import Card from '~/components/ui/card';
import BlavadIcon from '~/components/ui/BlavadIcon';
import { SeoHead } from '~/components/SeoHead';
import { Button } from '~/components/ui/button';

import SwimmingRecords from '~/components/SwimmingRecords';

import ContactSection from './home/ContactSection';

// Sports pratiqués, affichés en capsules (noms dans `sports.disciplines.<id>` des traductions).
// `current` : sports du moment, mis en avant
const DISCIPLINES = [
    { id: 'swimming', icon: 'swimming', current: true },
    { id: 'acroyoga', icon: 'acroyoga', current: true },
    { id: 'trail', icon: 'trail', current: false },
    { id: 'hiking', icon: 'hiking', current: false },
    { id: 'basketball', icon: 'basketball', current: false },
    { id: 'volleyball', icon: 'volleyball', current: false },
    { id: 'cycling', icon: 'cycling', current: false },
];

// Les trois rôles de l'acroyoga (textes dans `sports.acroyoga.roles.<id>`)
const ACROYOGA_ROLES = [
    { id: 'base', icon: 'acro-base' },
    { id: 'flyer', icon: 'acro-flyer' },
    { id: 'spotter', icon: 'acro-spotter' },
];

function Sports() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center">
            <SeoHead
                title="Sport — David Albert"
                description="Le sport, une passion de toujours : natation, acroyoga, trail, randonnée, basket, volley et vélo. Records personnels de natation (FFN)."
                path="/sports"
            />
            <section id="hero" className="sm:px-20">
                <Card
                    title={t('sports.heroCard.title')}
                    label={t('sports.heroCard.label')}
                    variant="page"
                    color="pink"
                    className="mt-30 w-screen px-5 sm:w-[90vw] sm:px-40"
                >
                    <div className="max-w-full sm:max-w-2/3">
                        <p>{t('sports.heroCard.description')}</p>
                        <div className="mt-6 flex flex-wrap gap-5">
                            <Button color="pink" onClick={() => scrollToSection('disciplines')}>
                                {t('sports.heroCard.discover')}
                            </Button>
                            <Button color="pink" onClick={() => scrollToSection('contact')}>
                                {t('sports.heroCard.contact')}
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>
            <section id="disciplines" className="mt-20 w-full px-5 sm:px-20 lg:px-40">
                <h3>{t('sports.disciplinesTitle')}</h3>
                <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-15">
                    {DISCIPLINES.map(({ id, icon, current }) => (
                        <motion.span
                            key={id}
                            whileHover={{ scale: 1.08 }}
                            className={cn(
                                'flex items-center gap-2 rounded-full px-5 py-2.5 font-bold shadow-sm',
                                current ? 'text-white shadow-md' : 'bg-gradient-pink'
                            )}
                            style={
                                current ? { background: 'var(--color-gradient-pink)' } : undefined
                            }
                        >
                            <BlavadIcon name={icon} size={20} />
                            {t(`sports.disciplines.${id}`)}
                        </motion.span>
                    ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 opacity-75">
                    <p className="flex items-center gap-2 text-sm">
                        <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{ background: 'var(--color-gradient-pink)' }}
                        />
                        {t('sports.currentLegend')}
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                        {/* Teinte du haut des capsules « autres sports » */}
                        <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{ background: 'var(--color-pink-t25)' }}
                        />
                        {t('sports.otherLegend')}
                    </p>
                </div>
            </section>
            <section id="swimming" className="mt-20 w-full px-5 sm:px-20 lg:px-40">
                <h3>{t('sports.swimming.title')}</h3>
                <p className="mt-4 opacity-75">{t('sports.swimming.intro')}</p>
                <SwimmingRecords />
            </section>
            <section id="acroyoga" className="mt-20 w-full px-5 sm:px-20 lg:px-40">
                <h3>{t('sports.acroyoga.title')}</h3>
                <p className="mx-auto mt-4 max-w-3xl opacity-75">{t('sports.acroyoga.intro')}</p>
                <div className="mt-10 flex flex-wrap gap-6 sm:mt-15">
                    {ACROYOGA_ROLES.map(({ id, icon }) => (
                        <div
                            key={id}
                            className="bg-gradient-pink flex min-w-56 flex-1 flex-col items-center gap-3 rounded-3xl p-6 text-center"
                        >
                            <span
                                className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md"
                                style={{ background: 'var(--color-gradient-pink)' }}
                            >
                                <BlavadIcon name={icon} size={24} />
                            </span>
                            <h4 className="text-gradient-pink font-bold">
                                {t(`sports.acroyoga.roles.${id}.name`)}
                            </h4>
                            <p className="text-sm">
                                {t(`sports.acroyoga.roles.${id}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
                <p className="mx-auto mt-8 max-w-3xl opacity-75">{t('sports.acroyoga.benefits')}</p>
            </section>
            <ContactSection defaultTopic="sports" />
        </div>
    );
}

export default Sports;
