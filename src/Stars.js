//import reactDom from 'react-dom';
import './assets/stars.css';
import { useState, useEffect } from "react";
import {utils} from "./math-utils"
import { StarsDisplay } from "./StarsComponents/StarsDisplay";
import { starColors } from './StarsComponents/StarColors';
import { StarNumber } from './StarsComponents/StarNumber';
import { PlayAgain } from './StarsComponents/PlayAgain';


//Custom Hook - manage the state
const useGameState = (maxStars, maxTime) => {
  const [stars, setStars] = useState(utils.random(1,maxStars));
  const [candidateNums, setCandidateNums] = useState([]);
  const [availableNums, setAvailableNums] = useState(utils.range(1,maxStars));
  const [secondsLeft, setSecondsLeft] = useState(maxTime);
  const [starColor, setStarColor] = useState(0);
  

  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  useEffect(() => {
    if (secondsLeft > 0 && gameStatus === 'active') {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      //Must clean up the effect so that you don't generate lots of timers!!!
      return () => clearTimeout(timerId); 
    } 
  });

  const resetStars = (availNums) => {
    setStars(utils.randomSumIn(availNums,maxStars));
    if (starColor === starColors.length - 1) {
      setStarColor(0);
    } else 
      setStarColor(starColor+1);

    setCandidateNums([]);
  }


  const setGameState = (newCandidate) => {
    setCandidateNums(newCandidate);
    if (utils.sum(newCandidate) === stars) {
      const newAvailable = availableNums.slice();
      newCandidate.map((num) => { 
        if (newAvailable.includes(num)) {
          newAvailable.splice(newAvailable.indexOf(num), 1); 
        }
        return num;
      }
      );
      setAvailableNums(newAvailable);
      resetStars(newAvailable);
    }


    return "";
  }

  return { stars, availableNums, candidateNums, secondsLeft,starColor, setGameState};
}


export default function StarMatch(props) {
  const maxStars = 12;
  const maxTime = 16;
  //custom hook
  const { stars,
          candidateNums,
          availableNums,
          secondsLeft,
          starColor, 
          setGameState } = useGameState(maxStars, maxTime);

    //const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const isGameOver = availableNums.length === 0 || secondsLeft === 0;
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

    //setInterval or setTimeout
    //React Hooks: useEffect 

    const getNumberStatus = (number, candidateArray) => {
      if (!availableNums.includes(number)) {
        return "used";
      }
      if (candidateArray.includes(number)) {
          return utils.sum(candidateArray) > stars ? 'wrong' : 'candidate';
      }
      return "available";
    }

    const numberStatus = (number) => {
       return getNumberStatus(number, candidateNums); 
    };

    const resetGame = () => {
      props.resetGame();
      //setAvailableNums(utils.range(1,9));
      //setStars(utils.random(1,9));
      //setSecondsLeft(10);
    }

    const onNumberClick = (status, number) => {
      if (status === 'used' || isGameOver) {
        return;
      }

      const newCandidate = candidateNums.slice();
      if (newCandidate.includes(number)) {
          newCandidate.splice(newCandidate.indexOf(number), 1);
      } else {
          newCandidate.push(number);
      }
      setGameState(newCandidate);

       

    }

    return (
    <div className="container-fluid">

        <div className="star-help">
          Pick 1 or more numbers that sum to the number of stars.  Once a number is used, it can't be reused.  
          Try to use all numbers before timer runs out.  For example, if there are 12 stars but the number 12 is already used but 10 and 2 are unused, you can click 10 and 2.
        </div>
        <div className="star-game">
        <div className="star-body">
          <div className="star-left">
              {
                isGameOver ? <PlayAgain resetGame={resetGame} status={gameStatus}></PlayAgain> :
                <StarsDisplay count={stars} resetGame={resetGame} starColor={starColor}></StarsDisplay>  
              }
          </div>
          <div className="star-right">
             {
                 utils.range(1, maxStars).map(numberId1 => 
                    <StarNumber key={numberId1}
                     numberId1={numberId1}
                    status={numberStatus(numberId1)}
                    onClick={onNumberClick}
                    />
                 )  
             }
          </div>
        </div>
      </div>
      <div className="star-timer star-help">Time Remaining: {secondsLeft}</div>
      <div className="text-center">Star Color: { starColor}</div>
    </div>
    );
  };
  


  
  
 
  
  //ReactDOM.render(<StarMatch />, mountNode);
  