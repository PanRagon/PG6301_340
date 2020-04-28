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
            cards: []
        };
    }

    componentDidMount() {
        this.getCards();
        this.fetchAndUpdateUserInfo();
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
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            this.setState({errorMsg: "Error: Server responded with code " + response.status})
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    };

    updateLoggedInUser = (user) => {
        this.setState({user: user});
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
            this.setState({postsError: "Failed to connect to server: " + err});
            return;
        }

        if (response.status !== 200) {
            this.setState({
                postsError:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        let stream = await response.json();

        this.setState({error: null, cards: stream});
    };

    render() {

        return (
            <BrowserRouter>
                <div>
                    <Header user={this.state.user}
                            updateLoggedInUser={this.updateLoggedInUser}/>
                    <Switch>
                        <Route exact path="/login" render={props => <Login user={this.state.user}
                                                                               {...props}
                                                                               fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/register" render={props => <Register user={this.state.user}
                                                                           {...props}
                                                                           fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo} />}/>
                        <Route exact path="/packs" render={props => <Packs user={this.state.user}
                                                                                     {...props}
                                                                                     fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                                                                                     cards={this.state.cards}/>}/>
                        <Route exact path="/collection" render={props => <Collection user={this.state.user}
                                                                     {...props}
                                                                     fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                                                                     cards={this.state.cards}/>}/>

                        <Route exact path="/" render={props => <Home user={this.state.user}
                                                                     {...props}
                                                                     fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                                                                     cards={this.state.cards}/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));