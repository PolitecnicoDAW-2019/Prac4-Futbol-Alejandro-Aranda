class FutbolView {
  constructor() {}
  DOM = {
    cards: document.getElementById('card-players'),
    nameInput: document.getElementById('name'),
    aliasInput: document.getElementById('alias'),
    clubInput: document.getElementById('club'),
    birthdateInput: document.getElementById('birthdate'),
    pictureImg: document.getElementById('image'),
    formPlayer: document.getElementById('formPlayer'),
    selectPosition: document.getElementsByName('select'),
    imgPicture: document.getElementById('picture'),
    addButton: document.getElementById('insert')
  };
  bindPlayersBD = handler => {
    handler('http://localhost/server/GetPlayers.php').then(cardsPlayers => {
      this.loadCardPlayers(cardsPlayers);
    });
  };
  loadCardPlayers = cardsPlayers => {
    const cards = cardsPlayers.reduce((players, { id, name, alias, club, birthdate, picture, selectPosition }) => {
      const div = document.createElement('div');
      div.onclick = () => this.showPlayerInForm({ id, name, alias, club, birthdate, picture, selectPosition });
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
      playerPosition.textContent = 'Posicion: ' + selectPosition;
      const playerPicture = document.createElement('img');
      playerPicture.src = 'data:image/' + ';base64,' + picture;
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
  };
  loadPositions = handler => {
    handler('http://localhost/server/loadPositions.php')
      .then(response => response.json())
      .then(positions => {
        this.positions = positions;
        const select = Object.keys(positions).reduce((optionsPositions, position) => {
          const option = document.createElement('option');
          option.textContent = position;
          optionsPositions.appendChild(option);
          return optionsPositions;
        }, document.createElement('select'));
        this.DOM.selectPosition = select;
        this.DOM.formPlayer.appendChild(select);
      });
  };
  bindInputReadUploadedFile() {
    this.DOM.pictureImg.addEventListener('change', () => {
      const reader = new FileReader();
      reader.onload = () => {
        this.DOM.imgPicture.src = reader.result;
        this.picture = reader.result.split(',').pop();
      };
      reader.readAsDataURL(this.DOM.pictureImg.files[0]);
    });
  }
  showPlayerInForm = ({ name, alias, club, birthdate, picture, selectPosition }) => {
    this.DOM.nameInput.value = name;
    this.DOM.aliasInput.value = alias;
    this.DOM.clubInput.value = club;
    this.DOM.birthdateInput.value = birthdate;
    this.DOM.selectPosition.value = selectPosition;
    this.DOM.imgPicture.src = 'data:image/' + ';base64,' + picture;
  };

  bindAddPlayer = handler => {
    this.DOM.addButton.addEventListener('click', () => {
      handler(this.getPlayerFromForm()).then(cardsPlayers => {
        this.DOM.cards.innerHTML = '';
        this.loadCardPlayers(cardsPlayers);
      });
    });
  };

  getPlayerFromForm = () => {
    const name = this.DOM.nameInput.value;
    const alias = this.DOM.aliasInput.value;
    const club = this.DOM.clubInput.value;
    const birthdate = this.DOM.birthdateInput.value;
    const selectPosition = this.DOM.selectPosition.value;
    const id = '';
    const picture = this.picture;
    const idPosition = this.positions[selectPosition];
    return new Player({ id, name, alias, club, birthdate, selectPosition, picture, idPosition });
  };
  bindUploadPlayer = () => {};
}
