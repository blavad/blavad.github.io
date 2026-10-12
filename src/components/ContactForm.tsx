import { FormEvent, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Topics } from '~/types/topics';
import { cn } from '~/lib/utils';

export type ContactFormProps = {
    className?: string;
    color: string;
    defaultTopic?: Topics;
    onTopicChange: (theme: string) => void;
};

type Field = 'user_name' | 'user_email' | 'subject' | 'message';
type Errors = Partial<Record<Field, string>>;

// Ordre d'affichage : le premier champ en erreur reçoit le focus
const FIELDS: Field[] = ['user_name', 'user_email', 'subject', 'message'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATUS_DURATION = 5000; // Durée d'affichage du message d'envoi (ms)

function ContactForm({ className, color, defaultTopic, onTopicChange }: ContactFormProps) {
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'' | 'success' | 'error'>('');
    const [errors, setErrors] = useState<Errors>({});
    // Après une première tentative d'envoi, les erreurs se mettent à jour pendant la saisie
    const [submitted, setSubmitted] = useState(false);
    const { t } = useTranslation();
    const errorCount = Object.keys(errors).length;

    /** Clé de traduction de l'erreur du champ, ou undefined s'il est valide */
    const validateField = (field: Field, value: string): string | undefined => {
        const trimmed = value.trim();
        switch (field) {
            case 'user_name':
                return trimmed ? undefined : 'contactForm.errors.nameRequired';
            case 'user_email':
                if (!trimmed) return 'contactForm.errors.emailRequired';
                return EMAIL_PATTERN.test(trimmed) ? undefined : 'contactForm.errors.emailInvalid';
            case 'subject':
                return trimmed ? undefined : 'contactForm.errors.subjectRequired';
            case 'message':
                return trimmed ? undefined : 'contactForm.errors.messageRequired';
        }
    };

    const getValue = (field: Field) =>
        (form.current?.elements.namedItem(field) as HTMLInputElement | null)?.value ?? '';

    const validateForm = (): Errors =>
        Object.fromEntries(
            FIELDS.map((field) => [field, validateField(field, getValue(field))]).filter(
                ([, error]) => error
            )
        );

    const onFieldChange = (field: Field) => {
        if (!submitted) return;
        const error = validateField(field, getValue(field));
        setErrors(({ [field]: _, ...others }) => (error ? { ...others, [field]: error } : others));
    };

    const showStatus = (value: 'success' | 'error') => {
        setStatus(value);
        setTimeout(() => setStatus(''), STATUS_DURATION);
    };

    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading || !form.current) return;

        setSubmitted(true);
        const formErrors = validateForm();
        setErrors(formErrors);
        const firstInvalid = FIELDS.find((field) => formErrors[field]);
        if (firstInvalid) {
            (form.current.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
            return;
        }

        setLoading(true);
        try {
            await emailjs.sendForm(
                'service_y30gkx4',
                'template_5mz6lfm',
                form.current,
                'TkuorGIgNI1qQ8rmN'
            );
            form.current.reset();
            setSubmitted(false);
            showStatus('success');
        } catch {
            // Le formulaire garde sa saisie pour pouvoir réessayer
            showStatus('error');
        } finally {
            setLoading(false);
        }
    };

    /** Props communes d'un champ, accessibilité de l'erreur comprise */
    const fieldProps = (field: Field) => ({
        name: field,
        disabled: loading,
        'aria-invalid': !!errors[field],
        'aria-describedby': errors[field] ? `${field}-error` : undefined,
    });

    // Bordure rouge, prioritaire sur celles du survol et du focus
    const invalidClass = (field: Field) => errors[field] && 'border-error!';

    const fieldError = (field: Field) => (
        <AnimatePresence initial={false}>
            {errors[field] && (
                <motion.p
                    id={`${field}-error`}
                    className="text-error mt-1 text-center text-sm font-bold"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    {t(errors[field])}
                </motion.p>
            )}
        </AnimatePresence>
    );

    return (
        <form
            ref={form}
            onSubmit={sendEmail}
            // Libellés, champs et erreurs centrés ; les champs gardent leur largeur naturelle
            className={cn('flex flex-col p-6', className)}
            noValidate
        >
            <label className="mb-4 flex flex-col items-center gap-1">
                <span className="font-bold">{t('contactForm.name')}</span>
                <input
                    type="text"
                    autoComplete="name"
                    {...fieldProps('user_name')}
                    className={cn(invalidClass('user_name'))}
                    onChange={() => onFieldChange('user_name')}
                />
                {fieldError('user_name')}
            </label>

            <label className="mb-4 flex flex-col items-center gap-1">
                <span className="font-bold">{t('contactForm.email')}</span>
                <input
                    type="email"
                    autoComplete="email"
                    {...fieldProps('user_email')}
                    className={cn(invalidClass('user_email'))}
                    onChange={() => onFieldChange('user_email')}
                />
                {fieldError('user_email')}
            </label>

            <label className="mb-4 flex flex-col items-center gap-1">
                <span className="font-bold">{t('contactForm.subject')}</span>
                <select
                    defaultValue={defaultTopic ?? ''}
                    {...fieldProps('subject')}
                    className={cn(invalidClass('subject'))}
                    onChange={(e) => {
                        onTopicChange(e.target.value);
                        onFieldChange('subject');
                    }}
                >
                    <option value="" disabled>
                        {t('contactForm.chooseTopic')}
                    </option>
                    <option value="tech">{t('contactForm.topics.tech')}</option>
                    <option value="teaching">{t('contactForm.topics.teaching')}</option>
                    <option value="games">{t('contactForm.topics.games')}</option>
                    <option value="ecology">{t('contactForm.topics.ecology')}</option>
                    <option value="sports">{t('contactForm.topics.sports')}</option>
                    <option value="art">{t('contactForm.topics.art')}</option>
                </select>
                {fieldError('subject')}
            </label>

            <label className="mb-4 flex flex-col items-center gap-1">
                <span className="font-bold">{t('contactForm.message')}</span>
                <textarea
                    {...fieldProps('message')}
                    className={cn('h-24 w-full md:w-1/2', invalidClass('message'))}
                    onChange={() => onFieldChange('message')}
                ></textarea>
                {fieldError('message')}
            </label>

            {/* Récapitulatif près du bouton : les erreurs peuvent être hors de l'écran sur mobile */}
            {errorCount > 0 && (
                <p className="text-error mb-4 text-center text-sm font-bold" role="alert">
                    {t('contactForm.errors.summary', { count: errorCount })}
                </p>
            )}

            <Button
                type="submit"
                variant="colored"
                className="mt-2 min-w-50 self-center text-xl"
                color={color}
                disabled={loading}
            >
                {loading ? <ClipLoader /> : t('contactForm.send')}
            </Button>

            {status && (
                <motion.p
                    role="status"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    className={cn(
                        'bg-surface/75 fixed bottom-5 left-[50%] mt-4 -translate-x-[50%] rounded-3xl border-2 px-4 py-2 backdrop-blur-sm',
                        status === 'success' ? 'text-success' : 'text-error'
                    )}
                >
                    {t(status === 'success' ? 'contactForm.success' : 'contactForm.error')}
                </motion.p>
            )}
        </form>
    );
}

export default ContactForm;
