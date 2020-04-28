//Login and Register components are  derived from Andrea's exercise solutions:
//https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/signup.jsx

import React from "react";

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            password: "",
            confirmPassword: "",
            error: null,
        };
    }

    handleUpdateField = (e) => {
        const {value, name} = e.target;
        this.setState({ [name]: value })
    };

    doRegister = async () => {
        const {id, password, confirm, firstName, lastName, birthdate} = this.state;

        if (confirm !== password) {
            this.setState({error: "Passwords do not match"});
            return;
        }

        const url = "/api/register";

        const payload = {id, password, firstName, lastName, birthdate};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({registerError: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 400) {
            this.setState({ registerError: "Invalid username or password" });
            return;
        }

        if (response.status !== 201) {
            this.setState({
                registerError:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.setState({registerError: null});
        await this.props.fetchAndUpdateUserInfo();
        this.props.history.push("/");
    };

    render() {

        let error = <div></div>;
        if (this.state.registerError) {
            error = (
                <div className="errorMsg">
                    <p>{this.state.registerError}</p>
                </div>
            );
        }

        let confirmMsg = "Passwords match";
        if (this.state.confirm !== this.state.password) {
            confirmMsg = "Passwords not matching";
        }

        return (
            <div className="center">
                <div>
                    <p>Username:</p>
                    <input
                        type="text"
                        value={this.state.id}
                        name="id"
                        onChange={this.handleUpdateField}
                    />
                </div>
                <div>
                    <p>Password:</p>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleUpdateField}
                    />
                </div>
                <div>
                    <p>Confirm:</p>
                    <input
                        type="password"
                        name="confirm"
                        value={this.state.confirm}
                        onChange={this.handleUpdateField}
                    />
                    <div>{confirmMsg}</div>
                </div>
                {error}
                <button className="button" onClick={this.doRegister}>
                    Sign Up
                </button>
            </div>
        )}
}