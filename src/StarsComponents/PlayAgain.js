
export const PlayAgain = (props) => {
  
    const messageClassName = () => 
      { const retMsg = props.status === "won" ? "text-success" : "text-danger";
        return "message " + retMsg;
      }
  
    return (
    <div className="star-game-done">
      <div className={ messageClassName() }>
        Game { props.status }
      </div>
      <button onClick={props.resetGame} >Play Again</button>
    </div>)
  }

