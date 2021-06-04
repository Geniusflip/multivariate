import { SEED } from './constants';

const debug = document.getElementById('debug');
const getRandom = () => Math.ceil(Math.random() * 2) - 2;
const getSeed = (length = 18) => {
    const seed = SEED.length ? SEED : Array.from({ length }).map(_ => getRandom());
    return [...seed];
};
debug.innerHTML = `${SEED.join(', ')} `;

export {
    getSeed
}