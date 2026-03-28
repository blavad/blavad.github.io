import { useTranslation } from 'react-i18next';
import { SeoHead } from '~/components/SeoHead';
import Projects from '~/data/projects.json';
import Companies from '~/data/companies.json';

import Card from '~/components/ui/card';
import { Button } from '~/components/ui/button';

import ContactSection from './home/ContactSection';
import { scrollToSection, getLocalizedField } from '~/lib/utils';

function Tech() {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center">
            <SeoHead
                title="Tech — David Albert"
                description="Création de MVP, développement web & mobile, automatisation. David Albert accompagne startups et entreprises dans leurs projets tech."
                path="/tech"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Création de MVP & Conseil Tech',
                    description:
                        'Développement web et mobile, automatisation, accompagnement technique pour startups et entreprises.',
                    provider: {
                        '@type': 'Person',
                        name: 'David Albert',
                        url: 'https://www.david-albert.fr',
                    },
                    serviceType: 'Développement logiciel',
                    areaServed: 'FR',
                    url: 'https://www.david-albert.fr/tech',
                }}
            />
            <section id="hero" className="sm:px-20">
                <Card
                    title={t('tech.heroCard.title')}
                    label={t('tech.heroCard.label')}
                    variant="page"
                    color="blue"
                    className="mt-30 w-screen px-5 sm:w-[90vw] sm:px-40"
                >
                    <div className="max-w-full sm:max-w-2/3">
                        <p>{t('tech.heroCard.description')}</p>
                        <div className="mt-6 flex flex-wrap gap-5">
                            <Button color="blue" onClick={() => scrollToSection('contact')}>
                                {t('tech.heroCard.startProject')}
                            </Button>
                            <Button color="blue" onClick={() => scrollToSection('contact')}>
                                {t('tech.heroCard.contact')}
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>

            <section id="companies" className="mt-20 w-full px-5 sm:px-20">
                <h3>{t('tech.companiesTitle')}</h3>
                <ul className="mt-15 flex flex-wrap justify-between gap-15">
                    {Companies.map((school) => (
                        <li
                            key={school.name}
                            className="flex h-20 flex-1 items-center justify-center"
                        >
                            <div className="group relative flex h-full w-60 justify-center">
                                <img
                                    src={school.logo}
                                    alt={`${school.name} logo`}
                                    className="cursor-pointer object-contain opacity-60 grayscale filter transition duration-300 hover:opacity-100 hover:grayscale-0"
                                />
                                <div className="bg-black2/75 bg-opacity-60 absolute -bottom-20 left-1/2 flex w-60 -translate-x-1/2 items-center justify-center rounded-xl p-2 text-sm text-white opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                                    ‍{getLocalizedField(school, 'description', i18n.language)}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section id="projects" className="mt-20 w-full px-5 lg:px-40">
                <h3>{t('tech.projectsTitle')}</h3>
                <div className="mt-15 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Projects.map((project) => (
                        <div
                            key={project.short_title}
                            className="group relative aspect-8/3 cursor-pointer overflow-hidden rounded-2xl sm:aspect-4/3"
                            onClick={() =>
                                window.open(project.url, '_blank', 'noopener noreferrer')
                            }
                        >
                            <img
                                src={project.img || project.imgVertical}
                                alt={`${project.short_title} icon`}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                            <div className="absolute right-0 -bottom-1 left-0 translate-y-9 p-3 transition-transform duration-300 group-hover:translate-y-0">
                                <p className="text-sm leading-tight font-bold text-white">
                                    {project.short_title}
                                </p>
                                <p className="mt-1 line-clamp-2 text-xs text-white/75">
                                    {getLocalizedField(project, 'brief', i18n.language)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <ContactSection defaultTopic="tech" />
        </div>
    );
}

export default Tech;
