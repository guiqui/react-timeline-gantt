import React,{Component} from  'react'
import {LEFT_BOUNDARIES} from 'libs/Const'
import DataTask from 'libs/components/data/DataTask'

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

export default class DataViewPort extends Component{
    constructor(props){
        super(props)
    }
    getContainerStyle(rows){
        let new_height=rows>0?rows * this.props.itemheight:10;
        return {height:new_height}
    }
    onChildDrag=(dragging)=>{
        this.childDragging=dragging;
    }

    dateToPixel(input){
        let nowDate=new Date();
        let inputTime=new Date(input);
        let timeDiff = inputTime.getTime() - nowDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 ))+this.props.nowposition;
    }

    renderRows=()=>{
        let result=[];
        for (let i=this.props.startRow;i<this.props.endRow+1;i++){
            let item=this.props.data[i];
            if(!item) break
            let new_position=this.dateToPixel(item.start);
            let new_width=this.dateToPixel(item.end)-new_position;
            if (new_position<LEFT_BOUNDARIES){
                result.push(<DataRow key={i} label={item.name} top={i*this.props.itemheight} left={20} itemheight={this.props.itemheight} ><DataTask label={item.name}  color={item.color} left={new_position} width={new_width} onChildDrag={this.onChildDrag} > </DataTask> </DataRow>);
            }else{
                result.push(<DataRow key={i} label={item.name} top={i*this.props.itemheight} left={20} itemheight={this.props.itemheight} > </DataRow>);
            }
        }
        return result;
    }

    render(){
        this.containerStyle=this.getContainerStyle(this.props.data.length)
        return (
        <div ref="dataViewPort"  className="timeLine-main-data-viewPort" 
                    onScroll={this.props.onScroll}  
                    onMouseDown={this.props.onMouseDown} 
                    onMouseMove={this.props.onMouseMove}
                    onMouseUp={this.props.onMouseUp} 
                    onMouseLeave ={this.props.onMouseLeave}>                
            <div ref="dataContainer" className="timeLine-main-data-container" style={this.containerStyle}>                   
                {this.renderRows()} 
            </div>
        </div>)
    }
}