import { NUM_STEPS, NUM_POINTS } from '../constants';
import { getSeed } from '../util';
const seedLookup = getSeed();

const DELTA = 1e-5;

const render = (coords, T) => {
    const coordinates = [];
    const f = (val, i) => val * seedLookup[i];
    for (let step = 0; step < NUM_STEPS; step++) {
        let t = T + (step * NUM_POINTS * DELTA), x = t, y = t;
        for (let iter = 0; iter < NUM_POINTS; iter++){
            const dx = f(x * x, 0) + f(y * y, 1) + f(t * t, 2) + f(x * y, 3) + f(x * t, 4) + f(y * t, 5) + f(x, 6) + f(y, 7) + f(t, 8);
            const dy = f(x * x, 9) + f(y * y, 10) + f(t * t, 11) + f(x * y, 12) + f(x * t, 13) + f(y * t, 14) + f(x, 15) + f(y, 16) + f(t, 17);
            coordinates.push(dx, dy, 0)
            x = dx, y = dy, t += DELTA;
        };
    }
    return coordinates;
}

export {
    render
}