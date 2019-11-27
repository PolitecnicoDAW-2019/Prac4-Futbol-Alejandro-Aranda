class PlayerService {
  constructor() {}

  loadPlayers = (url, body) => {
    return this.makeRequest(url, body)
      .then(response => response.json())
      .then(players => {
        this.players = players.map(player => new Player(player));
        return this.players;
      });
  };

  addPlayer = player => {
    this.players = [...this.players, player];
    return this.makeRequest('http://localhost/server/insertarJugador.php', player)
      .then(response => response.json())
      .then(resolve => {
        const newPlayer = this.players.find(player => player.id == '');
        newPlayer.id = resolve.lastId;
        return this.players;
      })
      .catch(reject => this.players.pop());
  };

  makeRequest = (url, body) => {
    const formData = new FormData();
    formData.append('body', JSON.stringify(body));
    return fetch(url, {
      method: 'POST',
      body: formData
    });
  };
}
