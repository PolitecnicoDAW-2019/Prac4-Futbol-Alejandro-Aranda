class FutbolController {
  constructor(view, playerService, validatorService) {
    this.playerService = playerService;
    this.view = view;
    this.validatorService = validatorService;
    this.view.bindPlayersBD(this.handlerPlayersInBD);
    this.view.loadPositions(this.getPositions);
    this.view.bindAddPlayer(this.handlerAddPlayer);
    this.view.bindInputReadUploadedFile();
    this.view.bindUploadPlayer(this.handlerUpdatePlayer);
    this.view.bindDeletePlayer(this.handlerDeletePlayer);
    this.view.bindSearchPlayers(this.handlerSearchPlayers);
    this.view.bindValidateName(this.handlerValidateName);
    this.view.bindValidateAlias(this.handlerValidateAlias);
    this.view.bindValidateClub(this.handlerValidateClub);
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
    return this.playerService.searchPlayers(alias);
  };

  handlerValidateName = name => {
    return this.validatorService.validateName(name);
  };

  handlerValidateAlias = alias => {
    return this.validatorService.validateAlias(alias);
  };

  handlerValidateClub = club => {
    return this.validatorService.validateClub(club);
  };

  getPositions = (url, body) => {
    return this.playerService.makeRequest(url, body);
  };
}
