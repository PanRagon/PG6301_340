import React from "react";
import {Link, withRouter} from "react-router-dom";

class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            myCards: []
        };
    }

    componentDidMount() {
    }


    render() {
        if(!this.props.user) {
            return(<p>You need to login to see your collection!</p>)
        }
        return (
            <div className={"classes"}>
                <div className={"collection-container-left"}>
                    <h4>Your collection:</h4>
                </div>
                <div  className={"collection-container-right"}>
                    <h4>Uncollected cards:</h4>
                </div>
                </div>
        );
    }
}

export default withRouter(Collection);