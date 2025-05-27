import { PropsWithChildren } from "react";
import { useThemeConfig } from "~/stores/themeConfig/themeConfig";

import styles from "./PhotoSection.module.css";

export type PhotoSectionProps = PropsWithChildren<{
  img?: string;
  color?: string;
}>;

export function PhotoSection({ img, color, children }: PhotoSectionProps) {
  const { dark } = useThemeConfig();
  const theme = dark ? "#000000" : "#FFFFFF";
  const linearBg = img
    ? `linear-gradient(${theme} 0%, ${theme} 85%,${color} 100%)`
    : `linear-gradient(${color} 0%, ${color} 85%,${theme} 100%)`;

  return (
    <div className={styles.photoSection} style={{ background: linearBg }}>
      {img && (
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${img})` }}
        />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
