import * as THREE from 'three';
import { ASPECT_RATIO, ZOOM_FACTOR } from './constants';

const camera = new THREE.OrthographicCamera(-1 * ASPECT_RATIO, ASPECT_RATIO, 1, -1, 0.1, 20);
camera.position.set(0, 0, 1.5);

const updateCamera = () => {
    const shouldZoom = camera.zoom > 1 ? camera.zoom < 4 ? true : false : true;
    camera.zoom += shouldZoom ? ZOOM_FACTOR : -ZOOM_FACTOR;
    camera.updateProjectionMatrix();
}
export {
    camera,
    updateCamera
}