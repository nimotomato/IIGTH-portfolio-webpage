import '../css/Description.css';


const Description = () => {
    const strongTitle = "Is it going to hell? "
    const infoText =  "is based on headlines scraped from various news sources. \
    An AI model is used to determine if the news are positive, neutral or negative. \
    A probability is calculated, which is signified by the digits and the colors. \
    Darker colors and higher numbers mean that the region has a higher probability of negative news!"


    return (
        <div className="desc-container">
            <div className="desc-wrapper">
                <p className="desc-text">
                    <span className="intro-title">{strongTitle}</span>{infoText}
                </p>
            </div>
        </div>
    );
}
 
export default Description;