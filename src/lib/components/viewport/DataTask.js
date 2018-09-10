import React,{Component} from 'react'
import DateHelper from 'libs/helpers/DateHelper'

export default class DataTask extends Component{
    constructor(props){
        super(props);
        this.doMouseMove=this.doMouseMove.bind(this)
        this.doMouseDown=this.doMouseDown.bind(this)
        this.doMouseUp=this.doMouseUp.bind(this)
        this.calculateStyle=this.calculateStyle.bind(this)
        this.state={dragging:false,left:this.props.left}
    }

    doMouseDown(e){
        if (e.button === 0){
            this.props.onChildDrag(true)
            this.draggingPosition=e.clientX;
            this.setState({dragging:true});
            this.state.left=this.props.left;
        }
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
          document.addEventListener('mousemove', this.doMouseMove)
          document.addEventListener('mouseup', this.doMouseUp)
        } else if (!this.state.dragging && state.dragging) {
          document.removeEventListener('mousemove', this.doMouseMove)
          document.removeEventListener('mouseup', this.doMouseUp)
        }
      }

    doMouseMove(e){
       if(this.state.dragging){
            let delta=this.draggingPosition-e.clientX;
            this.setState({left:this.state.left-delta})
            this.draggingPosition=e.clientX;
        }
    }

    doMouseUp(e){
        this.props.onChildDrag(false)
        let new_start_date=DateHelper.pixelToDate(this.state.left,this.props.nowposition,this.props.dayWidth);
        let new_end_date=DateHelper.pixelToDate(this.state.left+this.props.width,this.props.nowposition,this.props.dayWidth);
        this.props.onUpdateItem(this.props.item,{start:new_start_date,end:new_end_date})
        this.setState({dragging:false})
    }
    
    calculateStyle(){

        if(this.state.dragging){
            return {backgroundColor: this.props.color,left:this.state.left,width:this.props.width,height:this.props.height}
        }else{
           return {backgroundColor: this.props.color,left:this.props.left,width:this.props.width,height:this.props.height}
       }
     
    }
    render(){
        return (
        <div className="timeLine-main-data-task" 
            onMouseDown={this.doMouseDown}
            onClick={(e)=>{this.props.onSelectItem(this.props.item)}}
            style={this.calculateStyle()}>
       
        </div>)
          
    }
}