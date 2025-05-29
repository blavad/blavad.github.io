import Navbar from '~/components/navbar/Navbar';
import Card from '~/components/ui/card';
import { Button } from '~/components/ui/button';

import Schools from '~/data/schools.json';
import Courses from '~/data/courses.json';
import { DynamicIcon } from 'lucide-react/dynamic';
import ContactSection from './home/ContactSection';
import { scrollToSection } from '~/lib/utils';

const ICONS: Record<string, 'radical' | 'code-xml' | 'bot'> = {
    maths: 'radical',
    info: 'code-xml',
    ia: 'bot',
};

function Teaching() {
    return (
        <div className="flex flex-col items-center justify-center">
            <section id="hero" className="sm:px-20">
                <Card
                    title="Formations"
                    label="“ La meilleure façon d’apprendre est de s’amuser. “"
                    variant="page"
                    color="purple"
                    className="mt-30 px-5 sm:px-40"
                >
                    <div className="max-w-full sm:max-w-2/3">
                        <p>
                            Depuis 2021, j'enseigne dans des écoles du supérieur sur des thématiques
                            liées aux{' '}
                            <b>mathématiques, à l’informatique et à l'intelligence artificielle</b>.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-5">
                            <Button color="purple" onClick={() => scrollToSection('courses')}>
                                Accéder aux cours
                            </Button>
                            <Button color="purple" onClick={() => scrollToSection('contact')}>
                                Me contacter
                            </Button>
                        </div>

                        <div className="mt-20">
                            <div className="mt-6 flex w-full justify-between">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-gradient-purple">3</h1>
                                    <p>écoles</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h1 className="text-gradient-purple">+150</h1>
                                    <p>étudiants formés</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h1 className="text-gradient-purple">6</h1>
                                    <p>matières</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>
            <section id="courses" className="mt-20 w-full px-5 sm:px-40">
                <h2>Les cours</h2>
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
                                        `https://www.david-albert.fr/teaching-docs/${course.id}`,
                                        '_blank',
                                        'noopener,noreferrer'
                                    )
                                }
                            >
                                <DynamicIcon name={ICONS[course.topic]} size={25} />
                                {course.name}
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
            <section id="schools" className="mt-20 w-full px-5 sm:px-40">
                <h2>Les écoles partenaires</h2>
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
            </section>
            <ContactSection />
        </div>
    );
}

export default Teaching;
