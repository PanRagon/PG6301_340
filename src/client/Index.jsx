import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import {Register} from "./Register";
import Collection from "./Collection";
import Packs from "./Packs";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            cards: [],
            userDetails: {
                id: null,
                gold: 0,
                packs: 0,
                totalCards: 0,
                collection: []
            },
            packNotification: 0
        };
    }

    componentDidMount() {
        this.getCards();
        this.fetchAndUpdateUserInfo();

        let protocol = "ws:";
        if (window.location.protocol.toLowerCase() === "https:") {
            protocol = "wss";
        }

        this.socket = new WebSocket(protocol + "//" + window.location.host);

        this.socket.onmessage = (event) => {
            const dto = JSON.parse(event.data);

            if(!dto) {
                this.setState({packNotifications: null});
                return;
            }

            this.setState({packNotifications: 1})
        }
    }

    componentWillUnmount() {
        this.socket.close();
    }


    //The user authentication system is based on Andrea Arcuri's code from the exercise solutions of this subject
    //https://github.com/arcuri82/web_development_and_api_design/tree/master/exercise-solutions/quiz-game/part-10/src/client
    fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({error: "Can't fetch User - Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            this.setState({error: "Can't fetch user - Server responded with status code " + response.status})
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    };

    updateLoggedInUser = (user) => {
        this.setState({user: user});
        this.getUserDetails();
    };

    getCards = async () => {
        const url = "/api/cards";
        let response;
        try {
            response = await fetch(url, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (err) {
            this.setState({error: "Can't fetch cards - Failed to connect to server: " + err});
            return;
        }

        if (response.status !== 200) {
            this.setState({
                error:
                    "Can't fetch cards - Server responded with status code " + response.status
            });
            return;
        }

        let stream = await response.json();

        this.setState({error: null, cards: stream});
    };

      getUserDetails = async () => {
        const url = `/api/users/${this.state.user.id}`;
        let response;
        try {
            response = await fetch(url, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (err) {
            this.setState({error: "Can't get gold - Failed to connect to server: " + err});
            return
        }
        if(response.status !== 200) {
            this.setState({error: "Can't get gold - Server responded with status code " + response.status})
        }

        let stream = await response.json();

        this.setState({error: null, userDetails: stream});
    };

    notFound() {
        return (
            <div>
                <h2>404 - Not Found</h2>
                <p>The page you requested is in another castle.</p>
            </div>
        );
    }

    render() {

        return (
            <BrowserRouter>
                <div>
                    <Header user={this.state.user}
                            userDetails={this.state.userDetails}
                            updateLoggedInUser={this.updateLoggedInUser}/>
                    <Switch>
                        <Route exact path="/login" render={props => <Login user={this.state.user}
                                                                                   {...props}
                                                                                    error={this.state.error}
                                                                                   fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                                                                                   getUserDetails={this.getUserDetails}/>}/>
                        <Route exact path="/register" render={props => <Register user={this.state.user}
                                                                                    {...props}
                                                                                    error={this.state.error}
                                                                                    fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo} />}/>
                        <Route exact path="/packs" render={props => <Packs user={this.state.user}
                                                                                     userDetails={this.state.userDetails}
                                                                                     {...props}
                                                                                     error={this.state.error}
                                                                                     getUserDetails={this.getUserDetails}
                                                                                     cards={this.state.cards}/>}/>
                        <Route exact path="/collection" render={props => <Collection user={this.state.user}
                                                                                     userDetails={this.state.userDetails}
                                                                                     {...props}
                                                                                     error={this.state.error}
                                                                                     getUserDetails={this.getUserDetails}
                                                                                     cards={this.state.cards}/>}/>

                        <Route exact path="/" render={props => <Home user={this.state.user}
                                                                     {...props}
                                                                     error={this.state.error}
                                                                     fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                                                                     cards={this.state.cards}/>}/>
                        <Route component={this.notFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));

export default getUserDetails