import React, { Component} from 'react';
import Aux from './../../hoc/Auxilary';
 
class LayoutTwo extends Component{
    render () {
        return (
            <Aux>
                <main >
                        {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default LayoutTwo;