import { useEffect, useState } from 'react';
import classes from './Scoreboard.module.css';
import Modal from '../Modal/Modal';

const Scoreboard = (props) => {
  const { formData } = props;
  // console.log(formData);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPlayer, setPlayer] = useState('');
  const [gameState, setGameState] = useState(null);
  const [playerIndex, setIndex] = useState(0);
  const [gameGUID, setGameGUID] = useState(Date.now());

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(gameGUID)) === null) {
      const gameplayers = [];
      formData.players.forEach((player, index) => {
        gameplayers.push({
          name: player.name,
          totalPoints: 0,
          points: [],
          isPlayerTurn: index === 0
        });
      });
      localStorage.setItem(gameGUID, JSON.stringify({ players: gameplayers, round: 0 }));
      setGameState(JSON.parse(localStorage.getItem(gameGUID)));
    }
  }, []);

  const addPointsToPlayer = (points) => {
    const game = JSON.parse(localStorage.getItem(gameGUID));
    const player1 = game.players.find((player) => player.name === currentPlayer);
    player1.totalPoints = parseInt(player1.totalPoints) + parseInt(points);
    player1.points.push(points);
    console.log(player1, 'player');
    console.log(game, 'find points');
    localStorage.setItem(gameGUID, JSON.stringify(game));
    setGameState(game);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addPoints = (points) => {
    addPointsToPlayer(points);
    // next player
    if (playerIndex === players.length - 1) {
      setIndex(0);
    } else {
      setIndex(playerIndex + 1);
    }
    closeModal();
  };

  const handleClick = (name) => {
    setPlayer(name);
    openModal();
  };

  console.log(gameState);

  if (gameState === null) {
    return null;
  }
  const players = gameState.players.map((player, index) => {
    return (
      <div key={`${player.name}`}>
        {index} {player.name}
        {player.points.map((point, index) => {
          return <div key={`${point}${index}`}>{point}</div>;
        })}
        {playerIndex === index && <button onClick={() => handleClick(player.name)}>+</button>}
      </div>
    );
  });

  return (
    <>
      {players}
      <Modal isOpen={isOpen} closeModal={closeModal} addPoints={addPoints}>
        tere
      </Modal>
    </>
  );
};

export default Scoreboard;
