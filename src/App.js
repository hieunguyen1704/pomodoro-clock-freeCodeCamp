import React, { Component } from 'react';
import SetTime from './SetTime'
import './App.css'
const audio = document.getElementById("beep");
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      breakCount: 5,
      sessionCount: 25,
      currentTime : 'Session',
      clockCount: 25 * 60,
      isPlaying: false
    }
    this.loop = undefined; // intervalTime variable 
  }
  convertToTime =(count) =>{
    let min = Math.floor(count / 60);
    let second = count % 60;
    min = min < 10 ? ('0'+min) : min;
    second = second < 10 ? ('0'+second): second;
    return `${min}:${second}`;
  }
  handlePlayPause =() =>{
    const {isPlaying} = this.state;
    if(isPlaying){
       this.setState({
         isPlaying: false
       });
      clearInterval(this.loop);
    }else{
      this.setState({
        isPlaying: true
      });
      this.loop = setInterval(() => {
        const {clockCount, 
               currentTime,
              breakCount,
              sessionCount} = this.state;
        if(clockCount === 0){
          this.setState({
            currentTime: (currentTime === 'Session') ?'Break' :'Session',
            clockCount: (currentTime === 'Session') ? breakCount * 60 : sessionCount * 60 
          });
          audio.play();
        }else{
           this.setState({
            clockCount: clockCount -1
          });
        }

      }, 1000);
    }
  }
  handleReset =() =>{
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      currentTime : 'Session',
      clockCount: 25 * 60,
      isPlaying: false     
    });
    audio.pause();
    audio.currentTime = 0;
    clearInterval(this.loop);
  }

  componentWillUnmount(){
      clearInterval(this.loop);
  }
  handleBreakDecrease = () =>{
    const {breakCount, isPlaying, currentTime,clockCount} = this.state;
    if(!isPlaying && breakCount > 1){
      this.setState({
        breakCount : breakCount -1,
        clockCount: (currentTime === 'Break') ? (breakCount -1) *60:clockCount
      });
    } 
  }
  handleBreakIncrease = () =>{
    const {breakCount, isPlaying,currentTime, clockCount} = this.state;
    if(!isPlaying && breakCount < 60){
      this.setState({
        breakCount : breakCount + 1,
        clockCount :(currentTime === 'Break') ? (breakCount + 1) * 60 : clockCount 
      });
    } 
  }
  handleSessionDecrease = () =>{
    const {sessionCount, isPlaying,currentTime, clockCount} = this.state;
    if(!isPlaying && sessionCount > 1){
      this.setState({
        sessionCount : sessionCount - 1,
        clockCount:(currentTime === 'Session') ? (sessionCount - 1) * 60 : clockCount
      });
    } 
  }
  handleSessionIncrease = () =>{
    const {sessionCount, isPlaying, currentTime, clockCount} = this.state;
    if(!isPlaying && sessionCount < 60){
      this.setState({
        sessionCount : sessionCount + 1,
        clockCount: (currentTime === 'Session') ? (sessionCount + 1) * 60 : clockCount
      });
    } 
  }
  render(){
    const {breakCount, 
           sessionCount, 
           currentTime, 
           clockCount,
           isPlaying} = this.state;
    const breakProps = {
      title: 'Break',
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease
    }
    const sessionProps = {
      title: 'Session',
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease
    }    
    return (
      <div>
        <h1 className="title">Pomodoro Clock</h1>
        <div className="flex">
          {/* cách viết ngắn sau đó props sẽ có các props như title count  ...*/} 
          <SetTime {...breakProps}/> 
          <SetTime {...sessionProps}/>
        </div>
        <div className="clock-container">
          <h2 id="timer-label">{currentTime}</h2>
          <span id="time-left">{this.convertToTime(clockCount)}</span>
          <div className="flex">
            <button
              id="start_stop"
              onClick={this.handlePlayPause}>
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
            <button
              id="reset"
              onClick={this.handleReset}>
              <i className="fas fa-sync"></i>
            </button>     
          </div>
        </div>
      </div>
    );
  }
}

export default App;
