import * as THREE from 'three';
import { RenderPass, EffectComposer } from 'postprocessing';
import { ShaderMaterial } from 'three';
// import { makeNoise3D } from 'fast-simplex-noise'
import { noise } from '@chriscourses/perlin-noise';
import fragmentShader from './shaders/fragmentShader.glsl';
import vertexShader from './shaders/vertexShader.glsl';

const ASPECT_RATIO =  window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera( 45, ASPECT_RATIO, 1, 1000 );
camera.position.set(0, 0, 10);


const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const uniforms = THREE.UniformsUtils.merge([
    {
        seed: { value: Math.random() },
        time: { value: 0 },
        multiplier: { value: Math.random() }
    },
    THREE.UniformsLib['lights']
]);

let myEffect = {
    uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
};


const customShader = new ShaderMaterial(myEffect);
// Plane
const worldWidth = 7;
const worldHeight = 5.5;
const gridSize = 4;
const planeGeometry = new THREE.PlaneGeometry(worldWidth, worldHeight, gridSize - 1, gridSize - 1);

const terrain = new THREE.Mesh(planeGeometry, customShader);

scene.add(terrain);
const composer = new EffectComposer(renderer);

customShader.renderToScreen = true;


composer.addPass(new RenderPass(scene, camera));
// if (Math.random() > 0.5) {
//     composer.addPass( fxaaPass );
// }
const initTime = new Date().getTime();
function animate() {
    myEffect.uniforms.time.value = initTime - new Date().getTime();
    composer.render();
    setTimeout(() => {
        requestAnimationFrame( animate );
    }, 1000/ 20);
}
animate();