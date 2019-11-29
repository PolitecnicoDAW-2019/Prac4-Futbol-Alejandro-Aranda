class ValidatorService {
  constructor() {}
  validateName = name => /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(name);
  validateClub = club => /^[a-zA-Z].{2,256}$/.test(club);
  validateAlias = alias => /^[a-zA-Z].{2,153}$/.test(alias);
}
