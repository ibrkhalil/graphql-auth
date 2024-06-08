import React, { Component } from "react";
import AuthForm from "./AuthForm";
import LoginMutation from "../mutations/Login";
import CurrentUser from "../queries/CurrentUser";
import { graphql } from "react-apollo";

class LoginFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }
  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password,
        },
        refetchQueries: [{ query: CurrentUser }],
      })
      .catch((err) => {
        const errors = err.graphQLErrors.map((e) => e.message);
        this.setState({
          errors,
        });
      });
  }
  render() {
    return (
      <div>
        <h3>Please login</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default graphql(LoginMutation)(LoginFrom);
