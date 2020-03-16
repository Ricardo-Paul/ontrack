import React, { Component } from 'react'
import axios from 'axios'
import helpers from '../modules/utils'

export default class Login extends Component {
isEmpty = helpers.fieldIsEmpty;

    state = {
        email: '',
        password: '',
        error: ''
    }

    render() {
        const handleChange = ({target: {name, value}}) => {
            this.setState({
                [name]: value
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault();

            if(this.isEmpty(this.state.email) || this.isEmpty(this.state.password)){
                this.setState({
                    error: "Can't be empty"
                })
            }
            const data = {
                user: {
                    email: this.state.email,
                    password: this.state.password
                }
            }
            axios.post("/api/sessions", data)
                .then(res => {
                    console.log(res.data)
                    if (!res.data.error){
                        localStorage.setItem("token", res.data.auth_token)
                        this.props.history.push("/home")
                    }
                    this.setState({
                        error: res.data.error + " " + "Please try again or signup"
                    })

                    setTimeout(() => this.setState({
                        error: ''
                    }), 3000)
                })
        }

        const handleLogout = (e) => {
            e.preventDefault();
            const authorization = {
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            }
            axios.delete('/api/sessions', authorization )
                .then(res => {
                    console.log(res.data)
                })
            localStorage.removeItem("token")
        }

        return (
            <div>
                <div className="form-container" />
                <form className="intro-form">
                {/* <p> Track  </p> */}
				<h2> LOGIN </h2>
				<hr/>
                    <input 
                    type="text" 
                    onChange={handleChange} 
                    placeholder="email" 
                    name="email"
                    className="email-input"
                    />
                    <input 
                    type="password" 
                    onChange={handleChange} 
                    placeholder="password" 
                    name="password"
                    className="password-input"
                    />
                    <button type="submit" className="submit-button"  onClick={handleSubmit}> Login </button>
                    {/* <button type="submit" onClick={handleLogout}> Logout  </button> */}
                </form>
                    {this.state.error && 
                    <div className="error">
                        {this.state.error}
                    </div>
                    }
            </div>
        )
    }
}

// email: "alex@gmail.com",
// password: "1234567"