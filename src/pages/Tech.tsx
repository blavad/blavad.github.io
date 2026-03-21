import Projects from '~/data/projects.json';
import Companies from '~/data/companies.json';

import Card from '~/components/ui/card';
import { Button } from '~/components/ui/button';

import ContactSection from './home/ContactSection';
import { scrollToSection } from '~/lib/utils';

function Tech() {
    return (
        <div className="flex flex-col items-center justify-center">
            <section id="hero" className="sm:px-20">
                <Card
                    title="Créer un MVP"
                    label="“ Parce que l’imagination n’a pas de limite. “"
                    variant="page"
                    color="blue"
                    className="mt-30 px-5 sm:px-40"
                >
                    <div className="max-w-full sm:max-w-2/3">
                        <p>
                            Vous souhaitez tester une idée de produit high tech ? Automatiser des
                            tâches ? Ou lancer une application web et mobile ? Je vous conseille
                            pour la mise en place et je mets en place le MVP qu'il vous faut en
                            quelques jours.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-5">
                            <Button color="blue" onClick={() => scrollToSection('contact')}>
                                Démarrer votre projet
                            </Button>
                            <Button color="blue" onClick={() => scrollToSection('contact')}>
                                Me contacter
                            </Button>
                        </div>
                    </div>
                </Card>
            </section>

            <section id="companies" className="mt-20 w-full px-5 sm:px-20">
                <h3>Ils m'ont fait confiance</h3>
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
                                    ‍{school.description}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section id="projects" className="mt-20 w-full px-5 lg:px-40">
                <h3>Quelques projets</h3>
                <div className="mt-15 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
                    {Projects.map((project) => (
                        <div
                            key={project.short_title}
                            className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl"
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
                            <div className="absolute right-0 bottom-0 left-0 p-3">
                                <p className="text-sm leading-tight font-bold text-white">
                                    {project.short_title}
                                </p>
                                <p className="mt-1 line-clamp-2 text-xs text-white/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    {project.brief}
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
