import { useState } from 'react';
import ContactForm from '~/components/ContactForm';
import topics from '~/data/topics.json';
import { cn } from '~/lib/utils';

const colorMap: Record<string, string> = {
    red: 'bg-red/10',
    blue: 'bg-blue/10',
    green: 'bg-green/10',
    yellow: 'bg-yellow/10',
    purple: 'bg-purple/10',
    redGradient: 'bg-gradient-red-rev',
    blueGradient: 'bg-gradient-blue-rev',
    greenGradient: 'bg-gradient-green-rev',
    yellowGradient: 'bg-gradient-yellow-rev',
    purpleGradient: 'bg-gradient-purple-rev',
};

function ContactSection() {
    const [sectionColor, setSectionColor] = useState(topics.tech.color);
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
            <div id="contact" className={contentClass}>
                <h1 className={titleClass}>On discute ?</h1>
                <p className="mt-4">
                    Envoyez moi un message via le formulaire ci-dessous. Je vous recontacte le plus
                    rapidement possible .
                </p>
                <ContactForm onTopicChange={onTopicChange} color={sectionColor} />
            </div>
        </div>
    );
}

export default ContactSection;
