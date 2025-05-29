import Navbar from '~/components/navbar/Navbar';
import Card from '~/components/ui/card';
import { Button } from '~/components/ui/button';

import Projects from '~/data/projects.json';
import { DynamicIcon } from 'lucide-react/dynamic';

import ContactSection from './home/ContactSection';

const ICONS: Record<string, 'radical' | 'code-xml' | 'bot'> = {
    maths: 'radical',
    info: 'code-xml',
    ia: 'bot',
};

function Teaching() {
    const scrollToSection = (sectionID: string) => {
        const el = document.getElementById(sectionID);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Navbar />
            <section id="hero" className="sm:px-20">
                <Card
                    title="Créer son MVP"
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
            <section id="projects" className="mt-20 w-full px-5 sm:px-40">
                <h2>Quelques projets</h2>
                <div className="mt-15 flex w-full flex-wrap gap-6">
                    {Projects.map((project) => (
                        <div
                            key={project.short_title}
                            className="flex h-30 flex-1 flex-col items-center justify-center sm:min-w-1/4"
                        >
                            <div
                                className="flex w-full flex-1 flex-col"
                                style={{ backgroundColor: project.img }}
                                onClick={() => open(project.url, '_blank', 'noopener,noreferrer')}
                            >
                                <DynamicIcon name={ICONS[project.topic]} size={25} />
                            </div>
                            <p></p>
                            {project.short_title}
                        </div>
                    ))}
                </div>
            </section>
            {/* <section id="companies" className="mt-20 w-full px-5 sm:px-20">
                <h2>Les entreprises partenaires</h2>
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
                                    ‍🎓 {school.description}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section> */}
            <ContactSection />
        </div>
    );
}

export default Teaching;
