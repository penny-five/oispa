
const areas = {
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
};

module.exports = { areas };
