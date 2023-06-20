import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
const canvas = document.querySelector("canvas.webgl");
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

console.log(mesh.position.distanceTo(camera.position));

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);

  console.log(cursor.x, cursor.y);
});

// Controls

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  //   camera.position.y = cursor.y * 3;

  //   mesh.rotation.y = elapsedTime;

  //   mesh.position.x = Math.cos(elapsedTime);
  //   mesh.position.y = Math.sin(elapsedTime);

  //   camera.position.x = Math.cos(elapsedTime);
  //   camera.position.y = Math.sin(elapsedTime);
  //   camera.lookAt(mesh.position);
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
