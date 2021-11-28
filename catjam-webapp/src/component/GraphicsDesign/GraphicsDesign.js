import React ,{ Component }  from 'react';
import BountyComponent from "../Bounty/BountyComponent"


export default class GraphicsDesign extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.root = {
            margin: 25
        }
    }

    render(){
        return(
            <div style={this.root}>
                <BountyComponent/>
            </div>
        )
    }
}