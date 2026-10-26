/**
 * CORE RACING ENGINE & GAMEPLAY (NFS CARBON X ANIME UNBOUND)
 * Canyon road generator, Vehicle physics, AI Rivals, Civilian Traffic, Wingman abilities
 */

let scene, camera, renderer;
let playerCar = null;
let effectsManager = null;
let currentCarData = CAR_DATABASE[0]; // Default: Skyline GT-RR 34
let activeKit = "stock";
let bumperDeleted = false;
let stanceData = { camber: -2, height: 0.12, trackWidth: 1.0 };
let underglowColor = "#00ffff";
let smokeColor = "#ff0077";

// Driving State
let speed = 0;
let maxSpeed = 310;
let accel = 0;
let steerAngle = 0;
let driftScore = 0;
let driftMultiplier = 1.0;
let isDrifting = false;
let nosAmount = 100;
let isNosActive = false;
let wingmanActive = false;
let wingmanCooldown = 0;

// Input State
const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    handbrake: false,
    nos: false,
    crew: false
};

// Road Segments & Traffic
let roadSegments = [];
let trafficCars = [];
let rivalCars = [];
const ROAD_WIDTH = 22;
const SEGMENT_LENGTH = 40;
const TOTAL_SEGMENTS = 100;

function init() {
    const canvas = document.getElementById('game-canvas');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060814); // Night Canyon sky
    scene.fog = new THREE.FogExp2(0x060814, 0.003); // Lighter fog so highway is clearly visible

    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1500);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 1.2, -10);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lighting (Anime Moody Night Canyon - Brighter so models & road pop)
    const ambientLight = new THREE.AmbientLight(0x7788aa, 1.8);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xaaccff, 2.2);
    moonLight.position.set(50, 150, -50);
    scene.add(moonLight);

    const headLight = new THREE.DirectionalLight(0xffffff, 1.2);
    headLight.position.set(0, 20, 30);
    scene.add(headLight);

    // Init Anime Effects
    effectsManager = new AnimeEffectsManager(scene);

    // Build Canyon Road & Scenery
    buildCanyonTrack();

    // Build NFS Carbon 3D Safehouse Garage Stage
    buildSafehouseGarage();

    // Load Saved Game Data (Mobil & Modifikasi)
    loadGameData();

    // Spawn Player Car
    spawnPlayerCar(currentCarData);

    // Spawn AI Traffic & Wingman/Rival
    spawnTrafficAI();
    spawnRivalAndWingman();

    // Setup Mobile & Keyboard Controls
    setupInputListeners();
    setupSafehouseControls();

    // Populate Garage UI
    renderGarageCategories('cars');

    window.addEventListener('resize', onWindowResize);
    animate();
}

// --- PROCEDURAL SHUTO EXPRESSWAY (C1 LOOP & WANGAN HIGHWAY) ---
function buildCanyonTrack() {
    const roadMat = new THREE.MeshStandardMaterial({
        color: 0x141620,
        roughness: 0.7,
        metalness: 0.2
    });

    const guardrailMat = new THREE.MeshStandardMaterial({
        color: 0x225588, // Steel blue highway barrier
        roughness: 0.4,
        metalness: 0.8
    });

    const buildingMat = new THREE.MeshBasicMaterial({
        color: 0x090d1a
    });

    const neonSignMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff
    });

    for (let i = 0; i < TOTAL_SEGMENTS; i++) {
        const segGroup = new THREE.Group();
        const zPos = -i * SEGMENT_LENGTH;
        // Kurva khas jalan tol Shuto C1 Loop (dimulai tepat di x = 0 di bawah mobil pemain)
        const curveX = Math.sin(i * 0.08) * 30 + (Math.cos(i * 0.04) - 1) * 20;

        // Aspal Jalan Tol 4-Lajur Shuto
        const roadGeo = new THREE.PlaneGeometry(ROAD_WIDTH, SEGMENT_LENGTH);
        const roadMesh = new THREE.Mesh(roadGeo, roadMat);
        roadMesh.rotation.x = -Math.PI / 2;
        segGroup.add(roadMesh);

        // Marka Garis Putih Putus-Putus Tiap Lajur Shuto
        [-5.5, 0, 5.5].forEach(xOffset => {
            const lineGeo = new THREE.PlaneGeometry(0.35, SEGMENT_LENGTH * 0.6);
            const lineMat = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
            const lineMesh = new THREE.Mesh(lineGeo, lineMat);
            lineMesh.rotation.x = -Math.PI / 2;
            lineMesh.position.set(xOffset, 0.02, 0);
            segGroup.add(lineMesh);
        });

        // Beton Pembatas Jalan Tol Kiri & Kanan (Sound Barriers & Railings)
        const barrierGeo = new THREE.BoxGeometry(0.8, 1.8, SEGMENT_LENGTH);
        const leftBarrier = new THREE.Mesh(barrierGeo, guardrailMat);
        leftBarrier.position.set(-ROAD_WIDTH / 2, 0.9, 0);
        segGroup.add(leftBarrier);

        const rightBarrier = new THREE.Mesh(barrierGeo, guardrailMat);
        rightBarrier.position.set(ROAD_WIDTH / 2, 0.9, 0);
        segGroup.add(rightBarrier);

        // Tiang Lampu Jalan Tol Shuto (Streetlights) setiap 2 segmen
        if (i % 2 === 0) {
            const poleGeo = new THREE.CylinderGeometry(0.12, 0.12, 6.5);
            const poleMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8 });
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.position.set(-ROAD_WIDTH / 2 - 0.5, 3.25, 0);
            segGroup.add(pole);

            // Lampu Neon Oranye Sodium Khas Shuto Wangan
            const lightBox = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 0.5), new THREE.MeshBasicMaterial({ color: 0xffaa33 }));
            lightBox.position.set(-ROAD_WIDTH / 2 + 0.5, 6.4, 0);
            segGroup.add(lightBox);
        }

        // Papan Petunjuk Jalan Tol Hijau Melintang (Overhead Highway Signs) setiap 8 segmen
        if (i % 8 === 0) {
            const signGantryGeo = new THREE.BoxGeometry(ROAD_WIDTH + 3, 0.4, 0.6);
            const gantryMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 });
            const gantry = new THREE.Mesh(signGantryGeo, gantryMat);
            gantry.position.set(0, 6.2, 0);
            segGroup.add(gantry);

            // Signboard Hijau "Shuto C1 / Daikoku PA / Haneda"
            const boardGeo = new THREE.BoxGeometry(9.0, 2.2, 0.2);
            const boardMat = new THREE.MeshBasicMaterial({ color: 0x008844 });
            const board = new THREE.Mesh(boardGeo, boardMat);
            board.position.set(0, 5.0, 0);
            segGroup.add(board);
        }

        // Gedung Pencakar Langit Tokyo Anime di Pinggir Jalan Tol
        if (i % 3 === 0) {
            const bHeight = 40 + Math.random() * 60;
            const bWidth = 20 + Math.random() * 15;
            const buildingGeo = new THREE.BoxGeometry(bWidth, bHeight, bWidth);
            const buildingLeft = new THREE.Mesh(buildingGeo, buildingMat);
            buildingLeft.position.set(-ROAD_WIDTH / 2 - 25 - Math.random() * 10, bHeight / 2, 0);
            segGroup.add(buildingLeft);

            const buildingRight = new THREE.Mesh(buildingGeo, buildingMat);
            buildingRight.position.set(ROAD_WIDTH / 2 + 25 + Math.random() * 10, bHeight / 2, 0);
            segGroup.add(buildingRight);
        }

        segGroup.position.set(curveX, 0, zPos);
        scene.add(segGroup);
        roadSegments.push({ group: segGroup, z: zPos, x: curveX });
    }
}

// --- CREATE STYLIZED 3D ANIME CAR ---
function createProceduralCarMesh(carData) {
    const carRoot = new THREE.Group();

    // Toon / Cel-shaded Body Material dengan Outline
    const bodyMat = new THREE.MeshToonMaterial({
        color: new THREE.Color(carData.color),
        bumpScale: 0.05
    });

    const glassMat = new THREE.MeshToonMaterial({
        color: 0x050810,
        opacity: 0.9,
        transparent: true
    });

    const trimMat = new THREE.MeshToonMaterial({ color: 0x111111 });

    // Chassis Bodi Utama
    const chassisGeo = new THREE.BoxGeometry(2.0, 0.7, 4.4);
    const chassis = new THREE.Mesh(chassisGeo, bodyMat);
    chassis.position.y = 0.65;
    carRoot.add(chassis);

    // Kabin / Cabin Roof & Kaca
    const cabinGeo = new THREE.BoxGeometry(1.6, 0.6, 2.2);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(0, 1.15, -0.2);
    carRoot.add(cabin);

    // Kap Mesin / Hood (Vented)
    const hoodGeo = new THREE.BoxGeometry(1.8, 0.15, 1.4);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(0, 0.95, -1.2);
    hood.rotation.x = 0.08;
    carRoot.add(hood);

    // Front Bumper & Splitter
    const bumperFGeo = new THREE.BoxGeometry(2.1, 0.45, 0.5);
    const bumperF = new THREE.Mesh(bumperFGeo, trimMat);
    bumperF.position.set(0, 0.4, -2.25);
    carRoot.add(bumperF);

    // Rear Bumper (Support Bumper Delete ala Unbound)
    const bumperRGeo = new THREE.BoxGeometry(2.05, 0.5, 0.4);
    const bumperR = new THREE.Mesh(bumperRGeo, trimMat);
    bumperR.position.set(0, 0.45, 2.25);
    bumperR.name = "rear_bumper";
    if (bumperDeleted) {
        bumperR.visible = false;
    }
    carRoot.add(bumperR);

    // Dual Exhaust Tip (Pipa Knalpot Racing)
    const exhaustGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5);
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x5588ff, metalness: 0.9, roughness: 0.2 });
    const exhaustL = new THREE.Mesh(exhaustGeo, exhaustMat);
    exhaustL.rotation.x = Math.PI / 2;
    exhaustL.position.set(-0.6, 0.35, 2.3);
    carRoot.add(exhaustL);

    const exhaustR = exhaustL.clone();
    exhaustR.position.x = 0.6;
    carRoot.add(exhaustR);

    // Rear Wing / Spoiler
    const wingGroup = new THREE.Group();
    wingGroup.name = "rear_wing";
    const wingBladeGeo = new THREE.BoxGeometry(2.2, 0.06, 0.45);
    const wingBlade = new THREE.Mesh(wingBladeGeo, trimMat);
    wingBlade.position.y = 1.35;
    wingBlade.position.z = 2.05;
    wingGroup.add(wingBlade);

    const standGeo = new THREE.BoxGeometry(0.05, 0.5, 0.2);
    const standL = new THREE.Mesh(standGeo, trimMat);
    standL.position.set(-0.6, 1.1, 2.05);
    wingGroup.add(standL);
    const standR = standL.clone();
    standR.position.x = 0.6;
    wingGroup.add(standR);
    carRoot.add(wingGroup);

    // Wheels (4 Roda dengan Stance Camber & Offset)
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.9, roughness: 0.3 });
    const wheelPositions = [
        { x: -1.05 * stanceData.trackWidth, z: -1.3 },
        { x: 1.05 * stanceData.trackWidth, z: -1.3 },
        { x: -1.05 * stanceData.trackWidth, z: 1.3 },
        { x: 1.05 * stanceData.trackWidth, z: 1.3 }
    ];

    carRoot.wheels = [];
    wheelPositions.forEach((pos, idx) => {
        const wGroup = new THREE.Group();
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.35, 18), wheelMat);
        tire.rotation.z = Math.PI / 2;
        wGroup.add(tire);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.36, 6), rimMat);
        rim.rotation.z = Math.PI / 2;
        wGroup.add(rim);

        wGroup.position.set(pos.x, 0.42, pos.z);
        // Stance Camber Angle
        const camberRad = THREE.MathUtils.degToRad(stanceData.camber);
        wGroup.rotation.z = (pos.x < 0) ? -camberRad : camberRad;

        carRoot.add(wGroup);
        carRoot.wheels.push(wGroup);
    });

    // Underglow Neon Tube (Kolong Mobil)
    const neonGeo = new THREE.PlaneGeometry(1.6, 3.2);
    const neonMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(underglowColor),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
    });
    const neon = new THREE.Mesh(neonGeo, neonMat);
    neon.rotation.x = Math.PI / 2;
    neon.position.y = 0.08;
    carRoot.add(neon);
    carRoot.neonMat = neonMat;

    carRoot.bodyMat = bodyMat;
    return carRoot;
}

// ============================================================
// CAR LOADER — Reads new carsData.js baseModel + bodyKits
// ============================================================

/**
 * Resolve model file path from folder by scanning for fbx/gltf/glb
 * Returns { path, type } or null if nothing found
 */
function resolveModelInFolder(folderPath, preferredFile) {
    // If a specific file is given, use it directly
    if (preferredFile) {
        const fullPath = folderPath + "/" + preferredFile;
        return { path: fullPath };
    }
    // Otherwise return folder path so gameEngine tries to scan
    return { path: folderPath, scan: true };
}

/**
 * Load a 3D model from path (FBX or GLTF/GLB) and call callback(object3D)
 */
function loadModel3D(modelPath, carColor, scaleVal, onSuccess, onFail) {
    const lower = modelPath.toLowerCase();
    const isGLB  = lower.endsWith(".glb");
    const isGLTF = lower.endsWith(".gltf");
    const isFBX  = lower.endsWith(".fbx");

    function applyToonMaterial(obj, color) {
        obj.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Keep texture if exists, else use toon color
                if (child.material && child.material.map) {
                    child.material = new THREE.MeshToonMaterial({
                        map: child.material.map,
                        color: 0xffffff,
                    });
                } else {
                    child.material = new THREE.MeshToonMaterial({
                        color: new THREE.Color(color),
                        roughness: 0.35,
                        metalness: 0.15,
                    });
                }
            }
        });
    }

    if (isGLB || isGLTF) {
        if (typeof THREE.GLTFLoader === 'undefined') { onFail("no GLTFLoader"); return; }
        const loader = new THREE.GLTFLoader();
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            const sc = scaleVal || 1.0;
            model.scale.set(sc, sc, sc);
            model.position.set(0, 0, 0);
            applyToonMaterial(model, carColor);
            model.wheels = [];
            onSuccess(model);
        }, undefined, onFail);

    } else if (isFBX) {
        if (typeof THREE.FBXLoader === 'undefined') { onFail("no FBXLoader"); return; }
        const loader = new THREE.FBXLoader();
        loader.load(modelPath, (fbx) => {
            const sc = scaleVal || 0.015;
            fbx.scale.set(sc, sc, sc);
            fbx.position.set(0, 0, 0);
            applyToonMaterial(fbx, carColor);
            fbx.wheels = [];
            onSuccess(fbx);
        }, undefined, onFail);

    } else {
        onFail("unknown format: " + modelPath);
    }
}

/**
 * Scan a folder for the first FBX or GLTF/GLB file via HEAD requests
 * Tries common patterns and known filenames
 */
