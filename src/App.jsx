import React, { useState, useEffect , useMemo } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './App.css'

function App() {
  const [time,setTime] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60); // tempo inicial de 25 minutos em segundos
  const [breakLength, setBreakLength] = useState(5)
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [countDown,setCountDown] = useState(false)
  const sound = new Audio('../src/sounds/sounds_Crispy.wav');
  useMemo(() => {
    if(!isActive && !isPause) {
      setTimeLeft(time*60)
    }
  },[time] );

  useEffect(() => {
    let interval = null;
    // ||
    if(timeLeft==0 && !countDown){
      setTimeLeft(breakLength*60)
      setCountDown(true)
    }
    if(timeLeft==0 && countDown){
      setTimeLeft(time*60)
      setCountDown(false)
    }

    if(timeLeft<=60) {
      sound.volume = '0.155'
      sound.play()
    }

    if (isActive && timeLeft > 0 && !isPause) { 
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);//1000
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  } , [isActive, timeLeft,isPause])

  function startTimer() {
    setIsActive(true);
    setIsPause(false)
  }

  function restartTimer() {
    setIsActive(false);
    setTime(25)
    setTimeLeft(time * 60); // reinicia o tempo para 25 minutos
    setBreakLength(5)
  }

  function stopTimer() {
    if(!isPause){
      setIsPause(true);
    }
    if(isPause){
      setIsPause(false);
    }
  }
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function breakIncrement() {
    if(breakLength<60){
      setBreakLength(breakLength+1)
    }
  }

  function breakDecrement() {
    if(breakLength>1){
      setBreakLength(breakLength-1)
    }
  }

  function sessionIncrement() {
    if(time<60){
      setTime(time=>time+1)
    }
  }

  function sessionDecrement() {
    if(time>1){
      setTime(time=>time-1)
    }
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <h1>25 + 5 Clock</h1>
      <div style={{display:"flex",flexDirection:"row"}}>
        <div style={{border:"2px solid white",width:250,backgroundColor:'#1a1a1a',borderRadius:10,margin:10,padding:10,display:'flex',flexDirection:'column'}}>
          <a style={{fontSize:"2rem"}} id="session-label">Session Length</a>
          <div style={{display:'flex',flexDirection:'row',justifyContent  :'center',alignItems:'center'}}>
            <IconButton sx={{color:'white'}} id="break-decrement" onClick={sessionIncrement}>
              <AddCircleIcon/>
            </IconButton>
            <a style={{fontSize:"2rem"}} id="session-length">{time.toString().padStart(2, '0')}:00</a>
            <IconButton sx={{color:'white'}} id="session-decrement" onClick={sessionDecrement}>
              <RemoveCircleIcon/>
            </IconButton>
          </div>
        </div>
        
        <div style={{border:"2px solid white",width:250,backgroundColor:'#1a1a1a',borderRadius:10,margin:10,padding:10,display:'flex',flexDirection:'column'}}>
          <a style={{fontSize:"2rem"}} id='break-label'>Break Length</a>
          <div style={{display:'flex',flexDirection:'row',justifyContent  :'center',alignItems:'center'}}>
          <IconButton sx={{color:'white'}} id="break-increment" onClick={breakIncrement}>
            <AddCircleIcon/>
          </IconButton>
          <a style={{fontSize:"2rem"}} id="break-length">{breakLength}</a>
          <IconButton sx={{color:'white'}} id="session-increment" onClick={breakDecrement}>
            <RemoveCircleIcon/>
          </IconButton>
          </div>
        </div>
      </div>
      
      <div style={{backgroundColor:'#1a1a1a',margin:20,padding:10,borderRadius:12,border:"2px solid white"}}>
        <a style={{fontSize:"30px"}}>Session</a>
        {timeLeft < 60 ?
        <p style={{fontSize:"80px",color:"red"}} id="time-left">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
        :
        <p style={{fontSize:"80px",color:"white"}} id="time-left">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
        }
      </div>


      <div style={{display:'flex',flexDirection:'row'}}>
        <IconButton sx={{color:'white',backgroundColor:"#1a1a1a",margin:2,border:"2px solid white"}} onClick={startTimer}><PlayArrowIcon/></IconButton>
        <IconButton sx={{color:'white',backgroundColor:"#1a1a1a",margin:2,border:"2px solid white"}} id="start_stop" onClick={stopTimer}>{isPause ? <NotStartedIcon/> : <PauseCircleIcon/>}</IconButton>
        <IconButton sx={{color:'white',backgroundColor:"#1a1a1a",margin:2,border:"2px solid white"}} id="reset" onClick={restartTimer}><RestartAltIcon/></IconButton>
      </div>
    </div>
  );
}

export default App;