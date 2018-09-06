import React,{Component} from 'react'
export class VerticalLine extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div className="timeLine-main-data-verticalLine" style={{left:this.props.left}}>
        </div> )
    }

}

export class DataRow extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
        <div className="timeLine-main-data-row" 
            style={{top:this.props.top,height:this.props.itemheight}}>
        {this.props.children}
        </div>)    
    }
}

//Side Components
export class SideRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div className="timeLine-side-task-row" style={{top:this.props.top}}>
            {this.props.label}
        </div>)    
    }
}