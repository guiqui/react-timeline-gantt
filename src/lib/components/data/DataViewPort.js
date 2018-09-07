import React,{Component} from  'react'
import {DATA_CONTAINER_WIDTH} from 'libs/Const'
import DataTask from 'libs/components/data/DataTask'
import sizeMe from 'react-sizeme'

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

export  class DataViewPort extends Component{
    constructor(props){
        super(props)
        this.childDragging=false
    }
    getContainerHeight(rows){
        let new_height=rows>0?rows * this.props.itemheight:10;
        return new_height
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
            console.log(`Now Position ${new_position}`)
            let new_width=this.dateToPixel(item.end)-new_position;
            console.log(`Now Width ${new_width}`)
            console.log(`Scroll Left ${this.props.scrollLeft}`)
            // if (new_position<DATA_CONTAINER_WIDTH){
            result.push(<DataRow key={i} label={item.name} top={i*this.props.itemheight} left={20} itemheight={this.props.itemheight} ><DataTask item={item} label={item.name}  color={item.color} left={new_position} width={new_width} onChildDrag={this.onChildDrag} > </DataTask> </DataRow>);
            // }else{
            //     result.push(<DataRow key={i} label={item.name} top={i*this.props.itemheight} left={20} itemheight={this.props.itemheight} > </DataRow>);
            // }
        }
        return result;
    }
    // onScroll=(e)=>{
    //     e.preventDefault();
    //     // if (!this.childDragging)
    //     //     this.props.onScroll()
    // }
    doMouseDown=(e)=>{
        if ((e.button === 0) && (!this.childDragging)) {
            this.props.onMouseDown(e)
        }
    }
    doMouseMove=(e)=>{
        this.props.onMouseMove(e,this.refs.dataViewPort)
    }
    componentDidMount(){
        this.refs.dataViewPort.scrollLeft=0;
    }

    render(){
        if (this.refs.dataViewPort){
            this.refs.dataViewPort.scrollLeft=this.props.scrollLeft;
            this.refs.dataViewPort.scrollTop=this.props.scrollTop;
        }
            
        let height=this.getContainerHeight()
        return (
        <div ref="dataViewPort"  className="timeLine-main-data-viewPort" 
                    
                    onMouseDown={this.doMouseDown} 
                    onMouseMove={this.doMouseMove}
                    onMouseUp={this.props.onMouseUp} 
                    onMouseLeave ={this.props.onMouseLeave}>                
            <div className="timeLine-main-data-container" style={{height:height,width:DATA_CONTAINER_WIDTH}}>                   
                {this.renderRows()} 
            </div>
        </div>)
    }
}

export default sizeMe({monitorWidth:true,monitorHeight:true})(DataViewPort)
