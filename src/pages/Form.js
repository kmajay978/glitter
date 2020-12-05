import React from "react";
import ReactDOM from "react-dom";


function validate(email, password, phoneNumber) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0,
    phoneNumber: phoneNumber.length === 0
  };
}

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      phoneNumber: "",

      everFocusedEmail: false,
      everFocusedPassword: false,
      everFocusedPhone: false,
      inFocus: ""
    };
  }

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };
  
  handlePhoneChange = evt =>{
      this.setState({ phoneNumber: evt.target.value});
  }

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }

     
    const { email, password, phoneNumber } = this.state;
    console.log(`Signed up with email: ${email} password: ${password} phone: ${phoneNumber}`);
  };

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password, this.state.phoneNumber);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(this.state.email, this.state.password, this.state.phoneNumber);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <form >
        <input
          className={errors.email ? "error" : ""}
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />

         <input 
            className={errors.phoneNumber ? "error" : ""}
            name="phone_number" 
            type="text" 
            placeholder="Enter Phone Number" 
            value={this.state.phoneNumber}
            onChange={this.handlePhoneChange} 
        />

        <input
          className={errors.password ? "error" : ""}
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button onClick={this.handleSubmit} disabled={isDisabled}>Sign up</button>
      </form>
    );
  }
}
export default SignUpForm;

