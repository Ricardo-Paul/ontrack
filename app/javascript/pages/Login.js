import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    render() {

        const handleSubmit = (e) => {
            e.preventDefault();
            const data = {
                user: {
                    email: "alex@gmail.com",
                    password: "1234567"
                }
            }
            axios.post("/api/sessions", data, )
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem("token", res.data.auth_token)
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
                    <input type="text" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button type="submit" onClick={handleSubmit}> Login </button>
                    <button type="submit" onClick={handleLogout}> Logout  </button>
                </form>
            </div>
        )
    }
}
