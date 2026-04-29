import type { CSSProperties } from "react";

/**
 * `Aktif Campus/src/styles/global.css` ile aynı gövde yığını
 * + `Aktif Campus/src/components/ui/hero.tsx` `titleStyle` / `titleStyleOnLightPrimary` (Arial Black poster)
 */
export const fontUi =
  '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/**
 * Kocaman hero / bant başlıkları — Aktif `titleStyle`: Arial Black, çok katmanlı gölge.
 * Renkler Campus Global (`#063242` = zap-ink; Aktif’te #001A99).
 */
const titlePosterStack: CSSProperties = {
  fontFamily: '"Arial Black", Impact, sans-serif',
  textShadow:
    "1px 1px 0 #063242, 2px 2px 0 #063242, 3px 3px 0 #063242, 4px 4px 0 #063242, 5px 5px 0 #063242, 6px 6px 0 #063242, 7px 7px 0 rgba(6,50,66,0.95), 8px 8px 0 rgba(6,50,66,0.75), 9px 9px 0 rgba(6,50,66,0.5), 10px 10px 0 rgba(6,50,66,0.28)",
};

/** Açık zemin poster — Aktif `titleStyleOnLightPrimary`, CG renkleri */
const titlePosterOnLight: CSSProperties = {
  fontFamily: '"Arial Black", Impact, sans-serif',
  color: "#063242",
  textShadow:
    "1px 1px 0 rgba(255,255,255,0.9), 2px 2px 0 rgba(255,183,3,0.45), 3px 3px 0 rgba(6,50,66,0.2), 4px 4px 0 rgba(6,50,66,0.12)",
};

export const titleHero: CSSProperties = {
  ...titlePosterStack,
  color: "#ffffff",
};

export const titleHeroBrand: CSSProperties = {
  fontFamily: '"Arial Black", Impact, sans-serif',
  color: "#ffb703",
  textShadow:
    "2px 2px 0 #063242, 4px 4px 0 #063242, 6px 6px 0 rgba(6,50,66,0.35)",
};

export const titleLight: CSSProperties = titlePosterOnLight;

export const titleDarkOnBand: CSSProperties = {
  fontFamily: '"Arial Black", Impact, sans-serif',
  color: "#ffffff",
  textShadow: "2px 2px 0 #063242, 4px 4px 0 #063242",
};

/** Dropdown üst etiket — Aktif `hero.tsx` menü başlığı satırı (DM Sans semibold) */
export const navPanelHeading: CSSProperties = {
  fontFamily: fontUi,
  fontWeight: 600,
  letterSpacing: "0.02em",
};
