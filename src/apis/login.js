export function login() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: `accessToken`,
        refreshToken: `refreshToken`
      })
    }, 1000)
  })
}
export function getUserInfo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userInfo = {
        username: 'zhangsan'
      }
      resolve(userInfo)
    }, 200)
  })
}
export function updateToken() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken: `accessToken`,
        refreshToken: `refreshToken`
      })
    }, 1000)
  })
}
export function getPermission() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        menusPermission: [{
          title: 'page',
          auth: 'page'
        }, {
          title: '页面',
          auth: 'page.asyncRouteExample'
        }],
        buttonsPermission: []
      })
    }, 1000)
  })
}

