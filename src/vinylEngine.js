/**
 * TOUGE OUTLAW: SHUTO UNBOUND
 * VINYL & DECAL / LIVERY EDITOR ENGINE
 * Generates dynamic 2D canvas textures and maps them to 3D car meshes (Both Procedural & 3D Models)
 */

const VINYL_DATABASE = [
    {
        id: "none",
        name: "Clean Factory Paint",
        category: "stock",
        description: "Cat bodi polos pabrikan tanpa stiker atau vinyl.",
        icon: "⚪",
        tier: "OEM",
        price: 0
    },
    // --- ANIME ITASHA WRAPS (UNBOUND STYLE) ---
    {
        id: "itasha_valkyrie",
        name: "Cyber Valkyrie [サイバー戦乙女]",
        category: "itasha",
        description: "Livery itasha anime heroine dengan sayap neon mecha & garis kecepatan cyan/magenta.",
        icon: "🧚‍♀️",
        tier: "Tier 3 Legend",
        price: 3500000,
        primaryColor: "#00ffff",
        secondaryColor: "#ff007f",
        tag: "ITASHA SPECIAL"
    },
    {
        id: "itasha_onimusume",
        name: "Crimson Oni Maiden [鬼娘ミッドナイト]",
        category: "itasha",
        description: "Livery anime iblis tanduk merah dengan kelopak sakura hitam dan api cel-shading.",
        icon: "👹",
        tier: "Tier 3 Legend",
        price: 3800000,
        primaryColor: "#ff0033",
        secondaryColor: "#ffdd00",
        tag: "ITASHA SPECIAL"
    },
    {
        id: "itasha_glitch",
        name: "Neo-Shinjuku Glitch [ネオ新宿]",
        category: "itasha",
        description: "Anime street pilot dengan glitch cyber, garis bahaya kuning-hitam, dan tag Tokyo.",
        icon: "⚡",
        tier: "Tier 2 Tuner",
        price: 2800000,
        primaryColor: "#ffff00",
        secondaryColor: "#00eeff",
        tag: "STREETWEAR"
    },
    {
        id: "itasha_ghost",
        name: "Phantom Reaper [幽霊レーサー]",
        category: "itasha",
        description: "Manga aesthetic gadis hantu malam dengan aksen ungu neon dan kanji Shuto gelap.",
        icon: "👻",
        tier: "Tier 3 Legend",
        price: 4200000,
        primaryColor: "#aa00ff",
        secondaryColor: "#00ffff",
        tag: "NIGHT PHANTOM CREW"
    },

    // --- CLASSIC RACING & TRIBAL (NFS CARBON & MW STYLE) ---
    {
        id: "stripes_mw_hero",
        name: "MW2005 Iconic Twin Stripes",
        category: "racing",
        description: "Garis ganda legendaris perak/cyan dengan panah aerodinamis samping pintu ala sang Raja Aspal.",
        icon: "🏁",
        tier: "Tier 2 Tuner",
        price: 2000000,
        primaryColor: "#00ffff",
        secondaryColor: "#ffffff",
        tag: "MW NOSTALGIA"
    },
    {
        id: "tribal_bushido",
        name: "Bushido Dragon Tribal [Kenji Spec]",
        category: "racing",
        description: "Tribal naga merah melintang dari fender depan sampai pintu belakang ala NFS Carbon Bushido.",
        icon: "🐉",
        tier: "Tier 2 Tuner",
        price: 2200000,
        primaryColor: "#ff0033",
        secondaryColor: "#ffffff",
        tag: "CARBON TRIBAL"
    },
    {
        id: "carbon_speed_slash",
        name: "Carbon Hood & Diagonal Slash",
        category: "racing",
        description: "Serat karbon di kap mesin dan sayap dengan sayatan diagonal neon di sepanjang bodi.",
        icon: "🔪",
        tier: "Tier 1 Street",
        price: 1500000,
        primaryColor: "#ffaa00",
        secondaryColor: "#111111",
        tag: "TIME ATTACK"
    },
    {
        id: "canyon_camo",
        name: "Shuto Urban Camo",
        category: "racing",
        description: "Motif kamuflase poligon abu-abu gelap dan cyan neon terinspirasi terowongan Shuto.",
        icon: "🛡️",
        tier: "Tier 1 Street",
        price: 1200000,
        primaryColor: "#00ffff",
        secondaryColor: "#445566",
        tag: "URBAN CAMO"
    },
    {
        id: "manga_flames",
        name: "Redline Mecha Flames",
        category: "racing",
        description: "Lidah api bergaya komik manga dengan outline tebal cel-shading hitam pekat.",
        icon: "🔥",
        tier: "Tier 2 Tuner",
        price: 1800000,
        primaryColor: "#ff3300",
        secondaryColor: "#ffcc00",
        tag: "HOT ROD MANGA"
    },

    // --- SPONSOR & TUNER PACKS ---
    {
        id: "sponsor_tuner_pack",
        name: "All-Star Tuner Sponsor Decals",
        category: "decals",
        description: "Kumpulan stiker sponsor: MECHA-HARE, VORTEX-X, FREEDOM-CRAFT, HYPER-VOLT, K-WAZA di pintu & kaca.",
        icon: "🏷️",
        tier: "Tier 1 Street",
        price: 800000,
        primaryColor: "#ffffff",
        secondaryColor: "#ff0055",
        tag: "D1GP SPONSOR"
    },
    {
        id: "kanji_outlaw_pack",
        name: "Shuto Calligraphy Decals [首都高 / 鬼神]",
        category: "decals",
        description: "Kaligrafi kanji Jepang besar di pintu dan kap mesin: 首都高 (Shuto-kou), 鬼神 (Kishin), 峠 (Touge).",
        icon: "⛩️",
        tier: "Tier 1 Street",
        price: 950000,
        primaryColor: "#ffffff",
        secondaryColor: "#ff0033",
        tag: "JDM KANJI"
    }
];

