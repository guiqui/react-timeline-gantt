import React,{Component} from 'react'
import Registry from 'libs/helpers/registry/Registry'
import Link from 'libs/components/links/Link'
import CreateLink from 'libs/components/links/CreateLink'

import DateHelper from 'libs/helpers/DateHelper'

export default class LinkViewPort extends Component{
    constructor(props){
        super(props);
        this.cache=[];
        this.state={links:[],data:[]}
    }

    renderLink(startItem,endItem,key){
        let startPosition = this.getItemPosition(startItem.index,startItem.item.end)
        let endPosition   = this.getItemPosition(endItem.index,endItem.item.start) 
        return<Link key={key} start={{x:startPosition.x,y:startPosition.y}} end={{x:endPosition.x,y:endPosition.y}} />  
    }

    getItemPosition=(index,date)=>{
        let x=DateHelper.dateToPixel(date,this.props.nowposition,this.props.dayWidth)
        let y=index*30+15
        return{x:x,y:y}
    }


    renderLinks(){
        this.cache=[];
        let renderLinks={};
        let startItem,endItem={}
        if (this.state.data.length==0)
            return;
        for (let i=0;i<this.props.links.length;i++){
            let link=this.props.links[i];
            if (!link)
                if (renderLinks[link.id])
            continue;
            startItem=Registry.getTask(link.start)
            if (!startItem)
                continue
            endItem=Registry.getTask(link.end)
            if (!endItem)
                continue
            this.cache.push( this.renderLink(startItem,endItem,i)  )
            renderLinks[link.id]=""
        
        }
    }

    refreshData(){
        if ( this.props.links!=this.state.links ||
            this.props.data!=this.state.data ){
            this.state.links=this.props.links
            this.state.data=this.props.data
            this.renderLinks();
            
        }
    }

    renderCreateLink=()=>{
        if (this.props.interactiveMode){
            let record=Registry.getTask(this.props.taskToCreate.id)
            let position =this.getItemPosition(record.index,record.item.end)
            return <CreateLink  start={position} onFinishCreateLink={this.props.onFinishCreateLink}/>
        }
    }

    render(){
        this.refreshData();

        //Creating task
        //Add CreateLink Component and he will manage mousemove mouse up

        //selected task get the index of the links attached
        //render them

        return  (<svg x={0} y={0} width="100%"  
                      pointerEvents="none" 
                      style={{position:'absolute', top:60, userSelect: 'none',height:'100%' }} >
                <g  transform={`matrix(1,0,0,1,${-this.props.scrollLeft},${-this.props.scrollTop})`}>
                {this.cache}
                {this.renderCreateLink()}
                </g>
                
             </svg>)
    }
}