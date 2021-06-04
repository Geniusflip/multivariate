import { NUM_STEPS, NUM_POINTS } from '../constants';
import { getSeed } from '../util';
const seedLookup = getSeed(42);

const DELTA = 1e-5;

const render = (coords, T) => {
    const coordinates = [];
    const f = (val, i) => val * seedLookup[i];
    for (let step = 0; step < NUM_STEPS; step++) {
        let t = T + (step * NUM_POINTS * DELTA);
        let x = t, y = t, z = t;
        for (let iter = 0; iter < NUM_POINTS; iter++){
            const xx = x*x, yy = y*y, tt = t*t, zz = z * z, xy = x*y, xt = x * t, xz = x * z, tz = t * z, yz = y * z, yt = y * t;
            const dx = f(xx, 0) + f(yy, 1) + f(tt, 2) + f(zz, 3) + f(xy, 4) + f(xt, 5) + f(xz, 6) + f(tz, 7) + f(yz, 8) + f(yt, 9) + f(x, 10) + f(y, 11) + f(t, 12) + f(z, 13);
            const dy = f(xx, 14) + f(yy, 15) + f(tt, 16) + f(zz, 17) + f(xy, 18) + f(xt, 19) + f(xz, 20) + f(tz, 21) + f(yz, 22) + f(yt, 23) + f(x, 24) + f(y, 25) + f(t, 26) + f(z, 27);
            coordinates.push(dx, dy, 0)
            x = dx, y = dy, t += DELTA;
        };
    }
    return coordinates;
}

export {
    render
}