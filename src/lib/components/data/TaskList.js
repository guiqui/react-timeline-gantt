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

export default class TaskList extends Component{
    constructor(props){
        super(props)
    }
    getContainerStyle(rows){
        let new_height=rows>0?rows * this.props.itemheight:10;
        return {height:new_height}
    }
    renderSiderow(){
        debugger
        let result=[];
        for (let i=this.props.startRow;i<this.props.endRow+1;i++){
            let item=this.props.data[i];
            if(!item) break
            result.push(<SideRow key={i} label={item.name} top={i*this.props.itemheight} itemheight={this.props.itemheight} ></SideRow>);
        }
        return result;
    }

    render(){
        this.containerStyle=this.getContainerStyle(this.props.data.length)
        return(
            <div className="timeLine-side"> 
                <div className="timeLine-side-title">
                    <div>
                        My tasks todo
                    </div>  
                </div>    
                <div ref="taskViewPort"  className="timeLine-side-task-viewPort" >                
                    <div className="timeLine-side-task-container" style={this.containerStyle}>                   
                        { this.renderSiderow() }
                    </div> 
                </div>
            </div> 
        )

    }
} 