import { $ } from "./lib";

const btn = $('#btn');
btn.addEventListener('click', () => btn.innerText = Number(btn.innerText) + 1);
