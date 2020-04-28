import React from "react";
import {Link, withRouter} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            cards: []
        };
    }

    componentDidMount() {
        this.props.getCards();
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
                    <div className={"classContainer"}>
                        <h4>Mage cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "MAGE") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Paladin cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "PALADIN") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Warrior cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "WARRIOR") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Priest cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "PRIEST") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Rogue cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "ROGUE") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Hunter cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "HUNTER") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Shaman cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "SHAMAN") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Druid cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "DRUID") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                    <div className={"classContainer"}>
                        <h4>Neutral cards:</h4>
                        {this.state.cards.map((value, index) => {
                            {if(value.cardClass === "NEUTRAL") {return <div className={"cardName"} key={index}>
                                <p>Name: {value.name}</p>
                                <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                                <p>Cost: {value.cost}</p>
                                {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                            </div>}}
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);
