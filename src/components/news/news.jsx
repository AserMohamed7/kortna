import React, { useEffect, useState } from 'react';
import styles from './news.module.css';
import background from '../../images/wp13335488.jpg';

function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page

  useEffect(() => {
    fetch('/football_news.json')
      .then(response => response.json())
      .then(data => setNewsItems(data))
      .catch(error => console.error('Error fetching the news data:', error));
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  // Get the news items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  // Scroll to top when the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.newsContainer}>
      {currentItems.map((newsItem, index) => (
        <div key={index} className={styles.newsItem}>
          <img src={newsItem.photo} alt={newsItem.title} className={styles.newsPhoto} />
          <h2>{newsItem.title}</h2>
          <p>{newsItem.description}</p>
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default News;
