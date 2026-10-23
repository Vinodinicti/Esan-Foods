import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps

os.makedirs('public/products', exist_ok=True)
os.makedirs('public/brand', exist_ok=True)

raw_items = [
    {
        'key': 'mens_health_mix',
        'src': r'C:/Users/HP/.gemini/antigravity/brain/081b26ea-b01a-446c-9785-91585cdc072e/.user_uploaded/media_1792652401687_9dab5814.jpg',
        'pouch_tint': (248, 240, 248),
        'accent': (180, 50, 140),
        'title': "Men's Health Mix 250g",
        'label_front_box': (12, 192, 215, 338),
        'label_back_box': (243, 192, 447, 338),
    },
    {
        'key': 'bone_strong_mix',
        'src': r'C:/Users/HP/.gemini/antigravity/brain/081b26ea-b01a-446c-9785-91585cdc072e/.user_uploaded/media_1792652417515_23e66149.jpg',
        'pouch_tint': (240, 246, 252),
        'accent': (40, 100, 180),
        'title': "Bone Strong Health Mix 250g",
        'label_front_box': (12, 192, 215, 338),
        'label_back_box': (243, 192, 447, 338),
    },
    {
        'key': 'sugar_control_mix',
        'src': r'C:/Users/HP/.gemini/antigravity/brain/081b26ea-b01a-446c-9785-91585cdc072e/.user_uploaded/media_1792652440752_2dc3deb1.jpg',
        'pouch_tint': (254, 246, 235),
        'accent': (180, 100, 20),
        'title': "Sugar Control Health Mix 250g",
        'label_front_box': (12, 192, 215, 338),
        'label_back_box': (243, 192, 447, 338),
    },
    {
        'key': 'womens_health_mix',
        'src': r'C:/Users/HP/.gemini/antigravity/brain/081b26ea-b01a-446c-9785-91585cdc072e/.user_uploaded/media_1792652449030_dace98e5.jpg',
        'pouch_tint': (240, 250, 242),
        'accent': (30, 130, 60),
        'title': "Women's Health Mix 250g",
        'label_front_box': (12, 192, 215, 338),
        'label_back_box': (243, 192, 447, 338),
    }
]

# Extract Esan Foods Official Logo
ref_im = Image.open(raw_items[0]['src'])
logo_crop = ref_im.crop((20, 786, 96, 862))
logo_crop.save('public/brand/esan_logo.png')
print("Successfully extracted official Esan Foods logo.")

