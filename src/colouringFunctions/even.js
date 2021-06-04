import * as THREE from 'three';
import { NUM_POINTS, NUM_STEPS } from '../constants';

const getColours = () => Array.from({ length: NUM_STEPS }).flatMap(_ => {
    const c = new THREE.Color(`hsl(${Math.floor(Math.random() * 360) % 360}, 100%, 50%)`)
    return Array.from({length: NUM_POINTS}).flatMap(_=> {
        return [c.r, c.g, c.b];
    })
})

export {
    getColours
}