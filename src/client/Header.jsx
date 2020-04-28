import React, {Fragment} from "react";
import {Link, withRouter } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
        }
    };


    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, {method: "post"});
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 204) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }
        this.props.history.push("/");
        this.props.updateLoggedInUser(null);
    };

    renderLoggedIn() {
        return (
            <React.Fragment>
                <Link className={"header-text"} to={"/"}>
                    All cards
                </Link>
                <Link className={"header-text"} to={"/collection"}>
                    Collection
                </Link>
                <Link className={"header-text"} to={"/packs"}>
                    Packs
                </Link>
                <button className="header-buttons" onClick={this.doLogout}>
                    Logout
                </button>
            </React.Fragment>
        )
    }

    renderNotLoggedIn() {
        return (
            <React.Fragment>
                <Link className={"header-text"} to={"/"}>
                    All cards
                </Link>
                <Link className={"header-text"} to={"/login"}>
                    Log in
                </Link>
                <Link className={"header-text"} to={"/register"}>
                    Register
                </Link>
            </React.Fragment>
        )
    }

    render() {

        let content;

        if(this.props.delayRender) {
            return(<div/>)
        }

        if(!this.props.user) {
            content = this.renderNotLoggedIn();
        } else content = this.renderLoggedIn(this.props.user.id);

        return (
            <div className="header">
                Hearthstone Pack Simulator
                <br/>
                {content}
            </div>
        )
    }
}

export default withRouter(Header);