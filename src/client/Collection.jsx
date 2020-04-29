import React from "react";
import {Link, withRouter} from "react-router-dom";

class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    millCard = async (card) => {
        const url = `/api/mill`;
        let response;
        let payload = {card: card};

        try {
            response = await fetch(url, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(payload)
            })
        } catch (err) {
            this.setState({error: "Error when milling card - Failed to connect to server: " + err});
            return;
        }

        if(response.status !== 200) {
            this.setState({error: "Error when milling card - Server responded with status code " + response.status});
            return;
        }

        this.setState({error: null});
        this.props.getUserCollection();
    };




    render() {
        if(!this.props.user) {
            return(<p>You need to login to see your collection!</p>)
        }
        return (
            <div className={"classes"}>
                <div>
                    <h5>Here you can view your collection, see how many of each card you have, and if you want, mill them for gold</h5>
                    <p>The going rate is 10 gold for commons, 25 for rares, 50 for rares and a whopping 100 for legendaries!</p>
                </div>
                <div className={"collection-container-left"}>
                    <h4>Your collection:</h4>
                    {this.props.userDetails.collection.map((value, index) => {
                        return<div className={"owned-card-holder"} key={index}>
                            <p id={"owned-card-text"}>{value.count}x {value.name}</p>
                            <p id={"owned-card-text"}>{value.rarity}</p>
                            <button className={"mill-btn"} onClick={() => this.millCard(value)}>Mill for coins!</button>
                        </div>
                    })}
                </div>
                <div  className={"collection-container-right"}>
                    <h4>Uncollected cards:</h4>
                    {this.props.cards.map((value, index) => {
                        let display = this.props.userDetails.collection.find(myCard => myCard.id === value.id);
                        return !display &&  <div className={"owned-card-holder"} key={index}>
                            <p>{value.name}</p>
                            <p>{value.rarity}</p>
                        </div>
                    })}
                </div>
                {this.state.error}
                </div>
        );
    }
}

export default withRouter(Collection);