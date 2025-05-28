import { PropsWithChildren } from 'react';
import { cn } from '~/lib/utils';

export type CardProps = {
    title: string;
    label: string;
    color: string;
    preset?: 'default' | 'labelBottom';
    className?: string;
};

function Card({
    title,
    preset = 'default',
    label = '',
    color,
    children,
    className,
}: PropsWithChildren<CardProps>) {
    const cardClass = cn(
        `bg-gradient-${color}`,
        className,
        'rounded-3xl p-12 text-left sm:p-20 sm:pt-14'
    );
    const labelGradientClass = `text-gradient-${color} text-xl ${label ? '' : 'mt-4 sm:mt-6'}`;
    const textGradientClass = `text-gradient-${color}`;

    return (
        <div className={cardClass}>
            {preset !== 'labelBottom' && <h3 className={labelGradientClass}>{label}</h3>}
            <h2 className={textGradientClass}>{title}</h2>
            {preset === 'labelBottom' && <h3 className={labelGradientClass}>{label}</h3>}
            <p className="mt-4">{children}</p>
        </div>
    );
}

export default Card;
