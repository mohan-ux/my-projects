import React, { useState } from "react";

function UserForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, skills });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Skills:</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
