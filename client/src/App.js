import React, { useState } from 'react';

function App() {
  const [longURL, setLongURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [error, setError] = useState('');

  const encodeURL = async () => {
    try {
      const response = await fetch('http://localhost:5000/encodeurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longURL })
      });
      const data = await response.json();
      setShortenedURL(data.shortURL);
      setError('');
    } catch (error) {
      console.error('Error encoding URL:', error);
      setError('Failed to shorten URL. Please try again.');
    }
  };

  const decodeURL = (shortURL) => {
    window.location.href = shortURL;
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter Long URL"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
      />
      <button onClick={encodeURL}>Shorten URL</button>
      {shortenedURL && (
        <div>
          <p>Shortened URL: <a href={shortenedURL}>{shortenedURL}</a></p>
          <button onClick={() => decodeURL(shortenedURL)}>Decode URL</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
