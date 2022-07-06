import "./style.css";

const head = document.querySelector('header');
const main = document.querySelector('main');
const img = document.createElement('img');
img.src = image;

main.appendChild(img);

main.addEventListener('click', e => {
   if (document.querySelector('aside')) document.querySelector('aside').remove();
   console.log(e.clientX, e.clientY);
   displayList(e.clientX, e.clientY);
})

function displayList(pointerX, pointerY){
   const wrapper = document.createElement('aside');
   const liOne = document.createElement('button');
   liOne.textContent = "Bounedjah";
   const liTwo = document.createElement('button');
   liTwo.textContent = "Abdellaoui";
   const liThree = document.createElement('button');
   liThree.textContent = "Staff";

   liOne.addEventListener('click', e => checkName(e, pointerX, pointerY));
   liTwo.addEventListener('click', e => checkName(e, pointerX, pointerY));
   liThree.addEventListener('click', e => checkName(e, pointerX, pointerY));

   wrapper.appendChild(liOne);
   wrapper.appendChild(liTwo);
   wrapper.appendChild(liThree);

   wrapper.style.top = pointerY + "px";
   wrapper.style.backgroundColor = "red";
   wrapper.style.left = pointerX + "px";

   main.appendChild(wrapper)
}

function checkName(e, px, py){
   e.stopPropagation()
   const name = e.target.textContent.toLowerCase();
   
   if (name === "bounedjah"){
      if (px > ( bounedjah.left + img.getBoundingClientRect().left )
            && py > ( bounedjah.top  + img.getBoundingClientRect().top )
            && px < ( bounedjah.right  + img.getBoundingClientRect().left )
            && py < ( bounedjah.bottom  + img.getBoundingClientRect().top )
         ){
            console.log('Pointing at Bounedjah')
      }
      else {
         console.log('Miss');
      }
   }else if (name === "staff"){
      if (px > ( staff.left + img.getBoundingClientRect().left )
            && py > ( staff.top  + img.getBoundingClientRect().top )
            && px < ( staff.right  + img.getBoundingClientRect().left )
            && py < ( staff.bottom  + img.getBoundingClientRect().top )
         ){
            console.log('Pointing at Staff member')
      }
      else {
         console.log('Miss');
      }
   }else if (name === "abdellaoui"){
      if (px > ( abdellaoui.left + img.getBoundingClientRect().left )
            && py > ( abdellaoui.top  + img.getBoundingClientRect().top )
            && px < ( abdellaoui.right  + img.getBoundingClientRect().left )
            && py < ( abdellaoui.bottom  + img.getBoundingClientRect().top )
         ){
            console.log('Pointing at Abdellaoui')
      }
      else {
         console.log('Miss');
      }
   }

   document.querySelector('aside').remove();
}