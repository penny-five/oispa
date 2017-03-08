const BezierEasing = require('bezier-easing');


const BEER_RATING_EASING_FN = BezierEasing(0.75, 0.00, 0.76, 1.00);

const VALID_VENUE_TYPES = Object.freeze([
  'Arts & Entertainment',
  'Nightlife Spot',
  'Food'
]);

const AREAS = Object.freeze({
  tre: {
    id: 'tre',
    abbr: 'TRE',
    name: 'Tampere',
    coords: {
      /* Coordinates for Hämeensilta, Tampere */
      lat: 61.497993,
      lng: 23.763627,
      /* Fetch for most parts of Tampere, including Hervanta. */
      radius: 12 // km
    }
  },
  hki: {
    id: 'hki',
    abbr: 'HKI',
    name: 'Pääkaupunkiseutu',
    coords: {
      /* Coordinates for Hartwall Arena, Helsinki */
      lat: 60.20901,
      lng: 24.9226757,
      /* Should cover most parts of metropolitan area */
      radius: 15 // km
    }
  },
  jkl: {
    id: 'jkl',
    abbr: 'JKL',
    name: 'Jyväskylä',
    coords: {
      /* Coordinates for Jyväskylä train station */
      lat: 62.241750,
      lng: 25.754148,
      /* Should cover central Jyväskylä area */
      radius: 5 // km
    }
  }
});

/**
 * Groups beer styles provided by Untappd to more sane top level categories.
 *
 * Every beer style is required to have an category. If no other category matches, exotic will be used.
 */
const CATEGORIES = Object.freeze({
  barleywine: ({ name }) => name.startsWith('Barleywine -'),
  belgian: ({ id }) => [
    63,  // Belgian Dubbel
    64,  // Belgian Quad
    91,  // Belgian Strong Dark Ale
    124, // Belgian Tripel
    132, // Belgian Strong Golden Ale
    133  // Patersbier
  ].includes(id),
  bitter: ({ id }) => [
    92, // Extra Special / Strong Bitter
    192 // English Bitter
  ].includes(id),
  blonde_ale: ({ id }) => [
    13, // Blonde Ale
    97, // Golden Ale
    242 // Blonde Ale - Belgian Blonde / Golden
  ].includes(id),
  bock: ({ id }) => [
    14,  // Bock
    18,  // Doppelbock
    51,  // Weizenbock
    120, // Maibock/Helles Bock
    193  // Eisbock
  ].includes(id),
  brown_ale: ({ name }) => name.startsWith('Brown Ale -'),
  cider: ({ id }) => [
    16 // Cider
  ].includes(id),
  lager: ({ name }) => name.startsWith('Lager -') || name.startsWith('Pilsner -'),
  non_alcoholic: ({ id }) => id === 33,
  pale_ale: ({ id, name }) => name.startsWith('IPA -') || name.startsWith('Pale Ale -') || [
    5 // Pale Wheat Ale - American
  ].includes(id),
  porter: ({ name }) => name.startsWith('Porter -'),
  red_ale: ({ name }) => name.startsWith('Red Ale -'),
  saison: ({ id }) => id === 42, // Saison / Farmhouse Ale
  sour: ({ id, name }) => id === 226 /* Faro */ || name.startsWith('Sour -') || name.startsWith('Lambic -'),
  stout: ({ name }) => name.startsWith('Stout -'),
  strong_ale: ({ name }) => name.startsWith('Strong Ale -'),
  wheat: ({ id }) => [
    24, // Hefeweizen
    31, // Kristallweizen
    74, // Dunkelweizen
    83, // Witbier
    243 // Hefeweizen Light / Leicht
  ].includes(id),
  /* Fallback category for everything else */
  exotic: () => true
});

const getAllCategories = () => Object.keys(CATEGORIES);

const findCategoryForBeerStyle = beerStyle => {
  return Object.keys(CATEGORIES).find(category => {
    return CATEGORIES[category]({ id: parseInt(beerStyle.id, 10), name: beerStyle.name });
  });
};

module.exports = {
  BEER_RATING_EASING_FN,
  VALID_VENUE_TYPES,
  AREAS,
  CATEGORIES,
  getAllCategories,
  findCategoryForBeerStyle
};