def create_pouch_packet(label_img, pouch_tint, accent_color, output_path, bg_color=(250, 248, 244)):
    """
    Renders a photo-realistic 3D standup doy-pack pouch with heat seal, zip-lock, tear notches,
    crease highlights, and applied label.
    """
    canvas_w, canvas_h = 800, 800
    canvas = Image.new('RGB', (canvas_w, canvas_h), bg_color)
    draw = ImageDraw.Draw(canvas)

    # 1. Subtle warm studio radial lighting on background
    pedestal_y = 690
    # Soft ground shadow
    shadow_layer = Image.new('RGBA', (canvas_w, canvas_h), (0,0,0,0))
    s_draw = ImageDraw.Draw(shadow_layer)
    s_draw.ellipse([210, pedestal_y - 25, 590, pedestal_y + 35], fill=(30, 45, 35, 75))
    s_draw.ellipse([240, pedestal_y - 15, 560, pedestal_y + 25], fill=(20, 35, 25, 110))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(18))
    canvas.paste(shadow_layer, (0, 0), shadow_layer)

    # 2. Pouch Dimensions
    pouch_top = 110
    pouch_bottom = 680
    pouch_top_w = 340
    pouch_bot_w = 370
    cx = canvas_w // 2

    tl_x = cx - pouch_top_w // 2
    tr_x = cx + pouch_top_w // 2
    bl_x = cx - pouch_bot_w // 2
    br_x = cx + pouch_bot_w // 2

    # Pouch polygon base layer
    pouch_poly = [
        (tl_x + 8, pouch_top),
        (tr_x - 8, pouch_top),
        (tr_x + 8, pouch_top + 30),
        (br_x + 6, pouch_bottom - 40),
        (br_x - 25, pouch_bottom),
        (cx, pouch_bottom + 8),
        (bl_x + 25, pouch_bottom),
        (bl_x - 6, pouch_bottom - 40),
        (tl_x - 8, pouch_top + 30),
    ]

    pouch_img = Image.new('RGBA', (canvas_w, canvas_h), (0,0,0,0))
    p_draw = ImageDraw.Draw(pouch_img)

    # Pouch base color (matte white / soft tint)
    p_draw.polygon(pouch_poly, fill=pouch_tint)

    # 3. Add 3D Shading & Volume Gradients across pouch width
    # Left shadow curve
    for i in range(40):
        alpha = int(45 * (1 - i / 40.0))
        p_draw.line([(bl_x + i, pouch_bottom), (tl_x + i * 0.9, pouch_top)], fill=(0, 0, 0, alpha), width=2)

    # Right shadow curve
    for i in range(40):
        alpha = int(55 * (1 - i / 40.0))
        p_draw.line([(br_x - i, pouch_bottom), (tr_x - i * 0.9, pouch_top)], fill=(0, 0, 0, alpha), width=2)

    # Center vertical soft highlight (gives cylinder/pillow pouch volume)
    for i in range(60):
        alpha = int(25 * (1 - abs(i - 30) / 30.0))
        p_draw.line([(cx - 30 + i, pouch_top + 20), (cx - 30 + i, pouch_bottom - 10)], fill=(255, 255, 255, alpha), width=2)

    # 4. Top Heat Seal Bar & Grips
    seal_top = pouch_top
    seal_bottom = pouch_top + 45
    p_draw.rectangle([tl_x - 4, seal_top, tr_x + 4, seal_bottom], fill=(235, 232, 226, 230))
    # Seal vertical crimp ridges
    for rx in range(int(tl_x), int(tr_x), 6):
        p_draw.line([(rx, seal_top + 4), (rx, seal_bottom - 4)], fill=(190, 185, 175, 160), width=1)
        p_draw.line([(rx + 1, seal_top + 4), (rx + 1, seal_bottom - 4)], fill=(255, 255, 255, 130), width=1)

    # Tear notches
    notch_y = seal_bottom + 18
    p_draw.polygon([(tl_x - 8, notch_y - 6), (tl_x, notch_y), (tl_x - 8, notch_y + 6)], fill=(120, 115, 105, 240))
    p_draw.polygon([(tr_x + 8, notch_y - 6), (tr_x, notch_y), (tr_x + 8, notch_y + 6)], fill=(120, 115, 105, 240))

    # Zip-lock guide line
    ziplock_y = seal_bottom + 26
    p_draw.line([(tl_x, ziplock_y), (tr_x, ziplock_y)], fill=(185, 180, 170, 160), width=2)
    p_draw.line([(tl_x, ziplock_y + 1), (tr_x, ziplock_y + 1)], fill=(255, 255, 255, 180), width=1)

    # Bottom gusset fold shadow
    p_draw.arc([bl_x + 10, pouch_bottom - 22, br_x - 10, pouch_bottom + 6], start=0, end=180, fill=(0, 0, 0, 70), width=3)

    # 5. Place the Product Label on the Pouch
    # The label should occupy roughly width 330px, height 235px
    lbl_w = 340
    lbl_aspect = label_img.height / label_img.width
    lbl_h = int(lbl_w * lbl_aspect)
    resized_lbl = label_img.resize((lbl_w, lbl_h), Image.Resampling.LANCZOS)

    # Slight rounded corners on label sticker
    lbl_mask = Image.new('L', (lbl_w, lbl_h), 0)
    lbl_m_draw = ImageDraw.Draw(lbl_mask)
    lbl_m_draw.rounded_rectangle([0, 0, lbl_w, lbl_h], radius=10, fill=255)

    lbl_x = cx - lbl_w // 2
    lbl_y = pouch_top + 105

    # Subtle sticker drop shadow
    stk_shadow = Image.new('RGBA', (canvas_w, canvas_h), (0,0,0,0))
    stk_draw = ImageDraw.Draw(stk_shadow)
    stk_draw.rounded_rectangle([lbl_x - 2, lbl_y - 1, lbl_x + lbl_w + 3, lbl_y + lbl_h + 4], radius=12, fill=(0,0,0,45))
    stk_shadow = stk_shadow.filter(ImageFilter.GaussianBlur(4))
    pouch_img.paste(stk_shadow, (0, 0), stk_shadow)

    # Paste the label
    pouch_img.paste(resized_lbl, (lbl_x, lbl_y), lbl_mask)

    # Subtle sheen overlay on top of label
    sheen = Image.new('RGBA', (lbl_w, lbl_h), (0,0,0,0))
    sh_draw = ImageDraw.Draw(sheen)
    sh_draw.polygon([(0, 0), (lbl_w // 2, 0), (lbl_w // 4, lbl_h), (0, lbl_h)], fill=(255, 255, 255, 20))
    pouch_img.paste(sheen, (lbl_x, lbl_y), sheen)

    # 6. Quality Stamp & Badge on Pouch
    # Top "Esan Foods 100% Traditional" gold seal
    badge_x = cx + pouch_top_w // 2 - 35
    badge_y = pouch_top + 70
    p_draw.ellipse([badge_x - 26, badge_y - 26, badge_x + 26, badge_y + 26], fill=(245, 170, 30, 240), outline=(255, 225, 130), width=2)
    # Inner ring
    p_draw.ellipse([badge_x - 21, badge_y - 21, badge_x + 21, badge_y + 21], outline=(255, 255, 255, 200), width=1)

    # Net wt indicator at bottom corner of pouch
    wt_x = cx
    wt_y = pouch_bottom - 24
    p_draw.rounded_rectangle([wt_x - 55, wt_y - 12, wt_x + 55, wt_y + 14], radius=8, fill=(30, 77, 43, 220))
    
    # Composite pouch over canvas
    canvas.paste(pouch_img, (0, 0), pouch_img)

    # Final overall soft contrast enhancement
    enhancer = ImageEnhance.Sharpness(canvas)
    canvas = enhancer.enhance(1.2)
    canvas.save(output_path, quality=95)
    print(f"Generated packet image: {output_path}")

for it in raw_items:
    im = Image.open(it['src'])
    front_label = im.crop(it['label_front_box'])
    back_label = im.crop(it['label_back_box'])

    # Save standalone cropped labels
    front_label_path = f"public/products/{it['key']}_front.png"
    back_label_path = f"public/products/{it['key']}_back.png"
    front_label.save(front_label_path)
    back_label.save(back_label_path)

    # Generate 3D stand-up pouch packet
    pouch_output = f"public/products/{it['key']}_packet.png"
    create_pouch_packet(front_label, it['pouch_tint'], it['accent'], pouch_output)

print("All packets successfully built!")
