import Axios from 'axios'

const baseURL = 'http://localhost:3000'
export default Axios.create({
  baseURL
})

