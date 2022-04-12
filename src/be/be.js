const data = require("./db.json");
let lev;
let time;

export function getData(level){
   lev = level;
   startClock();

   return Promise.resolve({
      imageUrl: data[level].url,
      names: data[level].chars.map(el => el.name)
      })
}

export function checking (char, px, py){
   return Promise.resolve((() => {
      console.log('be check')
      const charInfo = data[lev].chars.find(el => el.name === char);
      if (charInfo){
         if (px > charInfo.left
            && px < charInfo.right
            && py > charInfo.top
            && py < charInfo.bottom
         ){
            console.log('Pointing at ' + char)
            return time;
      }else {
         console.log('Miss');
      }
      }
   }
   )())
}

function startClock(){
   time = 0;
   setInterval(() => {
      time += 0.5
   }, 500)
}