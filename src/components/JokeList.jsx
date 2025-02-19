import React, { useState, useEffect } from "react";
import Joke from "./Joke";

const JokeList = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/joke");

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <p>Loading jokes...</p>;
  if (!joke) return <p>No joke available</p>; 

  return (
    <div className="joke-list">
      <Joke key={joke?._id} joke={joke} onNext={fetchJoke} />
    </div>
  );
};

export default JokeList;
