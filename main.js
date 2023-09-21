import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 3. Objects
// const geometry = new THREE.SphereGeometry(1, 32, 32); // Adjusted sphere geometry
// const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);
const loader = new GLTFLoader();

loader.load(
  "/planet/scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// 4. Add a light
const pointLight = new THREE.PointLight(0xffffff); // Added a white light
pointLight.position.set(5, 5, 5); // Adjusted light position
scene.add(pointLight);

// 5. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbital Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
camera.position.z = 5;
controls.update();

// Animation
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
animate();
