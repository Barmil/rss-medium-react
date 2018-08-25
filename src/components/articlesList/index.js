import React from 'react';
import './articlesList.css';
import ArticleCard from '../articleCard';

const articlesList = ({articles}) => (<div className="articles-container">
    { articles.map((article, index) => <ArticleCard key={index} {...article} />) }
  </div>
);

export default articlesList;