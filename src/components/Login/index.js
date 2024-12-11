import React, { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./index.css"

class Login extends Component {
    state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      showPassword: false,
    }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      this.setState({ error: "Invalid email format." });
      return;
    }

    if (!email || !password) {
      this.setState({ error: "Both fields are required." });
      return;
    }

    this.setState({ loading: true, error: "" });

    try {

      const response = await axios.post("http://localhost:3001/login/", {
        email,
        password,
      });

      
      if (response.status === 200) {
        Cookies.set("jwt_token", response.data.jwtToken,{expires: 3});
        return <Navigate to="/" />
      } else {
        this.setState({ error: "Invalid username or password." });
      }
    } catch (err) {
      console.error("Login error:", err);
      this.setState({
        error: err.response?.data?.message || "An error occurred.",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  togglePasswordVisibility = () => this.setState((prevState) => ({ showPassword:!prevState.showPassword }));
  

  render() {
    const { email, password, error, loading,showPassword} = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken!== undefined){
      return <Navigate to="/" replace={true}/>
    }
    
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="login-form">
            <h1 className="form-head">User Login</h1>
            <label htmlFor="email">Email:</label>
            <input
              className="input"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Enter your Email"
            />
            <label htmlFor="password">Password:</label>
            <input
              className="input"
              type={showPassword?"text":"password"}
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Enter your password"
            />
            <div className="showpass-container">
              <input type="checkbox" id="showPass" name="showPass" checked={this.state.showPassword} onChange={this.togglePasswordVisibility}/>
              <label htmlFor="showPass">Show Password</label>
            </div>

          {error && <p className="error">{error}</p>}
          <button className="login-btn" type="submit" disabled={loading}>{loading?"Loading...":"Login"}</button>
        </form>
      </div>
    );
  }
}



export default Login;
