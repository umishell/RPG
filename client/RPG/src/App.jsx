
import React, { useState, useEffect } from 'react';
import CharacterForm from './components/CharacterForm.jsx';
import PowersForm from './components/PowersForm.jsx';
import { getCharacters, createCharacter, updateCharacter, deleteCharacter } from './api/characters';
import { getPowers, createPower, updatePower, deletePower } from './api/powers';

function App() {
  const [characters, setCharacters] = useState([]);
  const [powers, setPowers] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const fetchedCharacters = await getCharacters();
        setCharacters(fetchedCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    const fetchPowers = async () => {
      try {
        const fetchedPowers = await getPowers();
        setPowers(fetchedPowers);
      } catch (error) {
        console.error('Error fetching powers:', error);
      }
    };

    fetchCharacters();
    fetchPowers();
  }, []);

  const handleCharacterSubmit = async (characterData) => {
    try {
      const newCharacter = await createCharacter(characterData);
      setCharacters([...characters, newCharacter]);
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };


  const handleCharacterUpdate = async (characterId, updatedCharacterData) => {
    try {
      const updatedCharacter = await updateCharacter(characterId, updatedCharacterData);
      const updatedCharacters = characters.map((character) => (character.id === characterId ? updatedCharacter : character));
      setCharacters(updatedCharacters);
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const handleCharacterDelete = async (characterId) => {
    try {
      await deleteCharacter(characterId);
      const updatedCharacters = characters.filter((character) => character.id !== characterId);
      setCharacters(updatedCharacters);
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const handlePowerSubmit = async (powerData) => {
    try {
      const newPower = await createPower(powerData);
      setPowers([...powers, newPower]);
    } catch (error) {
      console.error('Error creating power:', error);
    }
  };

  const handlePowerUpdate = async (powerId, updatedPowerData) => {
    try {
      const updatedPower = await updatePower(powerId, updatedPowerData);
      const updatedPowers = powers.map((power) => (power.id === powerId ? updatedPower : power));
      setPowers(updatedPowers);
    } catch (error) {
      console.error('Error updating power:', error);
    }
  };

  const handlePowerDelete = async (powerId) => {
    try {
      await deletePower(powerId);
      const updatedPowers = powers.filter((power) => power.id !== powerId);
      setPowers(updatedPowers);
    } catch (error) {
      console.error('Error deleting power:', error);
    }
  };

  return (
    <div>
      <h1>RPG Character App</h1>
      <h2>Characters</h2>
      <CharacterForm onSubmit={handleCharacterSubmit} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>
                <button onClick={() => handleCharacterUpdate(character.id, { ...character, name: 'Updated Name' })}>
                  Update
                </button>
                <button onClick={() => handleCharacterDelete(character.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Powers</h2>
      <PowersForm onSubmit={handlePowerSubmit} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {powers.map((power) => (
            <tr key={power.id}>
              <td>{power.name}</td>
              <td>
              <button onClick={() => handlePowerUpdate(power.id, { ...power, name: 'Updated Power Name' })}>Update</button>
              <button onClick={() => handlePowerDelete(power.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
