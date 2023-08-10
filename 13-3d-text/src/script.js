import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const fontLoader = new FontLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/pink.png");

fontLoader.load("/fonts/moonrocks.typeface.json", (font) => {
  const textConfig = {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  };

  // const goodTextGeometry = new TextGeometry("Good", textConfig);
  const gTextGeometry = new TextGeometry("G", textConfig);
  const o1TextGeometry = new TextGeometry("O", textConfig);
  const o2TextGeometry = new TextGeometry("O", textConfig);
  const dTextGeometry = new TextGeometry("D", textConfig);

  const nightTextGeometry = new TextGeometry("Night", textConfig);

  const textMaterial = new THREE.MeshStandardMaterial({
    color: 0xde95f9,
  });

  const material = new THREE.MeshStandardMaterial({
    color: 0xde38ff,
    transparent: true,
    opacity: 0.9,
  });

  const goodText = new THREE.Mesh(goodTextGeometry, textMaterial);
  const nightText = new THREE.Mesh(nightTextGeometry, textMaterial);

  nightText.position.y = -0.8;
  nightText.position.x = -0.5;

  goodText.position.x = -1.5;
  goodText.position.y = 0.2;

  scene.add(goodText);
  scene.add(nightText);
  const donutGeometry = new THREE.OctahedronGeometry();
  let range = 0.5 - 0.2;

  for (let i = 0; i < 150; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    donut.name = "donut";
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z =
      (Math.random() * (5 - 0.5) + 0.5) * (Math.round(Math.random()) ? 1 : -1);
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random() * 0.2;
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const ambientLight = new THREE.AmbientLight(0x00fffc, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.2);
directionalLight.position.set(1, 0.25, 1);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
// scene.add(directionalLightHelper);
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
const pointLight = new THREE.PointLight(0xff9000, 0.8);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = -0.75;
scene.add(spotLight);
scene.add(spotLight.target);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 2;
controls.maxDistance = 6;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  scene.traverse(function (child) {
    if (child.name === "donut") {
      child.rotation.x += 0.005;
      child.rotation.y += 0.005;
    }
  });

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
