import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        error: 'err'
    }

    render() {

        const handleChange = ({target: {name, value}}) => {
            this.setState({
                [name]: value
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault();
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
                Login
                <form>
                    <input 
                    type="text" 
                    onChange={handleChange} 
                    placeholder="email" 
                    name="email"
                    />
                    <input 
                    type="password" 
                    onChange={handleChange} 
                    placeholder="password" 
                    name="password"
                    />
                    <button type="submit"  onClick={handleSubmit}> Login </button>
                    <button type="submit" onClick={handleLogout}> Logout  </button>
                </form>
                {this.state.error} <br />
                {this.state.email} - {this.state.password}
            </div>
        )
    }
}

// email: "alex@gmail.com",
// password: "1234567"