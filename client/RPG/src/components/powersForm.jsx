import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as powersApi from '../api/powers';

const PowersForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [damage, setDamage] = useState(0);
  const [characterId, setCharacterId] = useState(1); // Adjust character ID if needed

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPower = await powersApi.createPower({ name, type, damage, characterId });
      console.log('Power created:', newPower);
      // Handle success (e.g., clear form, display confirmation)
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message)
    }
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
      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <label htmlFor="damage">Damage:</label>
      <input
        type="number"
        id="damage"
        value={damage}
        onChange={(e) => setDamage(parseInt(e.target.value))}
        required
      />
      <label htmlFor="characterId">Character ID:</label>
      <input
        type="number"
        id="characterId"
        value={characterId}
        onChange={(e) => setCharacterId(parseInt(e.target.value))}
        required
      />
      <button type="submit">Create Power</button>
    </form>
  );
};

PowersForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PowersForm;