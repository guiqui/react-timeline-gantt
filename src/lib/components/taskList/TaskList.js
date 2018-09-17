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
        let backgroundColor='#fbf9f9'
        return (
        <div className="timeLine-side-task-row" 
              contentEditable suppressContentEditableWarning
             style={{top:this.props.top,height:this.props.itemheight,backgroundColor:backgroundColor}}
             onClick={(e)=>this.props.onSelectItem(this.props.item)}>
             <div>
                {this.props.label}
            </div>
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
    renderTaskRow(data){
        let result=[];
        for (let i=this.props.startRow;i<this.props.endRow+1;i++){
            let item=data[i];
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
        let data =this.props.data?this.props.data:[];
        this.containerStyle=this.getContainerStyle(data.length)
        return(
            <div className="timeLine-side"> 
                <div className="timeLine-side-title">
                    <div>
                       Projects
                    </div>  
                </div>    
                <div ref="taskViewPort"  className="timeLine-side-task-viewPort" onScroll={this.doScroll}  >                
                    <div className="timeLine-side-task-container" style={this.containerStyle}>                   
                        { this.renderTaskRow(data) }
                    </div> 
                </div>
            </div> 
        )

    }
} 