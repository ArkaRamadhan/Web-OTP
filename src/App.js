import React from 'react'
import firebase from './firebase'
// import './style.css'

class App extends React.Component {
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }
  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "ID"
    });
  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+62" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
  }
  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  render() {
    return (
      <body>
      <div class='container'>
        <h2>Login Form</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input  class="notelp" type="number" name="mobile" placeholder="882-123-456-789" required onChange={this.handleChange}/>
          <button class= "btn-submit"type="submit">Submit</button>
        </form>

        <h2>Masukan Kode OTP </h2>
        <form onSubmit={this.onSubmitOTP}>
          <div class = "input_field_box">
          <input class="otp" type="number" name="otp" placeholder="123456" required onChange={this.handleChange}/>
          <button class= "btn-submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
      </body>

      
    )
  }
}


export default App