// Stiker tambahan (Decal Overlay) yang bisa ditempelkan bersamaan
const DECAL_OVERLAYS = [
    { id: "num_01", name: "Race #01", text: "01", type: "number" },
    { id: "num_07", name: "Lucky #07", text: "07", type: "number" },
    { id: "num_13", name: "Outlaw #13", text: "13", type: "number" },
    { id: "num_17", name: "KuroList #17", text: "17", type: "number" },
    { id: "num_99", name: "Night #99", text: "99", type: "number" },
    { id: "badge_shuto", name: "Tokyo Shuto Tollway Stamp", text: "首都高速", type: "stamp" },
    { id: "badge_outlaw", name: "KuroList Shadow Stamp", text: "黒名簿", type: "stamp" },
    { id: "badge_touge", name: "Touge King Stamp", text: "峠最速", type: "stamp" },
];

/**
 * Vinyl & Decal Manager
 */
class VinylManager {
    constructor() {
        this.activeVinylId = "none";
        this.activeDecalId = null;
        this.vinylCustomColor = null; // optional custom color override
        this.cachedTexture = null;
    }

    /**
     * Generate HTML5 Canvas 1024x1024 and draw selected livery
     */
    generateTexture(baseCarColor, vinylId, decalId) {
        const vId = vinylId || this.activeVinylId;
        const dId = decalId !== undefined ? decalId : this.activeDecalId;

        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // 1. Base Car Paint Color
        ctx.fillStyle = baseCarColor || "#1a4499";
        ctx.fillRect(0, 0, 1024, 1024);

        if (vId === "none") {
            // Pure stock paint
            return new THREE.CanvasTexture(canvas);
        }

        const vinylData = VINYL_DATABASE.find(v => v.id === vId);
        const priColor = this.vinylCustomColor || (vinylData ? vinylData.primaryColor : "#00ffff");
        const secColor = vinylData ? vinylData.secondaryColor : "#ff007f";

        // 2. Render Specific Vinyl Pattern
        switch(vId) {
            case "itasha_valkyrie":
                this._drawItashaValkyrie(ctx, priColor, secColor);
                break;
            case "itasha_onimusume":
                this._drawItashaOni(ctx, priColor, secColor);
                break;
            case "itasha_glitch":
                this._drawItashaGlitch(ctx, priColor, secColor);
                break;
            case "itasha_ghost":
                this._drawItashaGhost(ctx, priColor, secColor);
                break;
            case "stripes_mw_hero":
                this._drawMWStripes(ctx, priColor, secColor);
                break;
            case "tribal_bushido":
                this._drawBushidoTribal(ctx, priColor, secColor);
                break;
            case "carbon_speed_slash":
                this._drawCarbonSlash(ctx, priColor, secColor);
                break;
            case "canyon_camo":
                this._drawCamo(ctx, priColor, secColor);
                break;
            case "manga_flames":
                this._drawMangaFlames(ctx, priColor, secColor);
                break;
            case "sponsor_tuner_pack":
                this._drawSponsorPack(ctx, priColor, secColor);
                break;
            case "kanji_outlaw_pack":
                this._drawKanjiPack(ctx, priColor, secColor);
                break;
            default:
                this._drawMWStripes(ctx, priColor, secColor);
        }

        // 3. Render Decal Overlay (Race Number / Stamp)
        if (dId) {
            const decalObj = DECAL_OVERLAYS.find(d => d.id === dId);
            if (decalObj) {
                this._drawDecalStamp(ctx, decalObj);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        this.cachedTexture = texture;
        return texture;
    }

    // ==========================================
    // DRAW PROCEDURAL VINYL GRAPHICS ON CANVAS
    // ==========================================

    _drawMWStripes(ctx, pri, sec) {
        // Dual Racing Center Stripes
        ctx.fillStyle = pri;
        ctx.fillRect(440, 0, 60, 1024);
        ctx.fillRect(524, 0, 60, 1024);

        // Thin pinstripes
        ctx.fillStyle = sec;
        ctx.fillRect(425, 0, 10, 1024);
        ctx.fillRect(589, 0, 10, 1024);

        // Side Arrow Cutouts (Doors)
        ctx.beginPath();
        ctx.moveTo(100, 300);
        ctx.lineTo(380, 480);
        ctx.lineTo(380, 560);
        ctx.lineTo(80, 400);
        ctx.closePath();
        ctx.fillStyle = pri;
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = sec;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(924, 300);
        ctx.lineTo(644, 480);
        ctx.lineTo(644, 560);
        ctx.lineTo(944, 400);
        ctx.closePath();
        ctx.fillStyle = pri;
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = sec;
        ctx.stroke();

        // Speed arrows
        ctx.font = "bold 42px Orbitron, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("OUTLAW // 01", 120, 640);
        ctx.fillText("OUTLAW // 01", 680, 640);
    }

    _drawBushidoTribal(ctx, pri, sec) {
        // Japanese Dragon / Bushido Tribal along sides
        ctx.fillStyle = pri;

        // Left door flame tribal
        ctx.beginPath();
        ctx.moveTo(0, 450);
        ctx.bezierCurveTo(200, 400, 350, 480, 400, 350);
        ctx.bezierCurveTo(340, 420, 220, 460, 0, 520);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(50, 550);
        ctx.bezierCurveTo(250, 500, 380, 580, 420, 460);
        ctx.bezierCurveTo(320, 550, 180, 580, 30, 620);
        ctx.fill();

        // Right door flame tribal
        ctx.beginPath();
        ctx.moveTo(1024, 450);
        ctx.bezierCurveTo(824, 400, 674, 480, 624, 350);
        ctx.bezierCurveTo(684, 420, 804, 460, 1024, 520);
        ctx.fill();

        // Bushido Kanji & Flame tips
        ctx.fillStyle = sec;
        ctx.font = "bold 80px Bangers, cursive";
        ctx.fillText("BUSHIDO", 120, 380);
        ctx.fillText("BUSHIDO", 680, 380);

        ctx.font = "bold 90px sans-serif";
        ctx.fillText("武士道", 140, 750);
        ctx.fillText("武士道", 660, 750);
    }

    _drawItashaValkyrie(ctx, pri, sec) {
        // Anime Cyber Valkyrie Livery (Large Door Graphics)
        // Neon Wing Silhouette (Left Door)
        const grad = ctx.createLinearGradient(0, 200, 450, 800);
        grad.addColorStop(0, pri);
        grad.addColorStop(0.5, sec);
        grad.addColorStop(1, "#180033");

        ctx.fillStyle = grad;
        // Big angel / mecha wing
        ctx.beginPath();
        ctx.moveTo(30, 300);
        ctx.lineTo(380, 200);
        ctx.lineTo(440, 350);
        ctx.lineTo(320, 420);
        ctx.lineTo(420, 520);
        ctx.lineTo(260, 580);
        ctx.lineTo(360, 700);
        ctx.lineTo(60, 800);
        ctx.closePath();
        ctx.fill();

        // Right side wing
        ctx.beginPath();
        ctx.moveTo(994, 300);
        ctx.lineTo(644, 200);
        ctx.lineTo(584, 350);
        ctx.lineTo(704, 420);
        ctx.lineTo(604, 520);
        ctx.lineTo(764, 580);
        ctx.lineTo(664, 700);
        ctx.lineTo(964, 800);
        ctx.closePath();
        ctx.fill();

        // Center Hood Anime Character Emblem Silhouette
        ctx.beginPath();
        ctx.arc(512, 380, 130, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fill();
        ctx.lineWidth = 8;
        ctx.strokeStyle = pri;
        ctx.stroke();

        ctx.font = "bold 90px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = sec;
        ctx.fillText("戦乙女", 512, 390);

        ctx.font = "bold 26px Orbitron, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("CYBER VALKYRIE // PROJECT-01", 512, 450);

        // Japanese Katakana side text
        ctx.textAlign = "left";
        ctx.font = "bold 44px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("ナイト・ファントム", 60, 260);
        ctx.fillText("ナイト・ファントム", 650, 260);
        ctx.textAlign = "start";
    }

    _drawItashaOni(ctx, pri, sec) {
        // Crimson Oni Maiden
        ctx.fillStyle = pri;

        // Big fiery streaks across hood and sides
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(100 + (i * 60), 0);
            ctx.lineTo(240 + (i * 70), 600);
            ctx.lineTo(180 + (i * 65), 1024);
            ctx.lineTo(120 + (i * 55), 1024);
            ctx.closePath();
            ctx.fill();
        }

        // Oni Mask / Horns Emblem on Hood
        ctx.fillStyle = "rgba(10, 0, 0, 0.85)";
        ctx.beginPath();
        ctx.ellipse(512, 400, 160, 200, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = pri;
        ctx.stroke();

        ctx.font = "bold 110px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = sec;
        ctx.fillText("👹", 512, 390);
        ctx.fillText("鬼神", 512, 510);

        ctx.font = "bold 34px Bangers, cursive";
        ctx.fillStyle = "#fff";
        ctx.fillText("MIDNIGHT CINDERS // ONI SPEC", 512, 570);
        ctx.textAlign = "start";
    }

    _drawItashaGlitch(ctx, pri, sec) {
        // Hazard Cyber Glitch stripes
        ctx.fillStyle = pri;
        for (let i = 0; i < 15; i++) {
            const y = i * 70;
            ctx.fillRect(0, y, 400, 30);
            ctx.fillRect(624, y, 400, 30);
        }

        // Glitch blocks
        ctx.fillStyle = sec;
        ctx.fillRect(430, 200, 164, 40);
        ctx.fillRect(460, 260, 110, 30);
        ctx.fillRect(400, 600, 224, 60);

        ctx.font = "bold 65px Orbitron, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.fillText("SHINJUKU", 512, 648);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("CYBER", 512, 235);
        ctx.textAlign = "start";
    }

    _drawItashaGhost(ctx, pri, sec) {
        // Dark Violet Purple Phantom Livery
        ctx.fillStyle = pri;
        ctx.beginPath();
        ctx.arc(512, 450, 220, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 130px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("幽霊", 512, 480);

        ctx.font = "bold 36px Orbitron, sans-serif";
        ctx.fillStyle = sec;
        ctx.fillText("PHANTOM REAPER // SHUTO C1", 512, 550);
        ctx.textAlign = "start";
    }

    _drawCarbonSlash(ctx, pri, sec) {
        // Asymmetric Carbon Fiber Look on Hood
        ctx.fillStyle = "#111111";
        ctx.fillRect(380, 0, 264, 500);

        // Neon Diagonal Slash
        ctx.fillStyle = pri;
        ctx.beginPath();
        ctx.moveTo(300, 0);
        ctx.lineTo(724, 1024);
        ctx.lineTo(664, 1024);
        ctx.lineTo(240, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = sec;
        ctx.beginPath();
        ctx.moveTo(330, 0);
        ctx.lineTo(754, 1024);
        ctx.lineTo(734, 1024);
        ctx.lineTo(310, 0);
        ctx.closePath();
        ctx.fill();
    }

    _drawCamo(ctx, pri, sec) {
        // Geometric Urban Camouflage
        const colors = [pri, sec, "#222233", "#3a4455", "#111822"];
        for (let i = 0; i < 40; i++) {
            ctx.fillStyle = colors[i % colors.length];
            const x = (i * 123) % 1024;
            const y = (i * 241) % 1024;
            const size = 60 + (i % 8) * 20;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y + (size * 0.4));
            ctx.lineTo(x + (size * 0.8), y + size);
            ctx.lineTo(x - (size * 0.2), y + (size * 0.7));
            ctx.closePath();
            ctx.fill();
        }
    }

    _drawMangaFlames(ctx, pri, sec) {
        ctx.fillStyle = pri;
        // Cel-shaded comic flames
        for (let i = 0; i < 4; i++) {
            const offsetX = i * 260;
            ctx.beginPath();
            ctx.moveTo(offsetX + 50, 1024);
            ctx.quadraticCurveTo(offsetX + 90, 600, offsetX + 30, 400);
            ctx.quadraticCurveTo(offsetX + 120, 520, offsetX + 130, 300);
            ctx.quadraticCurveTo(offsetX + 150, 480, offsetX + 210, 550);
            ctx.quadraticCurveTo(offsetX + 190, 750, offsetX + 240, 1024);
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        }

        // Inner secondary flame
        ctx.fillStyle = sec;
        for (let i = 0; i < 4; i++) {
            const offsetX = i * 260;
            ctx.beginPath();
            ctx.moveTo(offsetX + 80, 1024);
            ctx.quadraticCurveTo(offsetX + 110, 700, offsetX + 80, 500);
            ctx.quadraticCurveTo(offsetX + 130, 600, offsetX + 130, 450);
            ctx.quadraticCurveTo(offsetX + 150, 600, offsetX + 180, 650);
            ctx.quadraticCurveTo(offsetX + 160, 850, offsetX + 200, 1024);
            ctx.closePath();
            ctx.fill();
        }
    }

    _drawSponsorPack(ctx, pri, sec) {
        const sponsors = [
            "MECHA-HARE RACING",
            "VORTEX-X AERO",
            "FREEDOM-CRAFT WIDE",
            "HYPER-VOLT TUNING",
            "K-WAZA TIME ATTACK",
            "SHUTO OUTLAW 2026",
            "TOKYO MIDNIGHT"
        ];

        ctx.fillStyle = "#ffffff";
        sponsors.forEach((sp, idx) => {
            const y = 200 + (idx * 100);
            // Left door
            ctx.font = "bold 34px Orbitron, sans-serif";
            ctx.fillStyle = (idx % 2 === 0) ? pri : sec;
            ctx.fillText(sp, 60, y);

            // Right door
            ctx.fillText(sp, 600, y);
        });

        // Windshield banner
        ctx.fillStyle = "#111111";
        ctx.fillRect(200, 10, 624, 70);
        ctx.fillStyle = pri;
        ctx.font = "bold 44px Orbitron, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("NIGHT PHANTOM // TOKYO", 512, 60);
        ctx.textAlign = "start";
    }

    _drawKanjiPack(ctx, pri, sec) {
        ctx.fillStyle = "#ffffff";

        // Big Kanji on Hood
        ctx.font = "bold 200px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("首都高", 512, 450);

        ctx.font = "bold 70px Bangers, cursive";
        ctx.fillStyle = sec;
        ctx.fillText("SHUTO EXPRESSWAY OUTLAW", 512, 530);

        // Sides
        ctx.font = "bold 140px sans-serif";
        ctx.fillStyle = pri;
        ctx.fillText("最速", 200, 750);
        ctx.fillText("最速", 824, 750);

        ctx.textAlign = "start";
    }

    _drawDecalStamp(ctx, decal) {
        // Race Number or Stamp on the Door
        if (decal.type === "number") {
            // White circle with dark outline
            ctx.beginPath();
            ctx.arc(220, 620, 95, 0, Math.PI * 2);
            ctx.arc(804, 620, 95, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#ff0055";
            ctx.stroke();

            ctx.font = "bold 100px Bangers, cursive";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.fillText(decal.text, 220, 655);
            ctx.fillText(decal.text, 804, 655);
            ctx.textAlign = "start";
        } else if (decal.type === "stamp") {
            // Japanese Box Stamp
            ctx.lineWidth = 8;
            ctx.strokeStyle = "#ff0033";
            ctx.strokeRect(100, 550, 240, 100);
            ctx.strokeRect(684, 550, 240, 100);

            ctx.font = "bold 55px sans-serif";
            ctx.fillStyle = "#ff0033";
            ctx.textAlign = "center";
            ctx.fillText(decal.text, 220, 625);
            ctx.fillText(decal.text, 804, 625);
            ctx.textAlign = "start";
        }
    }
}

// Global instance
const vinylEngine = new VinylManager();
