"""Generate the Alania Energy logo SVGs in public/brand/.

Geometry is traced from the logo in the original investor deck. The wordmark
is Montserrat (Bold for ALANIA, SemiBold for ENERGY) converted to paths, so the
SVGs render the same everywhere with no font dependency. A trademark symbol
sits at the top right of the wordmark.

Run from the repo root:  python3 scripts/logo.py   (needs fonttools + brotli)
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "app" / "fonts"
OUT = ROOT / "public" / "brand"

BLUE, GREEN, NAVY, WHITE = "#0752BC", "#55A338", "#041C3B", "#FFFFFF"

# ---- Mark (units: mark is 370 wide x 305 tall, baseline at y=305) ----------
LEG = 0.62  # horizontal run per unit of rise, shared by every slanted edge


def poly(pts):
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " Z"


A_TOP = (190, 0)
INNER_APEX_Y = 91      # sets the A's stroke thickness
blue = poly([
    A_TOP,
    (190 + LEG * 180, 180),                       # outer right leg, cut horizontally
    (190 + LEG * (180 - INNER_APEX_Y), 180),      # inner right leg
    (190, INNER_APEX_Y),                          # inner apex
    (190 - LEG * (305 - INNER_APEX_Y), 305),      # inner left leg at baseline
    (190 - LEG * 305, 305),                       # outer left leg at baseline
])
slash = poly([(200, 152), (246, 152), (246 - LEG * 153, 305), (200 - LEG * 153, 305)])
bar1 = poly([(256, 202), (314, 202), (314 + LEG * 41, 243), (256 - LEG * 41, 243)])
bar2 = poly([(222, 266), (348, 266), (348 + LEG * 39, 305), (222 - LEG * 39, 305)])
MARK_W, MARK_H = 372, 305
MARK = [(BLUE, blue), (GREEN, slash), (GREEN, bar1), (GREEN, bar2)]

# ---- Wordmark ---------------------------------------------------------------
TEXT_X = 392            # gap after the mark
ALANIA_TOP, ALANIA_CAP = 66, 114
ENERGY_TOP, ENERGY_CAP = 218, 80
ALANIA_W = 721
ENERGY_INSET = 22       # ENERGY sits slightly inside ALANIA on both sides


def font(weight):
    return TTFont(FONTS / f"montserrat-latin-{weight}-normal.woff2")


def text_paths(f, text, cap_px, top_px, x0, width=None):
    """Return (svg path d, right edge x) for text set to a cap height, optionally tracked to a width."""
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]
    cap = f["OS/2"].sCapHeight
    s = cap_px / cap
    names = [cmap[ord(c)] for c in text]
    adv = [hmtx[n][0] * s for n in names]
    # measure ink extents so tracking is computed on visible width
    first_lsb = BoundsPen(gs); gs[names[0]].draw(first_lsb)
    last = BoundsPen(gs); gs[names[-1]].draw(last)
    ink_left = first_lsb.bounds[0] * s
    natural = sum(adv[:-1]) + last.bounds[2] * s - ink_left
    track = 0 if width is None else (width - natural) / (len(text) - 1)
    baseline = top_px + cap_px
    x = x0 - ink_left
    d = []
    for n, a in zip(names, adv):
        pen = SVGPathPen(gs)
        gs[n].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
        d.append(pen.getCommands())
        x += a + track
    right = x - track - adv[-1] + last.bounds[2] * s
    return " ".join(d), right


def build():
    bold, medium, semi = font(700), font(500), font(600)
    alania, a_right = text_paths(bold, "ALANIA", ALANIA_CAP, ALANIA_TOP, TEXT_X, ALANIA_W)
    energy, _ = text_paths(semi, "ENERGY", ENERGY_CAP, ENERGY_TOP,
                           TEXT_X + ENERGY_INSET, ALANIA_W - 2 * ENERGY_INSET)
    # Trademark symbol: small, top-aligned with the cap line of ALANIA
    tm, tm_right = text_paths(semi, "™", 46, ALANIA_TOP, a_right + 8)
    width = tm_right + 4

    def mark_g():
        return "".join(f'<path fill="{c}" d="{d}"/>' for c, d in MARK)

    def logo(text_color, bg=None):
        pad = 16
        vb = f"{-pad} {-pad} {width + 2 * pad:.1f} {MARK_H + 2 * pad}"
        rect = (f'<rect x="{-pad}" y="{-pad}" width="{width + 2 * pad:.1f}" height="{MARK_H + 2 * pad}" fill="{bg}"/>'
                if bg else "")
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Alania Energy">'
                f"<title>Alania Energy™</title>{rect}{mark_g()}"
                f'<g fill="{text_color}"><path d="{alania}"/><path d="{energy}"/><path d="{tm}"/></g></svg>\n')

    def mark(tile=False):
        side = 480
        ox, oy = (side - MARK_W) / 2, (side - MARK_H) / 2
        rect = f'<rect width="{side}" height="{side}" rx="88" fill="{NAVY}"/>' if tile else ""
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}" role="img" '
                f'aria-label="Alania Energy mark"><title>Alania Energy</title>{rect}'
                f'<g transform="translate({ox:.1f} {oy:.1f})">{mark_g()}</g></svg>\n')

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "logo-light.svg").write_text(logo(NAVY))
    (OUT / "logo-dark.svg").write_text(logo(WHITE))
    (OUT / "logo-light-bg.svg").write_text(logo(NAVY, WHITE))
    (OUT / "logo-dark-bg.svg").write_text(logo(WHITE, NAVY))
    (OUT / "mark.svg").write_text(mark())
    (OUT / "mark-navy-tile.svg").write_text(mark(True))
    print("wrote", sorted(p.name for p in OUT.glob("*.svg")))


if __name__ == "__main__":
    build()
