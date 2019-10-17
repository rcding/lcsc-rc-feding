import * as jsapi from 'dingtalk-jsapi';

let app = getApp();
Page({
  data: {
    dingUserId: '',
    dingUserName: '',
    meetingName: '',
    timeSpan: '',
    userList: [],
    timeSpanList: [
      {code:'',name:'全部'},
      {code:'0-30',name:'30分总以内'},
      {code:'30-60',name:'30~60分钟'},
      {code:'0-60',name:'60分钟以内'}
    ],
    meetingThemeList: ['全部', '部门晨会'],
  },
  onLoad() {
    this.getUserList();
  },
  getUserList() {
    let url = app.globalData.serviceurl + '/user/list';
    dd.httpRequest({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 200) {
          this.setData({
                userList : res.data.result || [],
              });
        } else {
          dd.alert({content:"请求失败"});
        }
      },
      fail: (res) => {
        console.log("httpRequestFail---", res)
        dd.alert({ content: JSON.stringify(res) });
      },
      complete: (res) => {
        dd.hideLoading();
      }
    });
  },
  formSubmit() {},
  formReset() {},
  queryDataList() {
    const params = 'dingUserId='+this.data.dingUserId+'&meetingName='+this.data.meetingName+'&timeSpan='+this.data.timeSpan;
    console.log(params);
    dd.navigateTo({url:'/page/meetingList/meetingList?'+params});
  },
  openUserActionSheet() {
    const that = this;
    jsapi.ready(function() {
      jsapi.device.notification.actionSheet({
        title: '', //标题
        cancelButton: '取消', //取消按钮文本
        otherButtons:that.data.userList.map(item => item.dingUserName),
        onSuccess: function(result) {
          that.setData({
            dingUserName: that.data.userList[result.buttonIndex].dingUserName,
            dingUserId: that.data.userList[result.buttonIndex].dingUserId,
          });
        },
        onFail: function(err) {}
      });
    });
  },
  openMeetingNameActionSheet() {
    const list = this.timeSpanList;
    const that = this;
    jsapi.ready(function() {
      jsapi.device.notification.actionSheet({
        title: '', //标题
        cancelButton: '取消', //取消按钮文本
        otherButtons:that.data.meetingThemeList,
        onSuccess: function(result) {
          that.setData({
            meetingName: that.data.meetingThemeList[result.buttonIndex],
          });
        },
        onFail: function(err) {}
      });
    });
  },
  openTimeActionSheet() {
    const list = this.timeSpanList;
    const that = this;
    jsapi.ready(function() {
      jsapi.device.notification.actionSheet({
        title: '', //标题
        cancelButton: '取消', //取消按钮文本
        otherButtons: ['全部', '30分总以内', '30~60分钟', '60分钟以内'],
        onSuccess: function(result) {
          that.setData({
            timeSpan: that.data.timeSpanList[result.buttonIndex].name,
          });
        },
        onFail: function(err) {}
      });
    });
  },
});