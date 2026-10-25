/**
 * TOUGE OUTLAW: SHUTO UNBOUND
 * CARS DATABASE — Full Roster + Body Kit System
 * Semua nama PARODI (bukan nama asli) untuk hindari lisensi
 *
 * BODY KIT SYSTEM:
 *  Setiap kit punya folder model sendiri di /models/
 *  Kit dipilih di Garage → mengubah mesh 3D mobil secara real-time
 *  Kit bisa berupa: Full Body, Front/Rear Bumper, Side Skirt, Wing, Wide Body
 */

// ============================================================
// BODY KIT PART BRANDS (PARODI NAMES)
// ============================================================
const KIT_BRANDS = {
    OEM:          "OEM Factory",
    MECHA_HARE:   "MECHA-HARE",        // Rocket Bunny
    FREEDOM:      "FREEDOM-CRAFT",     // LibertyWalk
    VORTEX:       "VORTEX-X",          // Varis
    KWAZA:        "K-WAZA RACING",     // C-West
    RMECHA:       "R-MECHA ARMOR",     // R-Magic
    PANDAM:       "PANDAM WORKS",      // Pandem
    VOLTRON:      "VOLTRON AERO",      // Voltex
    MANA:         "MANA-WORKS",        // TCP Magic
    APR_GHOST:    "APR-GHOST",         // APR Performance
    VERTEX:       "VERTEX-S",          // Vertex
    HYPER:        "HYPER-VOLT",        // JS Racing
    INGS:         "INGS-SPEC",         // Ings+1
    GARAGE_V:     "GARAGE-V",          // Garage Vary
    WINGS_WEST:   "WINGS-WEST",        // Wings West
    KRC:          "KRC-JAPAN",         // KRC Japan
};

