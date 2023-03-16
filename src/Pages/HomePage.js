import './HomePage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import check from '../Images/check.png';
import cross from '../Images/cross.png';
import content1 from '../Images/content1.png'
import content2 from '../Images/content2.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [data1, setData1] = useState({ Score: [] });
  const [data2, setData2] = useState({ Score: [] });
  const [data3, setData3] = useState({ Score: [] });
  const [showScore, setShowScore] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [score1, setScore1] = useState([]);
  const [score2, setScore2] = useState([]);
  const [score3, setScore3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [articleData, setArticleData] = useState(null);
  
  const handleSubmit = async () => {
    const url = inputValue;
    if (!url) {
      console.log("Input value is empty");
      alert("You haven't submitted any url!");
      return;
    }
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(url)) {
      console.log("Invalid URL format");
      alert("Invalid URL format");
      return;
    }
    console.log(url);
    alert("Your url has been successfully submitted!");
    axios.post('/getArticleUrl', {string: url})
      .then(response => {
        console.log(response.data);
  
        // Use the article information
        axios.get('/articleInfo')
          .then(response => {
            console.log(response.data); // prints the article information
            
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
    try {
      const response = await axios.post("/getArticleUrl", {
        string: inputValue,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


  const handleGetArticleInfo = async () => {
    axios.get('/article')
    .then(response => {
      console.log(response.data); // prints the article information
    })
    .catch(error => {
      console.error(error);
    });
    try {
      const response = await axios.get("/articleInfo");
      setArticleData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleArticleFunctions = () => {
    setArticleData(null); // reset articleData
    setData1({}); // reset data1
    setData2({}); // reset data2
    setData3({}); // reset data3
    setShowScore(false); // reset showScore
    handleSubmit();
    handleGetArticleInfo();
  }



  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/score1')
        .then((res) => res.json())
        .then((data) => {
          setData1(data);
          console.log(data);
        });
    }, 5000); // update score1 every 5 seconds
  
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/score2')
        .then((res) => res.json())
        .then((data) => {
          setData2(data);
          console.log(data);
        });
    }, 5000); // update score2 every 5 seconds
  
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/score3')
        .then((res) => res.json())
        .then((data) => {
          setData3(data);
          console.log(data);
        });
    }, 5000); // update score3 every 5 seconds
  
    return () => clearInterval(intervalId);
  }, []);
 
  const handleClick = async () => {
    if (!inputValue) {
      alert("You haven't submitted any url!");
      return;
    }
  
    setShowScore(true);
    setIsLoading(true);
  
    try {
      const [response1, response2, response3] = await Promise.all([
        axios.get("/score1"),
        axios.get("/score2"),
        axios.get("/score3"),
      ]);
  
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setIsLoading(false); // set loading state to false after all responses are received
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="HomePage">
      
      <Form>
        <Form.Group controlId="articleUrl">
          <Form.Control
            placeholder="Paste article url..."
            aria-label="article url"
            aria-describedby="basic-addon2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form.Group>

        <Button className="uploadLinkButton "variant="outline-secondary" size="lg" onClick={handleArticleFunctions}>
          Upload Link
        </Button>
      </Form>
      

      

      {articleData && (
        <div className='ArticleContainer'>
          <img className='ArticleImage' src={articleData.top_image} alt="article image" />
          <h1 className='ArticleTitle'>{articleData.title}</h1>
          <p className='ArticleAuthor'>By {articleData.authors.join(", ")}</p>
          <p className='ArticleDate'>{new Date(articleData.date).toLocaleDateString()}</p>
          <p className='ArticleSummary'><h2 className='ArticleSummaryTitle'>Summary of the Article: </h2>{articleData.summary}</p>
        </div>
      )}

  { isLoading  ? (
        <h3>Loading ...</h3>
      ) : !showScore ? (
        <div className="ContentContainer" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="TextContainer" style={{ flex: "1" }}>
          <h1 style={{color: "#238b76", textAlign: "center", fontSize: "3rem"}}>Fake News Detection Web Application</h1>
          <p style={{textAlign: "center", fontSize: "1.5rem"}}>
          This project aims to help users to detect fake news articles quickly and efficiently. With just a few clicks, you can upload the link to the article and receive a summary of the content and some information along with an authenticity score based on three different machine learning models.
          </p>
        </div>
        <div className="ContentRow" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "50px" }}>
          <div className="ImageContainer" style={{ flex: "1", display: "flex", justifyContent: "center" }}>
            <img className='HomePageImage' src={content2} alt="placeholder" style={{ maxWidth: "80%", maxHeight: "80vh" }} />
          </div>
        <div className="TextContainer" style={{ flex: "1" }}>
          <h1 style={{color: "#238b76", textAlign: "center", fontSize: "3rem"}}>Uploading the Article</h1>
          <p style={{textAlign: "center", fontSize: "1.5rem"}}>
          Uploading an article is easy with the web application. Simply paste the URL into the search bar and click "Upload Link." The system will then analyze the article and provide a summary, author name, and publication date.
          </p>
        </div>
      </div>
      <div className="ContentRow" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div className="TextContainer" style={{ flex: "1" }}>
          <h1 style={{color: "#238b76", textAlign: "center", fontSize: "3rem"}}>Checking Authenticity</h1>
          <p style={{textAlign: "center", fontSize: "1.5rem"}}>
          To check authenticity, click the "Check" button. Three different machine learning models will evaluate the article's credibility, providing a final score. This multiple "voting system" ensures accurate results and transparency.
          </p>
        </div>
      <div className="ImageContainer" style={{ flex: "1", display: "flex", justifyContent: "center" }}>
        <img className='HomePageImage' src={content1} alt="placeholder" style={{ maxWidth: "80%", maxHeight: "80vh" }} />
      </div>
      </div>
      <Button variant="success" className="checkButton" size="lg" onClick={handleClick} style={{ width: '220px', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Check!
        </Button>
    </div>

    



      ) : (
        <>
          <div>
            {data1.Score.map((score, i) => (
              <div className="ScoreResult" key={i}>
                <h3>Decision Tree Score</h3>
                <p
                  style={
                    score === "Negative prediction"
                      ? { color: "red", fontWeight: "bold" }
                      : score === "Positive prediction"
                      ? { color: "green", fontWeight: "bold" }
                      : {}
                  }
                >
                  {score}
                </p>
                {score === "Negative prediction" ? (
                  <img
                    src={cross}
                    width="90"
                    height="90"
                    className="d-inline-block align-bottom"
                    alt="Negative prediction"
                  />
                ) : score === "Positive prediction" ? (
                  <img
                    src={check}
                    width="90"
                    height="90"
                    className="d-inline-block align-bottom"
                    alt="Positive prediction"
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div>
            {data2.Score.map((score, i) => (
              <div className="ScoreResult" key={i}>
                <h3>Logistic Regression Score</h3>
                <p
                  style={
                    score === "Negative prediction"
                      ? { color: "red", fontWeight: "bold" }
                      : score === "Positive prediction"
                      ? { color: "green", fontWeight: "bold" }
                      : {}
                  }
                >
                  {score}
                </p>
                {score === "Negative prediction" ? (
                  <img
                    src={cross}
                    width="90"
                    height="90"
                    className="d-inline-block align-bottom"
                    alt="Negative prediction"
                  />
                ) : score === "Positive prediction" ? (
                  <img
                    src={check}
                    width="90"
                    height="90"
                    className="d-inline-block align-bottom"
                    alt="Positive prediction"
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div>
            {data3.Score.map((score, i) => (
              <div className="ScoreResult" key={i}>
                <h3>Random Forest Score</h3>
                <p
                  style={
                    score === "Negative prediction"
                      ? { color: "red", fontWeight: "bold" }
                      : score === "Positive prediction"
                      ? { color: "green", fontWeight: "bold" }
                      : {}
                  }
                >
                  {score}
                </p>
                {score === "Negative prediction" ? (
                  <img
                    src={cross}
                    width="90"
                    height="90"
                    className="d-inline-block align-bottom"
                    alt="Negative prediction"
                  />
                ) : score === "Positive prediction" ? (
                  <img
                    src={check}
                    width="90"
                    height="90"
                    className="d-inline-block align-bottom"
                    alt="Positive prediction"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
