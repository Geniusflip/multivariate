import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { SMAAPass} from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { MIN_T, MAX_T, DELTA_T, NUM_POINTS, NUM_STEPS } from './constants';
import { camera, updateCamera } from './camera';
import { getSeed } from './util';
import { render } from './renderFunctions';
import { getColours } from './colouringFunctions'
let T = MIN_T;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let coords = Array.from({length: NUM_POINTS * NUM_STEPS }).flatMap(_ => [T , T, 0]);

const pointsgeometry = new THREE.BufferGeometry();
pointsgeometry.setAttribute('position', new THREE.Float32BufferAttribute( coords, 3));
pointsgeometry.setAttribute('color', new THREE.Float32BufferAttribute( 
    getColours(), 3
))
const pointsMat = new THREE.PointsMaterial({
    vertexColors: THREE.VertexColors,
    size: 1,
    sizeAttenuation: 1,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
});
const points = new THREE.Points( pointsgeometry, pointsMat);
scene.add( points );

const composer = new EffectComposer(renderer);
const pixelRatio = renderer.getPixelRatio();
// const fxaaPass = new ShaderPass( FXAAShader );

// fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / pixelRatio;
// fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / pixelRatio;

composer.addPass(new RenderPass(scene, camera));

composer.addPass( new AfterimagePass(0.75) );
composer.addPass( new UnrealBloomPass(2, 0.85, 0, 0.1) );
composer.addPass( new SMAAPass(window.innerHeight * pixelRatio, window.innerWidth * pixelRatio) );
// if (Math.random() > 0.5) {
//     composer.addPass( fxaaPass );
// }

function animate() {
    T = T >= MAX_T ? MIN_T : T + DELTA_T;
    updateCamera()
    pointsgeometry.setAttribute( 'position', new THREE.Float32BufferAttribute(render(coords, T), 3));
    composer.render();
    requestAnimationFrame( animate );
}

setTimeout(() => {
    location.reload();
}, 60*1000);
animate();