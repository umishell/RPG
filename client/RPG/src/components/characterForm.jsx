import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CharacterForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [charClass, setCharClass] = useState('');
  const [weapon, setWeapon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, class: charClass, weapon });
    setName('');
    setCharClass('');
    setWeapon('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="class">Class:</label>
      <input
        type="text"
        id="class"
        value={charClass}
        onChange={(e) => setCharClass(e.target.value)}
        required
      />
      <label htmlFor="weapon">Weapon:</label>
      <input
        type="text"
        id="weapon"
        value={weapon}
        onChange={(e) => setWeapon(e.target.value)}
        required
      />
      <button type="submit">Create Character</button>
    </form>
  );
};

CharacterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CharacterForm; 