import React, { useState } from 'react';
import axios from 'axios';

const SqlGenerator = () => {
  const [query, setQuery] = useState('');
  const [sqlQueryResult, setSqlQueryResult] = useState('');

  const generateSQLQuery = async () => {
    try {
      const response = await axios.post('http://localhost:3000/gensql', {
        input: query
      });
      const { sqlQuery } = response.data;
      setSqlQueryResult(sqlQuery);
    } catch (error) {
      console.error('Error generating SQL query:', error);
      setSqlQueryResult('An error occurred while generating the SQL query.');
    }
  };

  return (
    <div>
      <h1>SQL Query Generator</h1>
      <label htmlFor="query">Enter your query:</label>
      <input 
        type="text" 
        id="query" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={generateSQLQuery}>Generate SQL Query</button>
      <div>{sqlQueryResult}</div>
    </div>
  );
};

export default SqlGenerator;
