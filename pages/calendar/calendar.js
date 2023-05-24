// pages/calendar/calendar.js
const util = require('../../utils/util');
import * as echarts from '../../component/ec-canvas/echarts';
// import * as echarts1 from '../../component/ec-canvas1/echarts'
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['20%', '40%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      }]
    }]
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInList:["0","1","0","1","0","1","0","1","0","1","0","1","0","1","0","1","0","1","0","1","0","1"],
    select:1,
    taskList:[{id:1,title:'测试任务1',description:'测试任务'}],
    dayTaskNum:{
    completed:0,
    uncompleted:0
    },
    lazyEc: {
      lazyLoad: true
    },
    dayType:true,
    pointList:{
      month:[],
      income:[],
      expenditure:[]
    },
    daysList:{
      month:[],
      days:[]
    },
    taskListDate:{
      month:[],
      complete:[],
      uncomplete:[]
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    this.getSignInList(year,month);

    if(month<10){
      month = "0"+month;
    }

    if(day<10){
      day = "0"+day;
    }
    let time = year+"-"+month+"-"+day;
   console.log(time);

    this.getCompletedTaskList(time);
    this.getTaskNum(time);
    this.getPointList();
    this.getDaysList();
    this.getTaskListDate();
  },


//获得签到列表
  getSignInList(year,month){
    let nowyear = year;
    let nowmonth = month;
    if(nowmonth<10){
      nowmonth = '0'+nowmonth
    }
    let url= '/punchCalendar/getPunchCalendar?userId='+ wx.getStorageSync('id')+"&yearMonth="+nowyear+'-'+nowmonth;
    util.request(url,'').then((res)=>{
      console.log(res);
      this.setData({
        signInList:res.data.data
      })
    }).catch((err) =>{
      this.setData({
        signInList:["0"]
      })
    })
  },
  //改变年份与月份
  changDate(e){
    console.log(e.detail);
    this.getSignInList(e.detail.year,e.detail.month);
  },

  //改变日期
  changeDay(e){
    console.log(e.detail);
    this.getCompletedTaskList(e.detail.dateString);
    this.getTaskNum(e.detail.dateString);
    console.log(this.data.dayTaskNum);
  },

  //改变展示子页面
  change(e){
  let index = e.currentTarget.dataset.index;
   this.setData({
     select:index
   })
   if(index == 2){
    this.lazyComponent = this.selectComponent('#integral');
    this.lazyComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(chart);
    
      var option = {
        xAxis: {
          type: 'category',
          data: this.data.pointList.month
        },
        yAxis: {},
        tooltip:{
          trigger:"item"
        },
        legend: {
          show: true
        },
        series: [
          {
            type: 'bar',
            name: '收入',
            data: this.data.pointList.income
          },
          {
            type: 'bar',
            name: '支出',
            data: this.data.pointList.expenditure
          },
        ]
      };
      chart.setOption(option);
      return chart;
    });
   }else if(index == 3){
    this.lazyComponent = this.selectComponent('#integral');
    this.lazyComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(chart);
    
      var option = {
        xAxis: {
          type: 'category',
          data: this.data.daysList.month
        },
        tooltip:{
          trigger:"item"
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            name: '收入',
            data: this.data.daysList.days
          },
        ]
      };
      chart.setOption(option);
      return chart;
    });
   }else if(index == 4){
    this.lazyComponent = this.selectComponent('#integral');
    this.lazyComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(chart);
    
      var option = {
        xAxis: {
          type: 'category',
          data: this.data.taskListDate.month
        },
        tooltip:{
          trigger:"item"
        },
        legend: {
          show: true
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            name: '已完成',
            data: this.data.taskListDate.complete
          },{
            type: 'bar',
            name: '未完成',
            data: this.data.taskListDate.uncomplete
          }
        ]
      };
      chart.setOption(option);
      return chart;
    });
   }
  },
  // 切换
  switchDayType(){
    this.setData({
      dayType:!this.data.dayType
    })
    if(!this.data.dayType){
       this.lazyComponent = this.selectComponent('#day-integral');
      this.lazyComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        canvas.setChart(chart);
      
        var option = {
          backgroundColor: "#ffffff",
          tooltip:{
            trigger:"item"
          },
          series: [{
            label: {
              normal: {
                fontSize: 14
              }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['20%', '40%'],
            data: [{
              value: this.data.dayTaskNum.completed,
              name: '已完成'
            }, {
              value:  this.data.dayTaskNum.uncompleted,
              name: '未完成'
            }]
          }]
        };
        chart.setOption(option);
        return chart;
      });
      // this.lazyChart.dispose(); 
    }
  },
 getCompletedTaskList(time){
   let url = "/parentTask/getCreatedTaskList";
   let data = {
    userId:wx.getStorageSync('id'),
    deadTime:time
   }
   util.request(url,data,"get").then((res) =>{
     this.setData({
      taskList:res.data.data
     })
   })
 },

 getTaskNum(time){
  let url = "/parentTask/tasklist";
  let data = {
   userId:wx.getStorageSync('id'),
   deadTime:time
  }
  util.request(url,data,"post").then((res) =>{
    this.setData({
      dayTaskNum:{
        completed:res.data.completedTaskList.length,
        uncompleted:res.data.unCompletedTaskList.length
        },
    })
  })
},

getPointList(){
  let url = "/pointsDetails/PointList";
  util.request(url,{id:wx.getStorageSync('id')},"get").then((res) =>{
   this.setData({
     pointList:res.data.data
   })
  })
},

getDaysList(){
  let url = "/punchCalendar/getDaysList";
  util.request(url,{id:wx.getStorageSync('id')},"get").then((res) =>{
   this.setData({
     daysList:res.data.data
   })
  })
},
getTaskListDate(){
  let url = "/parentTask/getTaskListDate";
  util.request(url,{id:wx.getStorageSync('id')},"get").then((res) =>{
   this.setData({
     taskListDate:res.data.data
   })
  })
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