async function scanFolderForModel(folderPath) {
    // Common filenames to try in order
    const candidates = [
        "scene.gltf", "scene.glb", "model.gltf", "model.glb",
        "FINAL_MODEL.fbx", "model.fbx", "car.fbx", "car.gltf",
    ];
    for (const name of candidates) {
        const url = folderPath + "/" + name;
        try {
            const res = await fetch(url, { method: "HEAD" });
            if (res.ok) return url;
        } catch(e) { /* ignore */ }
    }
    return null;
}

/**
 * Main spawn function — uses new carsData.js baseModel structure
 */
function spawnPlayerCar(carData, kitId) {
    // Spawn procedural car instantly so the scene is NEVER empty/black!
    _fallbackProcedural(carData);

    const kit = kitId
        ? (carData.bodyKits || []).find(k => k.id === kitId)
        : null;

    // Determine which model folder/file to load
    const bm = carData.baseModel || {};
    let modelPath = null;
    let modelScale = bm.scale || 0.015;

    if (kit && kit.modelFolder) {
        // Kit has its own 3D model — try scanning that folder
        const kitFolder = "models/" + kit.modelFolder;
        // Try to find model in kit folder async
        (async () => {
            const found = await scanFolderForModel(kitFolder);
            if (found) {
                _loadAndSpawn(found, carData.color, modelScale, carData, kit);
            } else {
                // fallback to base model
                _spawnFromBaseModel(carData);
            }
        })();
        return;
    }

    _spawnFromBaseModel(carData, kit);
}

function _spawnFromBaseModel(carData, kit) {
    const bm = carData.baseModel || {};
    const scale = bm.scale || 0.015;
    let modelPath = null;

    if (bm.fbxFile) {
        modelPath = (bm.modelPath || "") + "/" + bm.fbxFile;
    } else if (bm.gltfFile) {
        modelPath = (bm.modelPath || "") + "/" + bm.gltfFile;
    } else if (bm.modelPath) {
        // Scan folder
        (async () => {
            const found = await scanFolderForModel(bm.modelPath);
            if (found) {
                _loadAndSpawn(found, carData.color, scale, carData, kit);
            }
        })();
        return;
    }

    if (modelPath) {
        _loadAndSpawn(modelPath, carData.color, scale, carData, kit);
    }
}

function _loadAndSpawn(modelPath, color, scale, carData, kit) {
    loadModel3D(modelPath, color, scale,
        (obj) => {
            if (playerCar) scene.remove(playerCar);
            playerCar = obj;
            scene.add(playerCar);
            if (typeof updateCarTexture === 'function') updateCarTexture();
            const kitName = kit ? kit.name : "Stock";
            showRadioMessage("GARAGE", `${carData.parodyName} — ${kitName}`, "🚗");
            updateSpeedLimit(carData, kit);
        },
        (err) => {
            console.warn("Model load failed or skipped, procedural already active:", err);
        }
    );
}

function _fallbackProcedural(carData) {
    if (playerCar) scene.remove(playerCar);
    playerCar = createProceduralCarMesh(carData);
    playerCar.position.set(0, 0, 0);
    scene.add(playerCar);
    if (typeof updateCarTexture === 'function') updateCarTexture();
}

/**
 * Apply a body kit to the current car — swaps 3D model
 */
function applyBodyKit(carId, kitId) {
    const car = getCarById(carId);
    if (!car) return;
    const kit = car.bodyKits.find(k => k.id === kitId);
    if (!kit) return;

    activeKit = kitId;
    currentCarData = car;

    showRadioMessage("GARAGE", `Applying ${kit.brand} — ${kit.name}...`, "🔧");

    spawnPlayerCar(car, kitId);

    // Apply stat bonuses
    const bonus = kit.statBonus || {};
    const base = car.specs;
    maxSpeed = (base.topSpeed || 280) + (bonus.topSpeed || 0);

    // Save to localStorage
    saveGameData();

    // Update garage UI
    updateGarageUI(car, kit);
}

/**
 * Update HUD speed limit based on car+kit stats
 */
function updateSpeedLimit(carData, kit) {
    const bonus = (kit && kit.statBonus) || {};
    maxSpeed = (carData.specs.topSpeed || 280) + (bonus.topSpeed || 0);
}

/**
 * Update garage overlay with current kit info
 */
function updateGarageUI(car, kit) {
    const el = document.getElementById('active-kit-name');
    if (el) el.textContent = `${kit.brand}: ${kit.name}`;

    const partsEl = document.getElementById('active-kit-parts');
    if (partsEl && kit.parts) {
        partsEl.textContent = Object.keys(kit.parts).join(', ');
    }
}

// --- CIVILIAN TRAFFIC SPAWN ---
function spawnTrafficAI() {
    trafficCars.forEach(c => scene.remove(c.mesh));
    trafficCars = [];

    const trafficModels = CAR_DATABASE.filter(c => c.category === "traffic");

    for (let i = 0; i < 14; i++) {
        const randomModel = trafficModels[Math.floor(Math.random() * trafficModels.length)];
        const trafficMesh = createProceduralCarMesh(randomModel);
        trafficMesh.scale.set(0.9, 0.9, 0.9);

        // Taruh di lajur kiri atau kanan
        const laneX = (Math.random() > 0.5 ? 4.5 : -4.5);
        const zPos = -120 - (i * 90) + (Math.random() * 30);
        trafficMesh.position.set(laneX, 0, zPos);

        scene.add(trafficMesh);
        trafficCars.push({
            mesh: trafficMesh,
            speed: 70 + Math.random() * 30, // Kecepatan normal civilian
            laneX: laneX
        });
    }
}

// --- WINGMAN & RIVAL AI (NFS CARBON CANYON DUEL) ---
function spawnRivalAndWingman() {
    // Rival: Akuma-Z S30
    const rivalData = CAR_DATABASE.find(c => c.id === "devil_z");
    const rivalMesh = createProceduralCarMesh(rivalData);
    rivalMesh.position.set(4, 0, -40);
    scene.add(rivalMesh);
    rivalCars.push({ mesh: rivalMesh, speed: 220, role: "rival" });

    // Wingman Drafter: Civique Sport-R (Yuki)
    const wingmanData = CAR_DATABASE.find(c => c.id === "civic_ek9");
    const wingmanMesh = createProceduralCarMesh(wingmanData);
    wingmanMesh.position.set(-4, 0, -25);
    scene.add(wingmanMesh);
    rivalCars.push({ mesh: wingmanMesh, speed: 230, role: "wingman" });
}

// --- INPUT LISTENERS & TOUCH CONTROLS ---
function setupInputListeners() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keys.up = true;
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.down = true;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
        if (e.key === ' ' || e.key === 'Shift') keys.handbrake = true;
        if (e.key === 'n' || e.key === 'N') keys.nos = true;
        if (e.key === 'c' || e.key === 'C') triggerWingmanCall();
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keys.up = false;
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.down = false;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
        if (e.key === ' ' || e.key === 'Shift') keys.handbrake = false;
        if (e.key === 'n' || e.key === 'N') keys.nos = false;
    });

    // Touch Buttons
    bindTouch('btn-left', () => keys.left = true, () => keys.left = false);
    bindTouch('btn-right', () => keys.right = true, () => keys.right = false);
    bindTouch('btn-gas', () => keys.up = true, () => keys.up = false);
    bindTouch('btn-brake', () => keys.down = true, () => keys.down = false);
    bindTouch('btn-handbrake', () => keys.handbrake = true, () => keys.handbrake = false);
    bindTouch('btn-nos', () => keys.nos = true, () => keys.nos = false);
    bindTouch('btn-crew', () => triggerWingmanCall(), () => {});
}

function bindTouch(id, onStart, onEnd) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(); el.classList.add('pressed'); });
    el.addEventListener('touchend', (e) => { e.preventDefault(); onEnd(); el.classList.remove('pressed'); });
    el.addEventListener('mousedown', () => { onStart(); el.classList.add('pressed'); });
    el.addEventListener('mouseup', () => { onEnd(); el.classList.remove('pressed'); });
}

// --- WINGMAN CALLOUT (NFS CARBON DRAFT/BLOCK) ---
function triggerWingmanCall() {
    if (wingmanCooldown > 0) return;
    wingmanActive = true;
    wingmanCooldown = 15; // 15 detik cooldown

    showRadioMessage("YUKI [DRAFTER]", "Aku maju ke depan! Ikuti garis jalanku untuk dorongan super angin!", "🏎️");

    // Efek boost speed saat masuk slipstream wingman
    speed = Math.min(speed + 50, maxSpeed + 40);
}

function showRadioMessage(sender, text, avatar) {
    const box = document.getElementById('radio-callout');
    document.getElementById('radio-name').innerText = sender;
    document.getElementById('radio-text').innerText = text;
    document.getElementById('radio-avatar').innerText = avatar;
    box.classList.add('active');

    setTimeout(() => {
        box.classList.remove('active');
    }, 4500);
}

// --- MAIN LOOP ANIMATION & PHYSICS ---
let lastTime = performance.now();

function animate() {
    requestAnimationFrame(animate);

    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (isSafehouseMode) {
        updateSafehouseTurntable(delta);
    } else {
        updateCarPhysics(delta);
        updateTrafficAndAI(delta);
        updateCamera();
        updateHUD();

        if (effectsManager) {
            effectsManager.updateSmoke(delta);
        }
    }

    renderer.render(scene, camera);
}

function updateCarPhysics(delta) {
    if (!playerCar) return;

    // Acceleration & Braking
    if (keys.up) {
        speed += (currentCarData.specs.accel * 45) * delta;
    } else if (keys.down) {
        speed -= 180 * delta; // Rem
    } else {
        speed -= 35 * delta; // Natural drag
    }

    // Nitro Burst (Unbound Style)
    if (keys.nos && nosAmount > 0 && speed > 30) {
        isNosActive = true;
        speed += 120 * delta;
        nosAmount = Math.max(0, nosAmount - 35 * delta);
        document.getElementById('speed-lines').style.opacity = '1';
    } else {
        isNosActive = false;
        nosAmount = Math.min(100, nosAmount + 12 * delta); // Regenerasi Nitro
        document.getElementById('speed-lines').style.opacity = '0';
    }

    // Handbrake Drifting (NFS Carbon Style Multiplier)
    if (keys.handbrake && speed > 50) {
        isDrifting = true;
        speed -= 25 * delta;
        driftScore += Math.floor(speed * driftMultiplier * delta * 5);
        driftMultiplier = Math.min(4.0, driftMultiplier + 0.3 * delta);

        // Spawn Asap Ban Kartun Cel-shaded
        if (effectsManager) {
            const wheelL = playerCar.position.clone().add(new THREE.Vector3(-0.9, 0, 1.2));
            const wheelR = playerCar.position.clone().add(new THREE.Vector3(0.9, 0, 1.2));
            effectsManager.spawnTireSmoke(wheelL, smokeColor, steerAngle);
            effectsManager.spawnTireSmoke(wheelR, smokeColor, steerAngle);
        }
    } else {
        if (isDrifting && driftScore > 0) {
            // Selesai drift kombo
            showRadioMessage("CREW CHAT", `DRIFT BANKED! +${driftScore} PTS (x${driftMultiplier.toFixed(1)})`, "✨");
        }
        isDrifting = false;
        driftMultiplier = 1.0;
    }

    speed = Math.max(0, Math.min(speed, isNosActive ? maxSpeed + 35 : maxSpeed));

    // Steering
    const turnSpeed = (keys.handbrake ? 3.2 : 2.0);
    if (keys.left) {
        steerAngle = Math.max(-0.45, steerAngle - turnSpeed * delta);
        playerCar.position.x -= (speed / 12) * delta;
    } else if (keys.right) {
        steerAngle = Math.min(0.45, steerAngle + turnSpeed * delta);
        playerCar.position.x += (speed / 12) * delta;
    } else {
        steerAngle *= 0.85; // Auto center
    }

    // Gerak maju di canyon (Z-axis)
    playerCar.position.z -= (speed * 0.28) * delta;
    playerCar.rotation.y = -steerAngle * 0.75;
    playerCar.rotation.z = steerAngle * 0.15; // Body roll saat belok tajam

    // Rotasi Roda Depan
    if (playerCar.wheels) {
        playerCar.wheels[0].rotation.y = steerAngle;
        playerCar.wheels[1].rotation.y = steerAngle;
        const wheelSpin = (speed * 0.1);
        playerCar.wheels.forEach(w => w.children[0].rotation.x += wheelSpin);
    }

    // Canyon Boundary Guardrail Collision (Jatuh / Tabrak Pagar)
    if (Math.abs(playerCar.position.x) > (ROAD_WIDTH / 2 - 1.2)) {
        playerCar.position.x = Math.sign(playerCar.position.x) * (ROAD_WIDTH / 2 - 1.2);
        speed *= 0.7; // Pinalti tabrak tebing
        if (effectsManager) {
            effectsManager.spawnTireSmoke(playerCar.position, "#ffffff", 0);
        }
    }

    // Trigger Anime Unbound Wings Effects
    if (effectsManager) {
        effectsManager.updateNitroWings(playerCar.position, playerCar.rotation, isNosActive, speed / maxSpeed);
    }

    // Cooldown Wingman
    if (wingmanCooldown > 0) {
        wingmanCooldown -= delta;
        document.getElementById('wingman-mode').innerText = `READY IN ${Math.ceil(wingmanCooldown)}S`;
    } else {
        document.getElementById('wingman-mode').innerText = "DRAFT BOOST READY";
    }
}

function updateTrafficAndAI(delta) {
    // Traffic Cars
    trafficCars.forEach(t => {
        t.mesh.position.z -= (t.speed * 0.28) * delta;
        // Jika dilewati player jauh di belakang, teleport ke depan
        if (t.mesh.position.z > playerCar.position.z + 50) {
            t.mesh.position.z = playerCar.position.z - 280 - (Math.random() * 80);
            t.mesh.position.x = (Math.random() > 0.5 ? 4.5 : -4.5);
        }

        // Cek tabrakan player dengan traffic
        const dist = playerCar.position.distanceTo(t.mesh.position);
        if (dist < 2.8) {
            speed *= 0.4; // Crash impact
            showRadioMessage("WARNING", "TRAFFIC IMPACT! Hati-hati di jalan raya!", "⚠️");
            t.mesh.position.x += (playerCar.position.x > t.mesh.position.x ? -2 : 2);
        }
    });

    // Rival & Wingman AI
    rivalCars.forEach(r => {
        r.mesh.position.z -= (r.speed * 0.28) * delta;
        // AI mengikuti jalur
        if (r.role === "wingman" && wingmanActive) {
            // Maju di depan player untuk memberi slipstream
            r.speed = speed + 25;
            r.mesh.position.x = playerCar.position.x;
        }
    });
}

function updateCamera() {
    if (!playerCar) return;

    // NFS Dynamic Chase Camera
    const camOffset = new THREE.Vector3(0, 3.2, 7.5);
    if (isNosActive) camOffset.z += 1.5; // FOV pull back saat NOS
    camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerCar.rotation.y * 0.6);

    camera.position.copy(playerCar.position).add(camOffset);
    camera.lookAt(playerCar.position.x, playerCar.position.y + 1.2, playerCar.position.z - 10);
}

