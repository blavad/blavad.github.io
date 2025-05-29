import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button } from './ui/button';

export type ContactFormProps = {
    className?: string;
    color: string;
    onTopicChange: (theme: string) => void;
};

function ContactForm({ className, color, onTopicChange }: ContactFormProps) {
    const form = useRef<any>(undefined);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const contactFormClass = `flex flex-col p-6 ${className}`;

    const onChangeTheme = (e: any) => {
        const theme = e.target.value;
        onTopicChange(theme);
    };

    const sendEmail = (e: any) => {
        setLoading(true);
        e.preventDefault();

        emailjs
            .sendForm('service_y30gkx4', 'template_5mz6lfm', form.current, 'TkuorGIgNI1qQ8rmN')
            .then(
                () => {
                    setStatus('success');
                    setTimeout(() => {
                        setStatus('');
                    }, 3000);
                    form.current.reset();
                    setLoading(false);
                },
                () => {
                    setStatus('error');
                    setTimeout(() => {
                        setStatus('');
                    }, 3000);
                    setLoading(false);
                }
            );
    };

    return (
        <form ref={form} onSubmit={sendEmail} className={contactFormClass}>
            <label className="form-control mb-4">
                <p className="label-text">Nom</p>
                <input
                    type="text"
                    name="user_name"
                    className="input input-bordered"
                    required
                    disabled={loading}
                />
            </label>

            <label className="form-control mb-4">
                <p className="label-text">Email</p>
                <input
                    type="email"
                    name="user_email"
                    className="input input-bordered"
                    required
                    disabled={loading}
                />
            </label>

            <label className="form-control mb-4">
                <p className="label-text">Sujet</p>
                <select
                    defaultValue="Choisir le sujet"
                    className="select"
                    name="subject"
                    onChange={onChangeTheme}
                    disabled={loading}
                >
                    <option disabled={true}>Choisir le sujet</option>
                    <option defaultChecked value="tech">
                        Demande technique
                    </option>
                    <option value="teaching">Demande pour une formation</option>
                    <option value="games">A propos d'Unboared</option>
                    <option value="ecology">Parlons écologie</option>
                    <option value="art">Autre demande</option>
                </select>
            </label>

            <label className="form-control mb-4">
                <p className="label-text">Message</p>
                <textarea
                    name="message"
                    className="textarea textarea-bordered h-24 md:w-1/2"
                    required
                    disabled={loading}
                ></textarea>
            </label>

            <Button
                type="submit"
                className="min-w-50 self-center text-xl text-white"
                color={color}
                disabled={loading}
            >
                {loading ? <ClipLoader /> : 'Envoyer'}
            </Button>

            {status === 'success' && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    className="text-success fixed bottom-5 left-[50%] mt-4 -translate-x-[50%] rounded-3xl border-[2px] bg-white/75 px-4 py-2 backdrop-blur-sm"
                >
                    Message envoyé !
                </motion.p>
            )}
            {status === 'error' && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    className="text-error fixed bottom-5 left-[50%] mt-4 -translate-x-[50%] rounded-3xl border-[2px] bg-white/75 px-4 py-2 backdrop-blur-sm"
                >
                    Erreur, veuillez réessayer.
                </motion.p>
            )}
        </form>
    );
}

export default ContactForm;
