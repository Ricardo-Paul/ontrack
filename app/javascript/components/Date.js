import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import { connect } from 'react-redux'
import { addDay, setLoading } from '../redux/actions'

class Date extends Component {
    state = {
        year: '',
        month: '',
        date: '',
        showInput: false
    }

    render() {
    const handleDateChange = (e) => {
        this.props.setLoading()
        this.setState({
            date: e.target.value
        })
        const data = {
            "day":{
                "chosen_date": e.target.value
            }
        }

        const authorization = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }

        axios.post('/api/days', data, authorization)
            .then(res => {
                setTimeout(() => {
                    this.props.addDay(res.data)
                }, 2000)
            })
        openDate()
    }


    const openDate = () => {
    //    let dateInput = document.querySelector(".dateInput");
       let dateInput = $(".dateInput")
       dateInput.toggle()
    }


        return (
            <div>
                {console.log(this.state.date)}
                <button 
                    className="addDay"
                    onClick={openDate}
                    > Add Day 
                </button>
                <input 
                    type="date" 
                    onChange={handleDateChange} 
                    value={this.state.date}
                    className="dateInput"
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => ({
    addDay: (day) => dispatch(addDay(day)),
    setLoading: () => dispatch(setLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Date)