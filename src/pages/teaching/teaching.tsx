import { cn } from '~/lib/utils';
import { Shapes } from './shapes';

const Schools = [
    {
        name: 'Nexa Digital School',
        logo: '/images/logo-nexa.png',
        link: 'https://www.nexa.fr/',
        description: 'Nexa Digital School est une école spécialisée dans le digital.',
    },
    {
        name: 'GEMA',
        logo: '/images/logo-gema.png',
        link: 'https://www.groupe-gema.com/nexa',
        description: "GEMA est une école de management et d'ingénierie.",
    },
    {
        name: 'Insa Lyon',
        logo: '/images/logo-insa2.png',
        link: 'https://www.groupe-insa.fr/',
        description: "L'INSA de Lyon est une école d'ingénieurs généraliste.",
    },
];

export function Teaching() {
    return (
        <div className="max-w-200">
            <Shapes />
            <section id="intro">
                <h1 className="transform">‍🎓 Enseignement</h1>
                <blockquote cite="https://david.albert.fr">
                    <h2>“ La meilleure façon d’apprendre est de s’amuser. “</h2>
                </blockquote>
                <div className="square square-blue w-9/10">
                    <p>
                        Depuis 2021, j'enseigne dans des écoles du supérieur sur des thématiques
                        liées aux{' '}
                        <b>mathématiques, à l’informatique et à l'intelligence artificielle</b>.
                    </p>
                    <br />
                    <a className="font-light">Accéder aux cours</a>
                    <p>v</p>
                </div>
            </section>
            <section id="schools">
                <h3>Les écoles partenaires</h3>
                <ul className="flex w-full justify-between">
                    {Schools.map((school) => (
                        <li
                            key={school.name}
                            className={cn('flex justify-center h-16', `w-1/${Schools.length + 1}`)}
                        >
                            <div className="relative flex justify-center group w-fit h-full">
                                <img
                                    src={school.logo}
                                    alt={`${school.name} logo`}
                                    className="cursor-pointer object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition duration-500"
                                />

                                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-60 bg-black2/75 p-2 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-white text-sm rounded-xl">
                                    ‍🎓 {school.description}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section id="cours">
                <h3>Les cours</h3>
                <div className="grid grid-flow-row grid-cols-2 gap-4 w-full">
                    <div className="square square-light-blue">
                        <h4>Mathématiques</h4>
                    </div>
                    <div className="square square-light-blue">
                        <h4>Informatique</h4>
                    </div>
                    <div className="square square-light-blue">
                        <h4>Informatique et IA</h4>
                    </div>
                    <div className="square square-light-blue">
                        <h4>Mathématiques</h4>
                    </div>
                    <div className="square square-light-blue">
                        <h4>Mathématiques</h4>
                    </div>
                    <div className="square square-light-blue">
                        <h4>Data Sciences</h4>
                    </div>
                </div>
            </section>
            <section id="stats">
                <h3>Quelques chiffres</h3>
            </section>
            <section id="stats-extra">
                <h3>Nombre d'interventions par module</h3>
            </section>
        </div>
    );
}
