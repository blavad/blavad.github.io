'use client';

import { motion } from 'framer-motion';
import { SeoHead } from '~/components/SeoHead';
import { useTranslation } from 'react-i18next';
import Unboared from '~/components/Unboared';
import { Button } from '~/components/ui/button';
import Card from '~/components/ui/card';
import useNavigate from '~/hooks/useNavigate';

import Hero from './Hero';
import ContactSection from './ContactSection';
import { scrollToSection } from '~/lib/utils';

function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <SeoHead
                title="David Albert"
                description="David Albert — Ingénieur & consultant tech. Création de MVP, accompagnement d'équipes techniques, formations en informatique et IA."
                path="/"
            />
            <Hero />
            <div id="home-content" className="flex flex-col items-center justify-center">
                <motion.section
                    id="presta"
                    className="mt-20 px-5 sm:px-40"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                >
                    <h2>{t('home.helpTitle')}</h2>
                    <div className="mt-15 flex flex-wrap gap-10">
                        <Card
                            className="flex-1"
                            title={t('home.mvpCard.title')}
                            label={t('home.mvpCard.label')}
                            color="blue"
                        >
                            {t('home.mvpCard.description')}
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button
                                    color="blue"
                                    className="min-w-40"
                                    onClick={() => navigate('/tech')}
                                >
                                    {t('home.mvpCard.learnMore')}
                                </Button>
                            </div>
                        </Card>
                        <Card
                            className="flex-1"
                            title={t('home.teamsCard.title')}
                            label={t('home.teamsCard.label')}
                            color="red"
                        >
                            {t('home.teamsCard.description')}
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button
                                    color="red"
                                    className="min-w-40"
                                    onClick={() => navigate('/tech')}
                                >
                                    {t('home.teamsCard.learnMore')}
                                </Button>
                            </div>
                        </Card>
                        <Card
                            className="flex-1"
                            title={t('home.studentsCard.title')}
                            label={t('home.studentsCard.label')}
                            color="purple"
                        >
                            {t('home.studentsCard.description')}
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button color="purple" onClick={() => navigate('/teaching')}>
                                    {t('home.studentsCard.learnMore')}
                                </Button>
                                <Button
                                    color="purple"
                                    onClick={() => navigate('/teaching#courses')}
                                >
                                    {t('home.studentsCard.accessCourses')}
                                </Button>
                            </div>
                        </Card>
                    </div>
                </motion.section>

                <section id="unboared">
                    <div className="bg-gradient-black mt-10 h-40"></div>
                    <div className="bg-black px-5 pt-20 text-white sm:px-40">
                        <motion.div
                            className="flex flex-col items-center justify-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                        >
                            <h1>{t('home.unboaredSection.title')}</h1>
                            <div className="font-inter mt-4 w-3/4">
                                <p>{t('home.unboaredSection.description')}</p>
                            </div>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                                <Button
                                    color="red"
                                    className="w-40"
                                    onClick={() =>
                                        open(
                                            'https://www.unboared.com',
                                            '_blank',
                                            'noopener,noreferrer'
                                        )
                                    }
                                >
                                    {t('home.unboaredSection.learnMore')}
                                </Button>
                                <Button
                                    color="red"
                                    className="w-40"
                                    onClick={() =>
                                        open(
                                            'https://console.unboared.com/demo',
                                            '_blank',
                                            'noopener,noreferrer'
                                        )
                                    }
                                >
                                    {t('home.unboaredSection.tryDemo')}
                                </Button>
                            </div>
                            <div className="w-full sm:w-2/3">
                                <Unboared />
                            </div>
                        </motion.div>
                    </div>
                    <div className="bg-gradient-white h-40"></div>
                </section>
                <motion.section
                    id="whatelse"
                    className="mt-20 px-5 sm:px-40"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                >
                    <h2>{t('home.whatElse.title')}</h2>
                    <div className="mt-15 flex flex-wrap gap-10">
                        <Card
                            className="flex-1"
                            title={t('home.whatElse.ecologyCard.title')}
                            label=""
                            color="green"
                        >
                            {t('home.whatElse.ecologyCard.description')}
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button color="green" className="w-40" disabled>
                                    {t('home.whatElse.ecologyCard.learnMore')}
                                </Button>
                                <Button
                                    color="green"
                                    className="w-40"
                                    onClick={() => scrollToSection('contact')}
                                >
                                    {t('home.whatElse.ecologyCard.contact')}
                                </Button>
                            </div>
                        </Card>
                        <Card
                            className="flex-1"
                            title={t('home.whatElse.sportsCard.title')}
                            label=""
                            color="pink"
                        >
                            {t('home.whatElse.sportsCard.description')}
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button color="purple" className="w-40" disabled>
                                    {t('home.whatElse.sportsCard.learnMore')}
                                </Button>
                            </div>
                        </Card>
                    </div>
                </motion.section>
                <ContactSection />
            </div>
            <div id="footer"></div>
        </>
    );
}

export default Home;
