import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel au backend pour récupérer des données
    fetch("http://backend:5000/api/data")
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch data from backend");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message); // Message reçu du backend
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend & Backend Integration</h1>

        {loading && <p>Loading data from the backend...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div>
            <h2>Message from Backend:</h2>
            <div className="backend-message">
              {message ? message : "No message received"}
            </div>
          </div>
        )}

        <footer>
          <p>
            This message is fetched from the backend API running at{" "}
            <code>http://backend:5000</code>
          </p>
        </footer>
      </header>
    </div>
  );
}

export default App;
