import React, { useState, useEffect } from 'react';
import style from './egyptian.module.css';

const Egyptian = () => {
  const [teams, setTeams] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2022-2023');

  useEffect(() => {
    fetch('/egyptian.json')
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error('Error fetching the teams data:', error));
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const getFilteredTeams = () => {
    return teams[selectedYear] || [];
  };

  const getColorClass = (index) => {
    const filteredTeams = getFilteredTeams();
    const totalTeams = filteredTeams.length;

    if (selectedYear === '2022-2023') {
      if (index < 2) return style.greenCircle;
      if (index === 2|| index===3) return style.yellowCircle;
      if (index >= totalTeams - 3) return style.redCircle;
    } else if (selectedYear === '2021-2022') {
      if (index ===0 ||index===2) return style.greenCircle;
      if (index === 1 ||index===4) return style.yellowCircle;
      if (index >= totalTeams - 3) return style.redCircle;
    } else if (selectedYear === '2020-2021') {
      if (index < 2) return style.greenCircle;
      if (index === 2) return style.yellowCircle;
      if (index >= totalTeams - 3) return style.redCircle;
    }

    return '';
  };

  return (
    <div className={style.egyptianContainer}>
      <h1>Egyptian League Standings</h1>
      <div className={style.filterContainer}>
        <label htmlFor="yearSelect">Select Year: </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className={style.yearSelect}
        >
          <option value="2022-2023">2022-2023</option>
          <option value="2021-2022">2021-2022</option>
          <option value="2020-2021">2020-2021</option>
        </select>
      </div>
      <table className={style.teamTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Loses</th>
            <th>Matches Played</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {getFilteredTeams().map((team, index) => (
            <tr key={index} className={index % 2 === 0 ? style.evenRow : style.oddRow}>
              <td>
                <span className={`${style.circle} ${getColorClass(index)}`}></span>
                {team.standingsNumber}
              </td>
              <td className={style.teamInfo}>
                <img src={team.logo} alt={`${team.name} Logo`} className={style.teamLogo} />
                <span>{team.name}</span>
              </td>
              <td>{team.win}</td>
              <td>{team.draw}</td>
              <td>{team.lose}</td>
              <td>{team.matchesPlayed}</td>
              <td>{team.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.indicator}>
        <div className={style.indicatorItem}>
          <div className={`${style.circle} ${style.greenCircle}`}></div> Champions League
        </div>
        <div className={style.indicatorItem}>
          <div className={`${style.circle} ${style.yellowCircle}`}></div> Confedration Cup
        </div>
        <div className={style.indicatorItem}>
          <div className={`${style.circle} ${style.redCircle}`}></div> Relegated
        </div>
      </div>
    </div>
  );
};

export default Egyptian;
