/**
 * TOUGE OUTLAW: SHUTO UNBOUND
 * FULL GAME STORY NARRATIVE - NFS RIVALS STYLE (Dual Perspective)
 * 
 * Sama seperti NFS Rivals: Dua sisi cerita yang berjalan paralel dan saling bersilangan.
 * SISI A: NIGHT PHANTOM (Player / Racer)
 * SISI B: MIDNIGHT CINDERS (Rival Crew / Antagonist)
 */

const GAME_STORY = {

    // ==========================================================
    // PROLOG - NFS MOST WANTED 2005 STYLE (THE ARRIVAL & THE BETRAYAL)
    // ==========================================================
    prologue: {
        title: "PROLOG: KEDATANGAN & PENGKHIANATAN // ROCKPORT TO SHUTO",
        setting: "Gerbang Tol Shuto C1 Loop — Tengah Malam, 00:00",
        narration: `
            Kamu baru saja tiba di Tokyo dengan Skyline GT-RR 34 [Kaiju God] kebanggaanmu.
            Mobil kencang, reputasi liar dari luar kota, dan mesin twin-turbo yang masih berkilau sempurna.

            Tapi di Shuto, pembalap luar kota tidak disambut dengan jabat tangan.
            Mereka disambut oleh pembalap Blacklist nomor 1 — Kenji 'The Demon' Akimoto.

            Sama seperti duel legenda Rockport 2005: Taruhan STNK (Pink Slip).
            Siapa yang kalah, menyerahkan kunci mobilnya dan berjalan kaki pulang.

            Di garis start, Yuki Kusanagi membisikkan peringatan:
            "Hati-hati... Kenji dan gengnya sudah mengutak-atik kolong mobilmu saat kamu lengah di rest area tadi!"
        `,
        characters: ["KENJI", "PLAYER", "YUKI"],
        dialogues: [
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Hahaha! Mobil luar kota yang bagus! Skyline GT-RR 34 itu... bakal kelihatan sangat keren di garasiku malam ini!"
            },
            {
                speaker: "YUKI KUSANAGI",
                avatar: "🏎️",
                crewColor: "#00ffaa",
                text: "Bos! Jangan terima taruhannya! Kenji selalu main curang! Baut oli mesinmu sudah dilonggarkan sama anak buahnya!"
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Terlambat! Taruhan Pink Slip sudah disepakati di depan semua kru Shuto! Kalau kamu berani, injak gasnya sampai garis finish Wangan!"
            },
            {
                speaker: "SYSTEM WARNING",
                avatar: "⚠️",
                crewColor: "#ff0055",
                text: "PERINGATAN: KEBOCORAN OLI TERDETEKSI! MESIN MELEDAK DALAM 3... 2... 1... (BLOWN ENGINE!)"
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Hahahaha! Selamat tinggal mobil impianmu! Sekarang serahkan kuncinya dan mulai dari bawah kalau mau balas dendam!"
            },
            {
                speaker: "YUKI KUSANAGI",
                avatar: "🏎️",
                crewColor: "#00ffaa",
                text: "Sialan si Kenji! Cepat naik ke mobil Civique-ku! Kita mundur ke markas rahasia Daikoku, bangun mobil dari nol, dan kita rebut kembali Skyline-mu!"
            }
        ]
    },

    // ==========================================================
    // ACT 1: SISI NIGHT PHANTOM (Racer Side - Player)
    // ==========================================================
    act1_racer: {
        actNumber: 1,
        side: "NIGHT PHANTOM",
        sideIcon: "👻",
        sideColor: "#00ffff",
        title: "ACT I: PORTAL SHUTO — UJIAN MALAM PERTAMA",
        setting: "Shuto Expressway — Gerbang Masuk C1 Inner Loop, Tokyo — 00:15",
        narration: `
            C1 Inner Loop. Jantung dari Shuto Expressway.

            Empat lajur aspal yang meliuk mengelilingi pusat kota Tokyo seperti ular raksasa
            di antara gedung-gedung pencakar langit yang memancarkan cahaya neon.

            Papan hijau di atas jalan menyala: "TOKYO METROPOLITAN EXPRESSWAY — C1"

            Di depanmu, satu mobil menghalangi jalur masuk.
            Seorang pengemudi Midnight Cinders — Takeshi, anak buah Kenji.
            Rotary-8 Renown warna hitam matte dengan cat grafiti bara api di kap mesinnya.
        `,
        raceInfo: {
            track: "C1 Inner Loop — 3 Putaran",
            rival: "Cinder AI - Takeshi",
            rivalCar: "MATSUDA Rotary-8 Renown [Heat Black]",
            weather: "Malam, Hujan Ringan",
            stakes: "Akses masuk wilayah C1 Night Phantom"
        },
        dialogues: [
            {
                speaker: "TAKESHI [MIDNIGHT CINDERS]",
                avatar: "🔥",
                crewColor: "#ff3300",
                text: "Night Phantom? Hahaha! Ini sudah wilayah Cinders sekarang. Balik ke kampung aja kalian."
            },
            {
                speaker: "RYO TANAKA",
                avatar: "🛡️",
                crewColor: "#00ffaa",
                text: "Bos, jangan peduliin omongannya. Tunjukkan aja siapa yang lebih cepat di aspal ini."
            },
            {
                speaker: "MAI HAYABUSA",
                avatar: "🧭",
                crewColor: "#00ffaa",
                text: "Data scan selesai. Takeshi biasa geber di lajur terluar. Masuk dari dalam di tikungan S-bend depan, dan gaspol!"
            }
        ],
        postRaceWin: {
            narration: "Takeshi kehilangan kendali di tikungan S-bend terakhir, menghantam barrier beton. Kamu melewatinya tanpa menoleh.",
            dialogues: [
                {
                    speaker: "TAKESHI [DIKALAHKAN]",
                    avatar: "🔥",
                    crewColor: "#ff3300",
                    text: "Bangsat... Tidak mungkin! Lapor ke Kenji soal ini!"
                },
                {
                    speaker: "YUKI KUSANAGI",
                    avatar: "🏎️",
                    crewColor: "#00ffaa",
                    text: "Selamat datang di Night Phantom. C1 kembali milik kita malam ini!"
                }
            ]
        }
    },

    // ==========================================================
    // ACT 1: SISI MIDNIGHT CINDERS (Rival Side - Antagonist)
    // NFS RIVALS STYLE: Perspektif musuh juga diceritakan!
    // ==========================================================
    act1_rival: {
        actNumber: 1,
        side: "MIDNIGHT CINDERS",
        sideIcon: "🔥",
        sideColor: "#ff3300",
        title: "ACT I [SISI LAIN]: LAPORAN DARI TAKESHI",
        setting: "Markas Midnight Cinders — Kawasan Gudang Tsurumi, Yokohama — 00:45",
        narration: `
            Kenji Akimoto duduk di kursinya sambil menatap layar monitor yang menampilkan
            footage kamera CCTV jalan tol malam itu.

            Takeshi masuk, menunduk. Mobil Rotary-8-nya penyok di sisi kanan.
            Tidak perlu kata-kata untuk menjelaskan apa yang terjadi.

            Kenji mematikan rokoknya. Perlahan berdiri.
            Matanya tidak berkedip.
        `,
        dialogues: [
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Takeshi. Kamu bilang C1 sudah di tangan kita."
            },
            {
                speaker: "TAKESHI",
                avatar: "🔥",
                crewColor: "#ff3300",
                text: "Ketua... ada pembalap baru yang masuk bersama Night Phantom malam ini. Mereka tidak seperti biasanya—"
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Aku tidak mau dengar alasan. Aku hanya mau mendengar namanya."
            },
            {
                speaker: "DAIKI [CINDERS INTEL]",
                avatar: "🔥",
                crewColor: "#ff3300",
                text: "...Tidak ada di database kami, Ketua. Pendatang baru. Tapi waktu lap mereka di C1 tadi... 4 menit 12 detik."
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Menarik. Kirim Daiki ke Wangan malam Jumat. Kita lihat seberapa jauh mereka bisa pergi."
            }
        ]
    },

    // ==========================================================
    // ACT 2: SISI NIGHT PHANTOM
    // ==========================================================
    act2_racer: {
        actNumber: 2,
        side: "NIGHT PHANTOM",
        sideIcon: "👻",
        sideColor: "#00ffff",
        title: "ACT II: WANGAN LINE — DUEL 300 KM/H",
        setting: "Bayshore Route (Wangan Line) — Stretch Lurus Utama — Jumat, 02:00",
        narration: `
            Wangan Line. Jalur impian setiap pembalap.

            Delapan kilometer aspal lurus di tepi Teluk Tokyo.
            Tidak ada tikungan, tidak ada celah untuk bersembunyi.
            Di sini, hanya ada satu hal yang menentukan pemenang:
            
            Berapa cepat mobilmu bisa berlari.

            Daiki — spesialis straight-line dari Midnight Cinders — menunggu di ujung jalur
            dengan Skylinex GT-RR 34 warna silver metalik yang memancarkan cahaya lampu tol.

            Tapi bukan hanya kecepatan yang dipertaruhkan malam ini.
            Mai sudah menemukan sesuatu dari data intel yang membuat semuanya berubah.
        `,
        raceInfo: {
            track: "Bayshore Wangan Straight — Sprint 8 KM",
            rival: "Cinder AI - Daiki",
            rivalCar: "NIPPON Skylinex GT-RR 34 [Silver Lightning]",
            weather: "Malam Cerah, Angin Kencang dari Teluk",
            stakes: "Data lokasi markas Midnight Cinders"
        },
        dialogues: [
            {
                speaker: "MAI HAYABUSA",
                avatar: "🧭",
                crewColor: "#00ffaa",
                text: "Bos, sebelum balapan — aku perlu bilang sesuatu. Intel dari sumber dalam menyebut bahwa Midnight Cinders bukan sekadar geng jalanan biasa."
            },
            {
                speaker: "MAI HAYABUSA",
                avatar: "🧭",
                crewColor: "#00ffaa",
                text: "Mereka punya backing dari sindikat yang mengendalikan distribusi komponen racing ilegal di seluruh Shuto. Kenji... dia lebih berbahaya dari yang kita kira."
            },
            {
                speaker: "RYO TANAKA",
                avatar: "🛡️",
                crewColor: "#00ffaa",
                text: "Semakin bagus. Kalahkan Daiki malam ini, kita dapat lokasi gudang mereka. Kita bisa akhiri ini sekaligus."
            },
            {
                speaker: "DAIKI [MIDNIGHT CINDERS]",
                avatar: "🔥",
                crewColor: "#ff3300",
                text: "Kenji bilang kamu cepat. Tapi kecepatan di Wangan bukan soal teknik. Di sini, ini soal nyali. Dan menurutku nyali kamu belum cukup."
            }
        ],
        postRaceWin: {
            narration: "Daiki kalah separuh kilometer sebelum garis akhir. Turbo Skylinex-nya mati mendadak karena overheat. Dia mundur ke bahu jalan sambil mengepalkan setir.",
            dialogues: [
                {
                    speaker: "DAIKI [DIKALAHKAN]",
                    avatar: "🔥",
                    crewColor: "#ff3300",
                    text: "Tidak mungkin ada yang bisa mengimbangi turbo aku di straight ini... siapa sebenarnya kamu?!"
                },
                {
                    speaker: "MAI HAYABUSA",
                    avatar: "🧭",
                    crewColor: "#00ffaa",
                    text: "Data dari black box mobilnya sudah aku copy. Gudang Cinders ada di Kawasan Pelabuhan Tsurumi. Kita sudah semakin dekat."
                }
            ]
        }
    },

    // ==========================================================
    // ACT 2: SISI MIDNIGHT CINDERS
    // ==========================================================
    act2_rival: {
        actNumber: 2,
        side: "MIDNIGHT CINDERS",
        sideIcon: "🔥",
        sideColor: "#ff3300",
        title: "ACT II [SISI LAIN]: KENJI BERGERAK",
        setting: "Gudang Cinders, Tsurumi — Sabtu, 03:30",
        narration: `
            Kenji berdiri di tepi atap gudang, menatap skyline Tokyo yang berkilauan di kejauhan.
            
            Di bawahnya, puluhan mobil berjajar rapi — koleksi mesin-mesin terbaik
            yang dikumpulkan Midnight Cinders selama bertahun-tahun.
            
            Rei Kazama — pemimpin Iron Apex Tuners — berdiri di sampingnya.
            Mereka memiliki sejarah panjang. Kadang sekutu, kadang lawan.
            Malam ini, keduanya memiliki musuh yang sama.
        `,
        dialogues: [
            {
                speaker: "REI KAZAMA [IRON APEX]",
                avatar: "👑",
                crewColor: "#ff9900",
                text: "Kamu sudah dengar, Kenji. Night Phantom punya pembalap baru yang mengalahkan dua orang terbaikmu dalam dua malam."
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Aku dengar. Justru itu yang membuatku tertarik. Sudah lama tidak ada yang memberikan tantangan nyata."
            },
            {
                speaker: "REI KAZAMA [IRON APEX]",
                avatar: "👑",
                crewColor: "#ff9900",
                text: "Tertarik? Mereka akan menghancurkan wilayah kita satu per satu kalau dibiarkan. Aku sudah siapkan duelku sendiri di Rainbow Bridge."
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Lakukan apa yang perlu kamu lakukan, Rei. Tapi biarkan yang terakhir untukku. Shuto Wangan — malam Rabu. Aku yang akan menutup cerita ini sendiri."
            }
        ]
    },

    // ==========================================================
    // ACT 3: SISI NIGHT PHANTOM
    // ==========================================================
    act3_racer: {
        actNumber: 3,
        side: "NIGHT PHANTOM",
        sideIcon: "👻",
        sideColor: "#00ffff",
        title: "ACT III: RAINBOW BRIDGE — REI KAZAMA",
        setting: "Rainbow Bridge Approach & Suspension Bridge — Senin, 01:00",
        narration: `
            Rainbow Bridge. Ikon kota Tokyo yang berdiri kokoh di atas perairan Teluk.
            Di bawah lampu sorot putih yang mewarnai kabelnya, jalan tol
            membentang seperti panggung duel terbuka.

            Rei Kazama menunggu di titik awal dengan Apex-X NC1 miliknya —
            bodi putih bersih dengan livery sirkuit yang penuh kode racing.
            Dia bukan pengemudi biasa.

            Ryo sudah memperingatkan: Rei adalah eks-pembalap sirkuit profesional
            yang turun ke jalanan setelah karirnya berakhir.
            
            Ini bukan adu kecepatan. Ini adu teknik.
        `,
        raceInfo: {
            track: "Rainbow Bridge Expressway — Duel 3 Putaran",
            rival: "REI 'APEX QUEEN' KAZAMA",
            rivalCar: "HODANA Apex-X NC1 [Circuit White]",
            weather: "Malam Berangin, Jembatan Suspensi",
            stakes: "Wilayah Daiba & akses ke final showdown"
        },
        dialogues: [
            {
                speaker: "REI KAZAMA [IRON APEX]",
                avatar: "👑",
                crewColor: "#ff9900",
                text: "Aku sudah mengamatimu dari jauh. Kamu punya bakat. Tapi bakat saja tidak cukup di Rainbow Bridge."
            },
            {
                speaker: "REI KAZAMA [IRON APEX]",
                avatar: "👑",
                crewColor: "#ff9900",
                text: "Angin di jembatan ini berubah setiap 30 detik. Salah kalkulasi satu derajat di tikungan keluar, dan kamu masuk ke barrier. Sudah banyak yang mencoba. Hampir semua menyesal."
            },
            {
                speaker: "YUKI KUSANAGI",
                avatar: "🏎️",
                crewColor: "#00ffaa",
                text: "Bos, hati-hati. Rei bukan seperti Takeshi atau Daiki. Dia benar-benar berbeda levelnya."
            },
            {
                speaker: "MAI HAYABUSA",
                avatar: "🧭",
                crewColor: "#00ffaa",
                text: "Angin dari arah barat-daya, 14 km/jam. Tikungan entry bridge — rem sebelum marka putih ke-3, lalu counter-steer awal. Percayai dataku."
            }
        ],
        postRaceWin: {
            narration: "Rei Kazama dan kamu beriringan bahu-membahu memasuki tikungan terakhir. Milimeter demi milimeter. Lalu, di garis finish — kamu lebih dulu separuh hidung mobil.",
            dialogues: [
                {
                    speaker: "REI KAZAMA",
                    avatar: "👑",
                    crewColor: "#ff9900",
                    text: "...Tch. Garis balapmu sempurna di tikungan S tadi. Aku tidak bisa membantah itu."
                },
                {
                    speaker: "REI KAZAMA",
                    avatar: "👑",
                    crewColor: "#ff9900",
                    text: "Hati-hati di Wangan Rabu depan. Kenji tidak akan bermain dengan aturan yang sama seperti aku."
                },
                {
                    speaker: "RYO TANAKA",
                    avatar: "🛡️",
                    crewColor: "#00ffaa",
                    text: "Bahkan Rei Kazama mengakuimu, Bos. Tinggal satu lagi. Keputusan ada di tangan kita."
                }
            ]
        }
    },

    // ==========================================================
    // FINAL ACT: KEDUA SISI BERTEMU DI WANGAN
    // ==========================================================
    finalAct: {
        actNumber: 4,
        title: "FINAL ACT: WANGAN MIDNIGHT — SHUTO RECKONING",
        setting: "Shuto Expressway Bayshore — Full Length Wangan, Rabu, 00:00",
        narration: `
            Tengah malam. Rabu.

            Shuto Wangan — jalur terpanjang dan terlurus di seluruh sistem
            Shuto Expressway Tokyo — sudah dikosongkan oleh kedua crew.
            Tidak ada mobil sipil. Tidak ada penonton.
            Hanya dua mobil, dua pembalap, dan satu jalan lurus yang membentang
            sepanjang 12 kilometer di bawah langit Tokyo yang memantulkan cahaya kota.

            Di ujung sana, headlamp Akuma-Z S30 milik Kenji menyala pelan seperti mata iblis.

            Yuki, Ryo, dan Mai berdiri di belakangmu.
            Tidak ada kata-kata yang tersisa. Semuanya sudah tersampaikan.

            Ini bukan hanya soal siapa yang lebih cepat.
            Ini soal siapa yang berhak menyebut Shuto sebagai rumah.
        `,
        characters: ["KENJI", "PLAYER", "YUKI", "RYO", "MAI"],
        dialogues: [
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Kamu sudah mengalahkan dua orang terbaikku. Menghancurkan aliansi dengan Iron Apex. Kamu pikir itu cukup untuk mengakhiri Midnight Cinders?"
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Aku yang membangun kekuasaan ini di Shuto selama 7 tahun dengan tangan sendiri. Tidak ada yang bisa mengambilnya dalam seminggu."
            },
            {
                speaker: "RYO TANAKA",
                avatar: "🛡️",
                crewColor: "#00ffaa",
                text: "Bos, semua sistem ready. Turbo sudah di suhu optimal. NOS penuh. Ini momen yang kita tunggu."
            },
            {
                speaker: "YUKI KUSANAGI",
                avatar: "🏎️",
                crewColor: "#00ffaa",
                text: "Apapun yang terjadi di ujung jalan sana... kami di belakangmu. Night Phantom tidak pernah meninggalkan salah satu anggotanya."
            },
            {
                speaker: "MAI HAYABUSA",
                avatar: "🧭",
                crewColor: "#00ffaa",
                text: "Data terakhir: Akuma-Z S30 Kenji sudah dimodif twin-turbo L28 engine. Estimasi top speed 342 km/h. Tapi mobil itu berat di bagian belakang. Manfaatkan itu di bagian akhir sprint."
            },
            {
                speaker: "KENJI 'THE DEMON' AKIMOTO",
                avatar: "😈",
                crewColor: "#ff3300",
                text: "Wangan sudah memanggil. Mari kita jawab."
            }
        ],
        raceInfo: {
            track: "Full Wangan Straight — Sprint 12 KM — Final Showdown",
            rival: "KENJI 'THE DEMON' AKIMOTO [FINAL BOSS]",
            rivalCar: "NIPPON Akuma-Z S30 [Midnight Demon — Twin-Turbo L28]",
            weather: "Tengah Malam, Langit Cerah, Angin Teluk Tokyo",
            stakes: "Kontrol penuh atas seluruh wilayah Shuto Expressway"
        },
        postRaceWin: {
            narration: `
                Di kilometer ke-11, turbo belakang Akuma-Z milik Kenji kehilangan tekanan.
                
                Bukan karena mesinnya rusak.
                Bukan karena ban-nya habis.
                
                Tapi karena kamu — dengan segala tenaga yang tersisa — menekan pedal gas
                hingga ke lantai di kilometer ke-10 dan tidak pernah melepasnya.
                
                Kenji melihat headlamp mobilmu melewatinya dari kaca spion.
                Untuk pertama kalinya dalam 7 tahun di Shuto... dia ada di belakang.
            `,
            dialogues: [
                {
                    speaker: "KENJI 'THE DEMON' AKIMOTO",
                    avatar: "😈",
                    crewColor: "#ff3300",
                    text: "...Kamu menang. Di jalur ini. Malam ini."
                },
                {
                    speaker: "KENJI 'THE DEMON' AKIMOTO",
                    avatar: "😈",
                    crewColor: "#ff3300",
                    text: "Tapi Shuto tidak akan pernah benar-benar menjadi milik siapapun. Aspal ini ada sebelum kita, dan akan ada setelah kita pergi."
                },
                {
                    speaker: "YUKI KUSANAGI",
                    avatar: "🏎️",
                    crewColor: "#00ffaa",
                    text: "YEAAAAHHH! NIGHT PHANTOM! SHUTO ADALAH MILIK KITA! SEMUANYA JANGAN TIDUR DULU MALAM INI!"
                },
                {
                    speaker: "RYO TANAKA",
                    avatar: "🛡️",
                    crewColor: "#00ffaa",
                    text: "Bos... selamat. Dari sekarang, nama kamu akan dikenal di setiap lampu merah, di setiap rest area, di seluruh Shuto."
                },
                {
                    speaker: "MAI HAYABUSA",
                    avatar: "🧭",
                    crewColor: "#00ffaa",
                    text: "Data malam ini sudah aku simpan. Waktu lap final: 2 menit 03 detik. Rekor baru Wangan Midnight. Selamat, Bos."
                }
            ]
        }
    },

    // ==========================================================
    // EPILOG
    // ==========================================================
    epilogue: {
        title: "EPILOG: LAMPU SODIUM SHUTO",
        setting: "Daikoku Fureai Pier — Fajar, 05:00",
        narration: `
            Fajar mulai menyentuh cakrawala Teluk Tokyo.
            Langit bergradasi dari ungu gelap ke oranye lembut.

            Kamu berdiri di tepi pier Daikoku bersama Yuki, Ryo, dan Mai.
            Empat mobil terparkir di belakang kalian, masih hangat oleh panas mesin semalam.

            Di suatu tempat di Shuto, Kenji Akimoto memacu Akuma-Z-nya sendirian —
            bukan sebagai pemimpin geng, bukan sebagai musuh.
            Hanya sebagai pembalap yang mencintai aspal.

            Rei Kazama sudah pergi ke selatan, katanya mau coba touge di Hakone.

            Dan kamu?

            Kamu menatap lampu sodium jalan tol yang mulai meredup seiring
            cahaya pagi datang... dan tersenyum.

            Shuto masih memanggil.
            Selalu memanggil.
        `,
        closingLine: "Shuto tidak pernah tidur. Dan Night Phantom... baru saja memulai."
    }
};

