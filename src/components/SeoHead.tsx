import { Helmet } from 'react-helmet-async';
import { LANGUAGES } from '~/config/translations';

const BASE_URL = 'https://david.albert.fr';

interface SeoHeadProps {
    title: string;
    description: string;
    path: string;
    jsonLd?: object;
}

export function SeoHead({ title, description, path, jsonLd }: SeoHeadProps) {
    const canonical = `${BASE_URL}${path}`;

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
            ...(path !== '/'
                ? [
                      {
                          '@type': 'ListItem',
                          position: 2,
                          name: title.split('—')[0].trim(),
                          item: canonical,
                      },
                  ]
                : []),
        ],
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {LANGUAGES.map((lang) => (
                <link key={lang} rel="alternate" hrefLang={lang} href={canonical} />
            ))}
            <link rel="alternate" hrefLang="x-default" href={canonical} />
            <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
        </Helmet>
    );
}
