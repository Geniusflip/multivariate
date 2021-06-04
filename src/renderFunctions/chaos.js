
import { NUM_STEPS, NUM_POINTS } from '../constants';
import { getSeed } from '../util';

const DELTA = 1e-5;
const FLT_MAX = 1e+37;

const loadSeed = () => {
    const f = {};
    const dupeSeed = JSON.parse(JSON.stringify(getSeed()));
    ['x', 'y'].forEach(key => {
        f[key] = {};
        ["xx", "yy", "tt", "xy", "xt", "yt", "xp", "yp", "tp"].forEach(k => {
            f[key][k] = dupeSeed.shift();
        })
    });
    return f;
}

const fp = loadSeed();
const render = (coords, T) => {
    let t = T;
    const coordinates = [];
    for (let step = 0; step < NUM_STEPS; step++) {
        let [x, y] = [t, t];
        for (let iter = 0; iter < NUM_POINTS; iter++){
            console.time('c')
            const c = {
                xx: Math.min(Math.max( x * x, -FLT_MAX), FLT_MAX),
                yy: Math.min(Math.max( y * y, -FLT_MAX), FLT_MAX),
                tt: Math.min(Math.max( t * t, -FLT_MAX), FLT_MAX),
                xy: Math.min(Math.max( x * y, -FLT_MAX), FLT_MAX),
                xt: Math.min(Math.max( x * t, -FLT_MAX), FLT_MAX),
                yt: Math.min(Math.max( y * t, -FLT_MAX), FLT_MAX),
                xp: Math.min(Math.max( x, -FLT_MAX), FLT_MAX),
                yp: Math.min(Math.max( y, -FLT_MAX), FLT_MAX),
                tp: Math.min(Math.max( t, -FLT_MAX), FLT_MAX),
            }
            console.timeEnd('c')
            console.time('calc')
            
            const dx =
                c.xx * fp.x.xx +
                c.yy * fp.x.yy +
                c.tt * fp.x.tt +
                c.xy * fp.x.xy +
                c.xt * fp.x.xt +
                c.yt * fp.x.yt +
                c.xp * fp.x.xp +
                c.yp * fp.x.yp +
                c.tp * fp.x.tp;
            const dy =
                c.xx * fp.y.xx +
                c.yy * fp.y.yy +
                c.tt * fp.y.tt +
                c.xy * fp.y.xy +
                c.xt * fp.y.xt +
                c.yt * fp.y.yt +
                c.xp * fp.y.xp +
                c.yp * fp.y.yp +
                c.tp * fp.y.tp;
            console.timeEnd('calc')
            console.time('loading')
            
            coordinates[(step * NUM_POINTS + iter ) * 3] = dx;
            coordinates[(step * NUM_POINTS + iter ) * 3 + 1] = dy;
            coordinates[(step * NUM_POINTS + iter ) * 3 + 2] = 0
            console.timeEnd('loading')
            t += DELTA ;
            x = dx;
            y = dy;
        };
    }
    return coordinates;
}

export {
    render,
}