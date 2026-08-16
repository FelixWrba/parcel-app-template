import { $ } from "./lib";

const btnIncrease = $('#btn-increase');
const btnReset = $('#btn-reset');

let count = 0;

btnIncrease.addEventListener('click', () => {
    count++;
    btnIncrease.innerText = count;
});

btnReset.addEventListener('click', () => {
    count = 0;
    btnIncrease.innerText = '0';
});
