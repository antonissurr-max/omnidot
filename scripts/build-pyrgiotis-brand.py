#!/usr/bin/env python3
"""Generate Pyrgiotis brand SVGs — Pathway-inspired geometry, original mark."""

from __future__ import annotations

import math
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "partners" / "pyrgiotis-brand"
OUT.mkdir(parents=True, exist_ok=True)

BLACK = "#0D0D0D"
BEIGE = "#C9B196"  # Pantone 480–adjacent warm taupe
WHITE = "#FFFFFF"

FONT_PATH = "/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf"
FONT = TTFont(FONT_PATH)
GLYPH_SET = FONT.getGlyphSet()
CMAP = FONT.getBestCmap()
UPM = FONT["head"].unitsPerEm


def text_path(text: str, size: float, x: float, y: float, anchor: str = "start") -> str:
    """Outline text to an SVG path, baseline at y, horizontal anchor."""
    scale = size / UPM
    advances = []
    glyphs = []
    for ch in text:
        gname = CMAP.get(ord(ch))
        if gname is None:
            raise ValueError(f"Missing glyph for {ch!r}")
        glyph = GLYPH_SET[gname]
        glyphs.append(glyph)
        advances.append(glyph.width * scale)

    total = sum(advances)
    if anchor == "middle":
        cursor = x - total / 2
    elif anchor == "end":
        cursor = x - total
    else:
        cursor = x

    parts: list[str] = []
    for glyph, adv in zip(glyphs, advances):
        pen = SVGPathPen(GLYPH_SET)
        # Font y-up → SVG y-down; baseline at y
        tpen = TransformPen(pen, (scale, 0, 0, -scale, cursor, y))
        glyph.draw(tpen)
        d = pen.getCommands()
        if d:
            parts.append(d)
        cursor += adv
    return " ".join(parts)


def rounded_rect_points(
    pts: list[tuple[float, float]], radius: float
) -> str:
    """Build a closed path from polygon points with uniform corner radius."""
    n = len(pts)
    cmds: list[str] = []
    for i in range(n):
        prev = pts[i - 1]
        curr = pts[i]
        nxt = pts[(i + 1) % n]

        v1 = (curr[0] - prev[0], curr[1] - prev[1])
        v2 = (nxt[0] - curr[0], nxt[1] - curr[1])
        len1 = math.hypot(*v1) or 1.0
        len2 = math.hypot(*v2) or 1.0
        u1 = (v1[0] / len1, v1[1] / len1)
        u2 = (v2[0] / len2, v2[1] / len2)
        r = min(radius, len1 / 2, len2 / 2)

        start = (curr[0] - u1[0] * r, curr[1] - u1[1] * r)
        end = (curr[0] + u2[0] * r, curr[1] + u2[1] * r)

        if i == 0:
            cmds.append(f"M {start[0]:.2f} {start[1]:.2f}")
        else:
            cmds.append(f"L {start[0]:.2f} {start[1]:.2f}")
        cmds.append(
            f"Q {curr[0]:.2f} {curr[1]:.2f} {end[0]:.2f} {end[1]:.2f}"
        )
    cmds.append("Z")
    return " ".join(cmds)


