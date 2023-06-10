// Set query string
const getQueryString = (apiUrl, chosenDates, endpoint) => {
  if (chosenDates && chosenDates[0] && chosenDates[1]) {
    const dateQuery = new URLSearchParams({
      startDate: chosenDates[0],
      endDate: chosenDates[1],
    });
    return `${apiUrl}${endpoint}?${dateQuery}`;
  } else {
    return null;
  }
};

// Fetch data
// takes base url of API, endpoint of api and date interval of search.
async function fetchData(apiUrl, endpoint, chosenDates) {
  const queryString = getQueryString(apiUrl, chosenDates, endpoint);
  if (!queryString) {
    return null;
  }

  const response = await fetch(`${queryString}`).catch((error) => {
    console.log(error.message);
  });

  const data = await response.json();

  return data;
}

export default fetchData;
