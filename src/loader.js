export default function loader(startGame){   
   const container = document.createElement('div');
   container.className = "container"; // center css
   
   const easy = document.createElement('button');
   easy.textContent = "EASY";
   const medium = document.createElement('button');
   medium.textContent = "MEDIUM";
   const hard = document.createElement('button');
   hard.textContent = "HARD";
   
   easy.addEventListener('click', setLevel);
   medium.addEventListener('click', setLevel);
   hard.addEventListener('click', setLevel);
   
   function setLevel(e){
      const level = e.target.textContent.toLowerCase();
      startGame(level);
   }
   
   container.appendChild(easy);
   container.appendChild(medium);
   container.appendChild(hard);

   return container;
}   

