import './style.css'

import * as THREE from'three';

import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});
renderer.setPixelRatio(window.devicePixelRatio );
renderer.setSize( window.innerWidth,innerHeight);

camera.position.setZ(10);

renderer.render ( scene, camera);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({color:0x003FFF, wireframe: true});
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(900, 50);
  
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.Sphere(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color:0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}


const spaceTexture = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1610296669228-602fa827fc1f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzOTk4MTU0Mw&ixlib=rb-1.2.1&q=85');
scene.background = spaceTexture;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

controls.update();

  renderer.render ( scene, camera);
}

animate()
