import { Article } from './article';
import { articlelist } from './articlelist';
import { QueryserviceService } from './queryservice.service';

export class Pregnantnode{
    id: string;
    bestek: string;
    type: string;
    format: string;
    nodes: Array<any>;
    title: string;
    children: Array<any>;
    expanded:boolean;
    checked:boolean;
    private _haschildren:boolean;
    qserv: QueryserviceService;
    
    public get haschildren() : boolean {
        if (this.nodes.length<1){
            return false;
        } else {
            return true;
        }
    }
    
    constructor(id,title,nodes,children,bestek,type,format) {
        this.id = id;
        this.bestek=bestek;
        this.type=type;
        this.format=format;
        this.title=title;
        this.children = children;
        this.nodes = nodes;
        this.expanded = false;
        this.checked = false;
        
    }
    toggle(){
        this.expanded = !this.expanded;
    }
    check(){
        let newState = !this.checked;
        this.checked = newState;
        this.checkRecursive(newState);
    }
    checkRecursive(state){
        this.nodes.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        })
    }
    getarticle(): Article{
        for (let i = 0; i<articlelist.length;i++){
            if (this.id==articlelist[i].id){
                return articlelist[i];
            }
        }
    }
    getarticle2(): Article{
        for (let i = 0; i<this.qserv.locallist.length;i++){
            if (this.id==this.qserv.locallist[i].id){
                return this.qserv.locallist[i];
            }
        }
    }
}