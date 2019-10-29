import * as jsapi from 'dingtalk-jsapi';

let app = getApp();
Page({
  data: {
    dingUserId: app.globalData.dingUserId,
    dingUserName: app.globalData.dingUserName,
    meetingName: '晨会',
    timeSpan: '全部',
    userList: [],
    timeSpanList: [
      { code: '', name: '全部' },
      { code: '0-30', name: '30分总以内' },
      { code: '30-60', name: '30~60分钟' },
      { code: '0-60', name: '1小时以内' },
      { code: '60~90', name: '60~90分钟' },
      { code: '90~120', name: '90~120分钟' },
      { code: '0~120', name: '两小时以内' },
    ],
    meetingThemeList: ['晨会'],
    isShowUserPlaceholder: false,
    isShowMeetingPlaceholder: false,
    isShowTimePlaceholder: false,
  },
  onLoad() {

    this.getUserList();
    this.setData({
      dingUserId: app.globalData.dingUserId,
      dingUserName: app.globalData.dingUserName,
      meetingName: '晨会',
      timeSpan: '全部',
    });

    this.setData({
      isShowUserPlaceholder: this.data.dingUserName == '',
      isShowMeetingPlaceholder: this.data.meetingName == '',
      isShowTimePlaceholder: this.data.timeSpan == '',
    });

  },
  getUserList() {
    dd.showLoading();
    let url = app.globalData.serviceurl + '/user/list';
    dd.httpRequest({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 200) {
          let tuserList = [{dingUserId:'',dingUserName:'全部'}];
         tuserList = tuserList.concat(res.data.result);
         console.log(res.data.result);
          this.setData({
            userList: tuserList,
          });
        } else {
          dd.alert({ content: "请求失败" });
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
  formSubmit() { },
  formReset() { },
  queryDataList() {
    const params = 'dingUserId=' + this.data.dingUserId + '&meetingName=' + this.data.meetingName + '&timeSpan=' + this.data.timeSpan + '&currentPage=1&pageSize=100';
    console.log(params);
    dd.navigateTo({ url: '/page/meetingList/meetingList?' + params });
  },
  openUserActionSheet() {
    const that = this;
    jsapi.ready(function() {
      jsapi.device.notification.actionSheet({
        title: '', //标题
        cancelButton: '取消', //取消按钮文本
        otherButtons: that.data.userList.map(item => item.dingUserName),
        onSuccess: function(result) {
          that.setData({
            dingUserName: that.data.userList[result.buttonIndex].dingUserName,
            dingUserId: that.data.userList[result.buttonIndex].dingUserId,
            isShowUserPlaceholder: false,
          });
        },
        onFail: function(err) { }
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
        otherButtons: that.data.meetingThemeList,
        onSuccess: function(result) {
          that.setData({
            meetingName: that.data.meetingThemeList[result.buttonIndex],
            isShowMeetingPlaceholder: false,
          });
        },
        onFail: function(err) { }
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
        otherButtons: ['全部', '30分总以内', '30~60分钟', '1小时以内'],
        onSuccess: function(result) {
          that.setData({
            timeSpan: that.data.timeSpanList[result.buttonIndex].name,
            isShowTimePlaceholder: false,
          });
        },
        onFail: function(err) { }
      });
    });
  },
});