import Fly from 'flyio'
import API from '@/api'
const request = new Fly()

request.interceptors.request.use((request) => {
  request.headers = API.interfaces.createAuthHeader();
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response.data)
  },
  (err, promise) => {
    return promise.reject(err)
  }
)
export default request
