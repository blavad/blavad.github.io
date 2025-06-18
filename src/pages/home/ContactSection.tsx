import { useState } from 'react';
import ContactForm from '~/components/ContactForm';
import { Topics } from '~/types/topics';
import topics from '~/data/topics.json';
import { cn } from '~/lib/utils';

const colorMap: Record<string, string> = {
    red: 'bg-red-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    purple: 'bg-purple-100',
    pink: 'bg-pink-100',
    redGradient: 'bg-gradient-red-rev',
    blueGradient: 'bg-gradient-blue-rev',
    greenGradient: 'bg-gradient-green-rev',
    yellowGradient: 'bg-gradient-yellow-rev',
    purpleGradient: 'bg-gradient-purple-rev',
    pinkGradient: 'bg-gradient-pink-rev',
};

function ContactSection({ defaultTopic }: { defaultTopic?: Topics }) {
    const [sectionColor, setSectionColor] = useState(topics[defaultTopic || 'tech'].color);
    const contentClass = cn(colorMap[sectionColor], 'px-5 sm:px-40');
    const gradientClass = cn(colorMap[`${sectionColor}Gradient`], 'mt-10 h-40');
    const titleClass = `text-gradient-${sectionColor}`;

    const onTopicChange = (topicID: string) => {
        const topic = (topics as any)[topicID] || topics.default;
        setSectionColor(topic.color);
    };

    return (
        <div className="w-full">
            <div className={gradientClass}></div>
            <section id="contact" className={contentClass}>
                <h1 className={titleClass}>On discute ?</h1>
                <p className="mt-4">
                    Envoie-moi un message via le formulaire ci-dessous. Je te recontacte le plus
                    rapidement possible.
                </p>
                <ContactForm
                    color={sectionColor}
                    onTopicChange={onTopicChange}
                    defaultTopic={defaultTopic}
                />
            </section>
        </div>
    );
}

export default ContactSection;
