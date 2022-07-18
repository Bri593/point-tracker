import { useState } from 'react';
import classes from './Scoreboard.module.css';

const Scoreboard = (props) => {
  const { formData } = props;
  console.log(formData);
  console.log(props);
  const players = formData.players.map((player, index) => (
    <div key={`${player.name}${index}`}> {player.name}</div>
  ));
  return <>{players}</>;
};
export default Scoreboard;
