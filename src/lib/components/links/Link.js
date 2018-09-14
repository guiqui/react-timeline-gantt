import React,{Component} from 'react'





class Link extends Component{
    constructor(props){
        super(props);
        this.calculatePath=this.calculatePath.bind(this);
        this.onMouseDown=this.onMouseDown.bind(this)
        this.linkCoordinates=this.linkCoordinates.bind(this)
    }



    calculatePath(coodinate){
        return `M${this.props.start.x} ${this.props.start.y}  ${coodinate.cpt1.x} ${coodinate.cpt1.y} ${coodinate.cpt2.x} ${coodinate.cpt2.y} ${this.props.end.x} ${this.props.end.y}`;
    }


    linkCoordinates(){
        let cpt1={x:0,y:0}
        let cpt2={x:0,y:0}
        let middle=0;
        middle=this.props.start.x+((this.props.end.x-this.props.start.x)/2)
        cpt1={x:middle,y:this.props.start.y}
        cpt2={x:middle,y:this.props.end.y}
        return {cpt1:cpt1,cpt2:cpt2}
    }
   
    onMouseDown(e){
        DrawComander.cmp_selectItem(this.props.item)
    }

    render(){
        let stroke =this.props.selected?'#ee63f3':this.props.color//'#7ED321'
        let middleCoor=this.linkCoordinates();

        return (<g    pointerEvents={this.props.creating?"none":"all"} >   
            <path d={this.calculatePath(middleCoor)} stroke='black'  strokeLinejoin="round" fill="transparent" strokeWidth="2" />    
            <circle cx={this.props.start.x} cy={this.props.start.y} r="4" fill='white'  stroke='black' strokeWidth="1" />    
            <circle cx={this.props.end.x} cy={this.props.end.y} r="4" fill='white' stroke='black' strokeWidth="1"   />  
        </g>) 
    }
}

export default Link;