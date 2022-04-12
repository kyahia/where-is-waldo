import "./style.css";

import { getList } from "./be/be";

const head = document.querySelector('header');
const main = document.querySelector('main');
const img = document.createElement('img');
main.appendChild(img);

let list;

async function generateList(){
   list = await getList("easy");
   img.src = list.imageUrl;
}

generateList();