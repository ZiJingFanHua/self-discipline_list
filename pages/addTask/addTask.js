// pages/addTask/addTask.js
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:{
      litTime:'',
      integral:'',
      subTask:[],
      details:'',
      title:''
    },
    customTime:'自定义',
    activeTime:'',
    subTask:''
  },
  changeLimtDate(e){
     let type = e.currentTarget.dataset.type;
     let date = new Date();
     let task = this.data.task;
     if(type == 'nowDay'){
       task.litTime = this.formatTime(date.getFullYear(),date.getMonth()+1,date.getDate())
     }else if(type == 'tomorrow'){
       let year = date.getFullYear();
       let month = date.getMonth() +1;
       let day = date.getDate()+1;
       let days = new Date(year,month,0).getDate();
       console.log(days);
       if(days<day){
         month = month +1;
         day = 1;
       }
       if(month>12){
         month = 1;
         year = year+1
       }
       task.litTime = this.formatTime(year,month,day)
     }else if(type =='custom'){
      task.litTime = e.detail.value;
      this.setData({
        customTime:e.detail.value.slice(2,10),
      })
     }else if(type == 'no'){
      task.litTime = ''
     }
     this.setData({
       task:task,
       activeTime:type
     })
     console.log(this.data.task.litTime);
  },
 //格式化时间
  formatTime(year,month,day){
     if(month<10){
       month = '0'+month;
     }
     if(day<10){
       day = '0'+day;
     }
     return year+'-'+month+'-'+day
  },
  //修改输入框内容
  bindinput(e){
    let task = this.data.task;
    let type = e.currentTarget.dataset.type;
    if(type == 'integral'){
    task.integral = e.detail.value;
    this.setData({
      task:task
    })}else if(type == 'subTask'){
      this.setData({
        subTask:e.detail.value
      })
    }else if(type == 'details'){
      task.details = e.detail.value;
    this.setData({
      task:task
    })
    }else if(type == 'title'){
      task.title = e.detail.value;
      this.setData({
        task :task
      })
    }
  },

  //添加子任务
  addSubTask(){
       let task = this.data.task;
       if(this.data.subTask!='')
       task.subTask.push({'description':this.data.subTask});
       this.setData({
         task:task,
         subTask:''
       })
  },
  //删除子任务
  deleteSubTask(e){
    let index = e.currentTarget.dataset.index;
    let task = this.data.task;
    task.subTask.splice(index,1);
    this.setData({
      task:task
    })
  },
  //添加任务
  addTask(){
    let url = '/parentTask/insertTask';
    console.log(this.data.task);
    let data = {
      deadTime: this.data.task.litTime,
      description: this.data.task.details,
      rewardPoints:parseInt(this.data.task.integral),
      subtaskList: this.data.task.subTask,
      title: this.data.task.title,
      userId: wx.getStorageSync('id')
    }
    console.log(data);
     util.request(url,data).then((res)=>{
          console.log(res);
          wx.navigateBack({
            delta: -1,
          })
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})