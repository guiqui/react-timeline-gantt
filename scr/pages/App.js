import React,{Component} from 'react';
import TimelinePage from 'components/timeline/TimelinePage';
import './App.css'
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{name:3,avatar:"http://localhost:4444/images/me.png"},
    }
  }


  render(){
    return (
      <div className="app-container">
        <TimelinePage />
      </div>

    )
  }

}

export default App;
