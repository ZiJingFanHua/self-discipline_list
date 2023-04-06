const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const BaseUrl = 'http://localhost:8080'
// request请求
function request(path,data,method='post',header={
  "content-type":"application/json",
},dataType="json",timeout=50000){
  if(method=='get'||method=='Get'){
    header = {
      "content-type": "application/json"
    }
  }
  path = BaseUrl + path;
  return new Promise((resolve,reject) =>{
     wx.request({
    url: path,
    data: data,
    dataType: dataType,
    header: header,
    method: method,
    timeout: timeout,
    success: function(res){
      resolve(res);
    },
    fail:function(res){
      reject(res);
    },
    complete: function(){

    },
  })
  })
}
module.exports = {
  formatTime,
  request
}