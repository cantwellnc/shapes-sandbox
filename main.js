import * as THREE from 'three';
import { CylinderBufferGeometry, DirectionalLightHelper, EdgesGeometry, MeshToonMaterial, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );

// params are FOV (field of view in degrees), aspect ratio, near clipping ration,
// and far clipping ratio:  objects further away from the camera than the value of 
// far or closer than near won't be rendered
const camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({  
  canvas: document.querySelector('#bg'),
  antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);

// this allows us to move the camera with out mouse + zoom in and out
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; 
controls.dampingFactor = 0.05;

// add a cube to scene
// geometry contains all vertices + faces of object
const cube_geometry = new THREE.BoxGeometry(30,30,30); 
// material is what colors the faces of the geometry
const edges = new THREE.EdgesGeometry( cube_geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add(line);
const cube_material = new THREE.MeshPhongMaterial({
  color: 0xff3fff,
  flatShading: true
}); 
// the mesh wraps the material around a geometry, making an object which we can view
const cube = new THREE.Mesh(cube_geometry, cube_material); 
scene.add(cube)
camera.position.z = 60;
camera.position.x = 100;
camera.position.y = 30; 

const dirLight1 = new THREE.DirectionalLight( 0xffffff );
dirLight1.position.set( 20, 10, 1 );
scene.add(dirLight1);

// const lighthelper = new DirectionalLightHelper(dirLight1); 
// scene.add(lighthelper);

const tetra_geometry = new THREE.CylinderGeometry(0,5,10, 4, 1, false); 
const tetra_material = new THREE.MeshPhongMaterial({
  color: 0xffc0cb,
  flatShading: true, 
  transparent: true,
  opacity: 0.8
})

const tetra = new THREE.Mesh(tetra_geometry, tetra_material);
// tetra.position = new Vector3(40, 40, 10);
tetra.position.set(30,30,30)
scene.add(tetra);

const box_geometry = new THREE.BoxGeometry(30,30,30);
tetra.geometry.merge(box_geometry);
scene.add(tetra);

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);


const octagoon_geometry = new CylinderBufferGeometry(20,50, 10, 8,30, false); 
const octagoon_material = new MeshToonMaterial({
  color: 0xeb9834,
  transparent: true, 
  opacity: 0.5
});
const octagoon = new THREE.Mesh(octagoon_geometry, octagoon_material);
octagoon.position.set(0,30,30)
scene.add(octagoon);
const oct_edge = new EdgesGeometry(octagoon_geometry); 
const oct_line = new THREE.LineSegments( oct_edge, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
oct_line.position.set(0,30,30)
scene.add(oct_line);



// Now we need the animation loop to re-render the scence every time the screen is refreshed
// usually 60fps
let angle = 0;
function animate(){
  // use browser method to call a specific method on canvas repaint 
  requestAnimationFrame( animate ); 
  renderer.render(scene, camera)
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.01;
  line.rotation.x += 0.01; 
  line.rotation.y += 0.01;
  tetra.rotation.x += 0.001;
  octagoon.rotation.y -= 0.01;
  oct_line.rotation.z -= 0.001;
  camera.position.x = 100 * Math.cos(angle);  
  camera.position.z = 100 * Math.sin(angle);
  angle += 0.01; 
  // update the positioning of the camera bc we added a dampening factor
  controls.update();
   
}
animate();