import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import salman from './assets/images/shalman-sha.jpg';
import manna from './assets/images/manna.jpg';
import rubel from './assets/images/rubel.jpg';
import sakib from './assets/images/sakib-khan.jpg';
import amin from './assets/images/amin-khan.jpg';
import elius from './assets/images/elius-kanchon.jpg';


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
  const [cards, setCards] = useState([...cardImages, ...cardImages]);

  return (
    <>
      <div className='min-h-screen flex flex-col items-center py-10 transition duration-300'>
          <h1 className='text-3xl font-bold mb-4 dark:text-white text-green-600'>Memory Card Game</h1>
          <div className='grid grid-cols-4 gap-4 w-[350px] sm:w-[500px]'>
            {
              cards.map((card)=>(
                <div key={card.src}>
                  <div
                    className='relative w-full h-30 sm:h-45 cursor-pointer transform transition-transform duration-300'
                  >
                    <img src={card.src} alt="Card Image"
                      className='absolute inset-0 w-full h-full rounded-lg backface'
                    />
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
