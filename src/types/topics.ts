import { Book, Bot, Gamepad, Music, Palette, Sprout, Trophy } from 'lucide-react';

export type Topics = 'tech' | 'teaching' | 'games' | 'sports' | 'art' | 'music' | 'ecology';

export const ThemesData: any = {
    tech: {
        icon: Bot,
        color: 'green',
    },
    games: {
        icon: Gamepad,
        color: 'red',
    },
    teaching: {
        icon: Book,
        color: 'blue',
    },
    sports: {
        icon: Trophy,
        color: 'purple',
    },
    art: {
        icon: Palette,
        color: 'red',
    },
    music: {
        icon: Music,
        color: 'red',
    },
    ecology: {
        icon: Sprout,
        color: 'yellow',
    },
};
