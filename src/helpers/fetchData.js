import { Geomath } from './Geomath';

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
    const response = await fetch(`${queryString}`);


    const data = await response.json();


    if (data){
        return Geomath.getPercentage(data);
    } 
}


// Active function
const withFetchNews = async (apiUrl, chosenDates) => {
    const queryString = getQueryString(apiUrl, chosenDates)


    if (!queryString){
        return null
    }


    const regionResults = await parseData(queryString)
        .catch(error => {
            console.log(error.message);
        });


    return regionResults;
}
 
export default withFetchNews;