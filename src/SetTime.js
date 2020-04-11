import React from 'react';
function SetTime(props){
    const {title, count, handleDecrease, handleIncrease} = props;
    const idTitle = title.toLowerCase();
    return(
      <div className="timer-container">
        <h2 id={`${idTitle}-label`}>{`${title} Length`}</h2>
        <div className="flex active-wrapper">
          <button
            id={`${idTitle}-increment`}
            onClick ={handleIncrease}
            >
            <i class="fas fa-arrow-up"></i>
          </button>
          <span id={`${idTitle}-length`}>{count}</span>
          <button
            id={`${idTitle}-decrement`}
            onClick ={handleDecrease}
            >
            <i class="fas fa-arrow-down"></i>
          </button>        
        </div>
      </div>    
    );
  }
export default SetTime;