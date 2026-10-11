/**
 * Récupère les meilleures performances personnelles (MPP) d'un nageur sur l'extranet de la FFN
 * et les enregistre dans src/data/swimming.json (affichées sur la page Sport).
 *
 * Usage : npm run ffn:update
 *
 * Le site de la FFN ne peut pas être interrogé directement depuis le navigateur (autre domaine),
 * d'où cet instantané à relancer quand de nouvelles performances sont publiées.
 */
import { writeFile } from 'node:fs/promises';

const SWIMMER_ID = 1117465;
const BASE_URL = 'https://ffn.extranat.fr/webffn/';
const PAGE_URL = `${BASE_URL}nat_recherche.php?idact=nat&idrch_id=${SWIMMER_ID}`;
const OUTPUT = new URL('../src/data/swimming.json', import.meta.url);

const decode = (text) =>
    text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#0?39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

// Texte visible d'une cellule (les infobulles sont dans des attributs : elles disparaissent avec les balises)
const cellText = (html) =>
    decode(html.replace(/<[^>]+>/g, ' '))
        .replace(/\s+/g, ' ')
        .trim();

const response = await fetch(PAGE_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
if (!response.ok) throw new Error(`FFN : HTTP ${response.status}`);
const html = await response.text();

const name = cellText(html.match(/<h5[^>]*>([\s\S]*?)<\/h5>/)?.[1] ?? '')
    .replace(/\[\d+\]/, '')
    .trim();
const totalPerformances = Number(html.match(/possède <b>(\d+)<\/b>/)?.[1] ?? 0);

// Un tableau par bassin : on découpe la page à chaque en-tête « Bassin : XX mètres »
const sections = html.split(/Bassin : (\d+) mètres/).slice(1);
const pools = [];
for (let i = 0; i < sections.length; i += 2) {
    const pool = Number(sections[i]);
    const rows = [...sections[i + 1].matchAll(/<tr class="border-b[^"]*">([\s\S]*?)<\/tr>/g)];

    const records = rows.map(([, row]) => {
        const event = cellText(row.match(/<th[^>]*>([\s\S]*?)<\/th>/)[1]);
        const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(([, cell]) => cell);
        const [time, age, points, place, date, level, link, club] = cells;
        const resultsPath = link.match(/href="([^"]+)"/)?.[1];

        return {
            event,
            time: cellText(time),
            age: Number(cellText(age).match(/\d+/)?.[0]),
            points: Number(cellText(points).match(/\d+/)?.[0]),
            city: cellText(place).replace(/\s*\(\w+\)$/, ''),
            date: cellText(date),
            level: cellText(level).replace(/[[\]]/g, ''),
            club: cellText(club),
            resultsUrl: resultsPath ? BASE_URL + decode(resultsPath) : undefined,
        };
    });
    pools.push({ pool, records });
}

if (!pools.length)
    throw new Error('Aucune performance trouvée : la structure de la page FFN a peut-être changé.');

const data = {
    swimmerId: SWIMMER_ID,
    name,
    totalPerformances,
    sourceUrl: PAGE_URL,
    updatedAt: new Date().toISOString().slice(0, 10),
    pools,
};

await writeFile(OUTPUT, JSON.stringify(data, null, 4) + '\n');
console.log(
    `${name} : ${pools.map((p) => `${p.records.length} MPP en ${p.pool} m`).join(', ')} → src/data/swimming.json`
);
