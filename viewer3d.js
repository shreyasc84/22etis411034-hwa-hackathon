import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';

const C = {
  ink: 0x12172b,
  ink2: 0x232b49,
  yellow: 0xffd23f,
  coral: 0xff6b5b,
  teal: 0x4ecdc4,
  green: 0xa2d36c,
  greenDark: 0x77a944,
  greenLight: 0x8cc456,
  kibble: 0xb5793e
};

function plastic(color, extra = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.38,
    metalness: 0.04,
    clearcoat: 0.7,
    clearcoatRoughness: 0.3,
    ...extra
  });
}

function matte(color, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0, ...extra });
}

function shadowed(mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function kibblePieces(group, spots) {
  spots.forEach(([x, z], index) => {
    const piece = shadowed(new THREE.Mesh(
      new THREE.DodecahedronGeometry(index % 2 ? 0.09 : 0.11, 0),
      matte(index % 3 === 0 ? C.yellow : index % 3 === 1 ? C.coral : C.kibble)
    ));
    piece.position.set(x, 0.09, z);
    piece.rotation.set(index, index * 1.7, index * 0.6);
    group.add(piece);
  });
}

function buildKit() {
  const g = new THREE.Group();

  const base = shadowed(new THREE.Mesh(new RoundedBoxGeometry(2.75, 0.95, 2.75, 6, 0.26), plastic(C.ink)));
  base.position.y = 0.475;
  g.add(base);

  const deck = shadowed(new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.2, 2.4, 4, 0.16), plastic(C.ink2)));
  deck.position.y = 0.98;
  g.add(deck);

  const disc = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.18, 72), plastic(C.yellow)));
  disc.position.y = 1.16;
  g.add(disc);

  for (let i = -1; i <= 1; i += 1) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.035, 0.12), plastic(C.ink));
    bar.position.set(0, 1.26, i * 0.38);
    g.add(bar);
  }

  [[-0.62, -0.12], [0.62, -0.12], [-0.62, 0.34], [0.62, 0.34], [-0.3, 0.7], [0.3, 0.7]].forEach(([x, z]) => {
    const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.035, 24), plastic(C.ink));
    peg.position.set(x, 1.26, z);
    g.add(peg);
  });

  const handle = shadowed(new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.115, 18, 48, Math.PI), plastic(C.coral)));
  handle.position.set(0, 1.25, 0);
  g.add(handle);

  const ball = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.6, 48, 48), plastic(C.teal)));
  ball.position.set(1.72, 0.62, 0.88);
  g.add(ball);

  [[0.6, 0.5, 0.62], [-0.5, 0.2, 0.84], [0.1, 0.9, 0.4], [-0.8, 0.5, -0.3], [0.4, -0.2, -0.9]].forEach(([x, y, z]) => {
    const spot = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 18), plastic(C.ink));
    spot.position.copy(ball.position).add(new THREE.Vector3(x, y, z).normalize().multiplyScalar(0.56));
    g.add(spot);
  });

  kibblePieces(g, [[2.4, 0.2], [2.15, 1.25], [2.55, 1.0], [-1.55, 1.4], [-2.0, 0.95]]);
  return g;
}

function buildDiscs() {
  const g = new THREE.Group();
  const layers = [
    { color: C.teal, y: 0.26, ry: 0.35 },
    { color: C.yellow, y: 0.48, ry: -0.24 },
    { color: C.coral, y: 0.7, ry: 0.18 }
  ];

  layers.forEach(({ color, y, ry }) => {
    const disc = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.14, 0.18, 72), plastic(color)));
    disc.position.y = y;
    disc.rotation.y = ry;
    g.add(disc);

    [0.88, 0.54].forEach((radius) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.032, 12, 72), plastic(C.ink, { clearcoat: 0.1 }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y + 0.092;
      ring.rotation.z = ry;
      g.add(ring);
    });
  });

  for (let i = -1; i <= 1; i += 1) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 0.1), plastic(C.ink));
    bar.position.set(0, 0.8, i * 0.3);
    g.add(bar);
  }

  kibblePieces(g, [[-1.6, 0.9], [1.55, 0.7], [1.7, -0.5]]);
  return g;
}

