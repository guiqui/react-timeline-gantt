import React,{Component} from 'react'
import Registry from 'libs/helpers/registry/Registry'
import Link from 'libs/components/links/Link'
import DateHelper from 'libs/helpers/DateHelper'

export default class LinkViewPort extends Component{
    constructor(props){
        super(props);
        this.cache=[];
        this.state={links:[],data:[]}
    }

    renderLink(startItem,endItem,key){
        let startPosition=DateHelper.dateToPixel(startItem.item.end,this.props.nowposition,this.props.dayWidth)
        let endPosition=DateHelper.dateToPixel(endItem.item.start,this.props.nowposition,this.props.dayWidth)
        return<Link key={key} start={{x:startPosition,y:startItem.index*30+15}} end={{x:endPosition,y:endItem.index*30+15}} />  
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

    render(){
        this.refreshData();
        return  (<svg ref="mainSvg" x={0} y={0} width="100%"  
             pointerEvents="none" 
            
             style={{position:'absolute', top:60, userSelect: 'none',height:'100%' }} >
                <g  transform={`matrix(1,0,0,1,${-this.props.scrollLeft},${-this.props.scrollTop})`}>
                {this.cache}
                </g>
             </svg>)
    }
}