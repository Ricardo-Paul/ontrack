import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
    render() {

        const handleChange = ({target: {name, value}}) => {
            this.setState({
                [name]: value
            })
        }

        const handleSubmit = (e) => {
            const { name, email, password, password_confirmation} = this.state;
            const data = {
                user:{
                    name,
                    email,
                    password,
                    password_confirmation
                }
            }
            e.preventDefault();
            console.log(data)
            axios.post('/api/users', data)
            .then(res => {
                localStorage.setItem("token", res.data.auth_token)
                this.props.history.push('/home')
                console.log(res.data)
            })
        }

        return (
            <div>
                Signup
                <form>
                    <input 
                    type="text" 
                    onChange={handleChange} 
                    placeholder="name" 
                    name="name"
                    />
                    <input 
                    type="text" 
                    onChange={handleChange} 
                    placeholder="email" 
                    name="email"
                    />
                    <input 
                    autoComplete="true"
                    type="password" 
                    onChange={handleChange} 
                    placeholder="password" 
                    name="password"
                    />

                    <input 
                    autoComplete="true"
                    type="password" 
                    onChange={handleChange} 
                    placeholder="password_confirmation" 
                    name="password_confirmation"
                    />

                    <button type="submit"  onClick={handleSubmit}> Signup </button>
                </form>
                {this.state.password_confirmation}
            </div>
        )
    }
}
