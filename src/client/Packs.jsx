import React from "react";
import {Link, withRouter} from "react-router-dom";

class Packs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            newCards: [],
            packs: 0
        };
    }

    componentDidMount() {
        this.getPacks()
    }

    getPacks = async() => {
        const url = `/api/packs/${this.props.user.id}`;
        let response;

        try {
            response = await fetch(url, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (err) {
            this.setState({error: "Failed to connect to server: " + err});
            return;
        }

        if(response.status !== 200) {
            this.setState({error: "Error when connecting to server: status code " + response.status});
            return;
        }

        let stream = await response.json();

        this.setState({error: null, packs: stream})
    };

    openPack = async () => {
        let payload = {id: this.props.user.id};
        const url = "/api/openpack";
        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({error: "Failed to connect to server: " + err});
            return;
        }
        if (response.status === 404) {
            this.setState({
                error: "User not found"
            });
            return;
        }
        if (response.status === 400) {
            this.setState({
                error: "You have no packs to open"
            });
            return;
        }

        if (response.status !== 200) {
            this.setState({
                error: "Error when connecting to server: status code " + response.status
            });
            return;
        }

        let stream = await response.json();
        this.setState({error: null, newCards: stream});
        this.getPacks();
    };

    render() {
        if(!this.props.user) {
            return(<p>You need to login to see your packs!</p>)
        }

        console.log(this.props.user.packs);
        let error = this.state.error ? this.state.error : null;

        return (
            <div>
                <div className={"packs-containers"}>
                    <h4>Your packs: {this.state.packs}</h4>
                    <button disabled={this.state.packs === 0} onClick={this.openPack}>Open one!</button>
                </div>
                <div className={"packs-containers"}>
                    {this.state.newCards.length !== 0 &&
                    <h4>New Cards:</h4>}
                    {this.state.newCards.map((value, index) => {
                        return <p className={"cardName"} key={index}>
                            <p>Name: {value.name}</p>
                            <p>Class: {value.cardClass}</p>
                            <p dangerouslySetInnerHTML={{__html: "Card text: " + value.text}}/>
                            <p>Cost: {value.cost}</p>
                            {value.type === "MINION" ? <p>Attack: {value.attack} - Health: {value.health}</p> : null}
                        </p>
                    })}
                    {error}
                </div>
            </div>

        );
    }
}

export default withRouter(Packs);