import { useState } from 'react';
// import classes from './GameTracker.module.css';
import AddPlayers from '../components/AddPlayers/AddPlayers';
import Scoreboard from '../components/Scoreboard/Scoreboard';

const GameTracker = () => {
  const [formData, setFormData] = useState(null);
  console.log(formData);

  return (
    <>
      {formData === null ? (
        <AddPlayers setFormData={setFormData} />
      ) : (
        <Scoreboard formData={formData} />
      )}
    </>
  );
};
export default GameTracker;
