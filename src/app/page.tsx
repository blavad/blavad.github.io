import type { Metadata } from 'next';
import PageWrapper from '../components/PageWrapper';
import FadeWrapper from '../components/FadeWrapper';
import Home from '../views/home';

export const metadata: Metadata = {
    title: 'David Albert — Développeur & Enseignant',
    description:
        'Portfolio de David Albert, développeur freelance et enseignant. Création de MVP, formation et enseignement en informatique.',
};

export default function Page() {
    return (
        <PageWrapper>
            <FadeWrapper>
                <Home />
            </FadeWrapper>
        </PageWrapper>
    );
}
