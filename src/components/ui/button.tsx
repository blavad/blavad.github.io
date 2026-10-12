import { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import useNavigate from '~/hooks/useNavigate';
import { cn, isExternalLink, isPlainLeftClick, scrollToSection } from '~/lib/utils';

// En mode obscure, une ombre foncée ne se voit pas : les boutons ont un halo clair (`dark:shadow-[0_0_12px_1px]`)
const buttonVariants = cva(
    'relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-bold transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'text-white shadow-sm shadow-black2/20 dark:shadow-[0_0_12px_1px] dark:shadow-white/30 cursor-pointer',
                colored:
                    'text-white shadow-sm shadow-black2/20 dark:shadow-[0_0_12px_1px] dark:shadow-white/30 cursor-pointer',
                outline:
                    'border rounded-3xl border-input border-3 border-text bg-surface/75 backdrop-blur-sm shadow-sm shadow-black/5 dark:shadow-[0_0_12px_1px] dark:shadow-white/30 hover:bg-surface/25 cursor-pointer',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-12 px-6 py-2 text-lg',
                sm: 'h-8 rounded-3xl px-3 text-xs',
                lg: 'h-12 rounded-3xl px-8',
                icon: 'h-12 w-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    /** Transforme le bouton en lien : route ('/x'), ancre de section ('#x') ou URL externe */
    href?: string;
    target?: string;
    rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            size,
            asChild = false,
            color,
            children,
            href,
            target,
            rel,
            onClick,
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);
        const navigate = useNavigate();
        const Comp = (href ? motion.a : motion.button) as typeof motion.button;
        const isExternal = !!href && isExternalLink(href);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            // Liens externes et ouvertures dans un nouvel onglet : géré par le navigateur
            if (!href || isExternal || event.defaultPrevented || !isPlainLeftClick(event)) return;
            event.preventDefault();
            if (href.startsWith('#')) {
                scrollToSection(href.slice(1));
            } else {
                navigate(href);
            }
        };

        return (
            // @ts-ignore
            <Comp
                ref={ref}
                {...(href && {
                    href,
                    target: target ?? (isExternal ? '_blank' : undefined),
                    rel: rel ?? (isExternal ? 'noopener noreferrer' : undefined),
                })}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileTap={{ scale: 0.95 }}
                whileHover={variant !== 'default' ? { scale: 1.05 } : {}}
                className={cn(
                    buttonVariants({ variant, size, className }),
                    variant === 'default'
                        ? isHovered
                            ? 'text-white'
                            : `text-gradient-${color}`
                        : ''
                )}
                style={
                    variant === 'colored'
                        ? {
                              background: `var(--color-gradient-${color || 'white'})`,
                          }
                        : {}
                }
                {...props}
            >
                {variant === 'default' ? (
                    <>
                        <motion.div
                            className="absolute h-full w-full rounded-3xl"
                            style={{
                                background: `var(--color-gradient-${color || 'white'})`,
                            }}
                            initial={{ left: '-100%' }}
                            animate={{ left: isHovered ? '0%' : '-100%' }}
                            whileHover={{
                                left: 0,
                                transition: { duration: 0.3, ease: 'easeInOut' },
                            }}
                        ></motion.div>
                        <div className="z-0">{children}</div>
                    </>
                ) : (
                    children
                )}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
