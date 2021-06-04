import { getColours as getColours1 } from './even.js'; 
import { getColours as getColours2 } from './white.js'; 
import { getColours as getColours3 } from './random.js'; 
import { getColours as getColours4 } from './odd.js'; 

const funcs = [
    getColours1,
    getColours2,
    getColours3,
    getColours4,
]
const getColours = funcs[Math.floor( Math.random() * funcs.length)];

export {
    getColours
}