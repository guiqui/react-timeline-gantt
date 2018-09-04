import React,{Component} from 'react';
import TimeLine from '../timeline/TimeLine';


export class TimeLinePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className="project-board">
               
                    <TimeLine rowheight={30} itemheight={30}/>
                </div>
        )
    }
}


export default  TimeLinePage;
