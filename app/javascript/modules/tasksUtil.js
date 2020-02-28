import axios from 'axios';

const tasksUtil = {
    fetchTask: (day_id) => {
        axios.get(`/api/getTasks?day_id=${day_id}`)
        .then(res => {
            return res.data;
        })

        return res.data;
    }
}

export default tasksUtil