import React, { useState, useEffect } from 'react';
import CharacterForm from './components/CharacterForm.jsx';
import PowersForm from './components/PowersForm.jsx';
import { getCharacters, createCharacter } from './api/characters';
import { getPowers, createPower } from './api/powers';

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

  const handlePowerSubmit = async (powerData) => {
    try {
      const newPower = await createPower(powerData);
      setPowers([...powers, newPower]);
    } catch (error) {
      console.error('Error creating power:', error);
    }
  };

  return (
    <div>
      <h1>RPG Character App</h1>
      <CharacterForm onSubmit={handleCharacterSubmit} />
      <PowersForm onSubmit={handlePowerSubmit} />
      <ul>
        {characters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
      <ul>
        {powers.map((power) => (
          <li key={power.id}>{power.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;