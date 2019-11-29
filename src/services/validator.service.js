class ValidatorService {
  constructor() {}
  validateName = name => NAME_REGEX.test(name);
  validateClub = club => ALIAS_REGEX.test(club);
  validateAlias = alias => CLUB_REGEX.test(alias);
}