def mark_paths(ox: float = 0, oy: float = 0, s: float = 1.0) -> tuple[str, str]:
    """
    Original mark for πυργιώτης:
    - Beige slanted structural column (load path / pier)
    - Black thick portal hook (π lintel + right pier / stylized P bowl)

    Constructed in a 100×120 local space, then scaled/translated.
    """

    def T(x: float, y: float) -> tuple[float, float]:
        return (ox + x * s, oy + y * s)

    # Beige column — parallelogram, slight forward lean (Pathway language)
    beige_pts = [
        T(22, 108),
        T(46, 108),
        T(58, 18),
        T(34, 18),
    ]
    beige = rounded_rect_points(beige_pts, radius=5.5 * s)

    # Black portal/P hook as a thick open stroke expanded to a fill.
    # Centerline from left mouth → top → right down.
    # Outer/inner radii for a ~22-unit thick rounded form.
    # Built as a single closed path.

    # Geometry centers in local 100×120
    # Vertical stem center x ≈ 78, top arc center ≈ (56, 40), radius mid ≈ 28
    thick = 22.0
    r_mid = 30.0
    cx, cy = 54.0, 42.0  # arc center
    right_x = cx + r_mid  # outer right ≈ along mid before thick
    bottom = 108.0
    left_mouth_y = 58.0

    r_out = r_mid + thick / 2
    r_in = r_mid - thick / 2

    def arc_point(angle_deg: float, radius: float) -> tuple[float, float]:
        a = math.radians(angle_deg)
        return T(cx + radius * math.cos(a), cy - radius * math.sin(a))

    # Angles: 180° = left, 90° = top, 0° = right
    # Outer path: left tip (outer) → around top → down right outer → bottom → up inner → around → left tip inner
    p0 = arc_point(175, r_out)  # outer left start
    # right column outer bottom
    right_out_x = cx + r_out
    right_in_x = cx + r_in

    # Build with arc commands in SVG (sweep)
    # Start at outer left tip
    ox0, oy0 = p0
    # Outer arc from ~175° to 0° (clockwise in screen = negative sweep in SVG? )
    # SVG: positive sweep = clockwise. From 175° to 0° going over the top is clockwise.
    top_out = arc_point(90, r_out)
    right_out_top = arc_point(0, r_out)

    # Simpler explicit path:
    # Outer left → outer arc to right → down to bottom → left to inner right → up → inner arc → left tip → close with round cap

    # Left tip centerline at angle 175
    tip_angle = 172
    outer_start = arc_point(tip_angle, r_out)
    inner_end = arc_point(tip_angle, r_in)

    # Round butt at left tip: semicircle connecting outer to inner
    tip_mid = arc_point(tip_angle, r_mid)

    # Right column bottoms
    br_out = T(cx + r_out, bottom)
    br_in = T(cx + r_in, bottom)

    # Round bottom of right column
    # Path:
    # M outer_start
    # A r_out ... to (cx+r_out, cy)  [angle 0]
    # L br_out
    # arc bottom cap to br_in
    # L (cx+r_in, cy)
    # A r_in reverse to inner_end
    # arc tip cap back to outer_start

    # Arc from tip_angle to 0 on outer (clockwise): large-arc=0, sweep=1
    osx, osy = outer_start
    rotx, roty = T(cx + r_out, cy)
    rinx, riny = T(cx + r_in, cy)
    iex, iey = inner_end

    # Bottom cap center
    bcx = (br_out[0] + br_in[0]) / 2
    bcy = bottom

    black = (
        f"M {osx:.2f} {osy:.2f} "
        f"A {r_out * s:.2f} {r_out * s:.2f} 0 0 1 {rotx:.2f} {roty:.2f} "
        f"L {br_out[0]:.2f} {br_out[1]:.2f} "
        f"A {(thick / 2) * s:.2f} {(thick / 2) * s:.2f} 0 0 1 {br_in[0]:.2f} {br_in[1]:.2f} "
        f"L {rinx:.2f} {riny:.2f} "
        f"A {r_in * s:.2f} {r_in * s:.2f} 0 0 0 {iex:.2f} {iey:.2f} "
        f"A {(thick / 2) * s:.2f} {(thick / 2) * s:.2f} 0 0 1 {osx:.2f} {osy:.2f} "
        f"Z"
    )
    return beige, black


