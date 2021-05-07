import React, { useState, useEffect, useMemo } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import { GETALLUSER_API } from '../components/Api';
import axios from "axios";
import Image from 'react-bootstrap/Image'


const alreadyRemoved = []

function Swipe() {
  const [userId, setUserId] = useState('');
  const [characters, setCharacters] = useState()
  const [lastDirection, setLastDirection] = useState()

  const [allData, setAllData] = useState([]);

  const handleUserData = async () => {
    const bodyParameters = {
      session_id: localStorage.getItem("session_id")
    };
    const { data: { data } } = await axios.post(GETALLUSER_API, bodyParameters)
    setAllData(data);

  }
  useEffect(() => {
    handleUserData();
  }, [])
  const childRefs = useMemo(() => Array(allData.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {

  }


  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = allData.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div>

      <div className='cardContainer'>
        {allData.map((character, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <div className="card">

                <Image src={character.profile_images} alt={character.first_name} width="100%" height="100%" />


                <h3>{character.first_name}, {character.age}</h3>
                <span>{character.distance},{character.occupation}</span>


              </div>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}>Swipe left!</button>
        <button onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
    </div>
  )
}


export default Swipe