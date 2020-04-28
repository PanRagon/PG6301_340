import React from "react";
import {Link, withRouter} from "react-router-dom";

class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            myCards: [],
            cards: []
        };
    }

    componentDidMount() {
        this.props.getCards();
    }


    render() {
        if(!this.props.user) {
            return(<p>You need to login to see your collection!</p>)
        }
        return (<p>Your collection</p>);
    }
}

export default withRouter(Collection);