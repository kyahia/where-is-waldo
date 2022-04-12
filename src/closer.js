export default function endGame(timer){
   document.querySelector('main').remove();
   document.querySelector('header').remove();
   const end = document.createElement('h1');
   end.textContent = timer;
   document.body.appendChild(end);
}