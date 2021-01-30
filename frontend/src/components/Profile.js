import React, { Component } from "react";
import "./assets/Profile.css";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:9000/FETCHURL")
      .then((res) => res.text())
      .then((res) => this.setState()({ apiresponse: res }))
      .catch((err) => err);
  }
  componentDidMount() {
    this.callAPI();
  }
  render() {
    return (
      <div class="container">
        <h1 class="d-flex justify-content-center m-2 p-4">Profile</h1>
      </div>
    );
  }
}

export default Profile;
