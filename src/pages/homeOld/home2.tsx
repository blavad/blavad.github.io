import section1 from '~/assets/img/backgroundnewsite.png';
import { PhotoSection } from '~/components/section/PhotoSection';

import styles from './home2.module.css';

export function Home() {
    return (
        <div className={styles.container}>
            {/* <Navbar /> */}
            <PhotoSection img={section1} color="#FFD96D">
                <div className={styles.section1}>
                    <h1 className={styles.firstname}>DAVID</h1>
                    <h1 className={styles.lastname}>ALBERT</h1>
                    <h3 className={styles.title}>Entrepreneur · Tech Hobbyist · Teacher</h3>
                    <div className={styles.cercle1} />
                    <div className={styles.cercle2} />
                    <div className={styles.cercle3} />
                </div>
            </PhotoSection>
            <PhotoSection color="#FFD96D" />
            <PhotoSection img={section1} color="#FFD96D" />
        </div>
    );
}
