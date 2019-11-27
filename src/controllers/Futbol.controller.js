class FutbolController {
  constructor(view, playerService) {
    this.playerService = playerService;
    this.view = view;
    this.view.bindPlayersBD(this.handlerPlayersInBD);
    this.view.loadPositions(this.getPositions);
    this.view.bindAddPlayer(this.handlerAddPlayer);
    this.view.bindInputReadUploadedFile();
  }
  handlerPlayersInBD = (url, body) => {
    return this.playerService.loadPlayers(url, body);
  };

  handlerAddPlayer = player => {
    return this.playerService.addPlayer(player);
  };

  getPositions = (url, body) => {
    return this.playerService.makeRequest(url, body);
  };
}