function updateHUD() {
    document.getElementById('speed-val').innerText = Math.floor(speed);
    document.getElementById('nos-fill').style.width = `${nosAmount}%`;

    const driftHud = document.getElementById('drift-hud');
    if (isDrifting) {
        driftHud.classList.add('active');
        document.getElementById('drift-score').innerText = `${driftScore} PTS (x${driftMultiplier.toFixed(1)})`;
    } else {
        driftHud.classList.remove('active');
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// --- PERSISTENT SAVE SYSTEM (LOCAL STORAGE & OFFLINE APK SAFE) ---
const SAVE_KEY = "TOUGE_OUTLAW_SAVE_DATA";

function saveGameData() {
    try {
        const payload = {
            currentCarId: currentCarData ? currentCarData.id : "skyline_r34",
            carColor: currentCarData ? currentCarData.color : "#1a4499",
            activeKit: activeKit,
            activeVinylId: typeof vinylEngine !== 'undefined' ? vinylEngine.activeVinylId : "none",
            activeDecalId: typeof vinylEngine !== 'undefined' ? vinylEngine.activeDecalId : null,
            installedUpgrades: currentCarData ? currentCarData.installedUpgrades : {},
            bumperDeleted: bumperDeleted,
            stanceData: stanceData,
            underglowColor: underglowColor,
            smokeColor: smokeColor,
            activeTag: effectsManager ? effectsManager.activeTag : "cyber_wings",
            character: playerCharacter,
            saveTimestamp: Date.now()
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch(e) {
        console.warn("Storage save error:", e);
    }
}

function loadGameData() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);

        // Restore Car Model Selection
        if (data.currentCarId) {
            const found = CAR_DATABASE.find(c => c.id === data.currentCarId);
            if (found) {
                currentCarData = found;
                if (data.carColor) currentCarData.color = data.carColor;
                if (data.installedUpgrades) currentCarData.installedUpgrades = data.installedUpgrades;
            }
        }

        // Restore Unbound Modifications
        if (data.activeKit) activeKit = data.activeKit;
        if (typeof vinylEngine !== 'undefined') {
            if (data.activeVinylId) vinylEngine.activeVinylId = data.activeVinylId;
            if (data.activeDecalId !== undefined) vinylEngine.activeDecalId = data.activeDecalId;
        }
        if (typeof data.bumperDeleted === 'boolean') bumperDeleted = data.bumperDeleted;
        if (data.stanceData) stanceData = data.stanceData;
        if (data.underglowColor) underglowColor = data.underglowColor;
        if (data.smokeColor) smokeColor = data.smokeColor;
        if (data.character) playerCharacter = data.character;

        if (effectsManager && data.activeTag) {
            effectsManager.setTag(data.activeTag, smokeColor);
        }
    } catch(e) {
        console.warn("Storage load error:", e);
    }
}

// --- GARAGE CUSTOMIZATION LOGIC (NFS UNBOUND STYLE) ---
function toggleGarage(open) {
    const modal = document.getElementById('garage-modal');
    modal.style.display = open ? 'flex' : 'none';
    if (!open) {
        // Respawn mobil dengan setelan modifikasi baru & simpan ke save file
        spawnPlayerCar(currentCarData);
        saveGameData();
        showRadioMessage("SAVE COMPLETED", "Data modifikasi mobil & stance tersimpan aman!", "💾");
    }
}

function switchGarageTab(tab) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderGarageCategories(tab);
}

