import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch des utilisateurs existants
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched users:", data); // Log des données récupérées
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Fonction pour ajouter un utilisateur
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in both fields");
      return;
    }

    const newUser = { name, email };

    fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User added:", data);
        fetchUsers(); // Rafraîchit la liste des utilisateurs
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <div>
        <h2>Add a New User</h2>
        <form onSubmit={handleAddUser}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
      <div>
        <h2>Users List</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <strong>Name:</strong> {user.name} <br />
                <strong>Email:</strong> {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
