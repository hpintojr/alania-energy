#!/usr/bin/env python3
"""Generates the blueprint-style line-art hero illustrations in public/art/.
Original drawings (no third-party artwork). Run: python3 scripts/art.py"""
import math, os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "art")
os.makedirs(OUT, exist_ok=True)
W, H = 900, 600
LINE = "#86aee8"   # main stroke
SOFT = "#5f86c4"   # secondary stroke
GREEN = "#55a338"  # accent
LABEL = "#9fbde9"


def svg(body: str, title: str) -> str:
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" '
            f'stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>')


def g(content, stroke=LINE, width=1.6, opacity=1.0, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<g stroke="{stroke}" stroke-width="{width}" opacity="{opacity}"{d}>{content}</g>'


def label(x, y, text, anchor="start"):
    return (f'<text x="{x}" y="{y}" fill="{LABEL}" opacity="0.75" font-family="Montserrat, Arial, sans-serif" '
            f'font-size="11" font-weight="600" letter-spacing="2.2" text-anchor="{anchor}">{text}</text>')


def leader(x1, y1, x2, y2):
    return g(f'<path d="M{x1} {y1} L{x2} {y2}"/><circle cx="{x1}" cy="{y1}" r="2.2" fill="{LABEL}"/>', LABEL, 1, 0.6)


def ground(y=540, x1=20, x2=880):
    hatch = "".join(f'<path d="M{x} {y} l-10 12"/>' for x in range(x1 + 10, x2, 22))
    return g(f'<path d="M{x1} {y} H{x2}"/>', LINE, 1.4) + g(hatch, SOFT, 1, 0.5)


# ---------------------------------------------------------------- turbine (home)
def turbine():
    cy = 290
    p = []
    # shaft centerline
    p.append(g(f'<path d="M30 {cy} H870"/>', SOFT, 1, 0.8, "14 6 3 6"))
    # generator (left)
    p.append(g(f'<rect x="40" y="{cy-95}" width="120" height="190" rx="10"/>'
               f'<rect x="52" y="{cy-80}" width="96" height="160" rx="6"/>'
               + "".join(f'<path d="M{60+i*11} {cy-70} V{cy+70}"/>' for i in range(8))))
    p.append(g(f'<rect x="160" y="{cy-18}" width="40" height="36" rx="4"/>'))  # coupling
    # casing profile (upper and mirrored lower)
    def r_case(x):
        if x <= 230: return 150
        if x <= 470: return 150 - (x - 230) * (62 / 240)        # compressor taper
        if x <= 520: return 88 + (x - 470) * (40 / 50)            # into combustor
        if x <= 590: return 128
        if x <= 700: return 112 + (x - 590) * (40 / 110)          # turbine growth
        return 152 + (x - 700) * (30 / 120)                       # exhaust diffuser
    def r_hub(x):
        if x <= 470: return 38 + (x - 230) * (34 / 240) if x >= 230 else 38
        if x <= 600: return 72
        if x <= 700: return 72 - (x - 600) * (14 / 100)
        return 58
    xs = list(range(230, 821, 5))
    up = " ".join(f"L{x} {cy - r_case(x):.1f}" for x in xs)
    lo = " ".join(f"L{x} {cy + r_case(x):.1f}" for x in reversed(xs))
    p.append(g(f'<path d="M230 {cy-150} {up} L820 {cy+r_case(820):.1f} {lo} Z"/>', LINE, 1.8))
    hu = " ".join(f"L{x} {cy - r_hub(x):.1f}" for x in xs)
    hl = " ".join(f"L{x} {cy + r_hub(x):.1f}" for x in reversed(xs))
    p.append(g(f'<path d="M230 {cy-38} {hu} L820 {cy+58} {hl} Z"/>', SOFT, 1.2, 0.9))
    # inlet bellmouth
    p.append(g(f'<path d="M230 {cy-150} C205 {cy-150} 195 {cy-175} 196 {cy-196}"/>'
               f'<path d="M230 {cy+150} C205 {cy+150} 195 {cy+175} 196 {cy+196}"/>'))
    # compressor blades
    blades = ""
    for x in range(250, 466, 14):
        rc, rh = r_case(x) - 4, r_hub(x) + 3
        blades += f'<path d="M{x} {cy-rc:.1f} L{x+5} {cy-rh:.1f}"/><path d="M{x} {cy+rc:.1f} L{x+5} {cy+rh:.1f}"/>'
    p.append(g(blades, LINE, 1.3))
    # combustor cans
    comb = "".join(f'<ellipse cx="{545}" cy="{cy + s*100}" rx="34" ry="16"/>'
                   f'<path d="M515 {cy + s*100} h60" stroke-dasharray="3 4"/>' for s in (-1, 1))
    p.append(g(comb, LINE, 1.4))
    p.append(g(f'<path d="M545 {cy-84} q6 -10 0 -18 q-6 -8 0 -16"/><path d="M545 {cy+84} q6 10 0 18 q-6 8 0 16"/>', GREEN, 1.6))
    # turbine stages
    tb = ""
    for x in range(610, 696, 17):
        rc, rh = r_case(x) - 4, r_hub(x) + 3
        tb += (f'<path d="M{x} {cy-rc:.1f} Q{x+9} {cy-(rc+rh)/2:.1f} {x} {cy-rh:.1f}"/>'
               f'<path d="M{x} {cy+rc:.1f} Q{x+9} {cy+(rc+rh)/2:.1f} {x} {cy+rh:.1f}"/>')
    p.append(g(tb, LINE, 1.5))
    # exhaust flow lines
    ex = "".join(f'<path d="M730 {cy + o} C770 {cy + o*1.1} 800 {cy + o*1.2} 860 {cy + o*1.35}"/>' for o in (-110, -60, 60, 110))
    p.append(g(ex, SOFT, 1, 0.7, "6 6"))
    # base skid + supports
    p.append(g(f'<path d="M40 {cy+190} H830"/><path d="M40 {cy+205} H830"/>'
               + "".join(f'<path d="M{x} {cy+r_case(x) if x>=230 else cy+95} V{cy+190}"/>' for x in (100, 300, 560, 760)), LINE, 1.4))
    p.append(ground(cy + 230))
    # labels
    p.append(leader(330, cy - 120, 330, 70) + label(330, 60, "COMPRESSOR", "middle"))
    p.append(leader(545, cy - 120, 545, 95) + label(545, 85, "COMBUSTOR", "middle"))
    p.append(leader(650, cy - 140, 700, 115) + label(700, 105, "TURBINE", "middle"))
    p.append(leader(100, cy - 95, 100, 150) + label(100, 140, "GENERATOR", "middle"))
    p.append(leader(800, cy + 120, 840, 470) + label(840, 488, "EXHAUST", "end"))
    return svg("".join(p), "Line drawing of a gas turbine generator")


# ---------------------------------------------------------------- natural gas
def natural_gas():
    p = []
    gy = 520
    p.append(ground(gy))
    # pipeline with flanges and valve
    p.append(g(f'<path d="M20 470 H520"/><path d="M20 492 H520"/>', LINE, 1.6))
    p.append(g("".join(f'<rect x="{x}" y="462" width="8" height="38" rx="2"/>' for x in range(70, 520, 90)), LINE, 1.3))
    p.append(g('<path d="M260 462 V430"/><circle cx="260" cy="422" r="10"/><path d="M250 422 h20 M260 412 v20"/>'
               '<path d="M245 470 L275 492 M275 470 L245 492"/>', LINE, 1.4))
    p.append(g('<path d="M80 481 h40 m-8 -6 l8 6 l-8 6"/><path d="M380 481 h40 m-8 -6 l8 6 l-8 6"/>', GREEN, 1.6))
    # metering skid
    p.append(g('<rect x="440" y="400" width="90" height="60" rx="4"/><circle cx="465" cy="430" r="14"/><path d="M465 430 l8 -7"/>'
               '<path d="M495 412 v36 M510 412 v36"/>', LINE, 1.4))
    # power block building
    p.append(g('<path d="M540 520 V300 H860 V520"/><path d="M540 300 L560 280 H840 L860 300"/>'
               + "".join(f'<rect x="{x}" y="340" width="40" height="70" rx="2"/>' for x in (570, 640, 710, 780))
               + '<rect x="660" y="440" width="70" height="80"/><path d="M695 440 V520"/>', LINE, 1.6))
    # exhaust stacks
    for i, x in enumerate((590, 660, 730, 800)):
        p.append(g(f'<path d="M{x} 280 V{150 + i*6}"/><path d="M{x+22} 280 V{150 + i*6}"/>'
                   f'<path d="M{x-3} {150+i*6} H{x+25}"/><path d="M{x} 200 H{x+22}" stroke-dasharray="3 4"/>', LINE, 1.5))
        p.append(g(f'<path d="M{x+11} {140+i*6} c-8 -14 10 -22 2 -36 c-6 -10 6 -16 4 -26"/>', SOFT, 1.2, 0.7, "4 5"))
    # flame symbol
    p.append(g('<path d="M150 300 c-30 -40 10 -60 0 -110 c40 30 60 70 40 110 c-6 14 -26 20 -40 0 z"/>'
               '<path d="M162 292 c-12 -18 4 -28 0 -48 c18 14 24 32 14 46 c-4 6 -10 6 -14 2 z"/>', GREEN, 1.8))
    p.append(label(150, 340, "NATURAL GAS", "middle"))
    p.append(leader(700, 300, 700, 100) + label(700, 90, "POWER BLOCK", "middle"))
    p.append(leader(260, 430, 330, 380) + label(330, 370, "SUPPLY LINE", "middle"))
    return svg("".join(p), "Line drawing of a natural gas power block and supply pipeline")


# ---------------------------------------------------------------- nuclear
def nuclear():
    p = []
    gy = 530
    p.append(ground(gy))
    def tower(cx, top, base_w, top_w, waist_w, waist_y):
        l = (f'M{cx-base_w/2} {gy} C{cx-waist_w/2} {waist_y+60} {cx-waist_w/2} {waist_y-40} {cx-top_w/2} {top}')
        r = (f'M{cx+base_w/2} {gy} C{cx+waist_w/2} {waist_y+60} {cx+waist_w/2} {waist_y-40} {cx+top_w/2} {top}')
        rings = "".join(f'<path d="M{cx-base_w/2 + k} {y} H{cx+base_w/2 - k}" opacity="0.45"/>' for y, k in ((470, 14), (410, 34), (350, 46), (290, 46)))
        return g(f'<path d="{l}"/><path d="{r}"/><ellipse cx="{cx}" cy="{top}" rx="{top_w/2}" ry="7"/>' + rings, LINE, 1.6)
    p.append(tower(560, 190, 230, 150, 120, 330))
    p.append(tower(760, 230, 190, 125, 100, 360))
    for cx, top in ((560, 190), (760, 230)):
        p.append(g(f'<path d="M{cx-50} {top-10} c-20 -40 30 -50 10 -90 M{cx} {top-12} c20 -40 -30 -60 0 -110 M{cx+45} {top-10} c25 -30 -10 -50 15 -80"/>', SOFT, 1.2, 0.6, "5 6"))
    # containment + turbine hall
    p.append(g(f'<path d="M150 {gy} V360 A90 90 0 0 1 330 360 V{gy}"/><path d="M165 {gy} V365 A75 75 0 0 1 315 365 V{gy}" opacity="0.5"/>'
               f'<rect x="330" y="400" width="120" height="130"/><path d="M330 400 L350 380 H430 L450 400"/>'
               f'<path d="M345 430 H435 M345 460 H435" opacity="0.5"/>', LINE, 1.6))
    # atom symbol
    atom = "".join(f'<ellipse cx="240" cy="150" rx="70" ry="24" transform="rotate({a} 240 150)"/>' for a in (0, 60, 120))
    p.append(g(atom + '<circle cx="240" cy="150" r="7"/>', GREEN, 1.6))
    p.append(leader(240, 300, 120, 250) + label(120, 240, "REACTOR", "middle"))
    p.append(leader(660, 300, 840, 140) + label(840, 130, "COOLING", "end"))
    return svg("".join(p), "Line drawing of a nuclear plant with cooling towers")


# ---------------------------------------------------------------- technology (rotor)
def technology():
    p = []
    cx, cy = 430, 300
    p.append(g(f'<circle cx="{cx}" cy="{cy}" r="230"/><circle cx="{cx}" cy="{cy}" r="222" opacity="0.5"/>', LINE, 1.6))
    p.append(g(f'<circle cx="{cx}" cy="{cy}" r="78"/><circle cx="{cx}" cy="{cy}" r="34"/><circle cx="{cx}" cy="{cy}" r="10"/>', LINE, 1.6))
    bolts = "".join(f'<circle cx="{cx + 56*math.cos(a):.1f}" cy="{cy + 56*math.sin(a):.1f}" r="4"/>' for a in [i*math.pi/6 for i in range(12)])
    p.append(g(bolts, LINE, 1.3))
    blades = ""
    n = 30
    for i in range(n):
        a = i * 2 * math.pi / n
        r1, r2 = 84, 216
        x1, y1 = cx + r1*math.cos(a), cy + r1*math.sin(a)
        x2, y2 = cx + r2*math.cos(a + 0.28), cy + r2*math.sin(a + 0.28)
        mx, my = cx + 160*math.cos(a + 0.06), cy + 160*math.sin(a + 0.06)
        blades += f'<path d="M{x1:.1f} {y1:.1f} Q{mx:.1f} {my:.1f} {x2:.1f} {y2:.1f}"/>'
    p.append(g(blades, LINE, 1.4))
    p.append(g(f'<path d="M{cx} {cy} m-260 0 h520 M{cx} {cy} m0 -260 v520"/>', SOFT, 1, 0.6, "12 6 3 6"))
    # airfoil detail callout
    p.append(g('<rect x="720" y="120" width="160" height="150" rx="8"/>'
               '<path d="M745 200 C770 160 830 150 860 175 C830 175 790 190 745 200 Z"/>'
               '<path d="M752 212 h100" stroke-dasharray="3 4" opacity="0.6"/>', LINE, 1.4))
    p.append(g('<path d="M640 190 L720 190"/>', LABEL, 1, 0.6, "4 4"))
    p.append(label(800, 290, "BLADE PROFILE", "middle"))
    p.append(g(f'<path d="M{cx+120} {cy+250} a20 20 0 1 0 0.1 0"/>', GREEN, 0))
    p.append(g(f'<path d="M{cx-150} {cy-250} A290 290 0 0 1 {cx+150} {cy-250}"/><path d="M{cx+150} {cy-250} l-12 -2 m12 2 l-6 10"/>', GREEN, 1.6))
    p.append(label(cx, 560, "ROTOR STAGE", "middle"))
    return svg("".join(p), "Line drawing of a turbine rotor stage and blade profile")


# ---------------------------------------------------------------- campus (site plan)
def campus():
    p = []
    # boundary
    p.append(g('<path d="M60 90 L820 70 L860 500 L90 540 Z"/>', LINE, 1.4, 1, "10 6"))
    # transmission corridor (top)
    p.append(g('<path d="M30 120 L880 100"/><path d="M30 132 L880 112"/>', SOFT, 1.1, 0.8))
    for x in range(80, 880, 120):
        y = 126 - (x - 30) * (20 / 850)
        p.append(g(f'<path d="M{x-9} {y-9} l18 18 M{x+9} {y-9} l-18 18"/>', LINE, 1.4))
    # rail (bottom)
    p.append(g('<path d="M20 560 L880 515"/><path d="M20 574 L880 529"/>', LINE, 1.4))
    p.append(g("".join(f'<path d="M{x} {566 - (x-20)*0.0523 - 12:.1f} l4 22"/>' for x in range(30, 880, 18)), SOFT, 1, 0.6))
    # power block
    p.append(g('<rect x="120" y="170" width="200" height="120" rx="4"/>'
               + "".join(f'<rect x="{x}" y="190" width="30" height="80" rx="2"/>' for x in (138, 180, 222, 264))
               + '<circle cx="300" cy="185" r="0"/>', LINE, 1.6))
    # substation grid
    p.append(g('<rect x="360" y="160" width="120" height="90"/>'
               + "".join(f'<path d="M{x} 160 V250"/>' for x in range(380, 480, 20))
               + "".join(f'<path d="M360 {y} H480"/>' for y in range(178, 250, 18)), LINE, 1.1))
    # data halls
    for i, y in enumerate((310, 380, 450)):
        p.append(g(f'<rect x="{430 - i*8}" y="{y}" width="320" height="50" rx="3"/>'
                   + "".join(f'<circle cx="{450 - i*8 + k*30}" cy="{y+25}" r="7"/>' for k in range(10)), LINE, 1.4))
    # water tanks
    p.append(g('<circle cx="180" cy="370" r="34"/><circle cx="180" cy="370" r="24" opacity="0.5"/>'
               '<circle cx="270" cy="370" r="34"/><circle cx="270" cy="370" r="24" opacity="0.5"/>', LINE, 1.5))
    # gas line + fiber
    p.append(g('<path d="M30 300 C80 300 90 260 120 250"/>', GREEN, 2))
    p.append(g('<path d="M880 260 C820 280 790 300 760 330"/>', GREEN, 1.6, 1, "2 6"))
    # roads
    p.append(g('<path d="M340 150 V520"/><path d="M110 320 H860"/>', SOFT, 1.2, 0.7, "18 10"))
    # labels
    p.append(label(220, 162, "GENERATION", "middle"))
    p.append(label(420, 152, "SUBSTATION", "middle"))
    p.append(label(590, 304, "DATA HALLS", "middle"))
    p.append(label(225, 425, "WATER", "middle"))
    p.append(label(36, 286, "GAS"))
    p.append(label(870, 250, "FIBER", "end"))
    p.append(label(860, 92, "TRANSMISSION", "end"))
    p.append(label(60, 590, "RAIL"))
    # north arrow
    p.append(g('<path d="M840 420 l12 30 l-12 -8 l-12 8 z"/><path d="M840 470 v14"/>', LINE, 1.4))
    p.append(label(840, 410, "N", "middle"))
    return svg("".join(p), "Line drawing of the energy campus site plan")


# ---------------------------------------------------------------- research & industrial
def research_industrial():
    p = []
    gy = 520
    p.append(ground(gy))
    # --- research facility (left): two-storey lab with glazing and rooftop vents
    p.append(g(f'<path d="M60 {gy} V250 H360 V{gy}"/><path d="M60 250 H360 V236 H60 Z"/>', LINE, 1.8))
    for y in (280, 360, 440):
        p.append(g("".join(f'<rect x="{x}" y="{y}" width="48" height="52" rx="2"/>'
                           for x in (86, 152, 218, 284) if not (y == 440 and x in (152, 218))), SOFT, 1.1))
    p.append(g(f'<rect x="186" y="{gy-70}" width="48" height="70"/><path d="M210 {gy-70} V{gy}"/>', LINE, 1.4))
    for x in (96, 166):
        p.append(g(f'<rect x="{x}" y="212" width="30" height="24" rx="2"/><path d="M{x+6} 212 V204 M{x+24} 212 V204"/>', LINE, 1.2))
    # flask emblem
    p.append(g('<path d="M318 168 v22 l-16 30 a6 6 0 0 0 5 9 h38 a6 6 0 0 0 5 -9 l-16 -30 v-22"/><path d="M314 168 h20"/>'
               '<path d="M306 214 h40" opacity="0.6"/>', GREEN, 1.6))
    # --- industrial space (right): sawtooth-roof hall with bay doors
    x0, x1 = 420, 860
    p.append(g(f'<path d="M{x0} {gy} V300 M{x1} 300 V{gy}"/>', LINE, 1.8))
    teeth = "".join(f'<path d="M{x} 300 L{x} 236 L{x+88} 300"/>' for x in range(x0, x1, 88))
    p.append(g(teeth, LINE, 1.6))
    p.append(g("".join(f'<path d="M{x+4} 246 L{x+4} 292" opacity="0.6"/>' for x in range(x0, x1, 88)), SOFT, 1))
    for x in (450, 560, 670):
        door = f'<rect x="{x}" y="{gy-120}" width="80" height="120"/>'
        door += "".join(f'<path d="M{x} {y} H{x+80}"/>' for y in range(gy - 108, gy, 12))
        p.append(g(door, SOFT, 1.1))
    p.append(g(f'<rect x="782" y="{gy-60}" width="40" height="60"/>', LINE, 1.3))
    # gantry crane hint inside
    p.append(g(f'<path d="M440 330 H840"/><path d="M640 330 V352"/><path d="M630 352 h20 l-10 12 z"/>', SOFT, 1.1, 0.7))
    # --- power feed from campus generation
    p.append(g(f'<path d="M360 330 C390 330 392 360 420 360"/>', GREEN, 1.6, 1, "2 6"))
    p.append(g('<path d="M20 200 H60"/><path d="M20 214 H60"/><path d="M30 190 l10 10 l-10 10" />', LINE, 1.4))
    p.append(label(28, 180, "POWER", "start"))
    p.append(leader(160, 236, 160, 140) + label(160, 128, "RESEARCH FACILITY", "middle"))
    p.append(leader(772, 250, 772, 150) + label(772, 138, "INDUSTRIAL SPACE", "middle"))
    return svg("".join(p), "Line drawing of a research facility and an industrial building on the campus")


# ---------------------------------------------------------------- green technology
def green_technology():
    p = []
    gy = 530
    p.append(ground(gy))
    # AAC block building (running-bond courses)
    bx, by, bw, bh = 90, 300, 330, 230
    p.append(g(f'<path d="M{bx} {gy} V{by} H{bx+bw} V{gy}"/><path d="M{bx-12} {by} L{bx+bw/2} {by-70} L{bx+bw+12} {by}"/>', LINE, 1.8))
    rows = ""
    for i, y in enumerate(range(by + 26, gy, 26)):
        rows += f'<path d="M{bx} {y} H{bx+bw}"/>'
        off = 0 if i % 2 == 0 else 33
        rows += "".join(f'<path d="M{x} {y-26} V{y}"/>' for x in range(bx + 66 - off, bx + bw, 66))
    p.append(g(rows, SOFT, 1, 0.75))
    p.append(g(f'<rect x="{bx+130}" y="{gy-80}" width="70" height="80" fill="#0a2241"/><path d="M{bx+165} {gy-80} V{gy}"/>', LINE, 1.5))
    # leaf on roof
    p.append(g(f'<path d="M{bx+bw/2} {by-90} C{bx+bw/2-50} {by-120} {bx+bw/2-40} {by-190} {bx+bw/2+30} {by-200} C{bx+bw/2+50} {by-140} {bx+bw/2+30} {by-100} {bx+bw/2} {by-90} Z"/>'
               f'<path d="M{bx+bw/2} {by-90} C{bx+bw/2+5} {by-130} {bx+bw/2+15} {by-165} {bx+bw/2+30} {by-200}"/>', GREEN, 1.8))
    # stack with capture unit
    sx = 520
    p.append(g(f'<rect x="{sx}" y="380" width="120" height="150" rx="4"/><path d="M{sx+30} 380 V250 M{sx+52} 380 V250 M{sx+27} 250 H{sx+55}"/>'
               f'<rect x="{sx+80}" y="260" width="70" height="120" rx="8"/><path d="M{sx+52} 300 H{sx+80}"/><path d="M{sx+95} 290 h40 M{sx+95} 310 h40 M{sx+95} 330 h40" opacity="0.6"/>', LINE, 1.6))
    # CO2 molecule + arrow into capture
    p.append(g(f'<circle cx="{sx+40}" cy="190" r="13"/><circle cx="{sx+10}" cy="190" r="9"/><circle cx="{sx+70}" cy="190" r="9"/><path d="M{sx+19} 190 h8 M{sx+53} 190 h8"/>', LINE, 1.4))
    p.append(label(sx + 40, 168, "CO2", "middle"))
    p.append(g(f'<path d="M{sx+85} 195 C{sx+120} 200 {sx+130} 230 {sx+120} 255"/><path d="M{sx+112} 246 l8 10 l6 -12"/>', GREEN, 1.8))
    # nanocarbon hexagon lattice
    hx, hy, r = 760, 170, 22
    hexes = ""
    for row in range(3):
        for col in range(3):
            cx = hx + col * r * 1.75 + (r * 0.875 if row % 2 else 0)
            cy = hy + row * r * 1.5
            pts = " ".join(f"{cx + r*math.cos(math.radians(60*k+30)):.1f},{cy + r*math.sin(math.radians(60*k+30)):.1f}" for k in range(6))
            hexes += f'<polygon points="{pts}"/>'
    p.append(g(hexes, GREEN, 1.4))
    p.append(g(f'<path d="M790 270 V420"/><path d="M782 410 l8 12 l8 -12"/><rect x="745" y="430" width="90" height="100" rx="4"/>'
               + "".join(f'<path d="M745 {y} H835"/>' for y in (455, 480, 505)), LINE, 1.4))
    p.append(label(255, 560, "AAC GREEN BUILDING", "middle"))
    p.append(label(600, 560, "CARBON CAPTURE", "middle"))
    p.append(label(790, 140, "NANOCARBON", "middle"))
    return svg("".join(p), "Line drawing of a green AAC building, carbon capture and nanocarbon materials")


ART = {
    "turbine": turbine,
    "natural-gas": natural_gas,
    "nuclear": nuclear,
    "technology": technology,
    "campus": campus,
    "research-industrial": research_industrial,
    "green-technology": green_technology,
}
for name, fn in ART.items():
    path = os.path.join(OUT, f"{name}.svg")
    with open(path, "w") as fh:
        fh.write(fn())
    print(name, os.path.getsize(path), "bytes")
