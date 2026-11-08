#!/usr/bin/env node
/** Generates the QR codes in assets/qr (PNG + SVG), navy on white, logo mark in the center. */
import QRCode from "qrcode";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const NAVY = "#0a2241";
const targets = [
  ["qr-alaniaenergy-home", "https://alaniaenergy.com/"],
  ["qr-alaniaenergy-investors", "https://alaniaenergy.com/investors"],
];
await mkdir("assets/qr", { recursive: true });
const mark = await readFile("public/brand/mark.svg");

for (const [name, url] of targets) {
  const size = 1200;
  const png = await QRCode.toBuffer(url, { errorCorrectionLevel: "H", margin: 2, width: size, color: { dark: NAVY, light: "#ffffff" } });
  const svg = await QRCode.toString(url, { type: "svg", errorCorrectionLevel: "H", margin: 2, color: { dark: NAVY, light: "#ffffff" } });

  // center badge: white rounded square + mark (about 20% of the code width, safe for level H)
  const badge = Math.round(size * 0.22);
  const markPng = await sharp(mark).resize(Math.round(badge * 0.78), Math.round(badge * 0.78), { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  const plate = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${badge}" height="${badge}"><rect width="${badge}" height="${badge}" rx="${Math.round(badge * 0.16)}" fill="#ffffff"/></svg>`);
  const out = await sharp(png)
    .composite([
      { input: plate, gravity: "center" },
      { input: markPng, gravity: "center" },
    ])
    .png()
    .toBuffer();
  await writeFile(`assets/qr/${name}.png`, out);
  await writeFile(`assets/qr/${name}.svg`, svg);
  console.log(name, "->", url);
}
