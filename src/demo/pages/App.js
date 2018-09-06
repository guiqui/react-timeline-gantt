import React,{Component} from 'react';
import TimeLine from 'libs/TimeLine';

import './App.css'

class App extends Component{
  constructor(props){
    super(props)
  }

  onItemClick=(item)=>{
    this.setState({selectedItem:item})
  }
  render(){

    return (
      <div className="app-container">
       <h1>Gant Time Lime Demo</h1>
        <div className="time-line-container">
          <TimeLine rowheight={20} itemheight={30}/>
        </div>
      </div>

    )
  }

}

export default App;
