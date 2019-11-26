class FutbolController {
  constructor(view, service) {
    this.service = service;
    this.view = view;
    this.view.bindPlayersBD(this.handlerPlayersInBD);
    this.view.loadPositions(this.getPositions);
  }
  handlerPlayersInBD = (url, method) => {
    const players = this.service.makeRequest(url, method);
    //this.service.loadPlayers(players);
    return players;
  };

  getPositions = (url, method) => {
    return this.service.makeRequest(url, method);
  };
}