def svg_wrap(view: str, body: str, title: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="{title}">
  <title>{title}</title>
{body}
</svg>
'''


def mark_group(
    ox: float,
    oy: float,
    s: float,
    black: str = BLACK,
    beige: str = BEIGE,
    indent: str = "  ",
) -> str:
    b, k = mark_paths(ox, oy, s)
    # Paint beige under black so black overlaps (Pathway depth)
    return (
        f'{indent}<g class="mark">\n'
        f'{indent}  <path fill="{beige}" d="{b}"/>\n'
        f'{indent}  <path fill="{black}" d="{k}"/>\n'
        f"{indent}</g>"
    )


def write(name: str, content: str) -> Path:
    path = OUT / name
    path.write_text(content, encoding="utf-8")
    print(f"wrote {path.relative_to(ROOT)}")
    return path


def main() -> None:
    # --- Icon only ---
    write(
        "mark.svg",
        svg_wrap(
            "0 0 100 120",
            mark_group(0, 0, 1),
            "πυργιώτης mark",
        ),
    )

    # --- Stacked primary (Pathway main lockup) ---
    word = text_path("πυργιώτης", size=14, x=50, y=148, anchor="middle")
    stacked = "\n".join(
        [
            mark_group(0, 0, 1),
            f'  <path fill="{BEIGE}" d="{word}"/>',
        ]
    )
    write(
        "logo-stacked.svg",
        svg_wrap("0 0 100 160", stacked, "πυργιώτης"),
    )

    # Latin stacked
    word_en = text_path("pyrgiotis", size=13.5, x=50, y=148, anchor="middle")
    write(
        "logo-stacked-en.svg",
        svg_wrap(
            "0 0 100 160",
            "\n".join(
                [
                    mark_group(0, 0, 1),
                    f'  <path fill="{BEIGE}" d="{word_en}"/>',
                ]
            ),
            "pyrgiotis",
        ),
    )

    # --- Horizontal lockup ---
    word_h = text_path("πυργιώτης", size=22, x=118, y=72, anchor="start")
    horiz = "\n".join(
        [
            mark_group(0, 8, 0.85),
            f'  <path fill="{BEIGE}" d="{word_h}"/>',
        ]
    )
    write(
        "logo-horizontal.svg",
        svg_wrap("0 0 280 120", horiz, "πυργιώτης"),
    )

    # --- Integrated: mark as first letter ---
    word_rest = text_path("υργιώτης", size=28, x=78, y=78, anchor="start")
    integ = "\n".join(
        [
            mark_group(0, 10, 0.72),
            f'  <path fill="{BEIGE}" d="{word_rest}"/>',
        ]
    )
    write(
        "logo-integrated.svg",
        svg_wrap("0 0 260 120", integ, "πυργιώτης integrated"),
    )

    # --- Text inside curve (Pathway alternative) ---
    word_in = text_path("πυργιώτης", size=9.5, x=52, y=40, anchor="middle")
    inside = "\n".join(
        [
            mark_group(0, 0, 1),
            f'  <path fill="{BEIGE}" d="{word_in}"/>',
        ]
    )
    write(
        "logo-inline.svg",
        svg_wrap("0 0 100 120", inside, "πυργιώτης inline"),
    )

    # --- Dark version ---
    word_w = text_path("πυργιώτης", size=14, x=50, y=148, anchor="middle")
    dark = "\n".join(
        [
            f'  <rect width="100" height="160" fill="{BLACK}" rx="0"/>',
            mark_group(0, 0, 1, black=WHITE, beige=BEIGE),
            f'  <path fill="{WHITE}" d="{word_w}"/>',
        ]
    )
    write(
        "logo-dark.svg",
        svg_wrap("0 0 100 160", dark, "πυργιώτης dark"),
    )

    # --- Mono / BW ---
    write(
        "logo-mono.svg",
        svg_wrap(
            "0 0 100 160",
            "\n".join(
                [
                    mark_group(0, 0, 1, black=BLACK, beige="#8A8A8A"),
                    f'  <path fill="{BLACK}" d="{word}"/>',
                ]
            ),
            "πυργιώτης mono",
        ),
    )

    # --- Partner strip (light wordmark for dark site chrome) ---
    partner = "\n".join(
        [
            mark_group(8, 4, 0.38, black=WHITE, beige=BEIGE),
            f'  <path fill="{WHITE}" d="{text_path("πυργιώτης", size=18, x=58, y=34, anchor="start")}"/>',
        ]
    )
    write(
        "logo-partner.svg",
        svg_wrap("0 0 220 56", partner, "Πυργιώτης ΟΕ"),
    )

    # --- Brand board (Pathway-style presentation) ---
    board = build_brand_board()
    write("brand-board.svg", board)

    # Also publish primary stacked + partner into partners root
    (ROOT / "public/images/partners/pyrgiotis.svg").write_text(
        svg_wrap("0 0 220 56", partner, "Πυργιώτης ΟΕ"),
        encoding="utf-8",
    )
    print("wrote public/images/partners/pyrgiotis.svg")

    # Copy stacked as canonical logo
    (OUT / "logo.svg").write_text(
        (OUT / "logo-stacked.svg").read_text(encoding="utf-8"),
        encoding="utf-8",
    )
    print("wrote public/images/partners/pyrgiotis-brand/logo.svg")


def build_brand_board() -> str:
    """Full identity sheet mirroring the Pathway reference layout."""
    # Large primary
    primary_mark = mark_group(80, 70, 2.2)
    primary_word = text_path("πυργιώτης", size=36, x=190, y=380, anchor="middle")

    # Dark tile
    dark_tile = "\n".join(
        [
            f'  <rect x="420" y="90" width="200" height="260" fill="{BLACK}"/>',
            mark_group(455, 120, 1.15, black=WHITE, beige=BEIGE),
            f'  <path fill="{WHITE}" d="{text_path("πυργιώτης", size=16, x=520, y=300, anchor="middle")}"/>',
        ]
    )

    # BW tile
    bw = "\n".join(
        [
            f'  <rect x="660" y="90" width="200" height="260" fill="none" stroke="#E6E6E6"/>',
            mark_group(695, 120, 1.15, black=BLACK, beige="#9A9A9A"),
            f'  <path fill="{BLACK}" d="{text_path("πυργιώτης", size=16, x=760, y=300, anchor="middle")}"/>',
        ]
    )

    # Color chips
    chips = f'''
  <g transform="translate(80 470)">
    <rect width="44" height="44" fill="{BLACK}"/>
    <text x="56" y="18" font-family="Inter, Helvetica, Arial, sans-serif" font-size="11" fill="#666">Black</text>
    <text x="56" y="34" font-family="Inter, Helvetica, Arial, sans-serif" font-size="11" fill="#999">#0D0D0D</text>
    <rect x="180" width="44" height="44" fill="{BEIGE}"/>
    <text x="236" y="18" font-family="Inter, Helvetica, Arial, sans-serif" font-size="11" fill="#666">Warm stone</text>
    <text x="236" y="34" font-family="Inter, Helvetica, Arial, sans-serif" font-size="11" fill="#999">#C9B196 · Pantone 480</text>
  </g>'''

    # Alternatives row — Pathway-style lockups
    alt1 = "\n".join(
        [
            '  <g transform="translate(70 555) scale(0.95)">',
            mark_group(0, 0, 1, indent="    "),
            f'    <path fill="{BEIGE}" d="{text_path("πυργιώτης", size=7.4, x=52, y=40, anchor="middle")}"/>',
            "  </g>",
        ]
    )
    alt2 = "\n".join(
        [
            '  <g transform="translate(280 575)">',
            mark_group(0, 0, 0.7, indent="    "),
            f'    <path fill="{BEIGE}" d="{text_path("υργιώτης", size=26, x=78, y=72, anchor="start")}"/>',
            "  </g>",
        ]
    )
    alt3 = "\n".join(
        [
            '  <g transform="translate(580 555) scale(0.85)">',
            mark_group(0, 0, 1, indent="    "),
            f'    <path fill="{BEIGE}" d="{text_path("πυργιώτης", size=14, x=50, y=148, anchor="middle")}"/>',
            "  </g>",
        ]
    )
    alt4 = "\n".join(
        [
            '  <g transform="translate(760 590)">',
            mark_group(0, 0, 0.5, indent="    "),
            f'    <path fill="{BEIGE}" d="{text_path("pyrgiotis", size=16, x=62, y=44, anchor="start")}"/>',
            "  </g>",
        ]
    )

    labels = '''
  <text x="80" y="50" font-family="Inter, Helvetica, Arial, sans-serif" font-size="13" letter-spacing="0.22em" fill="#AAA">PYRGIOTIS · BRAND SYSTEM</text>
  <text x="420" y="78" font-family="Inter, Helvetica, Arial, sans-serif" font-size="10" fill="#BBB">DARK</text>
  <text x="660" y="78" font-family="Inter, Helvetica, Arial, sans-serif" font-size="10" fill="#BBB">B/W</text>
  <text x="80" y="545" font-family="Inter, Helvetica, Arial, sans-serif" font-size="10" letter-spacing="0.18em" fill="#BBB">ALTERNATIVES</text>
'''

    # Dimension ticks like Pathway
    dims = f'''
  <g stroke="#CCC" stroke-width="0.75" fill="none">
    <line x1="80" y1="62" x2="300" y2="62"/>
    <line x1="80" y1="58" x2="80" y2="66"/>
    <line x1="300" y1="58" x2="300" y2="66"/>
  </g>
  <text x="190" y="58" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="9" fill="#BBB">10</text>
'''

    body = "\n".join(
        [
            f'  <rect width="1000" height="760" fill="{WHITE}"/>',
            labels,
            dims,
            primary_mark,
            f'  <path fill="{BEIGE}" d="{primary_word}"/>',
            dark_tile,
            bw,
            chips,
            alt1,
            alt2,
            alt3,
            alt4,
        ]
    )
    return svg_wrap("0 0 1000 760", body, "πυργιώτης brand system")


if __name__ == "__main__":
    main()
