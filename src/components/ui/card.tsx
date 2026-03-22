import { PropsWithChildren } from 'react';
import { cn } from '~/lib/utils';

export type CardProps = {
    title: string;
    label: string;
    color: string;
    variant?: 'default' | 'page';
    className?: string;
};

function Card({
    title,
    variant = 'default',
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
    const labelGradientClass = `text-gradient-${color} text-xl ${label ? '' : 'mt-4 sm:mt-6 py-2'}`;
    const textGradientClass = `text-gradient-${color} py-2 text-blue`;

    return (
        <div className={cardClass}>
            {variant === 'page' ? (
                <>
                    <h2 className={textGradientClass}>{title}</h2>
                    <br />
                    <h4 className={labelGradientClass}>{label}</h4>
                </>
            ) : (
                <>
                    <h4 className={labelGradientClass}>{label}</h4>
                    <br />
                    <h3 className={textGradientClass}>{title}</h3>
                </>
            )}
            <div className="mt-4">{children}</div>
        </div>
    );
}

export default Card;
