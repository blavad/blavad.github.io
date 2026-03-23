'use client';

import { useTranslation } from 'react-i18next';
import { SeoHead } from '~/components/SeoHead';
import Card from '~/components/ui/card';
import { Button } from '~/components/ui/button';

import { scrollToSection, getLocalizedField } from '~/lib/utils';
import Schools from '~/data/schools.json';
import Courses from '~/data/courses.json';
import ContactSection from './home/ContactSection';
import BlavadIcon from '~/components/ui/BlavadIcon';
import { RESOURCES_URL } from '~/config/global';

function Teaching() {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center">
            <SeoHead
                title="Formations — David Albert"
                description="Formations en informatique et intelligence artificielle par David Albert. Cours dispensés dans 4 écoles supérieures, +350 étudiants formés."
                path="/teaching"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Course',
                    name: 'Formations en informatique et intelligence artificielle',
                    description:
                        "Cours dispensés dans des écoles supérieures sur les mathématiques, l'informatique et l'intelligence artificielle.",
                    provider: {
                        '@type': 'Person',
                        name: 'David Albert',
                        url: 'https://www.david-albert.fr',
                    },
                    numberOfStudents: 350,
                    url: 'https://www.david-albert.fr/teaching',
                }}
            />
            <section id="hero" className="sm:px-20">
                <Card
                    title={t('teaching.heroCard.title')}
                    label={t('teaching.heroCard.label')}
                    variant="page"
                    color="purple"
                    className="min-w-60vw mt-30 px-5 sm:px-40"
                >
                    <div className="max-w-full sm:max-w-2/3">
                        <p>{t('teaching.heroCard.description')}</p>
                        <div className="mt-6 flex flex-wrap gap-5">
                            <Button color="purple" onClick={() => scrollToSection('courses')}>
                                {t('teaching.heroCard.accessCourses')}
                            </Button>
                            <Button color="purple" onClick={() => scrollToSection('contact')}>
                                {t('teaching.heroCard.contact')}
                            </Button>
                        </div>

                        <div className="mt-20">
                            <div className="mt-6 flex w-full justify-between">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-gradient-purple">4</h1>
                                    <p>{t('teaching.heroCard.stats.schools')}</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h1 className="text-gradient-purple">+350</h1>
                                    <p>{t('teaching.heroCard.stats.students')}</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h1 className="text-gradient-purple">12</h1>
                                    <p>{t('teaching.heroCard.stats.subjects')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>
            <section id="courses" className="mt-20 w-full px-5 sm:px-20 lg:px-40">
                <h3>{t('teaching.coursesTitle')}</h3>
                <div className="mt-15 flex w-full flex-wrap gap-6">
                    {Courses.map((course) => (
                        <div
                            key={course.id}
                            className="flex h-30 flex-1 flex-col items-center justify-center sm:min-w-1/4"
                        >
                            <Button
                                key={course.id}
                                variant="colored"
                                color="purple"
                                className="flex w-full flex-1 flex-col"
                                onClick={() =>
                                    open(
                                        `${RESOURCES_URL}/teaching-docs/${course.id}`,
                                        '_blank',
                                        'noopener,noreferrer'
                                    )
                                }
                            >
                                <BlavadIcon name={course.topic} size={25} />
                                {getLocalizedField(course, 'name', i18n.language)}
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
            <section id="schools" className="mt-20 w-full px-5 sm:px-40">
                <h3>{t('teaching.schoolsTitle')}</h3>
                <ul className="mt-15 flex flex-wrap justify-between gap-15">
                    {Schools.map((school) => (
                        <li
                            key={school.name}
                            className="flex h-20 flex-1 items-center justify-center"
                        >
                            <div className="group relative flex h-full w-60 justify-center">
                                <img
                                    src={school.logo}
                                    alt={`${school.name} logo`}
                                    className="cursor-pointer object-contain opacity-60 grayscale filter transition duration-500 hover:opacity-100 hover:grayscale-0"
                                />
                                <div className="bg-black2/75 bg-opacity-60 absolute -bottom-20 left-1/2 flex w-60 -translate-x-1/2 items-center justify-center rounded-xl p-2 text-sm text-white opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                                    {getLocalizedField(school, 'description', i18n.language)}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <ContactSection defaultTopic="teaching" />
        </div>
    );
}

export default Teaching;
