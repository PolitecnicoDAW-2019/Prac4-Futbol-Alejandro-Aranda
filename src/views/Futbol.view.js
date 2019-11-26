class FutbolView {
  constructor() {}
  DOM = {
    cards: document.getElementById('card-players'),
    nameInput: document.getElementById('name'),
    aliasInput: document.getElementById('alias'),
    clubInput: document.getElementById('club'),
    birthdateInput: document.getElementById('birthdate'),
    pictureImg: '',
    formPlayer: document.getElementById('formPlayer')
  };
  bindPlayersBD = handler => {
    handler('http://localhost/server/GetPlayers.php').then(cardsPlayers => {
      const cards = cardsPlayers.reduce((players, { id, name, alias, club, birthdate, picture, position }) => {
        const div = document.createElement('div');
        div.onclick = () => console.log({ id, name, alias, club, birthdate, picture, position });
        const textDiv = document.createElement('div');
        const playerName = document.createElement('p');
        playerName.textContent = 'Nombre: ' + name;
        const playerAlias = document.createElement('p');
        playerAlias.textContent = 'Alias: ' + alias;
        const playerClub = document.createElement('p');
        playerClub.textContent = 'Club: ' + club;
        const playerBirthDate = document.createElement('p');
        playerBirthDate.textContent = 'Edad: ' + birthdate;
        const playerPosition = document.createElement('p');
        playerPosition.textContent = 'Posicion: ' + position;
        const playerPicture = document.createElement('img');
        playerPicture.src = picture;
        playerPicture.style.cssText = 'width:200px;margin:20px';

        textDiv.appendChild(playerName);
        textDiv.appendChild(playerAlias);
        textDiv.appendChild(playerClub);
        textDiv.appendChild(playerBirthDate);
        textDiv.appendChild(playerPosition);
        div.appendChild(playerPicture);
        div.appendChild(textDiv);
        div.className = 'playerCard';
        players.appendChild(div);
        return players;
      }, document.createElement('div'));
      this.DOM.cards.appendChild(cards);
    });
  };
  loadPositions = handler => {
    handler('http://localhost/server/loadPositions.php').then(positions => {
      this.positions = positions;
      const select = Object.keys(positions).reduce((optionsPositions, position) => {
        const option = document.createElement('option');
        option.textContent = position;
        optionsPositions.appendChild(option);
        return optionsPositions;
      }, document.createElement('select'));
      select.onchange = event => console.log(event.target.value);
      this.DOM.formPlayer.appendChild(select);
    });
  };

  load;
}
