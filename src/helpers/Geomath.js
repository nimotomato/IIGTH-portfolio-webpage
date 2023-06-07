export class Geomath {
  // Takes JSON formatted data
  // Returns Map with probability, region as keys
  static getPercentage = (labels) => {
    const percentageByRegion = new Map();

    labels.forEach((label) => {
      if (!label.neg || !label.total) {
        percentageByRegion.set("percentage", undefined);
      }

      percentageByRegion.set(label.region, label.neg / label.total);
    });

    return percentageByRegion;
  };

  static getPercentageComparedToTotal = (totalPercentage, subPercentage) => {
    const percentageChange =
      (subPercentage - totalPercentage) / totalPercentage;

    return percentageChange;
  };
}
