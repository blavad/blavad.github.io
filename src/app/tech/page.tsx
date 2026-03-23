import type { Metadata } from 'next';
import PageWrapper from '../../components/PageWrapper';
import FadeWrapper from '../../components/FadeWrapper';
import Tech from '../../views/Tech';

export const metadata: Metadata = {
    title: 'David Albert — Création de MVP & Support Tech',
    description:
        "Développeur freelance spécialisé dans la création de MVP et le support d'équipes tech. React, TypeScript, Node.js.",
};

export default function Page() {
    return (
        <PageWrapper>
            <FadeWrapper>
                <Tech />
            </FadeWrapper>
        </PageWrapper>
    );
}
