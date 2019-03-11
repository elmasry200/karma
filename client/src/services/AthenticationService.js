import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  activate (credentials) {
    return Api().post('activate', credentials)
  },
  forgetPassword (credentials) {
    return Api().post('forgetPassword', credentials)
  },
  resetPassword (credentials) {
    return Api().post('resetPassword', credentials)
  }
}
