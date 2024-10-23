import React, { useState } from 'react';
import Button from '../button/Button';
import './startGame.scss';
import { setUserData } from '../../redux/reducers/userSlice'; // Make sure this points to the correct file
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

type StartGameProps = {
  onStartGame: () => void;
};

const StartGame = ({ onStartGame }: StartGameProps) => {
  const [name, setName] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const id = uuidv4();
      // Dispatch the action to set the user name and id in the userReducer
      dispatch(setUserData({ id, name }));
      // Trigger the start of the game in the parent (App component)
      onStartGame();
    }
  };

  return (
    <div className="start-game">
      <h1>Whack A Mole</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" className="start">
          Start Game
        </Button>
      </form>
    </div>
  );
};

export default StartGame;
