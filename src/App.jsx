import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import salman from './assets/images/shalman-sha.jpg';
import manna from './assets/images/manna.jpg';
import rubel from './assets/images/rubel.jpg';
import sakib from './assets/images/sakib-khan.jpg';
import amin from './assets/images/amin-khan.jpg';
import elius from './assets/images/elius-kanchon.jpg';


import flip from './assets/media/audio/flipSound.mp3';
import match from './assets/media/audio/matchSound.mp3';


// data

const cardImages = [
  {src: salman, matched: false},
  {src: manna, matched: false},
  {src: rubel, matched: false},
  {src: sakib, matched: false},
  {src: amin, matched: false},
  {src: elius, matched: false},
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Game Sound Effects
  const flipSound = new Audio(flip);
  const matchSound = new Audio(match);

  // shuffle cards with added id
  const shuffleCards = ()=>{
    const shuffled = [...cardImages, ...cardImages].sort(()=> Math.random() - 0.5).map((card)=> ({...card, id: Math.random()}));
    setCards(shuffled);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(()=>{
    shuffleCards();
  }, []);

  // handle a choice
  const handleChoice = (card)=>{
    flipSound.play();
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset choices & increase turn

  const resetTurn = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev=> prev + 1);
    setDisabled(false);
  };

  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);

      if(choiceOne.src === choiceTwo.src){

        // matched shoud
        matchSound.play();

        setCards(prev=>{
          return prev.map(card=>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card;
            }
          })
        });
        resetTurn();
      }else{
        setTimeout(()=>resetTurn(), 1000);
      }
    }


  },[choiceOne, choiceTwo]);

  return (
    <>
      <div className='min-h-screen flex flex-col items-center py-10 transition duration-300'>
          <h1 className='text-3xl font-bold mb-4 dark:text-white text-green-600'>Memory Card Game</h1>

          <button onClick={shuffleCards} className='mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300'>New Game</button>
          <div className='text-2xl'>Turns: {turns}</div>
          <div className='grid grid-cols-4 gap-2 w-[350px] sm:w-[500px]'>
            {
              cards.map((card)=>(
                <div key={card.id}>
                  <div
                    onClick={()=> !disabled && handleChoice(card)}
                    className={`relative w-full h-30 sm:h-45 cursor-pointer transform transition-transform duration-300 ${ (card === choiceOne || card === choiceTwo || card.matched) ? 'rotate-y-180' : '' }`}
                  >
                    <img src={card.src} alt="Card Image"
                      className={`absolute inset-0 w-full h-full rounded-lg backface-hidden ${ (card === choiceOne || card === choiceTwo || card.matched) ? 'opacity-100' : 'opacity-0' }`}
                    />

                    <div className={`absolute inset-0 w-full h-full rounded-lg bg-blue-500 flex items-center justify-center text-white text-2xl font-bold backface-hidden ${ (card === choiceOne || card === choiceTwo || card.matched) ? 'opacity-0' : 'opacity-100' }`}>
                      ?
                    </div>
                  </div>
                </div>

              ))
            }
          </div>
      </div>
      
    </>
  )
}

export default App
