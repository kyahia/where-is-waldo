const data = require("./db.json");

export function getList(level){
   return Promise.resolve({
      imageUrl: data[level].url,
      names: data[level].chars.map(el => el.name)
      })
}

function checkName (char, px, py){
   
}