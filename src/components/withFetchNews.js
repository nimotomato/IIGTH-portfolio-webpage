import { Geomath } from './Geomath';

// TO DO: 
// GET THIS WORKING
// Set query string
const getQueryString = (apiUrl, chosenDates) => {
    if (chosenDates && chosenDates[0] && chosenDates[1]){
        const dateQuery = new URLSearchParams({startDate: chosenDates[0], endDate: chosenDates[1]});
        return (`${apiUrl}news?${dateQuery}`);
    }else {
        return null;
    }
}


// Calculate results (odds or percentage) based on the query data
async function parseData(queryString) {
    const abortCont = new AbortController();

    const response = await fetch(`${queryString}`);
    const data = await response.json();
    if (data){
        const labelCount = Geomath.countLabels(data);
        return Geomath.getProbability(labelCount);
    } 

    abortCont.abort();
    console.log(abortCont.signal)
}

const withFetchNews = async (apiUrl, chosenDates) => {
    const queryString = getQueryString(apiUrl, chosenDates)

    const regionResults = await parseData(queryString);
    return regionResults;
}
 
export default withFetchNews;