const CATEGORIES = {
  barleywine: ({ name }) => name.startsWith('Barleywine'),
  belgian: ({ id }) => [
    63,  // Belgian Dubbel
    64,  // Belgian Quad
    91,  // Belgian Strong Dark Ale
    124, // Belgian Tripel
    132  // Belgian Strong Golden Ale
  ].includes(id),
  bitter: ({ id }) => [
    92, // Extra Special / Strong Bitter
    192 // English Bitter
  ].includes(id),
  blonde_ale: ({ id }) => [
    13, // Blonde Ale
    242 // Blonde Ale - Belgian Blonde / Golden
  ].includes(id),
  bock: ({ id }) => [
    14,  // Bock
    18,  // Doppelbock
    51,  // Weizenbock
    120, // Maibock/Helles Bock
    193  // Eisbock
  ].includes(id),
  brown_ale: ({ name }) => name.startsWith('Brown Ale'),
  cider: ({ id }) => [
    16 // Cider
  ].includes(id),
  lager: ({ name }) => name.startsWith('Lager -'),
  non_alcoholic: ({ id }) => id === 33,
  pale_ale: ({ name }) => name.startsWith('IPA -') || name.startsWith('Pale Ale -'),
  porter: ({ name }) => name.startsWith('Porter -'),
  red_ale: ({ name }) => name.startsWith('Red Ale -'),
  sour: ({ id, name }) => id === 226 /* Faro */ || name.startsWith('Sour -') || name.startsWith('Lambic -'),
  stout: ({ name }) => name.startsWith('Stout -'),
  strong_ale: ({ name }) => name.startsWith('Strong Ale -'),
  wheat: ({ id }) => [
    24, // Hefeweizen
    31, // Kristallweizen
    83, // Witbier
    243 // Hefeweizen Light / Leicht
  ].includes(id),
  /* Fallback category for everything else */
  exotic: () => true
};

const getAllCategories = () => Object.keys(CATEGORIES);

const findCategoryForBeerStyle = beerStyle => {
  return Object.keys(CATEGORIES).find(category => {
    return CATEGORIES[category]({ id: parseInt(beerStyle.id, 10), name: beerStyle.name });
  });
};

module.exports = { getAllCategories, findCategoryForBeerStyle };
