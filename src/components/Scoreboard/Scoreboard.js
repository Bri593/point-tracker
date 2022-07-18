import { useState } from 'react';
import classes from './Scoreboard.module.css';
import Modal from '../Modal/Modal';

const Scoreboard = (props) => {
  const { formData } = props;
  console.log(formData);
  console.log(props);

  const options = [];
  for (var i = 0; i < 13; i++) {
    options.push(<option value={i}>{i}</option>);
  }
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = parseInt(localStorage.getItem(name));
    localStorage.setItem(name, value + parseInt(event.target.value));
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const players = formData.players.map((player, index) => {
    localStorage.setItem(player.name, 0);
    console.log(player.name, localStorage.getItem(player.name));

    return (
      <div key={`${index}`}>
        <li>
          {player.name}
          <select name={player.name} onChange={handleChange}>
            {options}
          </select>
          <button onClick={openModal}>+</button>
        </li>
      </div>
    );
  });

  return (
    <>
      {players}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        tere
      </Modal>
    </>
  );
};

export default Scoreboard;
