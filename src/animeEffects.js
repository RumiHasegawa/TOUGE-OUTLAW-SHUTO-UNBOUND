/**
 * ANIME & NFS UNBOUND VISUAL EFFECTS SYSTEM
 * Cel-shading helpers, Manga wings, Cartoon smoke particles, and Speed lines
 */

class AnimeEffectsManager {
    constructor(scene) {
        this.scene = scene;
        this.smokeParticles = [];
        this.wingMeshes = null;
        this.lightningRays = [];
        this.activeTag = "cyber_wings";
        this.tagColor = "#ff0077";

        this.initWings();
    }

    // Buat sayap anime kartun ala NFS Unbound di bagian samping/belakang mobil
    initWings() {
        const wingGroup = new THREE.Group();

        // Material sayap bergaya anime cel-shading neon dengan emissive
        const wingMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(this.tagColor),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            depthWrite: false
        });

        // Bentuk sayap anime mecha tajam
        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 0);
        wingShape.lineTo(1.8, 0.4);
        wingShape.lineTo(2.4, 1.2);
        wingShape.lineTo(1.6, 0.9);
        wingShape.lineTo(2.2, 1.8);
        wingShape.lineTo(1.2, 1.3);
        wingShape.lineTo(1.5, 2.2);
        wingShape.lineTo(0.4, 1.0);
        wingShape.lineTo(0, 0);

        const wingGeo = new THREE.ShapeGeometry(wingShape);

        // Sayap Kanan
        const rightWing = new THREE.Mesh(wingGeo, wingMat);
        rightWing.position.set(0.9, 0.6, -0.6);
        rightWing.rotation.set(0.2, 0.3, 0.1);
        wingGroup.add(rightWing);

        // Sayap Kiri
        const leftWing = new THREE.Mesh(wingGeo, wingMat);
        leftWing.scale.set(-1, 1, 1);
        leftWing.position.set(-0.9, 0.6, -0.6);
        leftWing.rotation.set(0.2, -0.3, -0.1);
        wingGroup.add(leftWing);

        this.wingMeshes = wingGroup;
        this.wingMat = wingMat;
        this.scene.add(this.wingMeshes);
    }

    setTag(tagId, hexColor) {
        this.activeTag = tagId;
        this.tagColor = hexColor || "#ff0077";
        if (this.wingMat) {
            this.wingMat.color.set(this.tagColor);
        }
    }

    // Trigger visual efek sayap / aura saat Nitro aktif
    updateNitroWings(carPos, carRot, isNosActive, speedRatio) {
        if (!this.wingMeshes) return;

        this.wingMeshes.position.copy(carPos);
        this.wingMeshes.rotation.copy(carRot);

        if (isNosActive && this.activeTag === "cyber_wings") {
            this.wingMat.opacity = Math.min(1.0, this.wingMat.opacity + 0.15);
            const pulse = 1.0 + Math.sin(Date.now() * 0.02) * 0.1;
            this.wingMeshes.scale.set(pulse, pulse, pulse);
        } else {
            this.wingMat.opacity = Math.max(0.0, this.wingMat.opacity - 0.1);
        }
    }

    // Spawn asap ban kartun anime tebal bergaya cel-shaded puff
    spawnTireSmoke(pos, colorHex, driftAngle) {
        const size = 0.5 + Math.random() * 0.6;
        const geo = new THREE.DodecahedronGeometry(size, 0); // Poligon kartun
        const mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(colorHex),
            transparent: true,
            opacity: 0.85
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        mesh.position.x += (Math.random() - 0.5) * 0.4;
        mesh.position.y += 0.2;
        mesh.position.z += (Math.random() - 0.5) * 0.4;

        this.scene.add(mesh);

        this.smokeParticles.push({
            mesh: mesh,
            mat: mat,
            life: 1.0,
            grow: 1.04 + Math.random() * 0.02,
            rotSpeed: (Math.random() - 0.5) * 0.1
        });
    }

    updateSmoke(delta) {
        for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
            const p = this.smokeParticles[i];
            p.life -= delta * 1.8;
            p.mat.opacity = p.life * 0.8;
            p.mesh.scale.multiplyScalar(p.grow);
            p.mesh.position.y += delta * 1.2;
            p.mesh.rotation.y += p.rotSpeed;

            if (p.life <= 0) {
                this.scene.remove(p.mesh);
                p.mesh.geometry.dispose();
                p.mat.dispose();
                this.smokeParticles.splice(i, 1);
            }
        }
    }
}
