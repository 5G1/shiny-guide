from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"

PAGE_BACKGROUND = "#f4f7ef"
WHITE = "#ffffff"
BRAND_GREEN = "#2f6b4f"
SHADOW_COLOR = (0, 0, 0, 32)


def cubic_bezier(p0, p1, p2, p3, steps=40):
    points = []
    for i in range(steps + 1):
        t = i / steps
        x = (
            (1 - t) ** 3 * p0[0]
            + 3 * (1 - t) ** 2 * t * p1[0]
            + 3 * (1 - t) * t**2 * p2[0]
            + t**3 * p3[0]
        )
        y = (
            (1 - t) ** 3 * p0[1]
            + 3 * (1 - t) ** 2 * t * p1[1]
            + 3 * (1 - t) * t**2 * p2[1]
            + t**3 * p3[1]
        )
        points.append((x, y))
    return points


def scale_points(points, x, y, size):
    return [(x + px / 24 * size, y + py / 24 * size) for px, py in points]


def draw_rounded_polyline(draw, points, fill, width):
    if len(points) < 2:
        return

    draw.line(points, fill=fill, width=width, joint="curve")

    radius = width / 2
    for px, py in [points[0], points[-1]]:
        draw.ellipse(
            [px - radius, py - radius, px + radius, py + radius],
            fill=fill,
        )


def draw_leaf(draw, x, y, size, color):
    width = max(5, int(size * 0.09))

    # This approximates the lucide-react Leaf icon used on the homepage.
    # Coordinate system follows 24x24 SVG viewBox.
    outline = []

    outline += cubic_bezier(
        (11.0, 20.0),
        (6.7, 20.0),
        (4.0, 16.5),
        (4.0, 12.3),
        28,
    )

    outline += cubic_bezier(
        (4.0, 12.3),
        (4.0, 8.7),
        (6.3, 6.7),
        (9.8, 6.1),
        28,
    )

    outline += cubic_bezier(
        (9.8, 6.1),
        (15.5, 5.0),
        (17.0, 4.5),
        (19.0, 2.0),
        28,
    )

    outline += cubic_bezier(
        (19.0, 2.0),
        (20.0, 4.0),
        (21.0, 6.2),
        (21.0, 10.0),
        28,
    )

    outline += cubic_bezier(
        (21.0, 10.0),
        (21.0, 15.5),
        (16.2, 20.0),
        (11.0, 20.0),
        36,
    )

    outline_scaled = scale_points(outline, x, y, size)
    draw_rounded_polyline(draw, outline_scaled, color, width)

    vein = []
    vein += cubic_bezier(
        (2.0, 21.0),
        (2.0, 18.0),
        (3.85, 15.65),
        (7.08, 15.0),
        28,
    )
    vein += cubic_bezier(
        (7.08, 15.0),
        (9.5, 14.52),
        (12.0, 13.0),
        (13.0, 12.0),
        28,
    )

    vein_scaled = scale_points(vein, x, y, size)
    draw_rounded_polyline(draw, vein_scaled, color, width)


def create_icon(canvas_size, output_name, circle_ratio=0.72, leaf_ratio=0.34):
    scale = 4
    size = canvas_size * scale

    image = Image.new("RGBA", (size, size), PAGE_BACKGROUND)

    circle_size = int(size * circle_ratio)
    circle_x = (size - circle_size) // 2
    circle_y = (size - circle_size) // 2

    shadow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)

    shadow_offset = int(size * 0.035)
    shadow_draw.ellipse(
        [
            circle_x,
            circle_y + shadow_offset,
            circle_x + circle_size,
            circle_y + circle_size + shadow_offset,
        ],
        fill=SHADOW_COLOR,
    )

    shadow = shadow.filter(ImageFilter.GaussianBlur(int(size * 0.025)))
    image.alpha_composite(shadow)

    draw = ImageDraw.Draw(image)

    draw.ellipse(
        [circle_x, circle_y, circle_x + circle_size, circle_y + circle_size],
        fill=WHITE,
    )

    leaf_size = int(size * leaf_ratio)
    leaf_x = (size - leaf_size) // 2
    leaf_y = (size - leaf_size) // 2

    draw_leaf(draw, leaf_x, leaf_y, leaf_size, BRAND_GREEN)

    image = image.resize((canvas_size, canvas_size), Image.Resampling.LANCZOS)
    image.save(PUBLIC_DIR / output_name)


def main():
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

    create_icon(192, "icon-192.png", circle_ratio=0.72, leaf_ratio=0.34)
    create_icon(512, "icon-512.png", circle_ratio=0.72, leaf_ratio=0.34)
    create_icon(512, "maskable-icon-512.png", circle_ratio=0.62, leaf_ratio=0.30)
    create_icon(180, "apple-touch-icon.png", circle_ratio=0.72, leaf_ratio=0.34)

    print("PWA icons created successfully with Pillow only.")
    print(PUBLIC_DIR / "icon-192.png")
    print(PUBLIC_DIR / "icon-512.png")
    print(PUBLIC_DIR / "maskable-icon-512.png")
    print(PUBLIC_DIR / "apple-touch-icon.png")


if __name__ == "__main__":
    main()