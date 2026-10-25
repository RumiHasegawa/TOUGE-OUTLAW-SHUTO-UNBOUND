/**
 * ANIME CHARACTER CREATOR DATABASE (NFS UNBOUND STYLE)
 * Anime Character Customization options: Hair, Face, Eyes, Outfit, Pose, Voice/Personality
 */

const CHARACTER_CUSTOMIZER_DATA = {
    genders: [
        { id: "male", name: "Racer Boy (Shonen)", baseAvatar: "👦" },
        { id: "female", name: "Racer Girl (Heroine)", baseAvatar: "👧" }
    ],
    hairStyles: [
        { id: "spiky_tuner", name: "Touge Spiky (Wild Drift)", icon: "⚡", animeStyle: "Initial-Spike" },
        { id: "undercut_cyber", name: "Neo Tokyo Undercut", icon: "✂️", animeStyle: "Cyberpunk Fade" },
        { id: "twin_tails", name: "Valkyrie Twin Tails", icon: "🎀", animeStyle: "Twin Drill" },
        { id: "wolf_cut", name: "Shuto Wolf Cut", icon: "🐺", animeStyle: "Messy Layered" },
        { id: "slick_pompadour", name: "Bosozoku Leader Pompadour", icon: "💈", animeStyle: "Classic Rebel" },
        { id: "long_straight", name: "Midnight Hime Cut", icon: "✨", animeStyle: "Straight Flow" }
    ],
    hairColors: [
        { id: "midnight_black", name: "Jet Black", hex: "#111115" },
        { id: "cyber_cyan", name: "Electric Cyan", hex: "#00e5ff" },
        { id: "neon_pink", name: "Hyper Pink", hex: "#ff007f" },
        { id: "flame_orange", name: "Kansei Orange", hex: "#ff6600" },
        { id: "platinum_white", name: "Phantom White", hex: "#eef2f7" },
        { id: "toxic_lime", name: "Acid Lime", hex: "#76ff03" },
        { id: "royal_purple", name: "Akuma Purple", hex: "#9d4edd" }
    ],
    eyeColors: [
        { id: "crimson_red", name: "Rival Crimson", hex: "#ff1744" },
        { id: "sapphire_blue", name: "Wangan Blue", hex: "#2979ff" },
        { id: "golden_amber", name: "Apex Amber", hex: "#ffc400" },
        { id: "emerald_green", name: "Speed Green", hex: "#00e676" },
        { id: "amethyst_violet", name: "Demon Violet", hex: "#d500f9" }
    ],
    skinTones: [
        { id: "anime_fair", name: "Porcelain Anime", hex: "#ffe0bd" },
        { id: "anime_peach", name: "Warm Peach", hex: "#ffd1b3" },
        { id: "anime_tan", name: "Sun-Kissed Touge", hex: "#d2996e" },
        { id: "anime_deep", name: "Deep Bronzed", hex: "#8d5524" }
    ],
    outfits: [
        { 
            id: "unbound_streetwear", 
            brand: "PALACE-X // TOKYO", 
            name: "Oversized Anime Hoodie & Cargo", 
            type: "Hype Streetwear", 
            preview: "🧥",
            colorVariants: ["#1e1e24", "#ff0055", "#00ffff", "#ffffff"]
        },
        { 
            id: "racing_leather", 
            brand: "TAKUMI GEAR", 
            name: "Shuto Leather Biker Jacket", 
            type: "Vintage Racer", 
            preview: "🏍️",
            colorVariants: ["#000000", "#990000", "#1a3366"]
        },
        { 
            id: "techwear_windbreaker", 
            brand: "CYBER-DRIFT", 
            name: "Holographic Techwear Windbreaker", 
            type: "Cyberpunk Tuner", 
            preview: "🦺",
            colorVariants: ["#00ffff", "#ff00ff", "#222222"]
        },
        { 
            id: "bosozoku_tokkoufuku", 
            brand: "NIGHT PHANTOM", 
            name: "Trench Coat 'Birodo' Embroidery", 
            type: "Classic Outlaw", 
            preview: "🥋",
            colorVariants: ["#111111", "#ffffff", "#4a0e17"]
        }
    ],
    accessories: [
        { id: "none", name: "Tanpa Aksesoris", icon: "🚫" },
        { id: "cyber_visor", name: "Holographic HUD Shades", icon: "🕶️" },
        { id: "drift_mask", name: "Anti-Smoke Oni Mask", icon: "😷" },
        { id: "cat_headphones", name: "RGB Mecha Ear Headphones", icon: "🎧" },
        { id: "bandana_head", name: "Kanjo Racing Bandana", icon: "🧣" }
    ],
    poses: [
        { id: "arms_crossed", name: "The Cold Apex", desc: "Berdiri tegak melipat tangan di depan mobil", icon: "🧍" },
        { id: "hood_lean", name: "Capot Chill", desc: "Bersandar santai di kap mesin mobil", icon: "🛋️" },
        { id: "victory_v", name: "Anime Peace Sign", desc: "Pose ceria dua jari dengan senyum percaya diri", icon: "✌️" },
        { id: "bosozoku_squat", name: "Outlaw Street Squat", desc: "Jongkok jalanan khas pembalap malam Tokyo", icon: "🧎" }
    ]
};

// CURRENT PLAYER CHARACTER STATE
let playerCharacter = {
    name: "REN 'PHANTOM' KAI",
    gender: "male",
    hairStyle: "spiky_tuner",
    hairColor: "#00e5ff",
    eyeColor: "#ff1744",
    skinTone: "#ffe0bd",
    outfit: "unbound_streetwear",
    outfitColor: "#1e1e24",
    accessory: "cyber_visor",
    pose: "arms_crossed",
    tagline: "Di tikungan Shuto, bayanganku yang memimpin!"
};
