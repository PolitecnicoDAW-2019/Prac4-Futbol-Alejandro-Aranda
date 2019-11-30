class PlayerService {
  constructor() {}
  players = [];

  loadPlayers = () => {
    return this.makeRequest(PLAYERS_URL).then(players => {
      if (!players) {
        return [];
      }
      this.players = players.map(player => new Player(player));
      return this.players;
    });
  };

  loadPositions = () => {
    return this.makeRequest(POSITIONS_URL);
  };

  addPlayerArray = player => {
    this.players = [...this.players, player];
    return this.players;
  };
  updatePlayerArray = updatedPlayer => {
    const playerFound = this.players.findIndex(player => player.id == updatedPlayer.id);
    this.players[playerFound] = updatedPlayer;
    console.log(this.players);
    return this.players;
  };
  deletePlayerArray = player => {
    this.lastBackupPlayers = this.players;
    return this.players.filter(_player => _player.id !== player.id);
  };

  addPlayerDB = (player, picture) => {
    return this.makeRequest(ADD_PLAYER_URL, player, picture)
      .then(resolve => {
        const newPlayer = this.players.find(player => player.id == '');
        newPlayer.id = resolve.lastId;
        return this.players;
      })
      .catch(reject => this.players.pop());
  };

  updatePlayerDB = (oldPlayer, updatedPlayer, picture) => {
    const playerFound = this.players.findIndex(player => player.id == updatedPlayer.id);
    this.players[playerFound] = updatedPlayer;
    return this.makeRequest(UPDATE_PLAYER_URL, updatedPlayer, picture)
      .then(resolve => {
        return this.players;
      })
      .catch(reject => {
        console.log(reject);
        this.players[playerFound] = oldPlayer;
        return this.players;
      });
  };

  deletePlayerDB = player => {
    this.players = this.players.filter(_player => _player.id !== player.id);
    return this.makeRequest(DELETE_PLAYER_URL, player.id)
      .then(resolve => {
        return this.players;
      })
      .catch(reject => {
        console.log(reject);
        this.players = playersTemp;
        return this.players;
      });
  };

  searchPlayers = alias => {
    return this.players.filter(player => player.alias.includes(alias));
  };

  makeRequest = (url, body, picture) => {
    const formData = new FormData();
    formData.append('body', JSON.stringify(body));
    formData.append('picture', picture);
    return fetch(url, {
      method: 'POST',
      body: formData
    }).then(response => response.json());
  };
}
