import getData from "./app";

let data;
let lev;
let time;

export async function fetchBEData(level){
   data = await getData();
   lev = level;
   startClock();
   return { names: data[level].chars.map(el => el.name), imgUrl: data[level].url };
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