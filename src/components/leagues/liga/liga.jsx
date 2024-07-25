import React, { useState, useEffect } from 'react';
import style from './liga.module.css';

const Liga = () => {
  const [teams, setTeams] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2023-2024');

  useEffect(() => {
    fetch('/liga.json')
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

    if (selectedYear === '2023-2024') {
      if (index < 4 ) return style.greenCircle;
      if (index === 4 || index === 5) return style.yellowCircle;
      if (index === 6) return style.blueCircle;
      if (index >= totalTeams - 3) return style.redCircle;
    } else if (selectedYear === '2022-2023') {
      if (index < 4 ||index===11) return style.greenCircle;
      if (index === 4 ||index===5) return style.yellowCircle;
      if (index === 6) return style.blueCircle;
      if (index >= totalTeams - 3) return style.redCircle;
    } else if (selectedYear === '2021-2022') {
      if (index < 4) return style.greenCircle;
      if (index === 4 || index === 5) return style.yellowCircle;
      if (index === 6) return style.blueCircle;
      if (index >= totalTeams - 3) return style.redCircle;
    }

    return '';
  };

  return (
    <div className={style.ligaContainer}>
      <h1>La Liga Standings</h1>
      <div className={style.filterContainer}>
        <label htmlFor="yearSelect">Select Year: </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
          className={style.yearSelect}
        >
          <option value="2023-2024">2023-2024</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2021-2022">2021-2022</option>
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
          <div className={`${style.circle} ${style.yellowCircle}`}></div> Europa League
        </div>
        <div className={style.indicatorItem}>
          <div className={`${style.circle} ${style.blueCircle}`}></div> Conference League
        </div>
        <div className={style.indicatorItem}>
          <div className={`${style.circle} ${style.redCircle}`}></div> Relegated
        </div>
      </div>
    </div>
  );
};

export default Liga;
