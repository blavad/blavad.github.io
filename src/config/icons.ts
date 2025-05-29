import {
    Book,
    Bot,
    CodeXml,
    Container,
    FileText,
    Gamepad,
    Github,
    Linkedin,
    Music,
    Palette,
    Radical,
    Send,
    Sprout,
    Trophy,
} from 'lucide-react';

const IconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    container: Container,
    'file-text': FileText,
    send: Send,
    book: Book,
    bot: Bot,
    ia: Bot,
    maths: Radical,
    info: CodeXml,
    gamepad: Gamepad,
    trophy: Trophy,
    palette: Palette,
    music: Music,
    sprout: Sprout,
};

export default IconMap;
