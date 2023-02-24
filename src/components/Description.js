import '../css/Description.css';

const Description = () => {
    const infoText = "Is it going to hell? is based on headlines scraped from various news sources. \
    An AI model is used to determine if the news are positive, neutral or negative. \
    An probability is calculated, which is signified by the digits and the colors. \
    Darker colors and higher numbers mean that the region has a higher probability of negative news!"


    return (
        <div className="desc-container">
            <p className="desc-text">
                {infoText}
            </p>
        </div>
      );
}
 
export default Description;