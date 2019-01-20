/**
 * @file app全局通用配置文件
 * @author guoqing
 */
let ip = 'http://192.168.0.103:8080/web-front'
// let ip = 'http://192.168.10.78:8080/web-front'
let APIS = {}
APIS.login = ip + '/login/login'
APIS.captcha = ip + '/login/captcha.jpg'

APIS.list_registration = ip + '/exam_registration/list_registration'
APIS.registration_dict = ip + '/exam_registration/registration_dict'
APIS.registration_save = ip + '/exam_registration/save'
APIS.validateUser = ip + '/exam/validateUser'
export { ip, APIS }