// ============================================================
// MAIN CAR DATABASE
// ============================================================
const CAR_DATABASE = [

    // ================================================================
    // ====  NISSAN / NIPPON MOTORS  ===================================
    // ================================================================

    {
        id: "skyline_r34",
        brand: "NIPPON MOTORS",
        realBase: "Nissan Skyline GT-R R34",
        parodyName: "NIPPON Skylinex GT-RR 34",
        nickname: "Kaiju God",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 15000000,
        unlockKuroList: 5,         // unlock setelah kalahkan KuroList #5
        specs: { topSpeed: 330, accel: 3.2, handling: 92, drift: 88, power: 550 },
        color: "#1a4499",
        baseModel: {
            folder: "2002-nissan-skyline-gtr-r34-fast-and-furious",
            modelPath: "models/2002-nissan-skyline-gtr-r34-fast-and-furious",
            fbxFile: "FINAL_MODEL_R8.fbx",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Factory Spec",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "OEM R34 body — clean and pure.",
                modelFolder: null,  // pakai baseModel
                price: 0,
                statBonus: {},
            },
            {
                id: "cwest_n1",
                name: "C-Type N1 Aero",
                brand: KIT_BRANDS.KWAZA,
                type: "Time Attack",
                description: "Aggressive front splitter & rear diffuser for circuit.",
                modelFolder: null,
                price: 2500000,
                statBonus: { handling: 4, topSpeed: 5 },
                parts: {
                    frontBumper: true,
                    rearBumper: true,
                    sideskirt: true,
                    wing: "GT Fixed Wing"
                }
            },
            {
                id: "vortex_solid",
                name: "Vortex Solid Attack",
                brand: KIT_BRANDS.VORTEX,
                type: "Circuit GT",
                description: "Carbon louvers & vented hood for maximum downforce.",
                modelFolder: null,
                price: 3800000,
                statBonus: { handling: 7, topSpeed: 8, drift: 5 },
                parts: {
                    frontBumper: true,
                    rearBumper: true,
                    sideskirt: true,
                    hood: "Vented Carbon",
                    wing: "Carbon Swan Neck"
                }
            },
            {
                id: "lb_silhouette",
                name: "LB-Silhouette Widebox",
                brand: KIT_BRANDS.FREEDOM,
                type: "Extreme Wide",
                description: "Legendary wide body kit — street icon look.",
                modelFolder: null,
                price: 6500000,
                statBonus: { handling: 10, drift: 12, accel: 2 },
                parts: {
                    frontBumper: true,
                    rearBumper: true,
                    sideskirt: true,
                    wideFenders: true,
                    wing: "LB Carbon GT Wing"
                }
            },
        ],
        tuningParts: {
            engine:    ["Stock", "Stage 1 ECU", "Stage 2 Turbo", "RB28 Full Build"],
            suspension: ["Stock", "Coilover Type-S", "Circuit Spec", "Full Drift Setup"],
            tires:     ["Stock", "Semi-Slick", "Slick R-Compound", "Drift Compound"],
            turbo:     ["Stock", "Single Turbo Kit", "Garrett GT30", "Twinscroll Full Race"],
            brakes:    ["Stock", "Sport 4-Pot", "6-Pot Brembo-X", "Racing Monobloc"],
            exhaust:   ["Stock", "Cat-Back Dual", "N1-Style Titan", "Full Race Straight"],
            nos:       [false, "50hp Shot", "100hp Shot", "150hp Shot"],
            weight:    ["Stock", "Interior Strip", "Carbon Hood", "Full Carbon Lightening"],
        }
    },

    {
        id: "fairlady_z_s30",
        brand: "NIPPON MOTORS",
        realBase: "Nissan Fairlady Z S30",
        parodyName: "NIPPON Fairlady-Z S30",
        nickname: "Devil Z",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 8500000,
        unlockKuroList: 10,
        specs: { topSpeed: 280, accel: 4.1, handling: 85, drift: 90, power: 380 },
        color: "#111111",
        baseModel: {
            folder: "nissan-fairlady-z-s30-devil-z",
            modelPath: "models/nissan-fairlady-z-s30-devil-z",
            fbxFile: "source/Devil%20Z.fbx",
            textures: "textures/",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Devil Z Pure",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "The original Devil Z — street legend, zero compromise.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "pandam_retro",
                name: "Pandam Retro Widebody",
                brand: KIT_BRANDS.PANDAM,
                type: "Retro Wide",
                description: "Old-school flared fenders, Japanese touge style.",
                modelFolder: null,
                price: 3200000,
                statBonus: { handling: 6, drift: 8 },
                parts: { wideFenders: true, frontBumper: true }
            },
            {
                id: "mecha_hare_boss",
                name: "Mecha-Hare Retro Boss",
                brand: KIT_BRANDS.MECHA_HARE,
                type: "Rocket Style",
                description: "Ultra-wide Rocket Bunny style for S30.",
                modelFolder: null,
                price: 5500000,
                statBonus: { handling: 9, drift: 14 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true, wing: "Ducktail" }
            },
        ],
        tuningParts: {
            engine:    ["Stock L28", "Rebuilt L28", "Triple Carburetor", "L28 Stroker Full Race"],
            suspension: ["Stock", "Coilover Classic", "Circuit Spec", "Drift Hardened"],
            tires:     ["Stock", "Semi-Slick", "Period Correct Vintage", "Drift Compound"],
        }
    },

    {
        id: "fairlady_z32",
        brand: "NIPPON MOTORS",
        realBase: "Nissan 300ZX Z32 1989",
        parodyName: "NIPPON 300-ZX Z32",
        nickname: "Twin Turbo Ghost",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 9000000,
        unlockKuroList: 9,
        specs: { topSpeed: 290, accel: 3.9, handling: 86, drift: 84, power: 400 },
        color: "#222244",
        baseModel: {
            folder: "nissan_fairlady_300zx_z32_1989",
            modelPath: "models/nissan_fairlady_300zx_z32_1989",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Factory Z32",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Twin-turbo legend from 1989, stock spec.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "vertex_s_aero",
                name: "Vertex-S Full Aero",
                brand: KIT_BRANDS.VERTEX,
                type: "GT Style",
                description: "Full front/rear aero package for Z32.",
                modelFolder: null,
                price: 4000000,
                statBonus: { handling: 7, topSpeed: 6 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true, wing: "Fixed GT" }
            },
        ],
        tuningParts: {
            engine:    ["Stock VG30DETT", "Boost Upgrade", "Full Rebuild", "Twin GT28 Race Build"],
            suspension: ["Stock", "Coilover", "Circuit Spec"],
        }
    },

    {
        id: "fairlady_z_2023",
        brand: "NIPPON MOTORS",
        realBase: "Nissan Fairlady Z 2023",
        parodyName: "NIPPON Neo-Z RZ34",
        nickname: "Neo Phantom",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 18000000,
        unlockKuroList: 3,
        specs: { topSpeed: 340, accel: 3.0, handling: 94, drift: 87, power: 600 },
        color: "#ff6600",
        baseModel: {
            folder: "2023-nissan-fairlady-z",
            modelPath: "models/2023-nissan-fairlady-z",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "RZ34 Street",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Modern Fairlady Z — new era touge king.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "mecha_hare_v1",
                name: "Mecha-Hare Version 1",
                brand: KIT_BRANDS.MECHA_HARE,
                type: "Wide Body",
                description: "Rocket Bunny style fender flares for RZ34.",
                modelFolder: null,
                price: 5500000,
                statBonus: { handling: 10, drift: 12 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true, sideskirt: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock VR30DDTT", "ECU Tune", "Upgraded Turbos", "Full Race Build"],
        }
    },

    // ================================================================
    // ====  MAZDA / MATSUDA WORKS  ====================================
    // ================================================================

    {
        id: "rx7_fd3s",
        brand: "MATSUDA WORKS",
        realBase: "Mazda RX-7 FD3S",
        parodyName: "MATSUDA Rotary-7 FD3S",
        nickname: "Valkyrie Twin",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 12500000,
        unlockKuroList: 6,
        specs: { topSpeed: 315, accel: 3.5, handling: 96, drift: 98, power: 480 },
        color: "#ffcc00",
        baseModel: {
            folder: "1993-mazda-rx-7",
            modelPath: "models/1993-mazda-rx-7",
            fbxFile: "FINAL_MODEL_1_93.fbx",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Spirit Spec-A",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "FD3S factory — lightest rotary born.",
                modelFolder: "1993-mazda-rx-7",
                price: 0,
                statBonus: {},
            },
            {
                id: "mecha_hare_duck",
                name: "Mecha-Hare Duck Wing V1",
                brand: KIT_BRANDS.MECHA_HARE,
                type: "Rocket Style",
                description: "Iconic duck wing + wide body — the signature RB FD look.",
                modelFolder: "2013-rocket-bunny-fd3s-v1-mazda-rx-7-duck-wing",
                price: 5500000,
                statBonus: { handling: 8, drift: 12, accel: 1 },
                parts: { wideFenders: true, frontBumper: true, wing: "Duck Wing" }
            },
            {
                id: "mana_gface",
                name: "Mana G-Face Type-TT",
                brand: KIT_BRANDS.MANA,
                type: "Canyon Attack",
                description: "Aggressive front mask TCP Magic style for FD3S.",
                modelFolder: "2019-tcp-magic-g-face-type-tt-mazda-rx-7-ver3",
                price: 4800000,
                statBonus: { handling: 10, topSpeed: 7 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true }
            },
            {
                id: "rmecha_armor",
                name: "R-Mecha FD Armor Kit",
                brand: KIT_BRANDS.RMECHA,
                type: "D1 Street",
                description: "R-Magic full body aero for extreme drift setup.",
                modelFolder: "2010-r-magic-fd-armor-mazda-rx-7-fd3s",
                price: 5200000,
                statBonus: { handling: 6, drift: 16 },
                parts: { frontBumper: true, sideskirt: true, rearBumper: true }
            },
            {
                id: "pandam_boss_v2",
                name: "Pandam Boss Aero V2",
                brand: KIT_BRANDS.PANDAM,
                type: "Wide Retro",
                description: "Pandem wide body version 2 — ultimate FD silhouette.",
                modelFolder: "2016-pandem-mazda-fd3s-v2-boss-aero-kit",
                price: 6800000,
                statBonus: { handling: 11, drift: 14 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true }
            },
            {
                id: "lb_silhouette_fd",
                name: "LB Super Silhouette",
                brand: KIT_BRANDS.FREEDOM,
                type: "Extreme Wide",
                description: "LB Works 2023 super silhouette FD — max aggression.",
                modelFolder: "2023-lbsuper-silhouette-mazda-fd3s-rx-7",
                price: 9000000,
                statBonus: { handling: 14, drift: 18 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true, sideskirt: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock 13B-REW", "Port Polish", "Single Turbo 20B Swap", "Full Race 13B-T"],
            suspension: ["Stock", "Coilover Type-S", "Circuit Spec", "Full Drift Setup"],
            tires:     ["Stock", "Semi-Slick", "Slick R-Compound", "Drift Compound"],
            turbo:     ["Stock Twin", "Single Precision 6266", "Borg Warner S400", "Full Race Sequential"],
        }
    },

    {
        id: "rx7_fc3s",
        brand: "MATSUDA WORKS",
        realBase: "Mazda RX-7 FC3S",
        parodyName: "MATSUDA Rotary-7 FC3S",
        nickname: "Savanna Spirit",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 7000000,
        unlockKuroList: 12,
        specs: { topSpeed: 270, accel: 4.2, handling: 88, drift: 92, power: 320 },
        color: "#cc3300",
        baseModel: {
            folder: "1987-mazda-rx-7-fc",
            modelPath: "models/1987-mazda-rx-7-fc",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Savanna Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "FC3S stock — lightweight rotary purist.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "infini_iii",
                name: "Infini-III Aero",
                brand: KIT_BRANDS.OEM,
                type: "Factory Sport",
                description: "Mazda factory race spec Infini-III body.",
                modelFolder: "1989-mazda-savanna-rx-7-infini-iii-fc3s",
                price: 2800000,
                statBonus: { handling: 6, topSpeed: 5 },
                parts: { frontBumper: true, rearBumper: true, wing: "Factory GT" }
            },
        ],
        tuningParts: {
            engine:    ["Stock 13B", "Carb Tune", "Turbo Conversion", "Full Race 13B-T"],
        }
    },

    {
        id: "rx8_se3p",
        brand: "MATSUDA WORKS",
        realBase: "Mazda RX-8 SE3P",
        parodyName: "MATSUDA Rotary-8 SE3P",
        nickname: "Phantom Renesis",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 9500000,
        unlockKuroList: 8,
        specs: { topSpeed: 295, accel: 3.7, handling: 93, drift: 90, power: 410 },
        color: "#8800cc",
        baseModel: {
            folder: "2006-mazda-rx-8",
            modelPath: "models/2006-mazda-rx-8",
            fbxFile: "FINAL_MODEL_RX806.fbx",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "R3 Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "RX-8 stock — 4-door sports car with rotary.",
                modelFolder: "2006-mazda-rx-8",
                price: 0,
                statBonus: {},
            },
            {
                id: "spirit_r",
                name: "Spirit-R Final Edition",
                brand: KIT_BRANDS.OEM,
                type: "Factory Sport",
                description: "Last RX-8 ever made — Spirit R Type-A body.",
                modelFolder: "2011_mazda_rx-8_spirit_r",
                price: 2200000,
                statBonus: { handling: 5, accel: 2 },
                parts: { frontBumper: true, rearBumper: true }
            },
            {
                id: "vertex_lang",
                name: "Vertex-S Lang Full Body",
                brand: KIT_BRANDS.VERTEX,
                type: "GT Aero",
                description: "Vertex Lang wide body aero for SE3P.",
                modelFolder: "2008_vertex_lang_mazda_rx-8_se3p",
                price: 4500000,
                statBonus: { handling: 9, drift: 8 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true, wideFenders: true }
            },
            {
                id: "mecha_hare_rx8",
                name: "Mecha-Hare Rocket RX-8",
                brand: KIT_BRANDS.MECHA_HARE,
                type: "Wide Rocket",
                description: "Jonny Grunwald Rocket Bunny RX-8 widebody.",
                modelFolder: "2017_jonny_grunwald_rocket_bunny_mazda_rx-8",
                price: 5800000,
                statBonus: { handling: 11, drift: 14 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true, wing: "GT Fixed" }
            },
            {
                id: "pandam_rx8_v1",
                name: "Pandam RX-8 V1 Aero",
                brand: KIT_BRANDS.PANDAM,
                type: "Wide Pandem",
                description: "Pandem V1 fender flares + front lip for SE3P.",
                modelFolder: "2017_pandem_mazda_rx-8_v1_aero_kit",
                price: 5200000,
                statBonus: { handling: 10, drift: 12 },
                parts: { wideFenders: true, frontBumper: true }
            },
            {
                id: "krc_japan",
                name: "KRC-Japan Full Aero",
                brand: KIT_BRANDS.KRC,
                type: "Circuit Pro",
                description: "KRC Japan full body kit with side diffusers.",
                modelFolder: "2020_krc_japan_kit_mazda_rx-8_se3p",
                price: 6000000,
                statBonus: { handling: 13, topSpeed: 8 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true }
            },
            {
                id: "special_edition",
                name: "Special Edition Asphalt",
                brand: KIT_BRANDS.OEM,
                type: "Sport Spec",
                description: "2018 RX-8 special edition with unique body touches.",
                modelFolder: "2018-mazda-rx-8-special-edition-asphalt-8",
                price: 3000000,
                statBonus: { handling: 6, topSpeed: 5 },
                parts: { frontBumper: true, rearBumper: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock 13B-MSP", "High Compression", "Turbo 13B Swap", "Full Race 20B"],
            suspension: ["Stock", "Coilover", "Circuit Spec", "Drift Setup"],
        }
    },

    {
        id: "rx8_series8",
        brand: "MATSUDA WORKS",
        realBase: "Mazda RX-7 Series 8 Type RS",
        parodyName: "MATSUDA Rotary-7 Series-VIII",
        nickname: "Apex Predator",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 14000000,
        unlockKuroList: 4,
        specs: { topSpeed: 320, accel: 3.3, handling: 95, drift: 96, power: 510 },
        color: "#ff3300",
        baseModel: {
            folder: "2001-mazda-rx-7-series-8-type-rs",
            modelPath: "models/2001-mazda-rx-7-series-8-type-rs",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Series 8 Type-RS",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Final evolution of FD3S — Series 8 factory.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "fd_spirit_r",
                name: "Spirit-R Final",
                brand: KIT_BRANDS.OEM,
                type: "Factory Race",
                description: "2002 Spirit R Type-A — highest factory spec FD.",
                modelFolder: "2002-mazda-rx-7-spirit-r-type-a-fd",
                price: 3500000,
                statBonus: { handling: 8, topSpeed: 6, accel: 3 },
                parts: { frontBumper: true, rearBumper: true, wing: "Factory Touring" }
            },
        ],
        tuningParts: {
            engine:    ["Stock 13B-REW Series 8", "Port & Polish", "Single Turbo 500hp", "Full Race Sequential"],
        }
    },

    {
        id: "mx5_nd",
        brand: "MATSUDA WORKS",
        realBase: "Mazda MX-5 ND",
        parodyName: "MATSUDA Miata-X ND",
        nickname: "Wind Dancer",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 5500000,
        unlockKuroList: 15,
        specs: { topSpeed: 240, accel: 5.2, handling: 90, drift: 80, power: 200 },
        color: "#cc4400",
        baseModel: {
            folder: "2015-mazda-mx-5",
            modelPath: "models/2015-mazda-mx-5",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "ND Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Pure roadster joy — featherlight Miata.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "pandam_v1_nd",
                name: "Pandam V1 + GT Wing",
                brand: KIT_BRANDS.PANDAM,
                type: "Track Package",
                description: "Pandem widebody + massive GT wing for ND Miata.",
                modelFolder: "2015-pandem-v1-mazda-nd-mx-5-miata-with-gt-wing",
                price: 4200000,
                statBonus: { handling: 12, drift: 10 },
                parts: { wideFenders: true, frontBumper: true, wing: "Massive GT Wing" }
            },
            {
                id: "mx5_2019",
                name: "2019 Sport Aero",
                brand: KIT_BRANDS.OEM,
                type: "Factory Upgrade",
                description: "2019 MX-5 sport body refresh.",
                modelFolder: "2019_mazda_mx-5",
                price: 1500000,
                statBonus: { handling: 4, topSpeed: 3 },
                parts: { frontBumper: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock 2.0 P5", "ECU Tune", "Supercharger Kit", "Full Race Build"],
        }
    },

    {
        id: "mx5_nb",
        brand: "MATSUDA WORKS",
        realBase: "Mazda MX-5 NB Hardtop",
        parodyName: "MATSUDA Miata-X NB Hardtop",
        nickname: "Classic Ghost",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 4000000,
        unlockKuroList: 16,
        specs: { topSpeed: 225, accel: 5.8, handling: 85, drift: 75, power: 160 },
        color: "#003388",
        baseModel: {
            folder: "2008-mazda-mx-5-hardtop",
            modelPath: "models/2008-mazda-mx-5-hardtop",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "NB Hardtop Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Classic NB with retractable hardtop.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock BP-Z3", "ECU", "Supercharger", "Full Race"],
        }
    },

    {
        id: "mazdaspeed3",
        brand: "MATSUDA WORKS",
        realBase: "Mazda MazdaSpeed 3",
        parodyName: "MATSUDA SpeedX 3",
        nickname: "Hatchback Terror",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 8000000,
        unlockKuroList: 11,
        specs: { topSpeed: 270, accel: 4.0, handling: 87, drift: 78, power: 350 },
        color: "#ff6600",
        baseModel: {
            folder: "2010_mazda_mazdaspeed_3",
            modelPath: "models/2010_mazda_mazdaspeed_3",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Speed3 Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Factory hot hatch — turbocharged daily.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "garage_vary",
                name: "Garage-V Wide Kit",
                brand: KIT_BRANDS.GARAGE_V,
                type: "Hatch Wide",
                description: "Garage Vary body kit for Mazdaspeed 3.",
                modelFolder: "garage_vary_mazda_mazdaspeed_3_bodykit",
                price: 3800000,
                statBonus: { handling: 9, topSpeed: 6 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock 2.3T", "ECU Tune", "FMIC Upgrade", "Full Race Turbo"],
        }
    },

    {
        id: "mazda3_2020",
        brand: "MATSUDA WORKS",
        realBase: "Mazda 3 Hatchback 2020",
        parodyName: "MATSUDA Trio-3 Hatch",
        nickname: "Urban Phantom",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 6000000,
        unlockKuroList: 14,
        specs: { topSpeed: 235, accel: 5.5, handling: 82, drift: 72, power: 190 },
        color: "#660033",
        baseModel: {
            folder: "2020-mazda-3-hatchback",
            modelPath: "models/2020-mazda-3-hatchback",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Mazda3 Sport Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "2020 Mazda3 hatchback — sleek Kodo design.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock SkyActiv-G", "ECU", "Cold Air Intake", "Sport Exhaust"],
        }
    },

    // ================================================================
    // ====  HONDA / HODANA MOTORS  ====================================
    // ================================================================

    {
        id: "civic_ek9",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic Type-R EK9",
        parodyName: "HODANA Civique EK-9",
        nickname: "Prologue Car",
        tier: 1,
        tierName: "Street Rookie",
        category: "starter",
        price: 0,             // Player's starting car (prologue)
        unlockKuroList: null,
        specs: { topSpeed: 220, accel: 5.5, handling: 88, drift: 72, power: 185 },
        color: "#cc0000",
        baseModel: {
            folder: "2000-honda-civic-type-r-ek9",
            modelPath: "models/2000-honda-civic-type-r-ek9",
            fbxFile: "FNIAL_MODEL_00.fbx",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "EK9 Type-R Stock",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Your starting car. Simple. Pure. VTEC.",
                modelFolder: "2000-honda-civic-type-r-ek9",
                price: 0,
                statBonus: {},
            },
            {
                id: "wings_west_avenger",
                name: "Wings-West Avenger Kit",
                brand: KIT_BRANDS.WINGS_WEST,
                type: "Street Style",
                description: "Classic Wings West aero kit for EK Civic.",
                modelFolder: "2018_wings_west_avenger_kit_honda_civic_2dr",
                price: 1200000,
                statBonus: { handling: 4, topSpeed: 3 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock B16B", "VTEC Head Tune", "B18C Swap", "K20 Swap Full Build"],
            suspension: ["Stock", "Civic Sport", "Circuit Spec", "Drift Setup"],
        }
    },

    {
        id: "civic_si_1999",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic Si 1999",
        parodyName: "HODANA Civique Si EM1",
        nickname: "Street Phantom",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 3500000,
        unlockKuroList: 17,
        specs: { topSpeed: 210, accel: 5.8, handling: 84, drift: 68, power: 160 },
        color: "#003399",
        baseModel: {
            folder: "1999_honda_civic_si",
            modelPath: "models/1999_honda_civic_si",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "EM1 Street",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Classic Si coupe — JDM beginnings.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock D16Y8", "VTEC Tune", "B16A Swap", "K20 Full Build"],
        }
    },

    {
        id: "civic_si_2006",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic Si 2006",
        parodyName: "HODANA Civique Si FA5",
        nickname: "Rev Screamer",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 4500000,
        unlockKuroList: 16,
        specs: { topSpeed: 230, accel: 5.2, handling: 86, drift: 70, power: 200 },
        color: "#cc3300",
        baseModel: {
            folder: "2006-honda-civic-si",
            modelPath: "models/2006-honda-civic-si",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "FA5 Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "8th gen Civic Si — K20Z3 screamer.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock K20Z3", "Intake & Exhaust", "K20 Stage 2", "K24 Turbo Swap"],
        }
    },

    {
        id: "civic_si_2012",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic Si Coupe 2012",
        parodyName: "HODANA Civique Si FB6",
        nickname: "Night Runner",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 5000000,
        unlockKuroList: 15,
        specs: { topSpeed: 235, accel: 5.0, handling: 87, drift: 71, power: 210 },
        color: "#004488",
        baseModel: {
            folder: "2012-honda-civic-si-coupe",
            modelPath: "models/2012-honda-civic-si-coupe",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "9th Gen Si Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "2012 Civic Si coupe — reliable canyon warrior.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock K24Z7", "Tune", "Turbo Kit", "Full Race K24T"],
        }
    },

    {
        id: "civic_fk2_2015",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic Type-R FK2 2015",
        parodyName: "HODANA Civique Type-RR FK2",
        nickname: "White Shark",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 10000000,
        unlockKuroList: 9,
        specs: { topSpeed: 280, accel: 3.8, handling: 94, drift: 75, power: 430 },
        color: "#ffffff",
        baseModel: {
            folder: "2015-honda-civic-type-r",
            modelPath: "models/2015-honda-civic-type-r",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "FK2 Type-R Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Euro-spec FK2 — aggressive factory aero.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock K20C1", "ECU Remap", "Upgraded Turbo", "Full Race K20C"],
        }
    },

    {
        id: "civic_fk8_2018",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic Type-R FK8 2018",
        parodyName: "HODANA Civique Type-RR FK8",
        nickname: "Apex Phantom",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 13000000,
        unlockKuroList: 7,
        specs: { topSpeed: 295, accel: 3.6, handling: 95, drift: 77, power: 460 },
        color: "#ff0000",
        baseModel: {
            folder: "2018-honda-civic-type-r",
            modelPath: "models/2018-honda-civic-type-r",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "FK8 Type-R Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Nurburgring FWD record holder — stock.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "vortex_vaho17",
                name: "Vortex-X VAHO 17 Kit",
                brand: KIT_BRANDS.VORTEX,
                type: "Full Aero",
                description: "Varis FK8 VAHO-17 full carbon aero package.",
                modelFolder: "2018-honda-civic-type-r-varis-fk8-vaho-17",
                price: 6500000,
                statBonus: { handling: 12, topSpeed: 8 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true, hood: "Carbon Vented", wing: "Carbon GT" }
            },
        ],
        tuningParts: {
            engine:    ["Stock K20C1 310hp", "ECU Stage 1", "Upgraded Intercooler", "Full Race 450hp"],
        }
    },

    {
        id: "civic_fl5_2023",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic Type-R FL5 2023",
        parodyName: "HODANA Civique Type-RR FL5",
        nickname: "Generation Zero",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 17000000,
        unlockKuroList: 2,
        specs: { topSpeed: 320, accel: 3.1, handling: 96, drift: 80, power: 550 },
        color: "#ff0033",
        baseModel: {
            folder: "2023-honda-civic-type-r",
            modelPath: "models/2023-honda-civic-type-r",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "FL5 Type-R Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Latest Civic Type-R — pinnacle of FWD performance.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock K20C1 315hp", "ECU Remap 340hp", "Turbo Upgrade 400hp", "Full Race 500hp+"],
        }
    },

    {
        id: "integra_dc2",
        brand: "HODANA MOTORS",
        realBase: "Honda Integra Type-R DC2",
        parodyName: "HODANA Integrix Type-RR DC2",
        nickname: "Pure Speed",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 5500000,
        unlockKuroList: 14,
        specs: { topSpeed: 235, accel: 4.8, handling: 91, drift: 74, power: 220 },
        color: "#ff6600",
        baseModel: {
            folder: "1995-honda-integra-type-r",
            modelPath: "models/1995-honda-integra-type-r",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "DC2 Type-R Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "High-revving B18C — apex of NA sport.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "ings1_nspec",
                name: "INGS-Spec N-Type Full",
                brand: KIT_BRANDS.INGS,
                type: "Circuit Spec",
                description: "INGS+1 N-SPEC full body kit for DC2.",
                modelFolder: "2013_ings1_n-spec_honda_integra_type-r_dc2",
                price: 3200000,
                statBonus: { handling: 10, topSpeed: 7 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true }
            },
            {
                id: "vortex_joker",
                name: "Vortex Solid+Joker DC2",
                brand: KIT_BRANDS.VORTEX,
                type: "GT Aero",
                description: "Varis Solid Joker full carbon package for DC2.",
                modelFolder: "2021_varis_solid__joker_dc2_integra_type_r",
                price: 5000000,
                statBonus: { handling: 13, topSpeed: 9 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true, wing: "Carbon GT" }
            },
        ],
        tuningParts: {
            engine:    ["Stock B18C", "Port & Polish", "ITB Conversion", "Full Race B18C-R"],
        }
    },

    {
        id: "integra_dc5",
        brand: "HODANA MOTORS",
        realBase: "Honda Integra Type-R DC5",
        parodyName: "HODANA Integrix Type-RR DC5",
        nickname: "Last Samurai",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 8500000,
        unlockKuroList: 11,
        specs: { topSpeed: 255, accel: 4.5, handling: 92, drift: 76, power: 260 },
        color: "#003300",
        baseModel: {
            folder: "2001-honda-integra-type-r-dc5",
            modelPath: "models/2001-honda-integra-type-r-dc5",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "DC5 Type-R Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Last Integra Type-R — K20A2 VTEC glory.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock K20A2", "Tune", "K24 Swap", "Full Race K24T"],
        }
    },

    {
        id: "s2000_ap1",
        brand: "HODANA MOTORS",
        realBase: "Honda S2000 AP1",
        parodyName: "HODANA S-2400 AP1",
        nickname: "Canyon Banshee",
        tier: 2,
        tierName: "Street Legend",
        category: "racer",
        price: 9000000,
        unlockKuroList: 10,
        specs: { topSpeed: 290, accel: 3.8, handling: 94, drift: 86, power: 380 },
        color: "#0066ff",
        baseModel: {
            folder: "2001-honda-s2000",
            modelPath: "models/2001-honda-s2000",
            fbxFile: "FINAL_MODEL_1.fbx",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "AP1 Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "9000rpm F20C — the banshee of touge.",
                modelFolder: "2001-honda-s2000",
                price: 0,
                statBonus: {},
            },
            {
                id: "cwest_n1_ap1",
                name: "K-Waza N1 Type-II",
                brand: KIT_BRANDS.KWAZA,
                type: "Time Attack",
                description: "C-West N1 aero kit Type II for S2000.",
                modelFolder: "2004-c-west-n1-s2000-ap1-aero-body-kit-type-ii",
                price: 3500000,
                statBonus: { handling: 9, topSpeed: 7 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true }
            },
            {
                id: "js_racing_type_s",
                name: "Hyper-Volt JS Type-S CFRP",
                brand: KIT_BRANDS.HYPER,
                type: "Full Carbon",
                description: "JS Racing Type-S full carbon fiber package.",
                modelFolder: "2008-js-racing-type-s-cfrp-ver2-honda-s2000",
                price: 5500000,
                statBonus: { handling: 11, topSpeed: 9, accel: 2 },
                parts: { frontBumper: true, rearBumper: true, hood: "Carbon CFRP", wing: "Carbon Swan" }
            },
            {
                id: "voltron_top_fuel",
                name: "Voltron Top Fuel Aero",
                brand: KIT_BRANDS.VOLTRON,
                type: "Race Spec",
                description: "Voltex S2000 full race aero — full downforce.",
                modelFolder: "2013-top-fuel-voltex-s2000",
                price: 6200000,
                statBonus: { handling: 13, topSpeed: 10 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true, wing: "Voltex Race Wing" }
            },
            {
                id: "apr_ghost_aero",
                name: "APR-Ghost Aero Kit",
                brand: KIT_BRANDS.APR_GHOST,
                type: "GT Track",
                description: "APR Performance aerodynamic full package S2000.",
                modelFolder: "2009-honda-s2000-apr-performance-aerodynamic-kit",
                price: 4800000,
                statBonus: { handling: 10, topSpeed: 8 },
                parts: { frontBumper: true, rearBumper: true, wing: "APR GT Fixed" }
            },
            {
                id: "pandam_wide_s2k",
                name: "Pandam S2000 Widebody",
                brand: KIT_BRANDS.PANDAM,
                type: "Wide Body",
                description: "Pandem widebody kit for S2000 AP1.",
                modelFolder: "2018-honda-s2000-pandem-widebody-kit",
                price: 6800000,
                statBonus: { handling: 12, drift: 10 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true }
            },
            {
                id: "evasive_voltex_iv",
                name: "Evasive Voltron V.IV",
                brand: KIT_BRANDS.VOLTRON,
                type: "Motorsport",
                description: "Evasive Motorsports Voltex Version IV race kit.",
                modelFolder: "2018-evasive-motorsports-voltex-version-iv-s2000",
                price: 7200000,
                statBonus: { handling: 14, topSpeed: 12 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true, wing: "Race Multi-Position" }
            },
            {
                id: "js_racing_gt",
                name: "Hyper-Volt JS Type-GT",
                brand: KIT_BRANDS.HYPER,
                type: "Endurance GT",
                description: "JS Racing S2000 Type-GT bodykit for long races.",
                modelFolder: "2011-honda-js-racing-s2000-type-gt-bodykit",
                price: 5800000,
                statBonus: { handling: 12, topSpeed: 10 },
                parts: { frontBumper: true, rearBumper: true, sideskirt: true, wing: "GT Endurance" }
            },
            {
                id: "yamamoto_sorcery",
                name: "Yamamoto Sorcery",
                brand: KIT_BRANDS.HYPER,
                type: "Drift Spec",
                description: "RFY Yamamoto Sorcery kit — full drift transformation.",
                modelFolder: "2010-honda-s2000-rfy-yamamoto-sorcery",
                price: 5000000,
                statBonus: { handling: 9, drift: 14 },
                parts: { frontBumper: true, rearBumper: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock F20C 240hp", "ITB Conversion", "Turbo F20C", "F22C Full Race"],
            suspension: ["Stock", "Coilover Tein", "Circuit Spec", "Drift Setup"],
            tires:     ["Stock", "Semi-Slick", "Slick R-Compound", "Drift Compound"],
        }
    },

    {
        id: "nsx_na1",
        brand: "HODANA MOTORS",
        realBase: "Honda NSX NA1",
        parodyName: "HODANA Apex-X NA1",
        nickname: "Mid-Engine Ghost",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 16000000,
        unlockKuroList: 3,
        specs: { topSpeed: 330, accel: 3.3, handling: 96, drift: 82, power: 520 },
        color: "#ffcc00",
        baseModel: {
            folder: "honda_nsx_nc1",
            modelPath: "models/honda_nsx_nc1",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "NSX NA1 Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Ayrton Senna's car — mid-engine legend.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "rb_racing_nsx",
                name: "Mecha-Hare Racing NSX",
                brand: KIT_BRANDS.MECHA_HARE,
                type: "Racing Wide",
                description: "Rocket Bunny racing kit for NSX.",
                modelFolder: "2015-rocket-bunny-racing-honda-nsx",
                price: 7500000,
                statBonus: { handling: 12, topSpeed: 9 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true, wing: "Racing Swan" }
            },
        ],
        tuningParts: {
            engine:    ["Stock C30A", "Port & Polish", "Turbo Kit", "Full Race NSX-R"],
        }
    },

    {
        id: "nsx_r_1992",
        brand: "HODANA MOTORS",
        realBase: "Honda NSX-R 1992",
        parodyName: "HODANA Apex-X Type-RR 1992",
        nickname: "Carbon Legend",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 18000000,
        unlockKuroList: 2,
        specs: { topSpeed: 310, accel: 3.5, handling: 97, drift: 79, power: 500 },
        color: "#ffffff",
        baseModel: {
            folder: "1992_honda_nsx-r",
            modelPath: "models/1992_honda_nsx-r",
            gltfFile: "scene.gltf",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "NSX-R 92 Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "1992 NSX-R — carbon fiber doors, lightest NSX.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "nsx_r_2002",
                name: "NSX-R 2002 Spec",
                brand: KIT_BRANDS.OEM,
                type: "Factory Upgrade",
                description: "2002 NSX-R updated body with revised aero.",
                modelFolder: "2002-honda-nsx-r",
                price: 2500000,
                statBonus: { handling: 7, topSpeed: 5 },
                parts: { frontBumper: true, rearBumper: true, wing: "Factory Carbon" }
            },
        ],
        tuningParts: {
            engine:    ["Stock C30A NSX-R", "NSX-R Rebuild", "Turbo C32B", "Full Race C35"],
        }
    },

    {
        id: "nsx_nc1_2017",
        brand: "HODANA MOTORS",
        realBase: "Honda NSX NC1 2017",
        parodyName: "HODANA Apex-X NC1 Hybrid",
        nickname: "Hybrid Phantom",
        tier: 3,
        tierName: "Super Tuner",
        category: "racer",
        price: 22000000,
        unlockKuroList: 1,
        specs: { topSpeed: 360, accel: 2.8, handling: 97, drift: 80, power: 650 },
        color: "#cc0000",
        baseModel: {
            folder: "2017-honda-nsx",
            modelPath: "models/2017-honda-nsx",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "NC1 Factory SH-AWD",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Hybrid AWD supercar — 573hp. The Boss Car.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "lb_nsx_na1",
                name: "Freedom LB-Works NA1",
                brand: KIT_BRANDS.FREEDOM,
                type: "LB Wide",
                description: "LB Works NA1 wide body on new NSX chassis.",
                modelFolder: "2020-honda-nsx-na1-lbworks",
                price: 9000000,
                statBonus: { handling: 14, drift: 12 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true }
            },
            {
                id: "lb_nsx_nc1",
                name: "Freedom LB-Works NC1 Ver1",
                brand: KIT_BRANDS.FREEDOM,
                type: "LB Race",
                description: "LB Works NC1 Ver.1 — maximum aggression.",
                modelFolder: "2018-honda-nsx-nc1-lbworks-ver1",
                price: 11000000,
                statBonus: { handling: 16, drift: 14, topSpeed: 10 },
                parts: { wideFenders: true, frontBumper: true, rearBumper: true, sideskirt: true, wing: "LB Carbon Race" }
            },
            {
                id: "nsx_2019",
                name: "2019 NC1 Sport+",
                brand: KIT_BRANDS.OEM,
                type: "Sport Upgrade",
                description: "2019 NSX updated sport package.",
                modelFolder: "2019-honda-nsx",
                price: 3500000,
                statBonus: { handling: 8, topSpeed: 7 },
                parts: { frontBumper: true, rearBumper: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock 3.5T SH-AWD 573hp", "ECU Stage 1 620hp", "Upgraded Turbos 700hp", "Full Race 800hp+"],
        }
    },

    {
        id: "fit_jazz_2018",
        brand: "HODANA MOTORS",
        realBase: "Honda Fit/Jazz 2018",
        parodyName: "HODANA Fit-X Jazz 2018",
        nickname: "Tiny Terror",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 2500000,
        unlockKuroList: 17,
        specs: { topSpeed: 195, accel: 6.5, handling: 82, drift: 62, power: 130 },
        color: "#ff9900",
        baseModel: {
            folder: "2018_honda_fit__jazz",
            modelPath: "models/2018_honda_fit__jazz",
            gltfFile: "scene.gltf",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Fit Jazz Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Small but smart — Magic Seat & fun handling.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
            {
                id: "fit_sport_2009",
                name: "Fit Sport 2009 Kit",
                brand: KIT_BRANDS.OEM,
                type: "Sport Package",
                description: "2009 Fit Sport body kit with ground effects.",
                modelFolder: "2009-honda-fit-sport",
                price: 900000,
                statBonus: { handling: 3, topSpeed: 2 },
                parts: { frontBumper: true, sideskirt: true }
            },
            {
                id: "fit_gk3_2016",
                name: "Fit GK3 DBA Kit",
                brand: KIT_BRANDS.OEM,
                type: "Refresh",
                description: "2016 Fit GK3 updated styling package.",
                modelFolder: "2016-honda-fit-dba-gk3",
                price: 1200000,
                statBonus: { handling: 4, topSpeed: 3 },
                parts: { frontBumper: true, rearBumper: true }
            },
            {
                id: "fit_hybrid_2020",
                name: "Fit Hybrid Eco Sport",
                brand: KIT_BRANDS.OEM,
                type: "Eco Sport",
                description: "2020 Fit Hybrid body refresh + eco aero.",
                modelFolder: "2020-honda-fit-hybrid-6aa-gr3",
                price: 1500000,
                statBonus: { topSpeed: 5, accel: 2 },
                parts: { frontBumper: true, rearBumper: true }
            },
        ],
        tuningParts: {
            engine:    ["Stock L15B", "ECU Tune", "Turbo Kit", "Civic K20 Swap"],
        }
    },

    {
        id: "fit_jazz_2009",
        brand: "HODANA MOTORS",
        realBase: "Honda Fit/Jazz Sport 2009",
        parodyName: "HODANA Fit-X Sport 2009",
        nickname: "Street Sprite",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 2000000,
        unlockKuroList: 17,
        specs: { topSpeed: 190, accel: 6.8, handling: 80, drift: 60, power: 120 },
        color: "#009900",
        baseModel: {
            folder: "2009-honda-fit-sport",
            modelPath: "models/2009-honda-fit-sport",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "GE8 Sport Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "2009 Fit Sport — the peppy GE8.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock L15A", "Tune", "Turbo Conversion", "K20 Swap"],
        }
    },

    {
        id: "crz_2011",
        brand: "HODANA MOTORS",
        realBase: "Honda CR-Z 2011",
        parodyName: "HODANA CR-Z Hybrid Sport",
        nickname: "Electric Ghost",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 4000000,
        unlockKuroList: 16,
        specs: { topSpeed: 210, accel: 5.8, handling: 83, drift: 64, power: 150 },
        color: "#00ccff",
        baseModel: {
            folder: "2011-honda-cr-z",
            modelPath: "models/2011-honda-cr-z",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "CR-Z Factory Hybrid",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Hybrid 2-door sports — electric torque surprise.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock Hybrid IMA", "Hybrid Tune", "K20 Conversion", "Full Electric Swap"],
        }
    },

    {
        id: "honda_s660",
        brand: "HODANA MOTORS",
        realBase: "Honda S660 2015",
        parodyName: "HODANA S-660 Kei Racer",
        nickname: "Mini Phantom",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 3000000,
        unlockKuroList: 17,
        specs: { topSpeed: 180, accel: 7.0, handling: 86, drift: 58, power: 64 },
        color: "#ffcc00",
        baseModel: {
            folder: "honda_s660_2015",
            modelPath: "models/honda_s660_2015",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "S660 Factory Kei",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "660cc mid-engine Kei roadster — incredible fun.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock S07A Turbo 64hp", "Detuned Race Tune 80hp", "Turbo Upgrade 120hp", "Full Build"],
        }
    },

    {
        id: "civic_15_vtec_1994",
        brand: "HODANA MOTORS",
        realBase: "Honda Civic 1.5 V-TEC 1994",
        parodyName: "HODANA Civique 1.5 VTEC-X EG",
        nickname: "Budget Racer",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 1500000,
        unlockKuroList: 17,
        specs: { topSpeed: 200, accel: 6.0, handling: 79, drift: 65, power: 100 },
        color: "#004400",
        baseModel: {
            folder: "1994-honda-civic-15-v-tec",
            modelPath: "models/1994-honda-civic-15-v-tec",
            fbxFile: null,
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "EG6 Stock",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Classic EG Civic — the budget legend.",
                modelFolder: null,
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock D15B VTEC", "Tune", "B16A Swap", "K20 Full Swap"],
        }
    },

    {
        id: "demio_2011",
        brand: "MATSUDA WORKS",
        realBase: "Mazda 2 Demio 2011",
        parodyName: "MATSUDA Demio-X 2011",
        nickname: "Hidden Ace",
        tier: 1,
        tierName: "Street Rookie",
        category: "racer",
        price: 2000000,
        unlockKuroList: 17,
        specs: { topSpeed: 185, accel: 7.0, handling: 78, drift: 60, power: 110 },
        color: "#0000cc",
        baseModel: {
            folder: "2011-mazda-2-demio",
            modelPath: "models/2011-mazda-2-demio",
            fbxFile: "FINAL_MODEL_11.fbx",
            scale: 0.015,
        },
        bodyKits: [
            {
                id: "stock",
                name: "Demio Factory",
                brand: KIT_BRANDS.OEM,
                type: "Stock",
                description: "Tiny supermini — surprisingly tossable.",
                modelFolder: "2011-mazda-2-demio",
                price: 0,
                statBonus: {},
            },
        ],
        tuningParts: {
            engine:    ["Stock ZJ-VE", "Tune", "Turbo Conversion", "K20 Swap"],
        }
    },

];

