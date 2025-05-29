import { motion } from 'framer-motion';
import Unboared from '~/components/Unboared';
import { Button } from '~/components/ui/button';
import Card from '~/components/ui/card';
import useNavigate from '~/hooks/useNavigate';

import Hero from './Hero';
import ContactSection from './ContactSection';

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Hero />
            <div id="home-content" className="flex flex-col items-center justify-center">
                <motion.section
                    id="presta"
                    className="mt-20 px-5 sm:px-40"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                >
                    <h1>Comment je peux t'aider à développer ton activité ?</h1>
                    <div className="mt-15 flex flex-wrap gap-10">
                        <Card
                            className="flex-1"
                            title="En créant ton MVP"
                            label="startups"
                            color="blue"
                        >
                            Je t'aide à créer ton MVP pour valider ton idée rapidement et
                            efficacement.
                            {/* Je peux t'accompagner dans la définition des fonctionnalités clés,
                            l'architecture technique et le choix des technologies. */}
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button
                                    color="blue"
                                    className="min-w-40"
                                    onClick={() => navigate('/tech')}
                                >
                                    En savoir plus
                                </Button>
                            </div>
                        </Card>
                        <Card
                            className="flex-1"
                            title="En support aux équipes"
                            label="entreprises"
                            color="red"
                        >
                            J'accompagne les équipes techniques à améliorer leur productivité et
                            leur efficacité.
                            {/* JJe peux t'aider à mettre en place des bonnes pratiques de développement,
                            à améliorer la qualité du code et à optimiser les processus. */}
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button
                                    color="red"
                                    className="min-w-40"
                                    onClick={() => navigate('/tech')}
                                >
                                    En savoir plus
                                </Button>
                            </div>
                        </Card>
                        <Card
                            className="flex-1"
                            title="En formant les étudiants"
                            label="écoles"
                            color="purple"
                        >
                            Je forme tes équipes aux meilleures pratiques de développement et aux
                            dernières technologies.
                            <div className="mt-6 flex flex-wrap gap-5">
                                <Button
                                    color="purple"
                                    className="min-w-40"
                                    onClick={() => navigate('/teaching')}
                                >
                                    En savoir plus
                                </Button>
                                <Button
                                    color="purple"
                                    className="min-w-40"
                                    onClick={() => navigate('/teaching#courses')}
                                >
                                    Accéder aux cours
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
                            <h1>Découvre Unboared</h1>
                            <div className="font-inter mt-4 w-3/4">
                                <p>
                                    Unboared offre aux espaces d'affluences une expérience inédite
                                    pour leurs visiteurs.
                                </p>
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
                                    En savoir plus
                                </Button>
                                <Button
                                    color="red"
                                    className="w-40"
                                    onClick={() =>
                                        open(
                                            'https://console.unboared.com/app/demo?game=geoloc',
                                            '_blank',
                                            'noopener,noreferrer'
                                        )
                                    }
                                >
                                    Tester la démo
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
                    <h1>Et sinon ?</h1>
                    <div className="mt-15 flex flex-wrap gap-10">
                        <Card className="flex-1" title="De l'écologie .." label="" color="green">
                            Si tu souhaites juste explorer mes projets et mes cours. Cet espace est
                            également là pour ça.
                        </Card>
                        <Card className="flex-1" title=".. et du sport" label="" color="pink">
                            Si tu souhaites juste explorer mes projets et mes cours. Cet espace est
                            également là pour ça.
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