function buildBall() {
  const g = new THREE.Group();

  const ball = shadowed(new THREE.Mesh(new THREE.SphereGeometry(1.05, 56, 56), plastic(C.teal)));
  ball.position.y = 1.02;
  g.add(ball);

  const band = new THREE.Mesh(new THREE.TorusGeometry(1.04, 0.07, 16, 72), plastic(C.ink, { clearcoat: 0.1 }));
  band.rotation.x = Math.PI / 2;
  band.position.y = 1.02;
  g.add(band);

  const holeDir = new THREE.Vector3(0.42, 0.76, 0.5).normalize();
  const hole = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), plastic(C.ink));
  hole.position.set(0, 1.02, 0).addScaledVector(holeDir, 1.0);
  g.add(hole);

  [[0.7, -0.5, 0.5], [-0.65, -0.2, 0.7], [-0.2, 0.4, -0.9], [0.5, -0.6, -0.6], [-0.8, 0.35, -0.45]].forEach(([x, y, z]) => {
    const spot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 18, 18), plastic(C.ink));
    spot.position.set(0, 1.02, 0).add(new THREE.Vector3(x, y, z).normalize().multiplyScalar(0.99));
    g.add(spot);
  });

  kibblePieces(g, [[-1.65, 0.6], [-1.9, 1.0], [1.55, 1.15], [1.85, 0.35], [0.35, 1.6], [-0.4, 1.55]]);
  return g;
}

function buildMat() {
  const g = new THREE.Group();

  const base = shadowed(new THREE.Mesh(new RoundedBoxGeometry(3.05, 0.16, 2.05, 5, 0.09), matte(C.green)));
  base.position.y = 0.08;
  g.add(base);

  for (let row = 0; row < 7; row += 1) {
    const z = -0.75 + row * 0.25;
    const points = [];
    for (let x = -1.34; x <= 1.34; x += 0.11) {
      points.push(new THREE.Vector3(x, 0.21 + Math.sin(x * 3.1 + row * 0.9) * 0.055, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = shadowed(new THREE.Mesh(
      new THREE.TubeGeometry(curve, 48, 0.055, 8, false),
      matte(row % 2 ? C.greenDark : C.greenLight)
    ));
    g.add(tube);
  }

  [[-0.95, -0.15], [0.25, 0.18], [1.0, -0.55], [-0.2, 0.62], [0.62, 0.7]].forEach(([x, z], index) => {
    const treat = shadowed(new THREE.Mesh(
      new THREE.DodecahedronGeometry(index % 2 ? 0.08 : 0.1, 0),
      matte(index % 2 ? C.yellow : C.coral)
    ));
    treat.position.set(x, 0.23, z);
    treat.rotation.set(index, index * 1.4, index * 0.7);
    g.add(treat);
  });

  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.075, 14, 40), plastic(C.coral));
  strap.rotation.x = Math.PI / 2;
  strap.position.set(-1.05, 0.18, 0.62);
  g.add(strap);
  return g;
}

const builders = { kit: buildKit, discs: buildDiscs, ball: buildBall, mat: buildMat };

function createViewer(container) {
  const canvas = container.querySelector('canvas');
  const kind = container.getAttribute('data-3d') || 'kit';
  if (!canvas || !builders[kind]) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.7;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const controls = new OrbitControls(camera, canvas);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.rotateSpeed = 0.8;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.9;
  controls.minPolarAngle = 0.65;
  controls.maxPolarAngle = 1.5;
  if (coarsePointer) {
    controls.enableRotate = false;
    canvas.style.touchAction = 'pan-y';
  }

  scene.add(new THREE.HemisphereLight(0xffffff, 0xc4bda9, 0.9));

  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(5, 9, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  key.shadow.bias = -0.0005;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffe6c0, 1.2);
  fill.position.set(-6, 4, -4);
  scene.add(fill);

  const ground = new THREE.Mesh(new THREE.CircleGeometry(9, 64), new THREE.ShadowMaterial({ opacity: 0.16 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.005;
  ground.receiveShadow = true;
  scene.add(ground);

  const bob = new THREE.Group();
  const model = builders[kind]();
  bob.add(model);
  scene.add(bob);

  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = (maxDim / (2 * Math.tan((camera.fov * Math.PI) / 360))) * 1.5;
  const direction = new THREE.Vector3(0.82, 0.5, 0.9).normalize();
  camera.position.copy(center).addScaledVector(direction, distance);
  controls.target.copy(center);
  controls.minDistance = distance * 0.55;
  controls.maxDistance = distance * 1.7;
  controls.update();

  let width = 0;
  let height = 0;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  let onScreen = true;
  new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
  }, { threshold: 0 }).observe(container);

  let dragged = false;
  canvas.addEventListener('pointerdown', () => {
    if (coarsePointer) return;
    dragged = true;
    container.classList.add('is-dragging');
  });
  window.addEventListener('pointerup', () => {
    dragged = false;
    container.classList.remove('is-dragging');
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (!onScreen) return;
    const t = clock.getElapsedTime();
    if (!reducedMotion && !dragged) {
      bob.position.y = Math.sin(t * 1.15) * 0.045;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  container.classList.add('is-ready');
}

function init() {
  document.querySelectorAll('[data-3d]').forEach((container) => {
    try {
      if (!window.WebGLRenderingContext) throw new Error('WebGL unavailable');
      createViewer(container);
    } catch {
      container.classList.add('viewer-failed');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
