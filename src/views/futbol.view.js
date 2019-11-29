class FutbolView {
  constructor() {
    this.checks = { nameCheck: false, clubCheck: false, aliasCheck: false };
  }
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
    addButton: document.getElementById('insert'),
    updateButton: document.getElementById('upload'),
    listButtons: document.getElementById('buttonsUpdateDelete'),
    inputSearch: document.getElementById('inputSearch'),
    buttonSearch: document.getElementById('buttonSearch')
  };
  bindPlayersDB = handler => {
    handler().then(cardsPlayers => {
      this.loadCardPlayers(cardsPlayers);
    });
  };
  loadCardPlayers = cardsPlayers => {
    const cards = cardsPlayers.reduce((players, { id, name, alias, club, birthdate, namePicture, selectPosition, idPosition }) => {
      const div = document.createElement('div');
      div.onclick = () => this.showPlayerInForm({ id, name, alias, club, birthdate, namePicture, selectPosition, idPosition });
      const textDiv = document.createElement('div');
      const playerName = document.createElement('p');
      playerName.textContent = 'Nombre: ' + name;
      const playerAlias = document.createElement('p');
      playerAlias.textContent = 'Alias: ' + alias;
      const playerClub = document.createElement('p');
      playerClub.textContent = 'Club: ' + club;
      const playerBirthDate = document.createElement('p');
      playerBirthDate.textContent = 'Edad: ' + moment().diff(birthdate, 'years');
      const playerPosition = document.createElement('p');
      playerPosition.textContent = 'Posicion: ' + selectPosition;
      const playerPicture = document.createElement('img');
      playerPicture.src = '/images/' + namePicture;
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
    handler().then(positions => {
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
  constructUpdateAndDeleteButton = player => {
    this.DOM.listButtons.innerHTML = '';
    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'Guardar';
    uploadButton.className = 'buttonsPlayer';
    uploadButton.onclick = () => this.uploadPlayerDB(player);
    this.DOM.listButtons.appendChild(uploadButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.className = 'buttonsPlayer';
    deleteButton.onclick = () => this.deletePlayerDB(player);
    this.DOM.listButtons.appendChild(deleteButton);
  };
  showPlayerInForm = ({ id, name, alias, club, birthdate, namePicture, selectPosition, idPosition }) => {
    this.DOM.nameInput.value = name;
    this.DOM.aliasInput.value = alias;
    this.DOM.clubInput.value = club;
    this.DOM.birthdateInput.value = birthdate;
    this.DOM.selectPosition.value = selectPosition;
    this.DOM.imgPicture.src = '/images/' + namePicture;
    this.idPlayerActual = id;
    this.constructUpdateAndDeleteButton({ id, name, alias, club, birthdate, namePicture, selectPosition, idPosition });
  };

  getPlayerFromForm = () => {
    const name = this.DOM.nameInput.value;
    const alias = this.DOM.aliasInput.value;
    const club = this.DOM.clubInput.value;
    const birthdate = this.DOM.birthdateInput.value;
    const selectPosition = this.DOM.selectPosition.value;
    const picture = this.DOM.imgPicture.src.split(',').pop();
    const namePicture = this.DOM.pictureImg.files[0]['name'];
    const idPosition = this.positions[selectPosition];
    return new Player({ name, alias, club, birthdate, selectPosition, picture, namePicture, idPosition });
  };

  bindValidateName = handler => {};
  bindValidateClub = handler => {};
  bindValidateAlias = handler => {};

  bindAddPlayerDB = handler => {
    this.DOM.addButton.addEventListener('click', () => {
      const name = this.DOM.nameInput.value;
      const alias = this.DOM.aliasInput.value;
      const club = this.DOM.clubInput.value;
      const birthdate = this.DOM.birthdateInput.value;
      const selectPosition = this.DOM.selectPosition.value;
      const id = '';
      const picture = this.picture;
      const idPosition = this.positions[selectPosition];
      const namePicture = this.DOM.pictureImg.files[0]['name'];
      const player = new Player({ id, name, alias, club, birthdate, selectPosition, namePicture, idPosition });
      handler(player, picture).then(cardsPlayers => {
        this.DOM.cards.innerHTML = '';
        this.loadCardPlayers(cardsPlayers);
      });
    });
  };

  bindUploadPlayerDB = handler => {
    this.uploadPlayerDB = oldPlayer => {
      const updatedPlayer = this.getPlayerFromForm();
      updatedPlayer.id = oldPlayer.id;
      handler(oldPlayer, updatedPlayer, this.picture).then(cardsPlayers => {
        this.DOM.cards.innerHTML = '';
        this.loadCardPlayers(cardsPlayers);
        this.DOM.listButtons.innerHTML = '';
      });
    };
  };
  bindDeletePlayerDB = handler => {
    this.deletePlayerDB = player => {
      handler(player).then(cardsPlayers => {
        this.DOM.cards.innerHTML = '';
        this.loadCardPlayers(cardsPlayers);
        this.DOM.listButtons.innerHTML = '';
      });
    };
  };

  bindAddPlayerArray = handler => {
    this.addPlayerArray = player => {
      this.loadCardPlayers(handler(player));
    };
  };

  bindInput({ check, input, handler }) {
    const checkPosition = document.getElementById(check);
    input.addEventListener('keyup', () => {
      let isValid = false;
      isValid = handler(input.value);
      this.showTick(checkPosition, isValid);
      this.checks[check] = isValid;
      this.validateSendButton();
    });
  }
  showTick(element, isSuccess) {
    element.innerHTML = '';
    const elementSrc = isSuccess ? '../assets/images/green-tick.png' : '../assets/images/x-red.png';
    element.innerHTML = `<img class='image-check' src='${elementSrc}'>`;
  }
  validateSendButton() {
    this.DOM.addButton.disabled = Object.values(this.checks).includes(false);
  }

  bindSearchPlayers = handler => {
    this.DOM.buttonSearch.addEventListener('click', () => {
      this.DOM.cards.innerHTML = '';
      const cardsPlayers = handler(this.DOM.inputSearch.value);
      this.loadCardPlayers(cardsPlayers);
    });
  };

  bindValidateName = handler => {
    this.bindInput({
      check: 'nameCheck',
      input: this.DOM.nameInput,
      handler
    });
  };

  bindValidateAlias = handler => {
    this.bindInput({
      check: 'aliasCheck',
      input: this.DOM.aliasInput,
      handler
    });
  };

  bindValidateClub = handler => {
    this.bindInput({
      check: 'clubCheck',
      input: this.DOM.clubInput,
      handler
    });
  };
}