// ================================================================
// CHAPTER MANAGER — Mengatur urutan story dan chapter yang dibuka
// ================================================================
const CHAPTER_ORDER = [
    "prologue",
    "act1_racer",
    "act1_rival",
    "act2_racer",
    "act2_rival",
    "act3_racer",
    "finalAct",
    "epilogue"
];

let currentChapter = 0;
let currentDialogueIndex = 0;
let currentChapterData = null;

function loadChapter(chapterKey) {
    currentChapterData = GAME_STORY[chapterKey];
    currentDialogueIndex = 0;
    if (!currentChapterData) return;

    // Update ACT label
    const actLabel = document.getElementById('cs-act-label');
    if (actLabel) {
        actLabel.innerText = currentChapterData.title || "CUTSCENE";
    }

    // Update side badge (Night Phantom vs Midnight Cinders)
    const sideBadge = document.getElementById('cs-side-badge');
    if (sideBadge && currentChapterData.side) {
        sideBadge.innerText = `${currentChapterData.sideIcon || ""} ${currentChapterData.side}`;
        sideBadge.style.color = currentChapterData.sideColor || "#fff";
    }

    // Update track info jika ada race
    if (currentChapterData.raceInfo) {
        const track = document.getElementById('cs-track-info');
        if (track) track.innerText = `📍 ${currentChapterData.raceInfo.track}`;
    }

    playChapterDialogues(currentChapterData.dialogues || currentChapterData.prologue?.dialogues || []);
}

