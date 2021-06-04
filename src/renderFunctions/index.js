import { render as Render1 } from './badChaos'; 
import { render as Render2 } from './threeChaos'; 

const renderers = [
    Render1,
    Render2
]
const render = renderers[Math.floor( Math.random() * renderers.length)];

export {
    render
}