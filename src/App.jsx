import { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [topHashtags, setTopHashtags] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/hashtag/', { params: { start_date, end_date } });
      setTopHashtags(response.data.top_hashtags);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="hashtag-container">
      <div className="hashtag-inputs">
        <label className="hashtag-label" htmlFor="start_date">Start Date:</label>
        <input
          className="hashtag-input"
          type="date"
          id="start_date"
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label className="hashtag-label" htmlFor="end_date">End Date:</label>
        <input
          className="hashtag-input"
          type="date"
          id="end_date"
          value={end_date}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button className="hashtag-button" onClick={fetchData}>Show Data</button>
      </div>

      <div className="hashtag-results">
        {topHashtags.length > 0 && (
          <>
            <h2 className="hashtag-heading">Top 5 Hashtags for the Given Date Range:</h2>
            <table className="hashtag-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Hashtag</th>
                </tr>
              </thead>
              <tbody>
                {topHashtags.map((tag, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{tag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
