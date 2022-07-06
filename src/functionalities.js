export function loader(addPlayerBE, mainGame) {
  let inputs;
  let id;

  const form = document.querySelector('form');
  form.addEventListener('submit', playerValidation);

  async function playerValidation(e) {
    e.preventDefault();
    inputs = { name: form.name.value, password: form.password.value };
    form.reset();
    document.querySelector('main').classList.remove('welcome');
    document.getElementById('username-header').textContent = inputs.name;
    id = await addPlayerBE(inputs);
    form.removeEventListener('submit', playerValidation);
    mainGame(id.data.playerId);
  }

}

export async function playWaldo(playerId, getImg, loadImg, checkPoint, endGame) {
  let level;

  const image = document.querySelector('img');
  image.setAttribute('alt', 'loading');
  const headSpan = document.getElementById('result-header');
  headSpan.textContent = "";

  const loadedSrcs = await getImg({ playerId });
  if (loadedSrcs.data.imageUrl === false) {
    endGame();
    return;
  }

  level = loadedSrcs.data.level;
  const charsList = await loadImg(loadedSrcs.data);
  document.getElementById('chars-list').textContent = 'Find : ' + charsList.join(' - ');

  image.addEventListener('click', async e => {
    if (document.querySelector('aside')) document.querySelector('aside').remove();

    const container = document.createElement('aside');
    container.style.top = e.clientY + "px";
    container.style.backgroundColor = "red";
    container.style.left = e.clientX + "px";

    const pointerX = e.clientX - image.getBoundingClientRect().left;
    const pointerY = e.clientY - image.getBoundingClientRect().top;

    charsList.forEach(name => {
      const li = document.createElement('button');
      li.textContent = name[0].toUpperCase() + name.slice(1);
      container.appendChild(li);

      li.addEventListener('click', async () => {
        document.querySelector('aside').remove();
        const clickRslt = await checkPoint({ playerId, name, pointerX, pointerY });
        const checkedList = clickRslt.data.validChars;
        if (clickRslt.data.result === "complete") {
          if (level === 0) timer(document.getElementById('timer-header'));
          playWaldo(playerId, getImg, loadImg, checkPoint, endGame);
        } else if (clickRslt.data.result === "partial") {
          headSpan.textContent = `Nice !! You found ${checkedList.join(', ')} - Continue`;
        } else if (clickRslt.data.result === "old") {
          headSpan.textContent = `old Guess !! You found ${checkedList.map(name => `${name}`)} Look for a new Character`;
        } else {
          headSpan.textContent = `Bad guess ! You found ${checkedList.map(name => `${name}`)} Look again`;
        }
      });

    });

    document.querySelector('main').appendChild(container)
  })
}

export async function displayChart(playerId, getScores) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  const players = document.createElement('td');players.textContent = 'Players';
  const timings = document.createElement('td');timings.textContent = 'Time records';
  const tbody = document.createElement('tbody');

  trHead.appendChild(players);
  trHead.appendChild(timings);
  thead.appendChild(trHead);
  table.appendChild(thead);
  table.appendChild(tbody);

  const playersList = await getScores({ playerId });
  playersList.data.scores.forEach(score => {
    const line = document.createElement('tr');
    tbody.appendChild(line);
    
    const minutes = String(Math.floor(score.record / 1000 / 60)).padStart(2, '0');
    const secs = String(Math.floor(score.record / 1000 % 60)).padStart(2, '0');

    const playerName = document.createElement('td');playerName.textContent = score.name;
    const record = document.createElement('td');record.textContent = minutes + ':' + secs;

    if (score.isPlayer) line.id = "player-score";
  });
  document.querySelector('main').appendChild(table);
}

function timer(element) {
  let time = 0;
  setInterval(() => {
    time += 1;
    element.textContent = time
  }, 1000);
}
