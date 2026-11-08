#!/usr/bin/env node
/**
 * Brand-themed QR codes for Alania Energy.
 * Navy rounded modules, green finder eyes, logo mark in the center, caption below.
 * Error correction H so the center logo never breaks scanning.
 * Output: assets/qr/<name>.svg and .png (1600px wide).
 */
import QRCode from "qrcode";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const NAVY = "#0a2241";
const BLUE = "#0752bc";
const GREEN = "#55a338";
const targets = [
  ["qr-alaniaenergy-home", "https://alaniaenergy.com/", "alaniaenergy.com"],
  ["qr-alaniaenergy-investors", "https://alaniaenergy.com/investors", "alaniaenergy.com/investors"],
];

await mkdir("assets/qr", { recursive: true });
const markSvg = await readFile("public/brand/mark.svg", "utf8");
const markInner = markSvg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "").replace(/<title>.*?<\/title>/, "");
const markVB = markSvg.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);

function build(url, caption) {
  const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const cell = 10;
  const quiet = 4 * cell;
  const qrPx = n * cell;
  const W = qrPx + quiet * 2;
  const captionH = 90;
  const H = W + captionH;

  const inFinder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);

  // logo plate area (modules cleared under it)
  const plate = Math.round(n * 0.24);
  const p0 = Math.floor((n - plate) / 2);
  const inPlate = (r, c) => r >= p0 && r < p0 + plate && c >= p0 && c < p0 + plate;

  let dots = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!qr.modules.get(r, c) || inFinder(r, c) || inPlate(r, c)) continue;
      const x = quiet + c * cell + cell / 2;
      const y = quiet + r * cell + cell / 2;
      dots += `<circle cx="${x}" cy="${y}" r="${cell * 0.46}"/>`;
    }
  }

  const eye = (r, c) => {
    const x = quiet + c * cell, y = quiet + r * cell;
    return `<rect x="${x + cell / 2}" y="${y + cell / 2}" width="${cell * 6}" height="${cell * 6}" rx="${cell * 1.6}" fill="none" stroke="${NAVY}" stroke-width="${cell}"/>` +
      `<rect x="${x + cell * 2}" y="${y + cell * 2}" width="${cell * 3}" height="${cell * 3}" rx="${cell * 0.9}" fill="${GREEN}"/>`;
  };

  const plateX = quiet + p0 * cell, plateS = plate * cell;
  const pad = plateS * 0.14;
  const markW = plateS - pad * 2;
  const scale = markW / markVB[2];
  const markH = markVB[3] * scale;
  const markX = plateX + pad - markVB[0] * scale;
  const markY = plateX + (plateS - markH) / 2 - markVB[1] * scale;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" rx="${cell * 3}" fill="#ffffff"/>
<g fill="${NAVY}">${dots}</g>
${eye(0, 0)}${eye(0, n - 7)}${eye(n - 7, 0)}
<rect x="${plateX}" y="${plateX}" width="${plateS}" height="${plateS}" rx="${plateS * 0.2}" fill="#ffffff" stroke="${BLUE}" stroke-opacity="0.18" stroke-width="2"/>
<g transform="translate(${markX} ${markY}) scale(${scale})">${markInner}</g>
<rect x="${quiet}" y="${W - quiet / 2}" width="${qrPx}" height="4" rx="2" fill="${GREEN}"/>
<text x="${W / 2}" y="${W + captionH / 2 - 4}" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="${Math.min(34, Math.floor((qrPx * 0.92) / (caption.length * 0.66)))}" fill="${NAVY}">${caption}</text>
</svg>`;
}

for (const [name, url, caption] of targets) {
  const svg = build(url, caption);
  await writeFile(`assets/qr/${name}.svg`, svg);
  await sharp(Buffer.from(svg)).resize({ width: 1600 }).png().toFile(`assets/qr/${name}.png`);
  console.log(name, "->", url);
}
