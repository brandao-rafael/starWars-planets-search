const URL_STAR_WARS_PLANETS = 'https://swapi.dev/api/planets';

const getSWPlanets = async () => {
  try {
    const response = await fetch(URL_STAR_WARS_PLANETS);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getSWPlanets;
