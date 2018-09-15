import React,{Component} from 'react'
import Link from 'libs/components/links/Link'

export default class CreateLink extends Component{
    constructor(props){
        super(props);
        this.state={x:this.props.start.x,y:this.props.start.y}
        this.lastX=-1;
        this.lastY=-1;
    }


    componentDidMount(){
        document.addEventListener('mousemove', this.doMouseMove)
        document.addEventListener('mouseup', this.doMouseUp)
    }
    componentWillUnmount(){
        document.removeEventListener('mousemove', this.doMouseMove)
        document.removeEventListener('mouseup', this.doMouseUp)
    }

    doMouseMove=(e)=>{
        let newX=this.state.x+(e.clientX-this.state.x);
        let newY=this.state.y+(e.clientY-this.state.y);
        this.setState({x:newX,y:newY})
    }

    doMouseUp=(e)=>{
        //this.props.onChildDrag(false)
    }
    
 
    render(){
        return (
            <Link   key={-1} 
                    start={{x:this.props.start.x,y:this.props.start.y}} 
                    end={{x:this.state.x,y:this.state.y}} />)
          
    }
}