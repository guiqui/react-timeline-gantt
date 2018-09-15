import React,{Component} from 'react'
import DateHelper from 'libs/helpers/DateHelper'
import {MODE_NONE,MODE_MOVE,MOVE_RESIZE_LEFT,MOVE_RESIZE_RIGHT} from 'libs/Const'


export default class DataTask extends Component{
    constructor(props){
        super(props);
        this.doMouseMove=this.doMouseMove.bind(this)
        this.doMouseDown=this.doMouseDown.bind(this)
        this.doMouseUp=this.doMouseUp.bind(this)
        this.calculateStyle=this.calculateStyle.bind(this)
        this.state={dragging:false,
                    left:this.props.left,
                    width:this.props.width,
                    mode:MODE_NONE}
    }

    onCreateLinkMouseDown=(e)=>{
        if (e.button === 0){
            e.stopPropagation();
            this.props.onStartCreateLink(this.props.item)
        }
    }


    
    onCreateLinkMouseUp=(e)=>{
            e.stopPropagation();
            this.props.onFinishCreateLink(this.props.item)
    }

    doMouseDown(e,mode){
        
        
        if (e.button === 0){
            e.stopPropagation();
            this.props.onChildDrag(true)
            this.draggingPosition=e.clientX;
            this.setState({dragging:true,mode:mode,
                            left:this.props.left,
                            width:this.props.width});

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
            switch(this.state.mode){
                case MODE_MOVE:
                    this.setState({left:this.state.left-delta})
                    break;
                case MOVE_RESIZE_LEFT:
                    this.setState({left:this.state.left-delta,width:this.state.width+delta})
                    break;
                case MOVE_RESIZE_RIGHT :
                    this.setState({width:this.state.width-delta})
                    break;
            }
            
            this.draggingPosition=e.clientX;
        }
    }

    doMouseUp(e){
        this.props.onChildDrag(false)
        let new_start_date=DateHelper.pixelToDate(this.state.left,this.props.nowposition,this.props.dayWidth);
        let new_end_date=DateHelper.pixelToDate(this.state.left+this.state.width,this.props.nowposition,this.props.dayWidth);
        this.props.onUpdateItem(this.props.item,{start:new_start_date,end:new_end_date})
        this.setState({dragging:false,mode:MODE_NONE})
    }
    
    calculateStyle(){

        if(this.state.dragging){
            return {backgroundColor: this.props.color,left:this.state.left,width:this.state.width,height:this.props.height-5,top:2}
        }else{
           return {backgroundColor: this.props.color,left:this.props.left,width:this.props.width,height:this.props.height-5,top:2}
       }
     
    }
    render(){
        let style=this.calculateStyle()
        return (
        <div className="timeLine-main-data-task" 
            onMouseDown={(e)=>this.doMouseDown(e,MODE_MOVE)}
            onClick={(e)=>{this.props.onSelectItem(this.props.item)}}
            style={style}>
            <div className="timeLine-main-data-task-side" 
                 style={{left:-8,height:style.height}}
                 onMouseDown={(e)=>this.doMouseDown(e,MOVE_RESIZE_LEFT)} >
                <div  className="timeLine-main-data-task-side-linker" 
                      onMouseDown={this.onCreateLinkMouseDown} 
                      onMouseUp={this.onCreateLinkMouseUp}/>
            </div>
            <div className="timeLine-main-data-task-side" 
                 style={{left:style.width-1,height:style.height}}
                 onMouseDown={(e)=>this.doMouseDown(e,MOVE_RESIZE_RIGHT)} >
                <div className="timeLine-main-data-task-side-linker" 
                                  onMouseDown={this.onCreateLinkMouseDown} 
                                  onMouseUp={this.onCreateLinkMouseUp}/>
            </div>  
        </div>)
          
    }
}