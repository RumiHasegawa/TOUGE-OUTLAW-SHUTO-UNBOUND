/**
 * SHUTO EXPRESSWAY LORE & CREW DATABASE (NFS CARBON X ANIME THEME)
 * Player Crew, Rival Crews, AI Traffic Names, and Radio Dialogues
 */

// CREW PLAYER (Geng Pemain: NIGHT PHANTOM)
const PLAYER_CREW = {
    name: "NIGHT PHANTOM",
    territory: "C1 Loop & Daikoku PA",
    members: [
        {
            id: "yuki",
            name: "Yuki 'Slipstream' Kusanagi",
            role: "DRAFTER",
            avatar: "🏎️",
            carParody: "Civique Sport-R [Kanjo Striker]",
            abilityDesc: "Membuka koridor angin (Slipstream) untuk melipatgandakan akselerasi Player!",
            lines: {
                boost: "Masuk di belakangku sekarang! Aku buka jalur angin super kencang!",
                win: "Kerja bagus! Kru lawan nggak ada apa-apanya dibanding Night Phantom!",
                alert: "Awas ada traffic padat di depan, banting ke kanan!"
            }
        },
        {
            id: "ryo",
            name: "Ryo 'Iron Wall' Tanaka",
            role: "BLOCKER",
            avatar: "🛡️",
            carParody: "S-2400 [VTEC Screamer]",
            abilityDesc: "Menghantam dan mengunci posisi mobil Rival agar tidak bisa menyalip!",
            lines: {
                boost: "Aku kunci si bos lawan! Jangan biarkan dia dapat celah!",
                win: "Hahaha! Lawan terpental ke pagar pembatas!",
                alert: "Rival mau aktifin Nitro di sebelah kiri!"
            }
        },
        {
            id: "mai",
            name: "Mai 'Valkyrie' Hayabusa",
            role: "SCOUT",
            avatar: "🧭",
            carParody: "Rotary-7 [Valkyrie Twin]",
            abilityDesc: "Memindai jalur shortcut rahasia dan posisi civilian traffic!",
            lines: {
                boost: "Jalur C1 bagian dalam bersih! Hajar gas pol!",
                win: "Data telemetry sempurna! Wilayah Shuto ini resmi milik kita!",
                alert: "Ada mobil sipil lambat di lajur tengah!"
            }
        }
    ]
};

// RIVAL CREWS (Geng Musuh Wilayah Shuto Expressway & Canyon)
const RIVAL_CREWS = [
    {
        id: "midnight_cinders",
        crewName: "MIDNIGHT CINDERS",
        badge: "🔥",
        territory: "Bayshore Route (Wangan Line)",
        leader: {
            name: "Kenji 'The Demon' Akimoto",
            avatar: "😈",
            carParody: "Akuma-Z S30 [Midnight Devil]",
            taunt: "Jalan lurus Wangan ini adalah kuburan bagi pemula seperti geng kalian!",
            defeat: "Mustahil... Mesin L-Twin Turbo gue bisa kalah di jalan tol sendiri?!"
        },
        grunts: [
            { name: "Cinder AI - Takeshi", carParody: "Rotary-8 Renown" },
            { name: "Cinder AI - Daiki", carParody: "Skylinex GT-RR 34" }
        ]
    },
    {
        id: "iron_apex",
        crewName: "IRON APEX TUNERS",
        badge: "⚡",
        territory: "Rainbow Bridge & Daiba Apex",
        leader: {
            name: "Rei 'Apex Queen' Kazama",
            avatar: "👑",
            carParody: "Apex-X [Midship Phantom]",
            taunt: "Gaya drift kalian terlalu kaku! Shuto bukan tempat buat main-main!",
            defeat: "Tch! Garis balapmu... sempurna sekali di tikungan S tadi!"
        },
        grunts: [
            { name: "Apex AI - Shin", carParody: "S-2400 [VTEC Screamer]" }
        ]
    },
    {
        id: "canyon_ghosts",
        crewName: "CANYON GHOSTS (TOUGE KINGS)",
        badge: "👻",
        territory: "Hakone Mountain Canyon",
        leader: {
            name: "Ryosuke 'Ghost Rotary' Takahashi",
            avatar: "🎭",
            carParody: "Rotary-7 [Valkyrie Twin]",
            taunt: "Hati-hati, jurang canyon ini nggak punya belas kasihan!",
            defeat: "Legenda baru Touge telah lahir malam ini..."
        },
        grunts: [
            { name: "Ghost AI - Kenta", carParody: "Civique Sport-R" }
        ]
    }
];

// NAMA PENGEMUDI MOBIL CIVILIAN TRAFFIC (Warga Kota Shuto)
const TRAFFIC_CIVILIANS = [
    { name: "Tuan Sato (Komuter Lembur)", car: "City-Puff 1.5", mood: "Santai di 80 km/h" },
    { name: "Kurir Ramen Cepat", car: "Midget-2 Hatch", mood: "Meliuk di lajur kiri" },
    { name: "Supir Eksekutif", car: "Metropolitan Fastback", mood: "Lajur cepat 100 km/h" },
    { name: "Pemuda Santai 90-an", car: "City-Cruiser 94", mood: "Mendengarkan City Pop" }
];
