import * as THREE from 'three';
import { NUM_POINTS, NUM_STEPS } from '../constants';

const getColours = () => Array.from({ length: NUM_STEPS }).flatMap(_ => {
    return Array.from({length: NUM_POINTS}).flatMap(_=> {
        const c = new THREE.Color(`white`)
        return [c.r, c.g, c.b];
    })
})

export {
    getColours
}