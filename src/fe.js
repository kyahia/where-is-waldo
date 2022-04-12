import "./style.css";

import { getData, checking } from "./be/be";

import loader from "./loader";
import endGame from "./closer";

const main = document.querySelector('main');
const img = document.createElement('img');
main.appendChild(loader(startGame));

function startGame(selectedLevel){
   main.textContent = '';
   main.appendChild(img);

   let data;
   fetchData();
   
   img.addEventListener('click', e => {
      if (document.querySelector('aside')) document.querySelector('aside').remove();
   
      const pointerX = e.clientX;
      const pointerY = e.clientY;
   
      const wrapper = document.createElement('aside');
      wrapper.style.top = pointerY + "px";
      wrapper.style.backgroundColor = "red";
      wrapper.style.left = pointerX + "px";
   
      data.names.forEach(name => {
         const li = document.createElement('button');
         li.textContent = name[0].toUpperCase() + name.slice(1);
         li.addEventListener('click', e => checkPosition(name, pointerX, pointerY))
         wrapper.appendChild(li);
      });
   
      main.appendChild(wrapper)
   })

   async function checkPosition(name, px, py){
      document.querySelector('aside').remove();
      console.log('checking');
      const result = await checking(name, px - img.getBoundingClientRect().left, py - img.getBoundingClientRect().top);
      if (result) endGame(result)
   }
   
   async function fetchData(){
      data = await getData(selectedLevel);
      img.src = data.imageUrl;
   }
}



