let app = getApp();
Page({
  data: {
    dingUserId: app.globalData.dingUserId,
    meetingName: '晨会',
    timeSpan:'',
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
    meetingThemeList: ['全部', '晨会', '周例会', '月例会'],
    lightBlue: '#E5F2FC',
    lightGreen: '#DCF6EF',
    lightOrange: '#FCEEB7',
  },
  onLoad() {
    this.getUserList();
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
  selectMeetingTheme(item) {
    console.log(item);
    this.setData({
      meetingName: item.currentTarget.dataset.item
    });
  },
  selectMeetingTime(item) {
    console.log(item);
    this.setData({
      timeSpan: item.currentTarget.dataset.item.code
    });
  },
  selectMeetingUser(item) {
    console.log(item);
    this.setData({
      dingUserId: item.currentTarget.dataset.item.dingUserId
    });
  },
  queryDataList() {
    const meetingName = this.data.meetingName !== '全部' ? this.data.meetingName : '';
    const params = 'dingUserId=' + this.data.dingUserId + '&meetingName=' + meetingName + '&timeSpan=' + this.data.timeSpan + '&currentPage=1&pageSize=100';
    dd.navigateTo({ url: '/page/meetingList/meetingList?' + params });
  },
});