function renderGarageCategories(tab) {
    const container = document.getElementById('garage-panel-body');
    container.innerHTML = "";

    if (tab === 'cars') {
        const header = document.createElement('div');
        header.style.cssText = "margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;";
        header.innerHTML = `
            <div style="font-family: 'Orbitron'; font-size: 13px; color: #00ffff; font-weight: 700;">
                SHOWROOM & KATALOG MOBIL SHUTO (${CAR_DATABASE.length} MOBIL TERSEDIA)
            </div>
            <div style="font-size: 11px; color: #aaa;">PILIH MOBIL UNTUK DIKEMUDIKAN & DIMODIFIKASI</div>
        `;
        container.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'part-grid';

        CAR_DATABASE.forEach(car => {
            const isSelected = (car.id === currentCarData.id);
            const card = document.createElement('div');
            card.className = `part-card ${isSelected ? 'selected' : ''}`;
            
            const kitCount = car.bodyKits ? car.bodyKits.length : 0;
            const priceStr = car.price === 0 ? "GRATIS / STARTER" : "¥" + car.price.toLocaleString();

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div class="part-brand">${car.brand}</div>
                    <div style="font-size: 10px; color: #ff007f; font-family: 'Orbitron'; font-weight: 700;">T${car.tier} ${car.tierName}</div>
                </div>
                <div class="part-name" style="font-size: 14px; margin: 4px 0;">${car.parodyName}</div>
                <div style="font-size: 11px; color: #ffdd00; font-weight: 700; margin-bottom: 4px;">"${car.nickname}"</div>
                <div class="part-desc" style="font-size: 11px; line-height: 1.4;">
                    Top Speed: <b style="color: #00ffaa;">${car.specs.topSpeed} km/h</b> | Accel: <b style="color: #00ffff;">${car.specs.accel}s</b><br>
                    Handling: <b style="color: #ffaa00;">${car.specs.handling}</b> | Drift: <b style="color: #ff007f;">${car.specs.drift}</b>
                </div>
                <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #00ffaa; font-family: 'Orbitron'; font-size: 10px; font-weight: 700;">📦 ${kitCount} BODY KIT</span>
                    <span style="color: #fff; font-size: 10px; opacity: 0.8;">${priceStr}</span>
                </div>
                <div style="color: #889; font-size: 9px; margin-top: 3px; font-style: italic;">Base: ${car.realBase || car.realModel || 'JDM'}</div>
            `;

            card.onclick = () => {
                currentCarData = car;
                activeKit = "stock";
                if (typeof applyBodyKit === 'function') {
                    applyBodyKit(car.id, "stock");
                } else {
                    spawnPlayerCar(currentCarData);
                }
                playSynthTone(350, 0.2, 'sawtooth', 0.2);
                renderGarageCategories('cars');
                showRadioMessage("CAR SWITCHED", `${car.parodyName} kini aktif di Shuto!`, "🚗");
            };
            grid.appendChild(card);
        });
        container.appendChild(grid);

    } else if (tab === 'bodykit') {
        const header = document.createElement('div');
        header.style.cssText = "margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;";
        header.innerHTML = `
            <div>
                <div style="font-family: 'Orbitron'; font-size: 13px; color: #ff007f; font-weight: 700;">
                    BODY KIT & AERO // ${currentCarData.parodyName}
                </div>
                <div style="font-size: 11px; color: #aaa; margin-top: 2px;">
                    Ubah bodi mobilmu dengan part asli Rocket Bunny, Pandem, Varis, LB-Works, & C-West!
                </div>
            </div>
            <div id="active-kit-name" style="font-family: 'Orbitron'; font-size: 12px; color: #00ffaa; font-weight: 700; background: rgba(0,0,0,0.6); padding: 5px 12px; border: 1px solid #00ffaa; border-radius: 4px;">
                KIT AKTIF: ${activeKit.toUpperCase()}
            </div>
        `;
        container.appendChild(header);

        const kits = currentCarData.bodyKits || [];
        if (kits.length === 0) {
            container.innerHTML += `<div style="padding: 20px; color: #aaa; font-style: italic;">Belum ada body kit kustom untuk mobil ini. Model bodi standar aktif.</div>`;
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'part-grid';

        kits.forEach(kit => {
            const isSelected = (kit.id === activeKit);
            const card = document.createElement('div');
            card.className = `part-card ${isSelected ? 'selected' : ''}`;

            let bonusText = "";
            if (kit.statBonus) {
                const parts = [];
                if (kit.statBonus.handling) parts.push(`+${kit.statBonus.handling} Handling`);
                if (kit.statBonus.topSpeed) parts.push(`+${kit.statBonus.topSpeed} km/h`);
                if (kit.statBonus.drift) parts.push(`+${kit.statBonus.drift} Drift`);
                if (kit.statBonus.accel) parts.push(`+${kit.statBonus.accel}s Accel`);
                bonusText = parts.join(" | ");
            }

            const priceStr = kit.price === 0 ? "TERMASUK / OEM" : "¥" + kit.price.toLocaleString();

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="part-brand" style="color: #ff007f;">${kit.brand}</div>
                    <div style="font-size: 10px; color: #00ffff; font-family: 'Orbitron'; font-weight: 700;">${kit.type}</div>
                </div>
                <div class="part-name" style="font-size: 14px; margin: 4px 0;">${kit.name}</div>
                <div class="part-desc" style="font-size: 11px; color: #ccc;">${kit.description}</div>
                ${bonusText ? `<div style="font-size: 10px; color: #00ffaa; font-weight: 700; margin-top: 5px; background: rgba(0,255,170,0.1); padding: 3px 6px; border-radius: 3px;">⚡ ${bonusText}</div>` : ''}
                <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 11px; font-weight: 700; color: #ffdd00;">${priceStr}</span>
                    <button class="btn-action" style="font-size: 11px; padding: 4px 10px; margin: 0;">${isSelected ? 'TERPASANG ✔' : 'PASANG KIT'}</button>
                </div>
            `;

            card.onclick = () => {
                applyBodyKit(currentCarData.id, kit.id);
                playSynthTone(480, 0.25, 'sawtooth', 0.25);
                renderGarageCategories('bodykit');
            };
            grid.appendChild(card);
        });
        container.appendChild(grid);

    } else if (tab === 'tuning') {
        const header = document.createElement('div');
        header.style.cssText = "margin-bottom: 15px;";
        header.innerHTML = `
            <div style="font-family: 'Orbitron'; font-size: 13px; color: #ffaa00; font-weight: 700;">
                PERFORMANCE ENGINE & CHASSIS TUNING // ${currentCarData.parodyName}
            </div>
            <div style="font-size: 11px; color: #aaa; margin-top: 2px;">
                Upgrade part performa mesin ala NFS Carbon / Most Wanted untuk menaikkan HP dan Top Speed!
            </div>
        `;
        container.appendChild(header);

        if (!currentCarData.installedUpgrades) {
            currentCarData.installedUpgrades = {
                engine: 0, suspension: 0, tires: 0, turbo: 0, brakes: 0, exhaust: 0, nos: 0, weight: 0
            };
        }

        const tuningList = currentCarData.tuningParts || {
            engine: ["Stock OEM", "Street ECU Remap", "Pro Camshaft & Valves", "Full Race Blueprint 700HP"],
            turbo: ["Stock Turbo", "Single Ball-Bearing Turbo", "Twin-Scroll Race Turbo", "Twin Big Garrett 900HP"],
            suspension: ["Stock Dampers", "Street Sport Springs", "Fully Adjustable Coilovers", "Touge Racing Custom Monotube"],
            tires: ["All-Weather Tires", "Street Semi-Slick", "R-Compound Track Slicks", "Hardcore Drift compound"],
            brakes: ["Stock 2-Pot Calipers", "Drilled Sport Rotors", "6-Pot Brembo-X Calipers", "Carbon Ceramic Monobloc"],
            exhaust: ["Stock Dual Exhaust", "High-Flow Cat-Back", "Titanium Straight Pipe", "Screamer Pipe Flame Emitter"],
            nos: ["None", "Dry Shot 50HP", "Wet Shot 100HP", "Direct Port Nitrous 200HP"],
            weight: ["Factory Weight", "Rear Seat Delete", "Carbon Fiber Hood & Trunk", "Full Carbon Monocoque Strip"]
        };

        const grid = document.createElement('div');
        grid.style.cssText = "display: flex; flex-direction: column; gap: 12px;";

        const icons = {
            engine: "⚙️", turbo: "🌪️", suspension: "🔩", tires: "🛞",
            brakes: "🛑", exhaust: "💨", nos: "🧪", weight: "⚖️"
        };

        Object.keys(tuningList).forEach(partKey => {
            const stages = tuningList[partKey];
            const currentLevel = currentCarData.installedUpgrades[partKey] || 0;

            const row = document.createElement('div');
            row.style.cssText = "background: rgba(14, 18, 30, 0.85); border: 1px solid rgba(255,255,255,0.1); border-left: 3px solid #ffaa00; padding: 12px 16px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; gap: 15px;";

            const partName = partKey.toUpperCase();
            const icon = icons[partKey] || "🔧";
            const currentStageName = stages[currentLevel] || stages[0];

            row.innerHTML = `
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 20px;">${icon}</span>
                        <span style="font-family: 'Orbitron'; font-size: 13px; font-weight: 700; color: #fff;">${partName}</span>
                        <span style="font-size: 11px; color: #ffaa00; font-family: 'Orbitron';">STAGE ${currentLevel}/${stages.length - 1}</span>
                    </div>
                    <div style="font-size: 12px; color: #00ffaa; margin-top: 3px; font-weight: 700;">
                        Level Aktif: ${currentStageName}
                    </div>
                </div>

                <div style="display: flex; gap: 6px;">
                    ${stages.map((stageName, lvl) => {
                        const isInstalled = (lvl === currentLevel);
                        const isUnlocked = (lvl <= currentLevel);
                        const btnColor = isInstalled ? 'background: #ffaa00; color: #000; font-weight: 700;' : (isUnlocked ? 'background: #2a3348; color: #aaa;' : 'background: #111624; color: #555;');
                        return `<button class="btn-action" style="font-size: 11px; padding: 5px 10px; margin: 0; ${btnColor}" onclick="tunePart('${partKey}', ${lvl})">S${lvl}</button>`;
                    }).join('')}
                </div>
            `;
            grid.appendChild(row);
        });

        container.appendChild(grid);
    } else if (tab === 'vinyl') {
        const header = document.createElement('div');
        header.style.cssText = "margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;";
        const activeVName = (typeof vinylEngine !== 'undefined' && vinylEngine.activeVinylId) ? vinylEngine.activeVinylId.toUpperCase() : "NONE";
        header.innerHTML = `
            <div>
                <div style="font-family: 'Orbitron'; font-size: 13px; color: #ff007f; font-weight: 700;">
                    VINYL & DECAL LIVERY // ${currentCarData.parodyName}
                </div>
                <div style="font-size: 11px; color: #aaa; margin-top: 2px;">
                    Pasang livery Itasha Anime, Tribal Bushido NFS Carbon, atau Garis Legendaris MW2005!
                </div>
            </div>
            <div style="font-family: 'Orbitron'; font-size: 12px; color: #00ffff; font-weight: 700; background: rgba(0,0,0,0.6); padding: 5px 12px; border: 1px solid #00ffff; border-radius: 4px;">
                LIVERY: ${activeVName}
            </div>
        `;
        container.appendChild(header);

        // Decal Stamp / Number Selector Row
        const decalBox = document.createElement('div');
        decalBox.style.cssText = "background: rgba(14, 18, 30, 0.9); border: 1px solid rgba(255, 0, 127, 0.3); border-radius: 6px; padding: 10px 14px; margin-bottom: 15px;";
        const activeDecal = typeof vinylEngine !== 'undefined' ? vinylEngine.activeDecalId : null;
        decalBox.innerHTML = `
            <div style="font-family: 'Orbitron'; font-size: 11px; color: #ff007f; font-weight: 700; margin-bottom: 6px;">
                🏁 STIKER NOMOR BALAP & STEMPEL SHUTO (DECAL OVERLAY)
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn-action" style="font-size: 11px; padding: 4px 10px; margin: 0; ${!activeDecal ? 'background: #ff007f;' : 'background: #222;'}" onclick="applyDecalToCar(null)">TANPA NOMOR</button>
                ${DECAL_OVERLAYS.map(d => {
                    const isSel = (activeDecal === d.id);
                    return `<button class="btn-action" style="font-size: 11px; padding: 4px 10px; margin: 0; ${isSel ? 'background: #00ffaa; color: #000; font-weight: 700;' : 'background: #2a3348;'}" onclick="applyDecalToCar('${d.id}')">${d.name}</button>`;
                }).join('')}
            </div>
        `;
        container.appendChild(decalBox);

        // Grid of Vinyls
        const grid = document.createElement('div');
        grid.className = 'part-grid';

        const currentVId = typeof vinylEngine !== 'undefined' ? vinylEngine.activeVinylId : "none";

        VINYL_DATABASE.forEach(v => {
            const isSelected = (v.id === currentVId);
            const card = document.createElement('div');
            card.className = `part-card ${isSelected ? 'selected' : ''}`;

            const priceStr = v.price === 0 ? "GRATIS / OEM" : "¥" + v.price.toLocaleString();

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 26px;">${v.icon}</span>
                    <span style="font-size: 10px; color: #00ffff; font-family: 'Orbitron'; font-weight: 700; background: rgba(0,255,255,0.1); padding: 2px 6px; border-radius: 3px;">${v.tag || v.category.toUpperCase()}</span>
                </div>
                <div class="part-name" style="font-size: 13px; margin: 6px 0 2px 0;">${v.name}</div>
                <div class="part-desc" style="font-size: 11px; color: #bbb; line-height: 1.3;">${v.description}</div>
                <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 11px; font-weight: 700; color: #ffdd00;">${priceStr}</span>
                    <button class="btn-action" style="font-size: 11px; padding: 4px 10px; margin: 0;">${isSelected ? 'TERPASANG ✔' : 'PASANG LIVERY'}</button>
                </div>
            `;

            card.onclick = () => {
                applyVinylToCar(v.id);
                playSynthTone(550, 0.15, 'sawtooth', 0.2);
                setTimeout(() => playSynthTone(750, 0.2, 'sine', 0.2), 80);
                renderGarageCategories('vinyl');
            };
            grid.appendChild(card);
        });

        container.appendChild(grid);
    } else if (tab === 'bumper_delete') {
        container.innerHTML = `
            <div class="slider-row">
                <div class="slider-label">
                    <span>EXPOSED BASH BAR (BUMPER DELETE)</span>
                    <span id="bumper-state">${bumperDeleted ? 'AKTIF (DELETED)' : 'NONAKTIF'}</span>
                </div>
                <p style="font-size: 13px; color: #aaa;">Copot bemper belakang ala gaya street drift NFS Unbound untuk mengekspos knalpot titanium dan sasis balap.</p>
                <button class="btn-action" style="margin-top: 10px; font-size: 16px; width: 220px;" onclick="toggleBumperDelete()">
                    ${bumperDeleted ? 'PASANG KEMBALI' : 'LEPAS BEMPER'}
                </button>
            </div>
        `;
    } else if (tab === 'stance') {
        container.innerHTML = `
            <div class="slider-row">
                <div class="slider-label"><span>WHEEL CAMBER (KEMIRINGAN RODA)</span><span id="camber-val">${stanceData.camber}°</span></div>
                <input type="range" min="-12" max="0" step="0.5" value="${stanceData.camber}" oninput="updateCamber(this.value)">
            </div>
            <div class="slider-row">
                <div class="slider-label"><span>RIDE HEIGHT (SUSPENSI CEPER)</span><span id="height-val">${stanceData.height}m</span></div>
                <input type="range" min="0.05" max="0.25" step="0.01" value="${stanceData.height}" oninput="updateHeight(this.value)">
            </div>
            <div class="slider-row">
                <div class="slider-label"><span>TRACK WIDTH (OFFSET LEBAR PELEK)</span><span id="width-val">${stanceData.trackWidth}x</span></div>
                <input type="range" min="0.85" max="1.25" step="0.02" value="${stanceData.trackWidth}" oninput="updateTrackWidth(this.value)">
            </div>
        `;
    } else if (tab === 'paint') {
        container.innerHTML = `
            <div class="slider-row">
                <div class="slider-label">WARNA CAT BODI ANIME</div>
                <div style="display: flex; gap: 10px; margin-top: 8px;">
                    ${['#1a4499', '#ff0055', '#ffcc00', '#0a2255', '#ffffff', '#111111', '#00ffaa'].map(c => `
                        <div style="width: 38px; height: 38px; border-radius: 4px; background: ${c}; cursor: pointer; border: 2px solid #fff;" onclick="setCarColor('${c}')"></div>
                    `).join('')}
                </div>
            </div>
            <div class="slider-row" style="margin-top: 15px;">
                <div class="slider-label">UNDERGLOW NEON KOLONG</div>
                <div style="display: flex; gap: 10px; margin-top: 8px;">
                    ${['#00ffff', '#ff0077', '#00ff44', '#ffdd00', '#aa00ff', '#ff3300'].map(c => `
                        <div style="width: 38px; height: 38px; border-radius: 4px; background: ${c}; cursor: pointer; border: 2px solid #fff;" onclick="setUnderglowColor('${c}')"></div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (tab === 'unbound_tags') {
        const grid = document.createElement('div');
        grid.className = 'part-grid';

        UNBOUND_TAGS.forEach(tag => {
            const card = document.createElement('div');
            card.className = `part-card ${tag.id === effectsManager.activeTag ? 'selected' : ''}`;
            card.innerHTML = `
                <div style="font-size: 24px;">${tag.icon}</div>
                <div class="part-brand">${tag.type} TAG</div>
                <div class="part-name">${tag.name}</div>
                <div class="part-desc">${tag.desc}</div>
            `;
            card.onclick = () => {
                effectsManager.setTag(tag.id, tag.color);
                smokeColor = tag.color;
                renderGarageCategories('unbound_tags');
            };
            grid.appendChild(card);
        });
        container.appendChild(grid);
    }
}

function toggleBumperDelete() {
    bumperDeleted = !bumperDeleted;
    renderGarageCategories('bumper_delete');
    spawnPlayerCar(currentCarData);
}

function tunePart(partKey, level) {
    if (!currentCarData) return;
    if (!currentCarData.installedUpgrades) {
        currentCarData.installedUpgrades = {};
    }
    currentCarData.installedUpgrades[partKey] = level;

    // Recalculate stats based on all installed upgrades
    let totalSpeedBonus = 0;
    let totalHandlingBonus = 0;
    const up = currentCarData.installedUpgrades;

    if (up.engine) totalSpeedBonus += up.engine * 8;
    if (up.turbo) totalSpeedBonus += up.turbo * 12;
    if (up.exhaust) totalSpeedBonus += up.exhaust * 5;
    if (up.suspension) totalHandlingBonus += up.suspension * 3;
    if (up.tires) totalHandlingBonus += up.tires * 4;
    if (up.weight) {
        totalSpeedBonus += up.weight * 3;
        totalHandlingBonus += up.weight * 2;
    }

    maxSpeed = (currentCarData.specs.topSpeed || 280) + totalSpeedBonus;
    
    // Play mechanical tuning SFX
    playSynthTone(180, 0.15, 'sawtooth', 0.3);
    setTimeout(() => playSynthTone(520, 0.25, 'triangle', 0.25), 100);

    saveGameData();
    renderGarageCategories('tuning');
    showRadioMessage("TUNED UP", `${partKey.toUpperCase()} berhasil ditingkatkan ke Stage ${level}!`, "🔧");
}

// --- VINYL & DECAL CONTROLLER ---
function applyVinylToCar(vinylId) {
    if (typeof vinylEngine === 'undefined') return;
    vinylEngine.activeVinylId = vinylId;
    updateCarTexture();
    saveGameData();
    const vObj = VINYL_DATABASE.find(v => v.id === vinylId);
    const vName = vObj ? vObj.name : "Clean Paint";
    showRadioMessage("LIVERY APPLIED", `${vName} kini menempel di bodi mobil!`, "🎨");
}

function applyDecalToCar(decalId) {
    if (typeof vinylEngine === 'undefined') return;
    vinylEngine.activeDecalId = decalId;
    updateCarTexture();
    saveGameData();
    if (typeof renderGarageCategories === 'function') {
        renderGarageCategories('vinyl');
    }
    const dObj = DECAL_OVERLAYS.find(d => d.id === decalId);
    const dName = dObj ? dObj.name : "Dihapus";
    showRadioMessage("DECAL STAMP", `Stiker ${dName} diperbarui!`, "🏷️");
}

function updateCarTexture() {
    if (!playerCar || typeof vinylEngine === 'undefined') return;
    const baseColor = currentCarData ? currentCarData.color : "#1a4499";
    const texture = vinylEngine.generateTexture(baseColor, vinylEngine.activeVinylId, vinylEngine.activeDecalId);

    // Apply to 3D meshes (FBX, GLTF, or procedural)
    playerCar.traverse((child) => {
        if (child.isMesh && child.name !== "rear_bumper") {
            const isWheel = child.geometry && child.geometry.type && child.geometry.type.includes("Cylinder");
            if (!isWheel) {
                if (vinylEngine.activeVinylId === "none" && !vinylEngine.activeDecalId) {
                    child.material.map = null;
                    child.material.color.set(baseColor);
                } else {
                    child.material.map = texture;
                    child.material.color.set(0xffffff);
                }
                child.material.needsUpdate = true;
            }
        }
    });

    if (playerCar.bodyMat) {
        if (vinylEngine.activeVinylId === "none" && !vinylEngine.activeDecalId) {
            playerCar.bodyMat.map = null;
            playerCar.bodyMat.color.set(baseColor);
        } else {
            playerCar.bodyMat.map = texture;
            playerCar.bodyMat.color.set(0xffffff);
        }
        playerCar.bodyMat.needsUpdate = true;
    }
}

function updateCamber(v) {
    stanceData.camber = parseFloat(v);
    document.getElementById('camber-val').innerText = `${v}°`;
    spawnPlayerCar(currentCarData);
}
function updateHeight(v) {
    stanceData.height = parseFloat(v);
    document.getElementById('height-val').innerText = `${v}m`;
    spawnPlayerCar(currentCarData);
}
function updateTrackWidth(v) {
    stanceData.trackWidth = parseFloat(v);
    document.getElementById('width-val').innerText = `${v}x`;
    spawnPlayerCar(currentCarData);
}
function setCarColor(hex) {
    currentCarData.color = hex;
    updateCarTexture();
    saveGameData();
}
function setUnderglowColor(hex) {
    underglowColor = hex;
    if (playerCar && playerCar.neonMat) {
        playerCar.neonMat.color.set(hex);
    }
    saveGameData();
}

// --- ANIME CINEMATIC CUTSCENE LOGIC (NFS CARBON INTRO STYLE) ---
let currentDialogueStep = 0;
const CUTSCENE_SCRIPT = [
    {
        speaker: "YUKI KUSANAGI [DRAFTER]",
        charActive: "yuki",
        text: "Bos! Kenji dan geng Midnight Cinders menghadang kita di gerbang masuk Shuto Expressway C1! Mobil Akuma-Z miliknya bener-bener monster!"
    },
    {
        speaker: "KENJI 'THE DEMON' [RIVAL LEADER]",
        charActive: "kenji",
        text: "Hahaha! Night Phantom cuma berani main di jalan sempit? Ini jalan tol Wangan, anak baru! Di kecepatan 300 km/h, mobil kalian cuma jadi rongsokan!"
    },
    {
        speaker: "YUKI KUSANAGI [DRAFTER]",
        charActive: "yuki",
        text: "Jangan remehkan Night Phantom! Bos, injak pedal gasnya! Aku bakal buka slipstream koridor angin di depan biar lu bisa libas dia!"
    },
    {
        speaker: "KENJI 'THE DEMON' [RIVAL LEADER]",
        charActive: "kenji",
        text: "Buktikan kalau memang bisa menyalipku di depan Daikoku! Kita tentukan siapa raja jalanan Shuto malam ini!"
    }
];

function nextCutsceneStep() {
    currentDialogueStep++;
    if (currentDialogueStep >= CUTSCENE_SCRIPT.length) {
        endCutscene();
        return;
    }
    const step = CUTSCENE_SCRIPT[currentDialogueStep];
    document.getElementById('cs-speaker-name').innerText = step.speaker;
    document.getElementById('cs-dialogue-content').innerText = `"${step.text}"`;

    if (step.charActive === 'yuki') {
        document.getElementById('cs-char-yuki').classList.remove('inactive');
        document.getElementById('cs-char-kenji').classList.add('inactive');
    } else {
        document.getElementById('cs-char-kenji').classList.remove('inactive');
        document.getElementById('cs-char-yuki').classList.add('inactive');
    }
}

function endCutscene() {
    const cs = document.getElementById('cutscene-overlay');
    if (cs) {
        cs.style.opacity = '0';
        setTimeout(() => cs.style.display = 'none', 500);
    }
    showRadioMessage("RACE START!", "HAJAR GAS POL! KALAHKAN KENJI DI SHUTO EXPRESSWAY!", "🏁");
}

document.addEventListener('DOMContentLoaded', () => {
    const csOverlay = document.getElementById('cutscene-overlay');
    if (csOverlay) {
        csOverlay.addEventListener('click', nextCutsceneStep);
    }
});

// --- ANIME CHARACTER CREATOR CONTROLLER (NFS UNBOUND STYLE) ---
let activeCharTab = 'hair';

function toggleCharacterCreator(open) {
    const modal = document.getElementById('character-modal');
    if (!modal) return;
    modal.style.display = open ? 'flex' : 'none';
    if (open) {
        updateCharacterPreview();
        renderCharOptions(activeCharTab);
    }
}

function switchCharTab(tab) {
    activeCharTab = tab;
    document.querySelectorAll('#character-modal .cat-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderCharOptions(tab);
}

function updateCharacterPreview() {
    const faceEl = document.getElementById('char-avatar-face');
    const accEl = document.getElementById('char-avatar-acc');
    const outfitEl = document.getElementById('char-avatar-outfit');
    const styleEl = document.getElementById('char-card-style');
    const quoteEl = document.getElementById('char-card-quote');
    const stageEl = document.getElementById('anime-avatar-stage');

    if (faceEl) {
        faceEl.innerText = playerCharacter.gender === 'male' ? '👦' : '👧';
        faceEl.style.filter = `drop-shadow(0 0 10px ${playerCharacter.hairColor})`;
    }

    if (accEl) {
        const accItem = CHARACTER_CUSTOMIZER_DATA.accessories.find(a => a.id === playerCharacter.accessory);
        accEl.innerText = (accItem && accItem.id !== 'none') ? accItem.icon : '';
    }

    if (outfitEl) {
        const outfitItem = CHARACTER_CUSTOMIZER_DATA.outfits.find(o => o.id === playerCharacter.outfit);
        outfitEl.innerText = outfitItem ? outfitItem.preview : '🧥';
    }

    if (stageEl) {
        stageEl.style.borderColor = playerCharacter.hairColor;
        stageEl.style.boxShadow = `0 0 25px ${playerCharacter.hairColor}88`;
    }

    if (styleEl) {
        const currentOutfit = CHARACTER_CUSTOMIZER_DATA.outfits.find(o => o.id === playerCharacter.outfit);
        styleEl.innerText = currentOutfit ? currentOutfit.name : 'STREETWEAR';
    }

    if (quoteEl) {
        quoteEl.innerText = `"${playerCharacter.tagline}"`;
    }
}

function renderCharOptions(tab) {
    const panel = document.getElementById('char-panel-body');
    if (!panel) return;
    panel.innerHTML = '';

    if (tab === 'hair') {
        // Gender Toggle
        const genderRow = document.createElement('div');
        genderRow.className = 'slider-row';
        genderRow.innerHTML = `
            <div class="slider-label">TIPE KARAKTER ANIME</div>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
                <button class="cat-btn ${playerCharacter.gender === 'male' ? 'active' : ''}" style="width: auto; padding: 8px 16px;" onclick="setCharGender('male')">👦 SHONEN RACER</button>
                <button class="cat-btn ${playerCharacter.gender === 'female' ? 'active' : ''}" style="width: auto; padding: 8px 16px;" onclick="setCharGender('female')">👧 HEROINE DRIFTER</button>
            </div>
        `;
        panel.appendChild(genderRow);

        // Hair Styles Grid
        const titleStyle = document.createElement('div');
        titleStyle.style.cssText = 'font-family: Orbitron; font-size: 13px; color: #00ffff; margin-top: 15px; font-weight: 700;';
        titleStyle.innerText = 'MODEL GAYA RAMBUT (HAIRSTYLE)';
        panel.appendChild(titleStyle);

        const grid = document.createElement('div');
        grid.className = 'part-grid';
        CHARACTER_CUSTOMIZER_DATA.hairStyles.forEach(hair => {
            const card = document.createElement('div');
            card.className = `part-card ${playerCharacter.hairStyle === hair.id ? 'selected' : ''}`;
            card.innerHTML = `
                <div style="font-size: 26px;">${hair.icon}</div>
                <div class="part-name">${hair.name}</div>
                <div class="part-desc">${hair.animeStyle}</div>
            `;
            card.onclick = () => {
                playerCharacter.hairStyle = hair.id;
                updateCharacterPreview();
                renderCharOptions('hair');
            };
            grid.appendChild(card);
        });
        panel.appendChild(grid);

        // Hair Colors Palette
        const colorRow = document.createElement('div');
        colorRow.className = 'slider-row';
        colorRow.style.marginTop = '15px';
        colorRow.innerHTML = `
            <div class="slider-label">WARNA RAMBUT NEON ANIME</div>
            <div style="display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
                ${CHARACTER_CUSTOMIZER_DATA.hairColors.map(c => `
                    <div title="${c.name}" style="width: 36px; height: 36px; border-radius: 50%; background: ${c.hex}; cursor: pointer; border: ${playerCharacter.hairColor === c.hex ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)'}; box-shadow: 0 0 10px ${c.hex};" onclick="setCharHairColor('${c.hex}')"></div>
                `).join('')}
            </div>
        `;
        panel.appendChild(colorRow);

    } else if (tab === 'face') {
        // Skin Tones
        const skinRow = document.createElement('div');
        skinRow.className = 'slider-row';
        skinRow.innerHTML = `
            <div class="slider-label">TONE KULIT ANIME (SKIN TONE)</div>
            <div style="display: flex; gap: 12px; margin-top: 10px;">
                ${CHARACTER_CUSTOMIZER_DATA.skinTones.map(s => `
                    <div title="${s.name}" style="width: 38px; height: 38px; border-radius: 6px; background: ${s.hex}; cursor: pointer; border: ${playerCharacter.skinTone === s.hex ? '3px solid #00ffff' : '2px solid rgba(255,255,255,0.2)'};" onclick="setCharSkinTone('${s.hex}')"></div>
                `).join('')}
            </div>
        `;
        panel.appendChild(skinRow);

        // Eye Colors
        const eyeRow = document.createElement('div');
        eyeRow.className = 'slider-row';
        eyeRow.style.marginTop = '15px';
        eyeRow.innerHTML = `
            <div class="slider-label">WARNA MATA ANIME (IRIS COLOR)</div>
            <div style="display: flex; gap: 12px; margin-top: 10px;">
                ${CHARACTER_CUSTOMIZER_DATA.eyeColors.map(e => `
                    <div title="${e.name}" style="width: 36px; height: 36px; border-radius: 50%; background: ${e.hex}; cursor: pointer; border: ${playerCharacter.eyeColor === e.hex ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)'}; box-shadow: 0 0 12px ${e.hex};" onclick="setCharEyeColor('${e.hex}')"></div>
                `).join('')}
            </div>
        `;
        panel.appendChild(eyeRow);

    } else if (tab === 'outfit') {
        const grid = document.createElement('div');
        grid.className = 'part-grid';
        CHARACTER_CUSTOMIZER_DATA.outfits.forEach(outfit => {
            const card = document.createElement('div');
            card.className = `part-card ${playerCharacter.outfit === outfit.id ? 'selected' : ''}`;
            card.innerHTML = `
                <div style="font-size: 32px;">${outfit.preview}</div>
                <div class="part-brand">${outfit.brand}</div>
                <div class="part-name">${outfit.name}</div>
                <div class="part-desc">${outfit.type}</div>
            `;
            card.onclick = () => {
                playerCharacter.outfit = outfit.id;
                updateCharacterPreview();
                renderCharOptions('outfit');
            };
            grid.appendChild(card);
        });
        panel.appendChild(grid);

    } else if (tab === 'accessory') {
        const grid = document.createElement('div');
        grid.className = 'part-grid';
        CHARACTER_CUSTOMIZER_DATA.accessories.forEach(acc => {
            const card = document.createElement('div');
            card.className = `part-card ${playerCharacter.accessory === acc.id ? 'selected' : ''}`;
            card.innerHTML = `
                <div style="font-size: 32px;">${acc.icon}</div>
                <div class="part-name">${acc.name}</div>
            `;
            card.onclick = () => {
                playerCharacter.accessory = acc.id;
                updateCharacterPreview();
                renderCharOptions('accessory');
            };
            grid.appendChild(card);
        });
        panel.appendChild(grid);

    } else if (tab === 'pose') {
        const grid = document.createElement('div');
        grid.className = 'part-grid';
        CHARACTER_CUSTOMIZER_DATA.poses.forEach(pose => {
            const card = document.createElement('div');
            card.className = `part-card ${playerCharacter.pose === pose.id ? 'selected' : ''}`;
            card.innerHTML = `
                <div style="font-size: 32px;">${pose.icon}</div>
                <div class="part-name">${pose.name}</div>
                <div class="part-desc">${pose.desc}</div>
            `;
            card.onclick = () => {
                playerCharacter.pose = pose.id;
                updateCharacterPreview();
                renderCharOptions('pose');
            };
            grid.appendChild(card);
        });
        panel.appendChild(grid);
    }
}

function setCharGender(g) {
    playerCharacter.gender = g;
    updateCharacterPreview();
    renderCharOptions('hair');
}
function setCharHairColor(hex) {
    playerCharacter.hairColor = hex;
    updateCharacterPreview();
    renderCharOptions('hair');
}
function setCharSkinTone(hex) {
    playerCharacter.skinTone = hex;
    updateCharacterPreview();
    renderCharOptions('face');
}
function setCharEyeColor(hex) {
    playerCharacter.eyeColor = hex;
    updateCharacterPreview();
    renderCharOptions('face');
}

function saveAndCloseCharacterCreator() {
    toggleCharacterCreator(false);
    showRadioMessage("CUSTOM DRIVER", `Karakter ${playerCharacter.name} berhasil disimpan! Siap melesat di Shuto!`, "👤");
}

// --- STUDIO SPLASH INTRO & JAPANESE FEMALE VOICE NARRATOR (NFS RIVALS STYLE) ---
let audioCtx = null;

function playSynthTone(freq, duration, type = 'sine', gainVal = 0.2) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

function runStudioSplashSequence() {
    const splashEl = document.getElementById('splash-screen');
    const logoBox = document.getElementById('splash-logo-box');
    const brandTitle = document.getElementById('splash-brand-title');
    const subTitle = document.getElementById('splash-sub-title');
    const titleScreen = document.getElementById('title-screen');

    if (!splashEl) return;

    // Phase 1: ELECTRONIC APEX (EA Parody)
    setTimeout(() => {
        playSynthTone(150, 0.8, 'sawtooth', 0.25);
        playSynthTone(300, 0.6, 'sine', 0.2);
        logoBox.classList.add('show');
    }, 400);

    // Phase 2: PHANTOM GAMES (Ghost Games Parody)
    setTimeout(() => {
        logoBox.classList.remove('show');
        setTimeout(() => {
            brandTitle.innerText = "PHANTOM GAMES";
            brandTitle.style.color = "#00ffff";
            brandTitle.style.textShadow = "0 0 25px rgba(0, 255, 255, 0.9)";
            subTitle.innerText = "A NIGHT PHANTOM STUDIO";
            subTitle.style.color = "#ff007f";
            playSynthTone(220, 1.2, 'square', 0.15);
            logoBox.classList.add('show');
        }, 500);
    }, 2400);

    // Phase 3: Transisi ke Title Screen (Press Start)
    setTimeout(() => {
        logoBox.classList.remove('show');
        setTimeout(() => {
            splashEl.style.opacity = '0';
            setTimeout(() => {
                splashEl.style.display = 'none';
                if (titleScreen) {
                    titleScreen.style.display = 'flex';
                }
            }, 600);
        }, 400);
    }, 4500);
}

// Suara Narator Cewek Bahasa Jepang (NFS Rivals Monologue)
function speakJapaneseAnimeVoice(textJp) {
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textJp);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.92; // Sedikit lebih lambat, dramatis & misterius
        utterance.pitch = 1.25; // Suara cewek anime/heroine

        // Cari suara female Jepang jika tersedia di device/browser
        const voices = window.speechSynthesis.getVoices();
        const jaFemaleVoice = voices.find(v => v.lang.includes('ja') && (v.name.includes('Female') || v.name.includes('Nanami') || v.name.includes('Ayumi') || v.name.includes('Haruka') || v.name.includes('Kyoko')));
        if (jaFemaleVoice) {
            utterance.voice = jaFemaleVoice;
        }

        window.speechSynthesis.speak(utterance);
    } catch(e) {}
}

// Monologue Cewek Bahasa Jepang Saat Tekan Start (NFS Rivals Style)
const JAPANESE_RIVALS_MONOLOGUES = [
    {
        jp: "首都高の夜に、終わりはない。アクセルを踏み込む者だけが、真の自由を手に入れる。",
        romaji: "Shutokou no yoru ni, owari wa nai. Akuseru o fumikomu mono dake ga, shin no jiyuu o te ni ireru.",
        indo: "Malam di jalan tol Shuto tidak pernah berakhir. Hanya mereka yang menginjak pedal gas sedalam-dalamnya yang akan meraih kebebasan sejati."
    },
    {
        jp: "ライバルたちの光が消える時、伝説が生まれる。準備はいい？",
        romaji: "Raibaru-tachi no hikari ga kieru toki, densetsu ga umareru. Junbi wa ii?",
        indo: "Ketika lampu-lampu rival padam di belakang, sang legenda terlahir. Sudah siap?"
    }
];

function startJapaneseIntroCutscene() {
    isSafehouseMode = false;
    const carbonMenu = document.getElementById('carbon-main-menu');
    if (carbonMenu) carbonMenu.style.display = 'none';
    if (safehouseGroup) safehouseGroup.visible = false;
    roadSegments.forEach(r => r.group.visible = true);

    const titleScreen = document.getElementById('title-screen');
    const cutsceneOverlay = document.getElementById('cutscene-overlay');

    // SFX Geber Mesin Gas Mulai
    playSynthTone(120, 1.5, 'sawtooth', 0.35);
    playSynthTone(440, 0.5, 'sine', 0.2);

    if (titleScreen) {
        titleScreen.style.opacity = '0';
        setTimeout(() => {
            titleScreen.style.display = 'none';
        }, 600);
    }

    if (cutsceneOverlay) {
        cutsceneOverlay.style.display = 'flex';
        cutsceneOverlay.style.opacity = '1';
    }

    // Mainkan suara cewek bahasa Jepang
    const monologue = JAPANESE_RIVALS_MONOLOGUES[0];
    const narrationBox = document.getElementById('cs-setting-narration');
    if (narrationBox) {
        narrationBox.innerHTML = `
            <div style="color: #ff007f; font-family: 'Orbitron'; font-size: 13px; font-weight: 700; letter-spacing: 1px;">🎙️ VOICE OVER (JAPANESE NARRATOR):</div>
            <div style="font-size: 16px; color: #fff; margin: 4px 0; font-weight: 700;">「${monologue.jp}」</div>
            <div style="font-size: 11px; color: #00ffff; font-family: 'Orbitron'; font-style: normal;">[${monologue.romaji}]</div>
            <div style="font-size: 12px; color: #bbb; margin-top: 4px;">"${monologue.indo}"</div>
        `;
    }

    // Trigger Speech Synthesis
    speakJapaneseAnimeVoice(monologue.jp);

    // Mulai alur cutscene dialog
    if (typeof loadChapter === 'function') {
        loadChapter("prologue");
    }

    // Start Hardcore Gen FF Remix BGM
    if (typeof musicEngine !== 'undefined') {
        musicEngine.setMusicMood("menu");
        musicEngine.startBgmLoop();
    }
}

// Saat cutscene prolog selesai, picu adegan sabotase ala NFS MW2005
const oldEndCutscene = typeof endCutscene === 'function' ? endCutscene : null;
endCutscene = function() {
    const cs = document.getElementById('cutscene-overlay');
    if (cs) {
        cs.style.opacity = '0';
        setTimeout(() => cs.style.display = 'none', 500);
    }

    // Jika ini pertama kali main (Prolog NFS MW2005)
    if (currentChapter === 0) {
        // Ganti mobil Player ke Starter Car (Civique Sport-R Hatch) karena Skyline dirampas Kenji
        const starterCar = CAR_DATABASE.find(c => c.id === "civic_ek9");
        if (starterCar) {
            currentCarData = starterCar;
            spawnPlayerCar(currentCarData);
            saveGameData();
        }

        // Tampilkan dialog radio dramatis ala Mia Townsend / Yuki
        showRadioMessage("BLOWN ENGINE!", "Skyline-mu meledak dan disita Kenji! Kamu sekarang mengendarai Civique Sport-R!", "💥");

        setTimeout(() => {
            showRadioMessage("YUKI [DRAFTER]", "Jangan menyerah! Kalahkan semua kroco Blacklist Cinders dan rebut kembali Skyline-mu!", "🏎️");
        }, 4000);
    } else {
        showRadioMessage("RACE START!", "HAJAR GAS POL! KALAHKAN RIVAL DI SHUTO EXPRESSWAY!", "🏁");
    }

    if (typeof musicEngine !== 'undefined') {
        musicEngine.setMusicMood("sprint");
    }
};

let isGarageCustomizeOpen = false;

// Ganti musik ke Garage Trap saat buka garasi & aktifkan kamera customizer
const oldToggleGarage = typeof toggleGarage === 'function' ? toggleGarage : null;
toggleGarage = function(open) {
    isGarageCustomizeOpen = open;
    const modal = document.getElementById('garage-modal');
    const carbonMenu = document.getElementById('carbon-main-menu');
    const hudOverlay = document.getElementById('hud-overlay');

    if (modal) modal.style.display = open ? 'flex' : 'none';

    if (open) {
        if (carbonMenu) carbonMenu.style.display = 'none';
        if (hudOverlay) hudOverlay.style.display = 'none';

        isSafehouseMode = true;
        if (safehouseGroup) safehouseGroup.visible = true;
        roadSegments.forEach(r => r.group.visible = false);

        // Update tag mobil & kas
        const carTag = document.getElementById('garage-active-car-tag');
        const cashDisplay = document.getElementById('garage-cash-display');
        if (carTag && currentCarData) carTag.innerText = `${currentCarData.brand} // ${currentCarData.parodyName}`.toUpperCase();
        if (cashDisplay) {
            const cashVal = typeof playerMoney !== 'undefined' ? playerMoney : (typeof playerBounty !== 'undefined' ? playerBounty : 15000);
            cashDisplay.innerText = `KAS: ¥${cashVal.toLocaleString().replace(/,/g, ' ')}`;
        }

        renderGarageCategories('bodykit');

        // Posisikan mobil agak ke kanan agar tidak tertutup panel kustomisasi
        if (playerCar) {
            playerCar.position.set(0.6, 0, 0);
            playerCar.rotation.set(0, -0.42, 0);
        }

        if (typeof musicEngine !== 'undefined') {
            musicEngine.setMusicMood("garage");
            musicEngine.startBgmLoop();
        }
    } else {
        spawnPlayerCar(currentCarData);
        saveGameData();
        showRadioMessage("SAVE COMPLETED", "Data modifikasi mobil & stance tersimpan aman!", "💾");
        openCarbonMainMenu();
    }
};

// --- 17 BLACKLIST RIVALS CONTROLLER (NFS MOST WANTED 2005 STYLE) ---
let selectedBlacklistIndex = 0;

function toggleBlacklistModal(open) {
    const modal = document.getElementById('blacklist-modal');
    if (!modal) return;
    modal.style.display = open ? 'flex' : 'none';
    if (open) {
        document.getElementById('player-bounty-display').innerText = `BOUNTY: ¥${playerBounty.toLocaleString()}`;
        renderBlacklistGrid();
        selectBlacklistBoss(selectedBlacklistIndex);
    }
}

function renderBlacklistGrid() {
    const grid = document.getElementById('blacklist-grid');
    if (!grid) return;
    grid.innerHTML = '';

    BLACKLIST_DATABASE.forEach((rival, idx) => {
        const card = document.createElement('div');
        const isSelected = (idx === selectedBlacklistIndex);
        card.className = `part-card ${isSelected ? 'selected' : ''}`;
        if (!rival.unlocked) {
            card.style.opacity = '0.5';
            card.style.filter = 'grayscale(80%)';
        }

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 26px;">${rival.avatar}</span>
                <span style="font-family: 'Bangers'; font-size: 20px; color: ${rival.rank === 1 ? '#ff0055' : '#ffaa00'};">#${rival.rank}</span>
            </div>
            <div class="part-name" style="font-size: 13px;">${rival.alias}</div>
            <div class="part-brand" style="font-size: 10px;">${rival.carName}</div>
            <div style="font-size: 11px; color: #00ffff; font-family: 'Orbitron'; margin-top: 4px;">
                ${rival.defeated ? '✅ DEFEATED' : (rival.unlocked ? '⚔️ READY' : '🔒 LOCKED')}
            </div>
        `;

        card.onclick = () => {
            selectedBlacklistIndex = idx;
            renderBlacklistGrid();
            selectBlacklistBoss(idx);
        };

        grid.appendChild(card);
    });
}

function selectBlacklistBoss(idx) {
    const boss = BLACKLIST_DATABASE[idx];
    if (!boss) return;

    document.getElementById('bl-boss-avatar').innerText = boss.avatar;
    document.getElementById('bl-boss-rank').innerText = `#${boss.rank} ${boss.alias}`;
    document.getElementById('bl-boss-crew').innerText = `CREW: ${boss.crew}`;
    document.getElementById('bl-boss-car').innerText = boss.carName;
    document.getElementById('bl-boss-bio').innerText = `"${boss.bio}"`;
    document.getElementById('bl-boss-taunt').innerText = `"${boss.taunt}"`;

    const reqEl = document.getElementById('bl-boss-req');
    const btn = document.getElementById('bl-challenge-btn');

    if (boss.defeated) {
        reqEl.innerHTML = `<span style="color: #00ffaa;">STATUS: TELAH DIKALAHKAN (PINK SLIP DIMENANGKAN)</span>`;
        btn.innerText = "DUEL ULANG (RE-MATCH)";
        btn.disabled = false;
        btn.style.opacity = '1';
    } else if (playerBounty >= boss.bountyRequired) {
        reqEl.innerHTML = `<span style="color: #00ffaa;">BOUNTY CUKUP: ¥${playerBounty.toLocaleString()} / ¥${boss.bountyRequired.toLocaleString()} (SIAP DITANTANG)</span>`;
        btn.innerText = `TANTANG BLACKLIST #${boss.rank} ⚔️`;
        btn.disabled = false;
        btn.style.opacity = '1';
    } else {
        reqEl.innerHTML = `<span style="color: #ff3344;">BOUNTY KURANG: Butuh ¥${boss.bountyRequired.toLocaleString()} (Kumpulkan bounty dari drift/traffic)</span>`;
        btn.innerText = "BOUNTY BELUM CUKUP 🔒";
        btn.disabled = true;
        btn.style.opacity = '0.5';
    }
}

function challengeBlacklistRival() {
    const boss = BLACKLIST_DATABASE[selectedBlacklistIndex];
    if (!boss) return;

    toggleBlacklistModal(false);

    // Setup mobil rival sesuai mobil Blacklist boss
    const rivalCarData = CAR_DATABASE.find(c => c.id === boss.carId) || CAR_DATABASE[0];
    if (rivalCars.length > 0) {
        scene.remove(rivalCars[0].mesh);
        const newRivalMesh = createProceduralCarMesh(rivalCarData);
        newRivalMesh.position.set(4, 0, playerCar.position.z - 30);
        scene.add(newRivalMesh);
        rivalCars[0].mesh = newRivalMesh;
        rivalCars[0].speed = 220 + (18 - boss.rank) * 6; // Semakin tinggi rank, semakin kencang!
    }

    // Ubah musik ke Canyon / Boss Duel
    if (typeof musicEngine !== 'undefined') {
        musicEngine.setMusicMood(boss.rank <= 3 ? "canyon" : "sprint");
    }

    showRadioMessage(`BLACKLIST #${boss.rank}`, `${boss.alias}: "${boss.taunt}"`, boss.avatar);
}

// ============================================================
// --- NFS CARBON SAFEHOUSE GARAGE 3D ENVIRONMENT & MAIN MENU ---
// ============================================================
let isSafehouseMode = false;
let safehouseGroup = null;
let safehouseRibbon = null;
let safehouseDragVelocity = 0;
let isSafehouseDragging = false;
let safehouseLastX = 0;
let currentMenuTab = 'freeroam';
const CARBON_MENU_TABS = ['freeroam', 'map', 'career', 'garage', 'blacklist', 'character'];

// --- PROCEDURAL TEXTURES FOR NFS CARBON SAFEHOUSE GARAGE ---
function createBridgeBackdropTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // 1. Twilight / Night Sky Gradient (Moody Violet & Deep Indigo)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 420);
    skyGrad.addColorStop(0, '#040612');
    skyGrad.addColorStop(0.35, '#120b24');
    skyGrad.addColorStop(0.65, '#2e143b');
    skyGrad.addColorStop(0.82, '#481c45');
    skyGrad.addColorStop(0.92, '#18243b');
    skyGrad.addColorStop(1.0, '#090d18');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // 2. Stars & Atmospheric Night Mist
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 90; i++) {
        const sx = (i * 97 + 13) % 1024;
        const sy = (i * 43 + 7) % 240;
        const sz = (i % 3 === 0) ? 1.8 : 1.0;
        ctx.globalAlpha = 0.3 + ((i % 5) * 0.14);
        ctx.fillRect(sx, sy, sz, sz);
    }
    ctx.globalAlpha = 1.0;

    // Distant mountain / hills silhouette
    ctx.fillStyle = '#140c22';
    ctx.beginPath();
    ctx.moveTo(0, 370);
    ctx.bezierCurveTo(200, 330, 400, 360, 600, 320);
    ctx.bezierCurveTo(800, 350, 950, 330, 1024, 350);
    ctx.lineTo(1024, 430);
    ctx.lineTo(0, 430);
    ctx.closePath();
    ctx.fill();

    // 3. Shuto Bay / Palmont Bay Water
    const waterGrad = ctx.createLinearGradient(0, 400, 0, 512);
    waterGrad.addColorStop(0, '#0d162a');
    waterGrad.addColorStop(0.5, '#070b16');
    waterGrad.addColorStop(1, '#03050c');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, 400, 1024, 112);

    // 4. Distant City Skyline Lights
    ctx.fillStyle = '#161d30';
    for (let b = 0; b < 28; b++) {
        const bx = b * 38;
        const bh = 25 + ((b * 19) % 55);
        ctx.fillRect(bx, 400 - bh, 32, bh);
        ctx.fillStyle = '#ffe688';
        for (let w = 0; w < 4; w++) {
            if ((b + w) % 2 === 0) {
                ctx.fillRect(bx + 4 + (w % 2) * 12, 400 - bh + 6 + Math.floor(w / 2) * 10, 4, 4);
            }
        }
        ctx.fillStyle = '#161d30';
    }

    // 5. Massive Illuminated Suspension Bridge (Central Feature)
    const towers = [320, 740];
    const deckY = 385;
    const towerTopY = 130;

    // Roadway Deck
    ctx.strokeStyle = '#222b3d';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(0, deckY + 8);
    ctx.lineTo(1024, deckY + 8);
    ctx.stroke();

    // Roadway glowing amber/gold light string
    ctx.strokeStyle = '#ffb338';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ffaa00';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, deckY);
    ctx.lineTo(1024, deckY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Roadway vehicle lights
    for (let v = 0; v < 40; v++) {
        const vx = (v * 26 + 10) % 1024;
        ctx.fillStyle = (v % 3 === 0) ? '#ff2244' : '#fff4bb';
        ctx.fillRect(vx, deckY - 1, 3, 2);
    }

    // Suspension Towers & Cables
    towers.forEach(tx => {
        // Steel Truss Legs (A-Frame)
        ctx.strokeStyle = '#2d374d';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(tx - 24, deckY + 25);
        ctx.lineTo(tx - 8, towerTopY);
        ctx.lineTo(tx + 8, towerTopY);
        ctx.lineTo(tx + 24, deckY + 25);
        ctx.stroke();

        // Cross Struts (X-Bracing)
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#3e4c69';
        for (let st = 0; st < 4; st++) {
            const sy1 = towerTopY + 20 + st * 55;
            const sy2 = sy1 + 45;
            ctx.beginPath();
            ctx.moveTo(tx - 18, sy1);
            ctx.lineTo(tx + 18, sy2);
            ctx.moveTo(tx + 18, sy1);
            ctx.lineTo(tx - 18, sy2);
            ctx.stroke();
            ctx.strokeRect(tx - 20, sy1, 40, 3);
        }

        // Tower Floodlights
        ctx.fillStyle = '#ffeaa0';
        ctx.shadowColor = '#ffbb44';
        ctx.shadowBlur = 10;
        ctx.fillRect(tx - 5, towerTopY + 12, 10, 6);
        ctx.fillRect(tx - 7, towerTopY + 95, 14, 5);

        // Tower Peak Red Aviation Beacon
        ctx.fillStyle = '#ff0033';
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(tx, towerTopY - 6, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Main Suspension Cables (Parabolic Arches)
    ctx.strokeStyle = '#9bb5db';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#66a2e8';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, deckY - 20);
    ctx.quadraticCurveTo(160, deckY - 70, towers[0], towerTopY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(towers[0], towerTopY);
    ctx.quadraticCurveTo(530, deckY - 30, towers[1], towerTopY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(towers[1], towerTopY);
    ctx.quadraticCurveTo(880, deckY - 70, 1024, deckY - 20);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Vertical Hanger Cables
    ctx.strokeStyle = 'rgba(160, 190, 225, 0.45)';
    ctx.lineWidth = 1;
    for (let hx = 20; hx < 1010; hx += 16) {
        if (Math.abs(hx - towers[0]) < 12 || Math.abs(hx - towers[1]) < 12) continue;
        let cy = deckY;
        if (hx < towers[0]) {
            const t = hx / towers[0];
            cy = (1 - t) * (1 - t) * (deckY - 20) + 2 * (1 - t) * t * (deckY - 70) + t * t * towerTopY;
        } else if (hx < towers[1]) {
            const t = (hx - towers[0]) / (towers[1] - towers[0]);
            cy = (1 - t) * (1 - t) * towerTopY + 2 * (1 - t) * t * (deckY - 30) + t * t * towerTopY;
        } else {
            const t = (hx - towers[1]) / (1024 - towers[1]);
            cy = (1 - t) * (1 - t) * towerTopY + 2 * (1 - t) * t * (deckY - 70) + t * t * (deckY - 20);
        }
        ctx.beginPath();
        ctx.moveTo(hx, cy);
        ctx.lineTo(hx, deckY);
        ctx.stroke();
    }

    // Water Reflections
    towers.forEach(tx => {
        const refGrad = ctx.createLinearGradient(0, 400, 0, 470);
        refGrad.addColorStop(0, 'rgba(255, 180, 50, 0.4)');
        refGrad.addColorStop(1, 'rgba(255, 180, 50, 0)');
        ctx.fillStyle = refGrad;
        ctx.fillRect(tx - 18, 400, 36, 70);
    });

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function createSyntecBannerTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Racing Green Gradient Background
    const bg = ctx.createLinearGradient(0, 0, 512, 256);
    bg.addColorStop(0, '#01200b');
    bg.addColorStop(0.5, '#043b17');
    bg.addColorStop(1, '#011909');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 256);

    // Carbon / Checkerboard faint pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let x = 0; x < 512; x += 16) {
        for (let y = 0; y < 256; y += 16) {
            if ((Math.floor(x / 16) + Math.floor(y / 16)) % 2 === 0) {
                ctx.fillRect(x, y, 16, 16);
            }
        }
    }

    // Racing Stripes (White & Gold curved ribbons)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, 180);
    ctx.bezierCurveTo(180, 210, 320, 140, 512, 170);
    ctx.lineTo(512, 192);
    ctx.bezierCurveTo(320, 162, 180, 232, 0, 202);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffe600';
    ctx.beginPath();
    ctx.moveTo(0, 195);
    ctx.bezierCurveTo(180, 225, 320, 155, 512, 185);
    ctx.lineTo(512, 210);
    ctx.bezierCurveTo(320, 180, 180, 250, 0, 220);
    ctx.closePath();
    ctx.fill();

    // Top Red Accent Line
    ctx.fillStyle = '#ff1144';
    ctx.fillRect(0, 0, 512, 12);
    ctx.fillRect(0, 244, 512, 12);

    // Shield Emblem with stylized Oil Drop
    ctx.fillStyle = '#ffdd00';
    ctx.beginPath();
    ctx.moveTo(56, 40);
    ctx.lineTo(92, 40);
    ctx.lineTo(92, 75);
    ctx.bezierCurveTo(92, 98, 74, 110, 74, 114);
    ctx.bezierCurveTo(74, 110, 56, 98, 56, 75);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#033314';
    ctx.beginPath();
    ctx.arc(74, 76, 11, 0, Math.PI * 2);
    ctx.fill();

    // "SYNTEC" Main Brand Text (Bold italic white with drop shadow)
    ctx.save();
    ctx.font = '900 italic 68px "Arial Black", "Impact", sans-serif';
    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 6;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('SYNTEC', 115, 105);

    // Gold trim
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffe600';
    ctx.strokeText('SYNTEC', 115, 105);
    ctx.restore();

    // Slogan: "UNLOCK THE POWER"
    ctx.save();
    ctx.font = '800 italic 28px "Arial", sans-serif';
    ctx.fillStyle = '#ffe600';
    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText('UNLOCK THE POWER', 120, 142);
    ctx.restore();

    // Subtitle
    ctx.fillStyle = '#b0d6be';
    ctx.font = '700 13px monospace';
    ctx.fillText('SHUTO HIGH-PERFORMANCE SYNTHETIC MOTOR OIL', 35, 236);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function createDrainGrilleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep pit dark base
    ctx.fillStyle = '#06070a';
    ctx.fillRect(0, 0, 256, 512);

    // Cast iron frame borders
    ctx.fillStyle = '#22252e';
    ctx.fillRect(0, 0, 256, 18);
    ctx.fillRect(0, 494, 256, 18);
    ctx.fillRect(0, 0, 22, 512);
    ctx.fillRect(234, 0, 22, 512);

    // Metallic highlight lines on frame
    ctx.strokeStyle = '#4a5062';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 252, 508);
    ctx.strokeStyle = '#12141a';
    ctx.strokeRect(21, 17, 214, 478);

    // Corner & Side Hex Bolts
    const boltPositions = [
        [10, 10], [244, 10], [10, 502], [244, 502],
        [10, 170], [244, 170], [10, 340], [244, 340]
    ];
    ctx.fillStyle = '#656e82';
    boltPositions.forEach(([bx, by]) => {
        ctx.beginPath();
        ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1c202a';
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#656e82';
    });

    // Horizontal Iron Drainage Grille Bars
    const numBars = 36;
    const barHeight = 8;
    const barSpacing = (474 - numBars * barHeight) / numBars;

    for (let i = 0; i < numBars; i++) {
        const y = 20 + i * (barHeight + barSpacing);

        // Bar body (iron metal)
        ctx.fillStyle = '#2b303c';
        ctx.fillRect(26, y, 204, barHeight);

        // Top specular edge highlight
        ctx.fillStyle = '#566074';
        ctx.fillRect(26, y, 204, 2);

        // Bottom shadow
        ctx.fillStyle = '#0a0b0e';
        ctx.fillRect(26, y + barHeight - 2, 204, 2);

        // Center spine divider
        ctx.fillStyle = '#1e2129';
        ctx.fillRect(124, y, 8, barHeight);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function createArchedWindowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 512, 512);

    const archRadius = 220;
    const archCenterX = 256;
    const archCenterY = 220;

    // Draw window glass path (arch top + rectangle bottom)
    ctx.save();
    ctx.beginPath();
    ctx.arc(archCenterX, archCenterY, archRadius, Math.PI, 0, false);
    ctx.lineTo(archCenterX + archRadius, 500);
    ctx.lineTo(archCenterX - archRadius, 500);
    ctx.closePath();
    ctx.clip();

    // Subtle glass sheen
    const glassGrad = ctx.createLinearGradient(0, 0, 512, 512);
    glassGrad.addColorStop(0, 'rgba(80, 140, 200, 0.12)');
    glassGrad.addColorStop(0.5, 'rgba(120, 170, 230, 0.05)');
    glassGrad.addColorStop(1, 'rgba(30, 60, 110, 0.20)');
    ctx.fillStyle = glassGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Diagonal Glass Reflection Streaks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(80, 500);
    ctx.lineTo(380, 0);
    ctx.moveTo(150, 500);
    ctx.lineTo(450, 0);
    ctx.stroke();

    // Multi-pane Steel Grids
    // 3 Vertical Mullions
    ctx.strokeStyle = '#181d27';
    ctx.lineWidth = 10;
    const colXs = [archCenterX - 110, archCenterX, archCenterX + 110];
    colXs.forEach(cx => {
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, 512);
        ctx.stroke();
    });

    // 5 Horizontal Muntin Bars
    const rowYs = [130, 220, 310, 400, 490];
    rowYs.forEach(ry => {
        ctx.beginPath();
        ctx.moveTo(0, ry);
        ctx.lineTo(512, ry);
        ctx.stroke();
    });

    // Steel grid highlight lines
    ctx.strokeStyle = '#384357';
    ctx.lineWidth = 2;
    colXs.forEach(cx => {
        ctx.beginPath();
        ctx.moveTo(cx + 3, 0);
        ctx.lineTo(cx + 3, 512);
        ctx.stroke();
    });
    rowYs.forEach(ry => {
        ctx.beginPath();
        ctx.moveTo(0, ry - 3);
        ctx.lineTo(512, ry - 3);
        ctx.stroke();
    });

    ctx.restore();

    // Heavy Outer Frame
    ctx.strokeStyle = '#10131a';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.arc(archCenterX, archCenterY, archRadius, Math.PI, 0, false);
    ctx.lineTo(archCenterX + archRadius, 505);
    ctx.lineTo(archCenterX - archRadius, 505);
    ctx.closePath();
    ctx.stroke();

    // Frame bevel highlight
    ctx.strokeStyle = '#323c4e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(archCenterX, archCenterY, archRadius - 8, Math.PI, 0, false);
    ctx.lineTo(archCenterX + archRadius - 8, 498);
    ctx.lineTo(archCenterX + archRadius + 8, 498);
    ctx.closePath();
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function buildSafehouseGarage() {
    safehouseGroup = new THREE.Group();
    safehouseGroup.visible = false;

    // 1. Showroom Polished Asphalt & Concrete Floor
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
        color: 0x141824,
        roughness: 0.38,
        metalness: 0.35
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    safehouseGroup.add(floor);

    // Cast Iron Slotted Floor Drain Grille directly under the car (matching Screenshot 2)
    const drainGeo = new THREE.PlaneGeometry(2.6, 12);
    const drainMat = new THREE.MeshStandardMaterial({
        map: createDrainGrilleTexture(),
        roughness: 0.5,
        metalness: 0.7,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    });
    const drainMesh = new THREE.Mesh(drainGeo, drainMat);
    drainMesh.rotation.x = -Math.PI / 2;
    drainMesh.position.set(0, 0.006, 0.5);
    safehouseGroup.add(drainMesh);

    // Tire skid marks on floor
    const skidGeo = new THREE.RingGeometry(2.6, 3.4, 32);
    const skidMat = new THREE.MeshBasicMaterial({
        color: 0x070912,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
    });
    const skidMesh = new THREE.Mesh(skidGeo, skidMat);
    skidMesh.rotation.x = -Math.PI / 2;
    skidMesh.position.set(0, 0.01, 0);
    safehouseGroup.add(skidMesh);

    // 2. Night Suspension Bridge Panorama visible through the large arched windows
    const bridgeGeo = new THREE.PlaneGeometry(68, 22);
    const bridgeMat = new THREE.MeshBasicMaterial({
        map: createBridgeBackdropTexture(),
        fog: false
    });
    const bridgeBackdrop = new THREE.Mesh(bridgeGeo, bridgeMat);
    bridgeBackdrop.position.set(0, 9.5, -13.2);
    safehouseGroup.add(bridgeBackdrop);

    // Back Wall Structure with 3 Arched Openings
    const backWallMat = new THREE.MeshStandardMaterial({
        color: 0x161a25,
        roughness: 0.85,
        metalness: 0.3
    });
    
    // Bottom apron
    const backApronGeo = new THREE.BoxGeometry(64, 2.5, 0.8);
    const backApron = new THREE.Mesh(backApronGeo, backWallMat);
    backApron.position.set(0, 1.25, -11.8);
    safehouseGroup.add(backApron);

    // Top lintel
    const backLintelGeo = new THREE.BoxGeometry(64, 3.5, 0.8);
    const backLintel = new THREE.Mesh(backLintelGeo, backWallMat);
    backLintel.position.set(0, 15.5, -11.8);
    safehouseGroup.add(backLintel);

    // 3 Arched Windows
    const windowMat = new THREE.MeshBasicMaterial({
        map: createArchedWindowTexture(),
        transparent: true,
        opacity: 0.95
    });

    [-16, 0, 16].forEach(wx => {
        const winGeo = new THREE.PlaneGeometry(12.5, 12.5);
        const winMesh = new THREE.Mesh(winGeo, windowMat);
        winMesh.position.set(wx, 8.8, -11.6);
        safehouseGroup.add(winMesh);
    });

    // Wall dividers / piers between windows
    [-8, 8, -24, 24].forEach(px => {
        const pierGeo = new THREE.BoxGeometry(3.5, 14, 0.9);
        const pier = new THREE.Mesh(pierGeo, backWallMat);
        pier.position.set(px, 7.5, -11.8);
        safehouseGroup.add(pier);
    });

    // 3. Left Wall with Syntec Banner, Oil Rack, and Stepladder (matching Screenshot 2)
    const leftWallMat = new THREE.MeshStandardMaterial({
        color: 0x202430,
        roughness: 0.8,
        metalness: 0.2
    });
    const leftWallGeo = new THREE.BoxGeometry(0.8, 18, 36);
    const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWall.position.set(-18, 9, 0);
    safehouseGroup.add(leftWall);

    // Syntec "Unlock The Power" Parody Banner
    const bannerGeo = new THREE.PlaneGeometry(9.5, 4.8);
    const bannerMat = new THREE.MeshBasicMaterial({
        map: createSyntecBannerTexture(),
        side: THREE.DoubleSide
    });
    const syntecBanner = new THREE.Mesh(bannerGeo, bannerMat);
    syntecBanner.rotation.y = Math.PI / 2;
    syntecBanner.position.set(-17.55, 7.5, -2.5);
    safehouseGroup.add(syntecBanner);

    // Oil Bottle Display Rack under the Syntec Banner
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x181a20, metalness: 0.8, roughness: 0.3 });
    const shelfGroup = new THREE.Group();
    // 4 vertical rack posts
    [[-1.8, -0.4], [1.8, -0.4], [-1.8, 0.4], [1.8, 0.4]].forEach(([rx, rz]) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2), rackMat);
        post.position.set(rx, 1.6, rz);
        shelfGroup.add(post);
    });
    // 3 shelves
    [0.7, 1.5, 2.3].forEach(sy => {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.06, 0.9), rackMat);
        shelf.position.set(0, sy, 0);
        shelfGroup.add(shelf);

        // Rows of Syntec motor oil bottles (green & silver)
        for (let b = 0; b < 7; b++) {
            const bx = -1.5 + b * 0.5;
            const isGreen = (b % 2 === 0);
            const bottleMat = new THREE.MeshStandardMaterial({
                color: isGreen ? 0x0a6b28 : 0xb8c0cc,
                metalness: isGreen ? 0.2 : 0.8,
                roughness: 0.3
            });
            const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.35, 10), bottleMat);
            bottle.position.set(bx, sy + 0.175, 0);
            shelfGroup.add(bottle);
            // Cap
            const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8), new THREE.MeshBasicMaterial({ color: isGreen ? 0xffcc00 : 0x111111 }));
            cap.position.set(bx, sy + 0.39, 0);
            shelfGroup.add(cap);
        }
    });
    shelfGroup.position.set(-17.1, 0, -2.5);
    shelfGroup.rotation.y = Math.PI / 2;
    safehouseGroup.add(shelfGroup);

    // Wooden A-Frame Stepladder leaning by the wall (matching Screenshot 2)
    const ladderGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x9b7848, roughness: 0.75 });
    const legGeo = new THREE.BoxGeometry(0.08, 3.6, 0.1);
    const leftLeg = new THREE.Mesh(legGeo, woodMat);
    leftLeg.rotation.z = 0.12;
    leftLeg.position.set(-0.35, 1.75, 0);
    ladderGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, woodMat);
    rightLeg.rotation.z = -0.12;
    rightLeg.position.set(0.35, 1.75, 0);
    ladderGroup.add(rightLeg);

    for (let st = 0; st < 5; st++) {
        const stepY = 0.6 + st * 0.55;
        const stepW = 0.65 - st * 0.06;
        const step = new THREE.Mesh(new THREE.BoxGeometry(stepW, 0.05, 0.16), woodMat);
        step.position.set(0, stepY, 0);
        ladderGroup.add(step);
    }
    ladderGroup.rotation.y = Math.PI / 2 + 0.18;
    ladderGroup.rotation.x = -0.14;
    ladderGroup.position.set(-17.2, 0, 2.2);
    safehouseGroup.add(ladderGroup);

    // 4. Right Wall with Industrial Bay Door & Tool Chest
    const rightWallGeo = new THREE.BoxGeometry(0.8, 18, 36);
    const rightWall = new THREE.Mesh(rightWallGeo, leftWallMat);
    rightWall.position.set(18, 9, 0);
    safehouseGroup.add(rightWall);

    // Garage Roller Shutter Door
    const shutterGeo = new THREE.BoxGeometry(0.4, 11, 14);
    const shutterMat = new THREE.MeshStandardMaterial({ color: 0x242b3a, roughness: 0.45, metalness: 0.75 });
    const shutter = new THREE.Mesh(shutterGeo, shutterMat);
    shutter.position.set(17.5, 5.5, -2);
    safehouseGroup.add(shutter);

    // Red Mechanic Tool Chest with Drawers
    const toolChestGroup = new THREE.Group();
    const chestBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.8, 3.2), new THREE.MeshStandardMaterial({ color: 0xbb1122, roughness: 0.35, metalness: 0.4 }));
    chestBody.position.y = 0.9;
    toolChestGroup.add(chestBody);
    for (let dr = 0; dr < 4; dr++) {
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8), new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.9 }));
        handle.rotation.z = Math.PI / 2;
        handle.position.set(-0.72, 0.45 + dr * 0.36, 0);
        toolChestGroup.add(handle);
    }
    toolChestGroup.position.set(16.5, 0, 5.5);
    safehouseGroup.add(toolChestGroup);

    // Tire stacks
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.85 });
    [-15.5, 15.5].forEach(xStack => {
        for (let j = 0; j < 3; j++) {
            const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.45, 18), tireMat);
            tire.position.set(xStack + (Math.random() * 0.4), 0.225 + (j * 0.45), -8);
            safehouseGroup.add(tire);
        }
    });

    // 5. Overhead Warehouse Steel Roof Trusses & Hanging Lamps
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x1e2432, roughness: 0.6, metalness: 0.8 });
    [-8, 0, 8].forEach(tz => {
        const beamTop = new THREE.Mesh(new THREE.BoxGeometry(36, 0.35, 0.35), trussMat);
        beamTop.position.set(0, 15.5, tz);
        safehouseGroup.add(beamTop);

        const beamBottom = new THREE.Mesh(new THREE.BoxGeometry(36, 0.35, 0.35), trussMat);
        beamBottom.position.set(0, 13.5, tz);
        safehouseGroup.add(beamBottom);

        for (let ws = -15; ws <= 15; ws += 3) {
            const strut = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.3, 0.2), trussMat);
            strut.rotation.z = (ws % 6 === 0) ? 0.55 : -0.55;
            strut.position.set(ws, 14.5, tz);
            safehouseGroup.add(strut);
        }
    });

    // Hanging Industrial Pendant Lamps
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x11141c, metalness: 0.8 });
    [[-3, 0], [3, 0]].forEach(([lx, lz]) => {
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 5.5), lampMat);
        wire.position.set(lx, 10.8, lz);
        safehouseGroup.add(wire);

        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.5, 16, 1, true), lampMat);
        shade.position.set(lx, 8.2, lz);
        safehouseGroup.add(shade);

        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfff0c8 }));
        bulb.position.set(lx, 8.0, lz);
        safehouseGroup.add(bulb);
    });

    // 6. Signature Curved Neon Light Ribbon (NFS Carbon Light Trail)
    const curvePoints = [
        new THREE.Vector3(-14, 0.6, -1),
        new THREE.Vector3(-9, 1.2, 1.8),
        new THREE.Vector3(-4, 0.4, 3.4),
        new THREE.Vector3(1.5, 0.9, 3.6),
        new THREE.Vector3(7, 2.2, 1.2),
        new THREE.Vector3(12, 4.0, -1.5),
        new THREE.Vector3(16, 2.2, -4)
    ];
    const ribbonCurve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(ribbonCurve, 80, 0.12, 8, false);
    const ribbonMat = new THREE.MeshBasicMaterial({
        color: 0x00ffc8,
        transparent: true,
        opacity: 0.95
    });
    safehouseRibbon = new THREE.Mesh(tubeGeo, ribbonMat);
    safehouseGroup.add(safehouseRibbon);

    // Outer glow tube
    const outerTubeGeo = new THREE.TubeGeometry(ribbonCurve, 80, 0.38, 8, false);
    const outerTubeMat = new THREE.MeshBasicMaterial({
        color: 0x0088ff,
        transparent: true,
        opacity: 0.35,
        side: THREE.BackSide
    });
    const outerRibbon = new THREE.Mesh(outerTubeGeo, outerTubeMat);
    safehouseRibbon.add(outerRibbon);

    // 7. Showcase Spotlights on Car
    const carSpotlight = new THREE.SpotLight(0xfff5e6, 3.8, 28, Math.PI / 4, 0.38, 1);
    carSpotlight.position.set(3, 8.5, 4.5);
    carSpotlight.target.position.set(0, 0.5, 0);
    safehouseGroup.add(carSpotlight);
    safehouseGroup.add(carSpotlight.target);

    // Cyan Rim Fill Light
    const cyanRimLight = new THREE.SpotLight(0x00ffc8, 2.8, 24, Math.PI / 3, 0.5, 1);
    cyanRimLight.position.set(-6, 5, -4);
    cyanRimLight.target.position.set(0, 0.5, 0);
    safehouseGroup.add(cyanRimLight);
    safehouseGroup.add(cyanRimLight.target);

    // Soft Ambient Warm Fill from window bridge
    const windowAmbLight = new THREE.PointLight(0x5a3b72, 2.2, 30);
    windowAmbLight.position.set(0, 9, -10);
    safehouseGroup.add(windowAmbLight);

    scene.add(safehouseGroup);
}

