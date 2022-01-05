import { getLocalStore } from '@/utils'
export function login({ roleId }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken: `i am token ${roleId}`
      })
    }, 1000)
  })
}
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userInfo = {
        username: 'zhangsan',
        age: 18,
        roles: getLocalStore('accessToken').includes('1') ? ['admin'] : ['employee']
      }
      resolve(userInfo)
    }, 200)
  })
}
export function getAccesstoken() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken: `accessToken`,
        refreshToken: `refreshToken`
      })
    }, 1000)
  })
}

