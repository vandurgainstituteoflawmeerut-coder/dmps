import type { Gender } from "./types";

const MAX_W = 480;
const MAX_H = 600;

export async function readStudentPhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose a JPEG or PNG photograph.");
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_W / bitmap.width, MAX_H / bitmap.height);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process the photograph.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.84);
}

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

const SKINS = ["#f3d0b4", "#e4b48a", "#d09a68", "#c68642", "#a86a3c", "#8d5524"];
const HAIRS = ["#1a1410", "#2c2018", "#3d2a1c", "#4a3424", "#231910"];

export function illustratedPortrait(id: string, gender: Gender): string {
  const h = hash(id);
  const skin = SKINS[h % SKINS.length] ?? SKINS[0];
  const hair = HAIRS[(h >> 5) % HAIRS.length] ?? HAIRS[0];
  const blush = (h >> 9) % 3 !== 0;
  const plaits = gender !== "Boy";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="160" height="200">
    <rect width="160" height="200" fill="#efe6d6"/>
    <ellipse cx="80" cy="208" rx="78" ry="58" fill="#1f4a3e"/>
    <path d="M52 148 L80 200 L108 148 Z" fill="#f6f1e8"/>
    <rect x="72" y="136" width="16" height="28" rx="6" fill="#c45c3a"/>
    <rect x="68" y="116" width="24" height="22" rx="10" fill="${skin}"/>
    ${plaits ? `<path d="M38 92 C28 130 36 168 44 188" stroke="${hair}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M122 92 C132 130 124 168 116 188" stroke="${hair}" stroke-width="14" fill="none" stroke-linecap="round"/>` : ""}
    <ellipse cx="80" cy="86" rx="40" ry="46" fill="${skin}"/>
    ${
      plaits
        ? `<path d="M40 78 C48 28 112 28 120 78 C110 48 50 48 40 78 Z" fill="${hair}"/><path d="M38 70 Q80 18 122 70" fill="${hair}"/>`
        : `<path d="M40 86 C42 28 118 28 120 86 C108 58 52 58 40 86 Z" fill="${hair}"/>`
    }
    <ellipse cx="66" cy="90" rx="4.2" ry="5" fill="#241c16"/>
    <ellipse cx="94" cy="90" rx="4.2" ry="5" fill="#241c16"/>
    ${blush ? `<ellipse cx="56" cy="102" rx="7" ry="4" fill="#e8a090" opacity="0.45"/><ellipse cx="104" cy="102" rx="7" ry="4" fill="#e8a090" opacity="0.45"/>` : ""}
    <path d="M70 110 Q80 118 90 110" fill="none" stroke="#a56a52" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
