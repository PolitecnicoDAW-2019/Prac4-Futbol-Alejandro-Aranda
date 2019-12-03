class FutbolController {
  constructor(view, playerService, validatorService) {
    this.playerService = playerService;
    this.view = view;
    this.validatorService = validatorService;
    this.view.bindPlayersDB(this.handlerPlayersInBD);
    this.view.loadPositions(this.handlerGetPositions);
    this.view.bindAddPlayerDB(this.handlerAddPlayerDB);
    this.view.bindInputReadUploadedFile();
    this.view.bindUploadPlayerDB(this.handlerUpdatePlayerDB);
    this.view.bindDeletePlayerDB(this.handlerDeletePlayerDB);
    this.view.bindSearchPlayers(this.handlerSearchPlayers);
    this.view.bindValidateName(this.handlerValidateName);
    this.view.bindValidateAlias(this.handlerValidateAlias);
    this.view.bindValidateClub(this.handlerValidateClub);
    this.view.bindAddPlayerArray(this.handlerAddPlayerArray);
    this.view.bindUpdatePlayerArray(this.handlerUpdatePlayerArray);
    this.view.bindDeletePlayerArray(this.handlerDeletePlayerArray);
  }
  handlerPlayersInBD = () => {
    return this.playerService.loadPlayers();
  };

  handlerAddPlayerDB = (player, picture) => {
    return this.playerService.addPlayerDB(player, picture);
  };

  handlerUpdatePlayerDB = (oldPlayer, updatedPlayer, picture) => {
    return this.playerService.updatePlayerDB(oldPlayer, updatedPlayer, picture);
  };

  handlerDeletePlayerDB = player => {
    return this.playerService.deletePlayerDB(player);
  };

  handlerAddPlayerArray = player => {
    return this.playerService.addPlayerArray(player);
  };
  handlerUpdatePlayerArray = updatedPlayer => {
    return this.playerService.updatePlayerArray(updatedPlayer);
  };
  handlerDeletePlayerArray = player => {
    return this.playerService.deletePlayerArray(player);
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

  handlerGetPositions = () => {
    return this.playerService.loadPositions();
  };
}
