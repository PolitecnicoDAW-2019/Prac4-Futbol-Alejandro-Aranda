class FutbolController {
  constructor(view, playerService) {
    this.playerService = playerService;
    this.view = view;
    this.view.bindPlayersBD(this.handlerPlayersInBD);
    this.view.loadPositions(this.getPositions);
    this.view.bindAddPlayer(this.handlerAddPlayer);
    this.view.bindInputReadUploadedFile();
    this.view.bindUploadPlayer(this.handlerUpdatePlayer);
    this.view.bindDeletePlayer(this.handlerDeletePlayer);
    //  this.view.bindSearchPlayers(this.handlerSearchPlayers);
  }
  handlerPlayersInBD = (url, body) => {
    return this.playerService.loadPlayers(url, body);
  };

  handlerAddPlayer = (player, picture) => {
    return this.playerService.addPlayer(player, picture);
  };

  handlerUpdatePlayer = (oldPlayer, updatedPlayer) => {
    return this.playerService.uploadPlayer(oldPlayer, updatedPlayer);
  };

  handlerDeletePlayer = player => {
    return this.playerService.deletePlayer(player);
  };

  handlerSearchPlayers = alias => {
    return this.playerService.searchPlayer(alias);
  };

  getPositions = (url, body) => {
    return this.playerService.makeRequest(url, body);
  };
}
