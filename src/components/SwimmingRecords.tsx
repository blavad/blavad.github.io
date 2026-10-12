import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '~/lib/utils';
import swimming from '~/data/swimming.json';

type SwimRecord = (typeof swimming.pools)[number]['records'][number];

// Nombre de meilleures performances (aux points FFN) mises en avant pour chaque bassin
const HIGHLIGHTS = 3;

/** « 50 Pap. » → { distance: '50', stroke: 'Pap' } pour traduire la nage */
const parseEvent = (event: string) => {
    const [distance, ...rest] = event.split(' ');
    return { distance, stroke: rest.join('').replace(/\./g, '') };
};

/** « 00:24.09 » → « 24.09 », « 02:08.54 » → « 2:08.54 » */
const formatTime = (time: string) => time.replace(/^00:/, '').replace(/^0/, '');

/** Aperçu des records personnels FFN (instantané généré par `npm run ffn:update`) */
function SwimmingRecords() {
    const { t } = useTranslation();
    const [pool, setPool] = useState(swimming.pools[0].pool);
    const [expanded, setExpanded] = useState(false);

    const eventName = (event: string) => {
        const { distance, stroke } = parseEvent(event);
        return `${distance} m ${t(`sports.swimming.strokes.${stroke}`)}`;
    };

    const poolRecords: SwimRecord[] = swimming.pools.find((p) => p.pool === pool)?.records ?? [];
    const highlights = [...poolRecords].sort((a, b) => b.points - a.points).slice(0, HIGHLIGHTS);
    // Le reste des records du bassin, dans l'ordre FFN (par nage et distance)
    const records = poolRecords.filter((record) => !highlights.includes(record));

    return (
        <div>
            {/* Choix du bassin */}
            <div className="mt-10 flex gap-3 sm:mt-15">
                {swimming.pools.map(({ pool: p }) => (
                    <button
                        key={p}
                        className={cn(
                            'cursor-pointer rounded-3xl px-4 py-1 font-bold transition-colors',
                            p === pool
                                ? 'bg-gradient-pink text-gradient-pink'
                                : 'opacity-50 hover:opacity-100'
                        )}
                        onClick={() => setPool(p)}
                    >
                        {t('sports.swimming.pool', { pool: p })}
                    </button>
                ))}
            </div>
            {/* Meilleures performances du bassin */}
            <motion.div
                key={pool}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex flex-wrap gap-6"
            >
                {highlights.map((record) => (
                    <div
                        key={record.event}
                        className="bg-gradient-pink flex min-w-56 flex-1 flex-col items-center rounded-3xl p-6"
                    >
                        <p className="text-sm opacity-70">{eventName(record.event)}</p>
                        <h1 className="text-gradient-pink">{formatTime(record.time)}</h1>
                        <p className="text-sm">
                            {record.points} {t('sports.swimming.points')} · {record.date.slice(-4)}
                        </p>
                    </div>
                ))}
            </motion.div>

            {/* Autres records : dépliables */}
            {records.length > 0 && (
                <button
                    className="mt-8 flex cursor-pointer items-center gap-2 font-bold"
                    onClick={() => setExpanded((prev) => !prev)}
                    aria-expanded={expanded}
                >
                    {expanded
                        ? t('sports.swimming.hideOthers')
                        : t('sports.swimming.showOthers', { count: records.length })}
                    <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
                        <ChevronDown size={18} />
                    </motion.span>
                </button>
            )}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key={pool}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="opacity-50">
                                    <tr>
                                        <th className="py-2 pr-4 font-normal">
                                            {t('sports.swimming.event')}
                                        </th>
                                        <th className="py-2 pr-4 font-normal">
                                            {t('sports.swimming.time')}
                                        </th>
                                        <th className="py-2 pr-4 font-normal">
                                            {t('sports.swimming.points')}
                                        </th>
                                        <th className="hidden py-2 pr-4 font-normal sm:table-cell">
                                            {t('sports.swimming.competition')}
                                        </th>
                                        <th className="hidden py-2 font-normal md:table-cell">
                                            {t('sports.swimming.level')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((record) => (
                                        <tr key={record.event} className="border-t border-text/10">
                                            <td className="py-2 pr-4">{eventName(record.event)}</td>
                                            <td className="py-2 pr-4 font-bold">
                                                {record.resultsUrl ? (
                                                    <a
                                                        href={record.resultsUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        {formatTime(record.time)}
                                                    </a>
                                                ) : (
                                                    formatTime(record.time)
                                                )}
                                            </td>
                                            <td className="py-2 pr-4">{record.points}</td>
                                            <td className="hidden py-2 pr-4 capitalize sm:table-cell">
                                                {record.city.toLowerCase()} · {record.date}
                                            </td>
                                            <td className="hidden py-2 md:table-cell">
                                                {t(`sports.swimming.levels.${record.level}`)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="mt-6 text-sm opacity-60">
                {t('sports.swimming.source', {
                    count: swimming.totalPerformances,
                    date: new Date(swimming.updatedAt).toLocaleDateString(),
                })}{' '}
                <a
                    href={swimming.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold underline"
                >
                    {t('sports.swimming.ffnLink')}
                    <ExternalLink size={14} />
                </a>
            </p>
        </div>
    );
}

export default SwimmingRecords;
