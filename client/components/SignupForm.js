import React, { Component } from "react";
import AuthForm from "./AuthForm";
import SignupMutation from "../mutations/Signup";
import CurrentUser from "../queries/CurrentUser";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }
  componentWillUpdate(nextProps) {
    if(!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard')
    }
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
        <h3>Sign up</h3>
        <AuthForm
          onSubmit={this.onSubmit.bind(this)}
          errors={this.state.errors || []}
        />
      </div>
    );
  }
}

export default graphql(CurrentUser)(graphql(SignupMutation)(SignupForm));