// ============================================================
// TRAFFIC CARS (simplified, no body kits)
// ============================================================
const TRAFFIC_DATABASE = [
    { id: "traffic_sedan",  color: "#888888", speed: 60, type: "sedan" },
    { id: "traffic_truck",  color: "#666644", speed: 50, type: "truck" },
    { id: "traffic_van",    color: "#444466", speed: 55, type: "van"   },
    { id: "traffic_taxi",   color: "#ccaa00", speed: 65, type: "taxi"  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get car by ID
 */
function getCarById(id) {
    return CAR_DATABASE.find(c => c.id === id) || null;
}

/**
 * Get all body kits for a car
 */
function getBodyKits(carId) {
    const car = getCarById(carId);
    return car ? car.bodyKits : [];
}

/**
 * Get kit model path — returns the folder that has the kit model,
 * or falls back to car's base model if kit has no custom folder.
 */
function getKitModelPath(carId, kitId) {
    const car = getCarById(carId);
    if (!car) return null;
    const kit = car.bodyKits.find(k => k.id === kitId);
    if (!kit) return getCarBaseModelPath(carId);

    if (kit.modelFolder) {
        // kit has its own dedicated 3D model
        const folder = `models/${kit.modelFolder}`;
        return { folder, type: "fbx_scan" };  // scan for fbx/gltf in folder
    }
    return getCarBaseModelPath(carId);
}

/**
 * Get base model path info for a car
 */
function getCarBaseModelPath(carId) {
    const car = getCarById(carId);
    if (!car) return null;
    const bm = car.baseModel;
    if (bm.fbxFile) {
        return {
            folder: bm.modelPath,
            file: bm.fbxFile,
            type: "fbx",
            scale: bm.scale,
        };
    }
    if (bm.gltfFile) {
        return {
            folder: bm.modelPath,
            file: bm.gltfFile,
            type: "gltf",
            scale: bm.scale,
        };
    }
    // Unknown - engine will scan folder
    return {
        folder: bm.modelPath,
        file: null,
        type: "scan",
        scale: bm.scale,
    };
}

/**
 * Get cars by tier
 */
function getCarsByTier(tier) {
    return CAR_DATABASE.filter(c => c.tier === tier);
}

/**
 * Get starter car
 */
function getStarterCar() {
    return CAR_DATABASE.find(c => c.category === "starter") || CAR_DATABASE[0];
}

/**
 * Get cars available at a given kuroList rank
 * (unlock if unlockKuroList >= current rank beaten)
 */
function getUnlockedCars(kuroListBeaten) {
    return CAR_DATABASE.filter(c =>
        c.unlockKuroList === null || c.unlockKuroList >= kuroListBeaten
    );
}

// Export
if (typeof module !== 'undefined') {
    module.exports = { CAR_DATABASE, TRAFFIC_DATABASE, KIT_BRANDS, getCarById, getBodyKits, getKitModelPath, getCarBaseModelPath, getCarsByTier, getStarterCar, getUnlockedCars };
}