function playChapterDialogues(dialogues) {
    if (!dialogues || dialogues.length === 0) return;
    showCutsceneDialogue(dialogues[0]);
    currentDialogueIndex = 0;

    const csOverlay = document.getElementById('cutscene-overlay');
    if (csOverlay) {
        csOverlay.onclick = () => advanceDialogue(dialogues);
    }
}

function advanceDialogue(dialogues) {
    currentDialogueIndex++;
    if (currentDialogueIndex < dialogues.length) {
        showCutsceneDialogue(dialogues[currentDialogueIndex]);
    } else {
        // Cutscene selesai, mulai balapan
        endCutscene();
    }
}

function showCutsceneDialogue(dialogue) {
    if (!dialogue) return;
    document.getElementById('cs-speaker-name').innerText = dialogue.speaker || "";
    document.getElementById('cs-dialogue-content').innerText = `"${dialogue.text}"`;
    document.getElementById('radio-avatar').innerText = dialogue.avatar || "🏎️";

    // Highlight karakter aktif
    const isRival = dialogue.crewColor === "#ff3300" || dialogue.crewColor === "#ff9900";
    const yuki = document.getElementById('cs-char-yuki');
    const kenji = document.getElementById('cs-char-kenji');
    if (yuki && kenji) {
        if (isRival) {
            yuki.classList.add('inactive');
            kenji.classList.remove('inactive');
        } else {
            kenji.classList.add('inactive');
            yuki.classList.remove('inactive');
        }
    }
}
