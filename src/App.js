import React from 'react';
import {Snake} from './snake'
import Food from './food'

const getRandomCoordinates=()=>{
  let min=1
  let max=98;
  let x= Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y= Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y];
}
const initialSnake= [
  [4,4],
  [2,4] ]
export class App extends React.Component {
  state={
    speed:200,
    score:0,
    food:getRandomCoordinates(),
    snakeDots :initialSnake ,
      direction:'RIGHT'
  } 

  componentDidMount(){
    document.onkeydown=this.onKeyDown;
    setInterval(this.moveSnake,this.state.speed)
  }
  componentDidUpdate(){
    this.checkBorder();
    this.isFoodEat();
  }

  onKeyDown=(e)=>{
    e=e || window.event;
    console.log(e.keyCode)
    switch(e.keyCode){
      case 38:
        this.setState({direction:'UP'});
        break;
       case 40: 
       this.setState({direction:'DOWN'});
       break;
       case 37: 
       this.setState({direction:'LEFT'});
       break;
       case 39: 
         this.setState({direction:'RIGHT'});
         break;
    }  
  }

  isFoodEat(){
    let { food }=this.state
    let dots=[...this.state.snakeDots];
    let head= dots[dots.length-1]
    if(food[0]===head[0] && food[1]===head[1]){
      console.log('Eat Food')
      this.setState({
        food:getRandomCoordinates()
      })
      this.enlargeSnake()
    }
  }
  checkBorder(){
    let head=this.state.snakeDots[this.state.snakeDots.length-1];
    console.log(head);
    if(head[0]>=100 || head[1]>=100 || head[0]<0 || head[1]<0){
      this.setState({
        snakeDots:initialSnake,
        direction:'RIGHT'
      }) 
      this.onGameOver();
    }
  }
  onGameOver(){
    alert(`Opppsss! Your Game is Over. Your Score : ${this.state.score}`)
   
  }
  enlargeSnake(){
    let newSnake=[...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots:newSnake,
      speed:this.state.speed-10,
      score:this.state.score+2
    })
  }
  moveSnake=()=>{
    //console.log(...this.state.snakeDots);
     let dots=[...this.state.snakeDots];
    let head= dots[dots.length-1]
      switch(this.state.direction){
        case 'UP':
         head=[head[0],head[1]-2]; 
         break;
        case 'DOWN':
           head=[head[0],head[1]+2]; 
         break;
        case 'LEFT':
            head=[head[0]-2,head[1]]; 
         break;
        case 'RIGHT':
         head=[head[0]+2,head[1]]; 
         break;
        }
        dots.push(head)
        dots.shift()
        this.setState({
            snakeDots:dots
        });
    }
  render(){
  return (
    <div>
      <div className="header">
      <h1 >Snake Game</h1>
      <div > Your Score : <b>{this.state.score}</b></div>
      </div>
      
      <div className="game-area">
      <Snake snakeDots={this.state.snakeDots}/>
      <Food food={this.state.food}/>
    </div>
    </div>
    
  );
 }
}

export default App;
