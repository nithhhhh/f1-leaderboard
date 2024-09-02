
import React, { useState } from 'react';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const initialLeaderboardData = [
  { position: 1, name: 'Max Verstappen',  logo: './images/logo1.png', time: '00:56:23' },
  { position: 2, name: 'Lando Norris',  logo: './images/logo2.jpg', time: '00:57:23' },
  { position: 3, name: 'Charles Leclerc', logo: './images/logo3.png', time: '00:57:29' },
  { position: 4, name: 'Carlos Sainz',  logo: './images/logo4.png', time: '00:57:35' },
  { position: 5, name: 'Oscar Piastri', logo: './images/logo5.jpg', time: '00:58:09' },
  { position: 6, name: 'Lewis Hamilton',  logo: './images/logo6.png', time: '00:58:20' },
  { position: 7, name: 'Sergio Perez',  logo: './images/logo7.png', time: '00:58:27' },
  { position: 8, name: 'George Russell', logo: './images/logo8.png', time: '00:59:23' },
  { position: 9, name: 'Fernando Alonso', logo: './images/logo9.jpg' , time: '00:59:39'},
  { position: 10, name:'Lance Stroll', logo: './images/logo10.jpg', time: '00:59:50' },
];

function App() {
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);
  const [newEntry, setNewEntry] = useState({ name: '', time: '', logo: '/images/default-logo.png' });
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleAddScore = () => {
    const newLeaderboard = [...leaderboardData, { ...newEntry, position: leaderboardData.length + 1 }];
    setLeaderboardData(newLeaderboard.sort((a, b) => a.time.localeCompare(b.time)));
    setShowPopup(false);
  };

  return (
    <div className="App">
      <div className="leaderboard">
        <h1> TOP 10 AFTER Hungarian GP </h1>
        <TransitionGroup component="table">
          <thead>
            <tr>
              <th>NO.</th>
              <th>NAME</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <CSSTransition key={index} timeout={500} classNames="fade">
                <tr className={`top-${entry.position}`}>
                  <td>{entry.position}</td>
                  <td>
                    <img src={entry.logo} alt="logo" className="logo" /> {entry.name}
                  </td>
                  <td>{entry.prize ? `${entry.prize} ${entry.time}` : entry.time}</td>
                </tr>
              </CSSTransition>
            ))}
          </tbody>
        </TransitionGroup>
        <div className="recent-entry">
          <p>RECENT ENTRY</p>
          <p>Fernando Alonso</p>
        </div>
      </div>
      <div className="footer">
        <p>Top 10 F1 driver's points after Hungarian GP </p>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add Score</h2>
            <label>
              Username:
              <input type="text" name="name" value={newEntry.name} onChange={handleInputChange} />
              <button onClick={handleAddScore}>Name</button>
            </label>
            <label>
              Score (MM:SS:MSS):
              <input type="text" name="time" value={newEntry.time} onChange={handleInputChange} />
              <button onClick={handleAddScore}>Time</button>
            </label>
            <button onClick={handleAddScore}>Add</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      <button className="add-score-button" onClick={() => setShowPopup(true)}>Add Score</button>
    </div>
  );
}

export default App;
