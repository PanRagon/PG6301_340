import React from "react";
import {Link, withRouter} from "react-router-dom";
import CardList from "./CardList";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            cards: []
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="main">
                <div>
                    <h1>Welcome to the Hearthstone Pack Simulator</h1>
                    <h4>Here are all the cards available to collect in this simulator</h4>
                    <br />
                </div>
                <div className={"classes"}>
                    <CardList cards={this.props.cards} class={"MAGE"}/>
                    <CardList cards={this.props.cards} class={"PALADIN"}/>
                    <CardList cards={this.props.cards} class={"WARRIOR"}/>
                    <CardList cards={this.props.cards} class={"PRIEST"}/>
                    <CardList cards={this.props.cards} class={"ROGUE"}/>
                    <CardList cards={this.props.cards} class={"HUNTER"}/>
                    <CardList cards={this.props.cards} class={"SHAMAN"}/>
                    <CardList cards={this.props.cards} class={"DRUID"}/>
                    <CardList cards={this.props.cards} class={"NEUTRAL"}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);
