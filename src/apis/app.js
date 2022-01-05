import httpRequest from '@/plugins/axios/httpRequest'
export const getAppVersion = (data) => {
  return httpRequest.get('/api/version', data)
}
export function getJson() {
  return new Promise((resolve, reject) => {
    httpRequest
      .get('/api/json.json')
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
