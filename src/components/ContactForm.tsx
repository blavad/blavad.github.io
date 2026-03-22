import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Topics } from '~/types/topics';

export type ContactFormProps = {
    className?: string;
    color: string;
    defaultTopic?: Topics;
    onTopicChange: (theme: string) => void;
};

function ContactForm({ className, color, defaultTopic, onTopicChange }: ContactFormProps) {
    const form = useRef<any>(undefined);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const { t } = useTranslation();
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
                <p className="label-text">{t('contactForm.name')}</p>
                <input
                    type="text"
                    name="user_name"
                    className="input input-bordered"
                    required
                    disabled={loading}
                />
            </label>

            <label className="form-control mb-4">
                <p className="label-text">{t('contactForm.email')}</p>
                <input
                    type="email"
                    name="user_email"
                    className="input input-bordered"
                    required
                    disabled={loading}
                />
            </label>

            <label className="form-control mb-4">
                <p className="label-text">{t('contactForm.subject')}</p>
                <select
                    defaultValue={defaultTopic ? defaultTopic : t('contactForm.chooseTopic')}
                    className="select"
                    name="subject"
                    onChange={onChangeTheme}
                    disabled={loading}
                >
                    <option disabled={true}>{t('contactForm.chooseTopic')}</option>
                    <option value="tech">{t('contactForm.topics.tech')}</option>
                    <option value="teaching">{t('contactForm.topics.teaching')}</option>
                    <option value="games">{t('contactForm.topics.games')}</option>
                    <option value="ecology">{t('contactForm.topics.ecology')}</option>
                    <option value="art">{t('contactForm.topics.art')}</option>
                </select>
            </label>

            <label className="form-control mb-4">
                <p className="label-text">{t('contactForm.message')}</p>
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
                {loading ? <ClipLoader /> : t('contactForm.send')}
            </Button>

            {status === 'success' && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    className="text-success fixed bottom-5 left-[50%] mt-4 -translate-x-[50%] rounded-3xl border-[2px] bg-white/75 px-4 py-2 backdrop-blur-sm"
                >
                    {t('contactForm.success')}
                </motion.p>
            )}
            {status === 'error' && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    className="text-error fixed bottom-5 left-[50%] mt-4 -translate-x-[50%] rounded-3xl border-[2px] bg-white/75 px-4 py-2 backdrop-blur-sm"
                >
                    {t('contactForm.error')}
                </motion.p>
            )}
        </form>
    );
}

export default ContactForm;
