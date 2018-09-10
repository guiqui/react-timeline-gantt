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

export class TaskRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let backgroundColor=this.props.isSelected?'chocolate':'grey'
        return (
        <div className="timeLine-side-task-row" 
            //  contentEditable={true}
             style={{top:this.props.top,height:this.props.itemheight,backgroundColor:backgroundColor}}
             onClick={(e)=>this.props.onSelectItem(this.props.item)}>
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
    renderTaskRow(){
        let result=[];
        for (let i=this.props.startRow;i<this.props.endRow+1;i++){
            let item=this.props.data[i];
            if(!item) break
            result.push(<TaskRow key={i}    
                                 item={item}
                                 label={item.name} 
                                 top={i*this.props.itemheight} 
                                 itemheight={this.props.itemheight} 
                                 isSelected={this.props.selectedItem==item}
                                 onSelectItem={this.props.onSelectItem}></TaskRow>);
                        
        }
        return result;
    }
    doScroll=()=>{
        this.props.onScroll(this.refs.taskViewPort.scrollTop)
    }
    render(){
        this.containerStyle=this.getContainerStyle(this.props.data.length)
        return(
            <div className="timeLine-side"> 
                <div className="timeLine-side-title">
                    <div>
                       Projects
                    </div>  
                </div>    
                <div ref="taskViewPort"  className="timeLine-side-task-viewPort" onScroll={this.doScroll}  >                
                    <div className="timeLine-side-task-container" style={this.containerStyle}>                   
                        { this.renderTaskRow() }
                    </div> 
                </div>
            </div> 
        )

    }
} 