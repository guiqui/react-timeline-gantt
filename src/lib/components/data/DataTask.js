import React,{Component} from 'react'
export default class DataTask extends Component{
    constructor(props){
        super(props);
        this.doMouseMove=this.doMouseMove.bind(this)
        this.doMouseDown=this.doMouseDown.bind(this)
        this.doMouseUp=this.doMouseUp.bind(this)
        this.calculateStyle=this.calculateStyle.bind(this)
        this.state={dragging:false}
    }

    doMouseDown(e){
        if (e.button === 0){
            this.props.onChildDrag(true)
            this.draggingPosition=e.clientX;
            this.setState({dragging:true,
                           left:this.props.left});

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
        this.setState({dragging:false})
    }
    
    calculateStyle(){

        if(this.state.dragging){
            return {backgroundColor: this.props.color,left:this.state.left,width:this.props.width}
        }else{
            return {backgroundColor: this.props.color,left:this.props.left,width:this.props.width}
        }
     
    }
    render(){
        return (
        <div className="timeLine-main-data-task" 
            onMouseDown={this.doMouseDown}
            style={this.calculateStyle()}>
        </div>)
          
    }
}