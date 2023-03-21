// 配置编译环境和线上环境之间的切换

const env = process.env
const baseUrl = ''
// 图表库
const iconfontUrl = ['//at.alicdn.com/t/font_667895_v7uduh4zui.css', '//at.alicdn.com/t/c/font_1638883_9yea0jvav1.css']
const codeUrl = `${window.location.origin}/code`
const actUrl = `${window.location.origin}/act/modeler.html?modelId=`
// enable below code in needs
// if (env.NODE_ENV === 'development') {
//
// } else if (env.NODE_ENV === 'production') {
//
// } else if (env.NODE_ENV === 'test') {
//
// }
export {
  baseUrl,
  actUrl,
  iconfontUrl,
  codeUrl,
  env
}
