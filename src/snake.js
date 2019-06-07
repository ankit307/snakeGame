import React from 'react';
export class Snake extends React.Component{
    
    state={
        
    }
    render(){
        return <div>
        {this.props.snakeDots.map((dot,i)=>{
            const style={
                left:`${dot[0]}%`,
                top:  `${dot[1]}%`
            }
            return (
                <div className="snake-dot" key={i} style={style}></div>
            )
        })}
    </div>
    }
   }