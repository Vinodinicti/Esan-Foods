import os, sys
sys.path.insert(0, os.path.abspath('.'))
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont
from scripts.build_packets import create_pouch_packet

os.makedirs('public/products', exist_ok=True)

# Generate custom labels with authentic Esan Foods traditional motif
def make_packaged_label(title, tamil, net_wt, primary_color, secondary_color, grain_img_path=None):
    w, h = 420, 280
    lbl = Image.new('RGB', (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(lbl)

    # Top band
    draw.rectangle([0, 0, w, 44], fill=primary_color)
    
    # Bottom band
    draw.rectangle([0, h - 34, w, h], fill=secondary_color)

    # Veg green symbol
    draw.rectangle([w - 40, 10, w - 16, 34], outline=(255, 255, 255), width=2)
    draw.ellipse([w - 34, 16, w - 22, 28], fill=(255, 255, 255))

    # Inner decorative border
    draw.rectangle([6, 50, w - 7, h - 40], outline=(230, 226, 218), width=1)

    # If grain image provided, insert circular cutout
    if grain_img_path and os.path.exists(grain_img_path):
        g_im = Image.open(grain_img_path).resize((130, 130), Image.Resampling.LANCZOS)
        mask = Image.new('L', (130, 130), 0)
        m_draw = ImageDraw.Draw(mask)
        m_draw.ellipse([0, 0, 130, 130], fill=255)
        lbl.paste(g_im, (w - 150, 70), mask)
        draw.ellipse([w - 152, 68, w - 18, 202], outline=primary_color, width=3)

    return lbl

additional_products = [
    {
        'key': 'sathu_maavu',
        'title': 'TRADITIONAL SATHU MAAVU',
        'tamil': 'பாரம்பரிய சத்து மாவு',
        'pouch_tint': (245, 252, 246),
        'accent': (30, 100, 50),
        'secondary': (20, 70, 35),
    },
    {
        'key': 'protein_laddu',
        'title': 'DRY FRUITS PROTEIN LADDU',
        'tamil': 'புரோட்டீன் எனர்ஜி லட்டு',
        'pouch_tint': (255, 249, 238),
        'accent': (180, 100, 20),
        'secondary': (120, 60, 10),
    },
    {
        'key': 'ellu_urundai',
        'title': 'KARUPPU ELLU URUNDAI',
        'tamil': 'கருப்பு எள் உருண்டை',
        'pouch_tint': (252, 246, 240),
        'accent': (140, 70, 30),
        'secondary': (80, 40, 15),
    },
    {
        'key': 'moringa_soup',
        'title': 'MORINGA HERBAL SOUP MIX',
        'tamil': 'முருங்கை இலை சூப் பொடி',
        'pouch_tint': (242, 248, 242),
        'accent': (40, 120, 60),
        'secondary': (25, 80, 40),
    },
    {
        'key': 'ulundu_kali',
        'title': 'KARUPPU ULUNDU KALI MIX',
        'tamil': 'கருப்பு உளுந்தங்களி மாவு',
        'pouch_tint': (248, 244, 238),
        'accent': (90, 60, 40),
        'secondary': (60, 40, 25),
    },
    {
        'key': 'baby_ragi',
        'title': 'SPROUTED RAGI BABY MIX',
        'tamil': 'முளைகட்டிய ராகி பேபி மிக்ஸ்',
        'pouch_tint': (250, 246, 240),
        'accent': (180, 60, 50),
        'secondary': (120, 40, 30),
    }
]

for p in additional_products:
    label = make_packaged_label(p['title'], p['tamil'], '500g', p['accent'], p['secondary'])
    out_path = f"public/products/{p['key']}_packet.png"
    create_pouch_packet(label, p['pouch_tint'], p['accent'], out_path)

print("Generated all additional product packets!")
