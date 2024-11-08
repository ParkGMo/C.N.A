// google places API
// -> 국가별 유명 관광지, 명소, 식당 등 검색용도

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

export async function getPlaces(country, place) {
  const reqURL = `/googlePlaceSearch?key=${API_KEY}&query=${country}의+유명+${place}`;

  try {
    const response = await fetch(reqURL);

    if (!response.ok) {
      throw new Error('response was not ok');
    }

    const data = await response.json();

    const result = data.results
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

    return result;
  } catch (error) {
    return error;
  }
}
