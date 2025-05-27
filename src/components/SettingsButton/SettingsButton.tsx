import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { useAnimConfig } from '~/stores/animConfig/animConfig';
import { playlists } from '~/data/playlists.data';

import styles from './SettingsButton.module.css';
import { Select } from '../select';

function NumberBtn({ num, onClick, selected }: { num: number | string; onClick: () => void; selected: boolean }) {
    return (
        <button
            type="button"
            className={`${styles.numberBtn} ${selected && styles.numberBtnSelected}`}
            onClick={onClick}
        >
            {num}
        </button>
    );
}

export function SettingsButton() {
    const ref = useRef(null);

    const { playlist, animMode, numTracks, showQR, toggleMode, toggleQR, setNumTracks, setPlaylist } = useAnimConfig();

    const [isOpen, setIsOpen] = useState(false);

    const handleToggleSettings = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = () => {
        // Your custom logic here
        if (isOpen) {
            handleToggleSettings();
        }
    };

    useOnClickOutside(ref, handleClickOutside);

    return (
        <div ref={ref} className={styles.settingsContainer}>
            {isOpen && (
                <div className={styles.settingsDropdown}>
                    <h3>Paramètres mode animateur</h3>
                    <p>
                        <input
                            type="checkbox"
                            className={styles.toggleControl}
                            name="toggleControl"
                            id="toggleControl"
                            checked={animMode}
                            onChange={toggleMode}
                        />
                        {`   `}Mode animateur {!animMode && 'dés'}activé
                    </p>
                    {animMode && (
                        <p>
                            <input
                                type="checkbox"
                                className={styles.toggleControl}
                                name="toggleQR"
                                id="toggleQR"
                                checked={showQR}
                                onChange={toggleQR}
                            />
                            {`   `}QR code géant {!showQR && 'dés'}activé
                        </p>
                    )}
                    <h3>Playlist :</h3>
                    <Select
                        id="clientID"
                        value={{ value: playlist, label: playlists.find((pl) => pl.id === playlist)?.name }}
                        options={playlists.map((cl) => ({ value: cl.id, label: cl.name }))}
                        onChange={(opt) => {
                            setPlaylist(opt?.value as string);
                        }}
                    />
                    <h3>Nombre de musiques :</h3>
                    {[10, 15, 20, 30, 50].map((num) => (
                        <NumberBtn key={num} num={num} onClick={() => setNumTracks(num)} selected={numTracks === num} />
                    ))}
                </div>
            )}
            {isOpen && <div className={styles.arrowDown} />}
            <button type="button" className={styles.settingsButton} onClick={handleToggleSettings}>
                Mode Animateur : {animMode ? 'On' : 'Off'}
            </button>
        </div>
    );
}

// espacement
// option qrcode géant
