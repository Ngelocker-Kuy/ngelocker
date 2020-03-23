import axios from 'axios'

const ubidots = axios.create({
    baseURL: 'https://industrial.api.ubidots.com/api/v1.6/devices',
    headers: {
        "X-Auth-Token": "BBFF-VaJYuZtN2emukUXvuOOP48qe5Lz4Op"
    }
});

export default ubidots