function setupSafehouseControls() {
    window.addEventListener('mousedown', (e) => {
        if (!isSafehouseMode) return;
        isSafehouseDragging = true;
        safehouseLastX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSafehouseMode || !isSafehouseDragging || !playerCar) return;
        const deltaX = e.clientX - safehouseLastX;
        safehouseLastX = e.clientX;
        safehouseDragVelocity = deltaX * 0.015;
        playerCar.rotation.y += safehouseDragVelocity;
    });

    window.addEventListener('mouseup', () => { isSafehouseDragging = false; });

    // Touch support for mobile
    window.addEventListener('touchstart', (e) => {
        if (!isSafehouseMode || e.touches.length === 0) return;
        isSafehouseDragging = true;
        safehouseLastX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isSafehouseMode || !isSafehouseDragging || !playerCar || e.touches.length === 0) return;
        const deltaX = e.touches[0].clientX - safehouseLastX;
        safehouseLastX = e.touches[0].clientX;
        safehouseDragVelocity = deltaX * 0.018;
        playerCar.rotation.y += safehouseDragVelocity;
    }, { passive: true });

    window.addEventListener('touchend', () => { isSafehouseDragging = false; });
}

function openCarbonMainMenu() {
    isSafehouseMode = true;

    // Sembunyikan layar lain
    const splash = document.getElementById('splash-screen');
    if (splash) splash.style.display = 'none';

    const titleScreen = document.getElementById('title-screen');
    if (titleScreen) titleScreen.style.display = 'none';

    const hudOverlay = document.getElementById('hud-overlay');
    if (hudOverlay) hudOverlay.style.display = 'none';

    // Tampilkan NFS Carbon Main Menu
    const menuEl = document.getElementById('carbon-main-menu');
    if (menuEl) menuEl.style.display = 'flex';

    // Tampilkan 3D Safehouse Garage
    if (safehouseGroup) safehouseGroup.visible = true;

    // Sembunyikan segmen jalan raya saat di garasi
    roadSegments.forEach(r => r.group.visible = false);

    // Posisikan mobil di tengah panggung dengan sudut 3/4 depan heroik (seperti Audi R8 di foto)
    if (playerCar) {
        playerCar.position.set(0, 0, 0);
        playerCar.rotation.set(0, -0.45, 0);
    }

    // Kamera Safehouse dramatis dari sudut depan bawah
    camera.position.set(3.8, 1.4, 5.2);
    camera.lookAt(0, 0.7, 0);

    // Update kartu spesifikasi mobil
    updateCarbonMenuCarCard();

    // Mainkan musik Safehouse / Garage
    if (typeof musicEngine !== 'undefined') {
        musicEngine.setMusicMood("garage");
        musicEngine.startBgmLoop();
    }
}

