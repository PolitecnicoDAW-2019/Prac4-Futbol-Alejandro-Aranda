class PlayerService {
  constructor() {}
  players = [];

  loadPlayers = (url, body) => {
    return this.makeRequest(url, body).then(players => {
      if (!players) {
        return [];
      }
      this.players = players.map(player => new Player(player));
      return this.players;
    });
  };

  //do getPlayerFromService and put in view
  addPlayer = (player, picture) => {
    this.players = [...this.players, player];
    return this.makeRequest('http://localhost/server/insertarJugador.php', player, picture)
      .then(resolve => {
        const newPlayer = this.players.find(player => player.id == '');
        newPlayer.id = resolve.lastId;
        return this.players;
      })
      .catch(reject => this.players.pop());
  };

  uploadPlayer = (oldPlayer, updatedPlayer, picture) => {
    const playerFound = this.players.findIndex(player => player.id == updatedPlayer.id);
    this.players[playerFound] = updatedPlayer;
    return this.makeRequest('http://localhost/server/updatedPlayer.php', updatedPlayer, picture)
      .then(resolve => {
        return this.players;
      })
      .catch(reject => {
        console.log(reject);
        this.players[playerFound] = oldPlayer;
        return this.players;
      });
  };

  deletePlayer = player => {
    const playersTemp = this.players;
    this.players = this.players.filter(_player => _player.id !== player.id);
    return this.makeRequest('http://localhost/server/deleteJugador.php', player.id)
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
