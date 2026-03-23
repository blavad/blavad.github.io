import type { Metadata } from 'next';
import PageWrapper from '../../components/PageWrapper';
import FadeWrapper from '../../components/FadeWrapper';
import Teaching from '../../views/Teaching';

export const metadata: Metadata = {
    title: 'David Albert — Enseignement & Formation',
    description:
        'Enseignant en informatique dans 4 écoles supérieures. Formation en développement web, algorithmique et intelligence artificielle.',
};

export default function Page() {
    return (
        <PageWrapper>
            <FadeWrapper>
                <Teaching />
            </FadeWrapper>
        </PageWrapper>
    );
}