function updateSafehouseTurntable(delta) {
    if (!playerCar) return;

    if (isSafehouseDragging) {
        // Rotasi diatur drag mouse / touch
    } else {
        if (Math.abs(safehouseDragVelocity) > 0.0001) {
            playerCar.rotation.y += safehouseDragVelocity;
            safehouseDragVelocity *= 0.92;
        } else {
            // Rotasi perlahan ala turntable pameran mobil
            playerCar.rotation.y += 0.004;
        }
    }

    // Animasi bernafas pada pita cahaya neon biru Carbon
    if (safehouseRibbon) {
        safehouseRibbon.rotation.y = Math.sin(performance.now() * 0.001) * 0.04;
    }

    if (isGarageCustomizeOpen) {
        camera.position.set(3.2, 1.35, 4.8);
        camera.lookAt(0.6, 0.65, 0);
    } else {
        camera.position.set(3.8, 1.4, 5.2);
        camera.lookAt(0, 0.7, 0);
    }
}

function selectCarbonMenuTab(tabKey) {
    currentMenuTab = tabKey;
    CARBON_MENU_TABS.forEach(t => {
        const btn = document.getElementById('cmenu-' + t);
        if (btn) {
            if (t === tabKey) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    });

    const actionLabel = document.getElementById('cmenu-action-label');
    if (actionLabel) {
        if (tabKey === 'freeroam') actionLabel.innerText = "JELAJAH BEBAS (FREE ROAM)";
        else if (tabKey === 'map') actionLabel.innerText = "BUKA PETA SHUTO GPS";
        else if (tabKey === 'career') actionLabel.innerText = "MULAI KARIER";
        else if (tabKey === 'garage') actionLabel.innerText = "MODIFIKASI DI GARASI";
        else if (tabKey === 'blacklist') actionLabel.innerText = "TANTANG KUROLIST 17";
        else if (tabKey === 'character') actionLabel.innerText = "CUSTOM DRIVER";
        else actionLabel.innerText = "PILIH";
    }

    playSynthTone(320, 0.08, 'sine', 0.2);
}

function nextCarbonMenuTab() {
    const idx = CARBON_MENU_TABS.indexOf(currentMenuTab);
    const nextIdx = (idx + 1) % CARBON_MENU_TABS.length;
    selectCarbonMenuTab(CARBON_MENU_TABS[nextIdx]);
}

function prevCarbonMenuTab() {
    const idx = CARBON_MENU_TABS.indexOf(currentMenuTab);
    const prevIdx = (idx - 1 + CARBON_MENU_TABS.length) % CARBON_MENU_TABS.length;
    selectCarbonMenuTab(CARBON_MENU_TABS[prevIdx]);
}

function executeCarbonMenuAction() {
    playSynthTone(550, 0.15, 'sawtooth', 0.25);

    if (currentMenuTab === 'freeroam') {
        startFreeRoam();
    } else if (currentMenuTab === 'map') {
        toggleShutoMapModal(true);
    } else if (currentMenuTab === 'career') {
        startJapaneseIntroCutscene();
    } else if (currentMenuTab === 'garage') {
        toggleGarage(true);
    } else if (currentMenuTab === 'blacklist') {
        toggleBlacklistModal(true);
    } else if (currentMenuTab === 'character') {
        toggleCharacterCreator(true);
    }
}

function startFreeRoam(locationName = "Tokyo Shuto C1 Loop") {
    isSafehouseMode = false;
    const menuEl = document.getElementById('carbon-main-menu');
    if (menuEl) menuEl.style.display = 'none';

    toggleShutoMapModal(false);

    if (safehouseGroup) safehouseGroup.visible = false;
    roadSegments.forEach(r => r.group.visible = true);

    const hudOverlay = document.getElementById('hud-overlay');
    if (hudOverlay) hudOverlay.style.display = 'flex';

    if (playerCar) {
        playerCar.position.set(0, 0, 0);
        playerCar.rotation.set(0, 0, 0);
    }
    speed = 95; // Kecepatan jelajah awal di tol

    if (typeof musicEngine !== 'undefined') {
        musicEngine.setMusicMood("freeroam");
        musicEngine.startBgmLoop();
    }

    showRadioMessage("FREE ROAM", `JELAJAH BEBAS: ${locationName.toUpperCase()}! Geber gas pol, nikmati malam Tokyo, atau cari rival!`, "🌃");
}

function toggleShutoMapModal(open) {
    const modal = document.getElementById('shuto-map-modal');
    if (modal) modal.style.display = open ? 'flex' : 'none';
    if (open) playSynthTone(400, 0.1, 'sine', 0.2);
}

function startQuickRaceDirectly() {
    startFreeRoam("C1 Canyon Sprint");
    speed = 130;
    if (typeof musicEngine !== 'undefined') {
        musicEngine.setMusicMood("sprint");
    }
    showRadioMessage("RACE START!", "HAJAR GAS POL! SHUTO EXPRESSWAY CANYON SPRINT!", "🏁");
}

function returnToCarbonMainMenu() {
    toggleGarage(false);
    toggleBlacklistModal(false);
    toggleCharacterCreator(false);
    toggleShutoMapModal(false);

    openCarbonMainMenu();
}

function updateCarbonMenuCarCard() {
    if (!currentCarData) return;
    const brandEl = document.getElementById('cmenu-car-brand');
    const nameEl = document.getElementById('cmenu-car-name');
    const tierEl = document.getElementById('cmenu-car-tier');
    const speedEl = document.getElementById('cmenu-spec-speed');
    const accelEl = document.getElementById('cmenu-spec-accel');
    const barSpeed = document.getElementById('cmenu-bar-speed');
    const barAccel = document.getElementById('cmenu-bar-accel');

    if (brandEl) brandEl.innerText = currentCarData.brand;
    if (nameEl) nameEl.innerText = currentCarData.parodyName;
    if (tierEl) tierEl.innerText = `TIER ${currentCarData.tier} // ${currentCarData.tierName}`;
    if (speedEl) speedEl.innerText = `${currentCarData.specs.topSpeed} KM/H`;
    if (accelEl) accelEl.innerText = `${currentCarData.specs.accel}s`;

    if (barSpeed) barSpeed.style.width = `${Math.min(100, (currentCarData.specs.topSpeed / 380) * 100)}%`;
    if (barAccel) barAccel.style.width = `${Math.min(100, ((6.5 - currentCarData.specs.accel) / 4) * 100)}%`;

    // Dynamic Career % and Cash for NFS Carbon Status Panel (matching Screenshot 2)
    const careerPctEl = document.getElementById('cmenu-career-percent');
    const careerCashEl = document.getElementById('cmenu-career-cash');
    if (careerPctEl && typeof BLACKLIST_DATABASE !== 'undefined') {
        const defeatedCount = BLACKLIST_DATABASE.filter(b => b.defeated).length;
        const pct = Math.round((defeatedCount / BLACKLIST_DATABASE.length) * 100);
        careerPctEl.innerText = `${pct}%`;
    }
    if (careerCashEl) {
        const cashVal = typeof playerMoney !== 'undefined' ? playerMoney : (typeof playerBounty !== 'undefined' ? playerBounty : 15000);
        careerCashEl.innerText = `${cashVal.toLocaleString().replace(/,/g, ' ')}`;
    }
}

function cycleNextCarFromMenu() {
    const curIdx = CAR_DATABASE.findIndex(c => c.id === currentCarData.id);
    const nextIdx = (curIdx + 1) % CAR_DATABASE.length;
    currentCarData = CAR_DATABASE[nextIdx];
    spawnPlayerCar(currentCarData);
    updateCarbonMenuCarCard();
    playSynthTone(420, 0.1, 'sine', 0.2);
    showRadioMessage("SHOWROOM", `${currentCarData.brand} — ${currentCarData.parodyName}`, "🏎️");
}

// Start Game on load
window.onload = () => {
    try {
        init();
    } catch(err) {
        console.error("Game Engine Init Warning:", err);
    }
    try {
        runStudioSplashSequence();
    } catch(e) {
        if (typeof dismissSplashScreen === 'function') dismissSplashScreen();
    }
};

