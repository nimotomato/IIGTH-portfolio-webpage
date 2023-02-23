export class Geomath {
    // Count labels from prisma query, takes json-data as input.
    // This should probably be moved to API-side. 
    static countLabels = (regionLabels) => {
        // Map to count labels by region
        const regions = new Map();    
        
        regionLabels.forEach(item => {
            // Must be string as objects are not unique.
            const key = `${item.region}-${item.label}`;

            regions.set(key, (regions.get(key) || 0) + 1);
        });

        // Array of regions. Key is region name, value is list of dicts for label and count.
        const arrayScore = Array.from(regions, ([key, count]) => { 
            const [region, label] = key.split('-');
            const labelCount = [{label: label, count: count}]
            const scores  = { region: region, labelCount: labelCount }

            return scores
        })

        // Set new map to group by region
        const labelCount = new Map()

        arrayScore.forEach(item => {
            // Get the region names
            const regionKey = Object.values(item)[0];
            // Get the [label: count]
            const newValue = Object.values(item)[1];
            const oldValue = labelCount.get(regionKey) || [];
            labelCount.set(regionKey, [...newValue, ...oldValue])
        })

        // Make array of arrays into a nice array of dicts
        return Array.from(labelCount, ([region, counts]) => ({region, counts}))
    }

    // Return odds for news to be negative for labels grouped by regions
    static getOdds = (labelCounts) => {
        return labelCounts.map((region) => {
            // Count labels
            let pos = 0;
            let neg = 0;
            let neu = 0;

            // Checks each count, adds pos and neutral values
            Object.values(region.counts).forEach((labelCount) => {
                if(labelCount.label === 'POS'){
                pos += labelCount.count;
                } else if (labelCount.label === 'NEG'){
                neg += labelCount.count;
                } else if (labelCount.label === 'NEU'){
                neu += labelCount.count;
                }
            });

            // Check for null data
            if (!pos || !neg || !neu ){
                return {region: region.region, ratio: undefined}
            }

            let odds = neg / (pos + neu)

            return {region: region.region, odds: odds}
        })
    } 

    // Calculate probability for labels grouped by regions
    static getProbability = (labelCounts) => {
        return labelCounts.map((region) => {
            // Count labels
            let pos = 0;
            let neg = 0;
            let neu = 0;

            // Checks each count, adds pos and neutral values
            Object.values(region.counts).forEach((labelCount) => {
                if(labelCount.label === 'POS'){
                pos += labelCount.count;
                } else if (labelCount.label === 'NEG'){
                neg += labelCount.count;
                } else if (labelCount.label === 'NEU'){
                neu += labelCount.count;
                }
            });

            // Check for null data
            if (!pos || !neg || !neu ){
                return {region: region.region, ratio: undefined}
            }

            let probability = neg / (pos + neu + neg)

            return {region: region.region, probability: probability}
        })
    } 
}