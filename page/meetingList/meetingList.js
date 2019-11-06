let app = getApp();
Page({
  data: {
    dingUserId: '',
    meetingName: '',
    timeSpan: '',
    currentPage: 1,
    pageSize: 1000,
    items: [
      {
        dingUserName: '喻福松',
        startTime: '2019-10-02 09:12:32',
        meetingName: '2019年11月月例会讨论',
      },
      {
        dingUserName: '李一凡',
        startTime: '2019-11-06 09:00:00',
        meetingName: '2019年11月周例会',
      },
    ],
  },
  onLoad(query) {
    console.log('list ', query);
    this.setData({
      dingUserId: query.dingUserId || '',
      meetingName: query.meetingName || '',
      timeSpan: query.timeSpan || ''
    });
    this.getList();
    // setTimeout(function() {
    //   console.log(222);
    // }, 200);
    // console.log(document);
  },
  onPullDownRefresh() {
    console.log('i am in top');
  },
  onReachBottom() { // 上拉到底部触发
    console.log('i am in bottom');
    this.getList();
  },
  getList() {
    
    let url = app.globalData.serviceurl + '/meeting/page';
    const reserveData = this.data.items;
    // if (this.data.dingUserId !== '全部') {
    //   url += '&dingUserId=' + this.data.dingUserId;
    // }
    // if (this.data.meetingName !== '全部') {
    //   url += '&meetingName=' + this.data.meetingName;
    // }
    // if (this.data.timeSpan !== '全部') {
    //   url += '&timeSpan=' + this.data.timeSpan;
    // }

    dd.httpRequest({
      url: url,
      method: 'GET',
      data:{
        dingUserId: this.data.dingUserId,
        meetingName:this.data.meetingName,
        timeSpan:this.data.timeSpan == '全部' ? '' :this.data.timeSpan,
        currentPage:1,
        pageSize:1000
      },
      dataType: 'json',
      success: (res) => {
        console.log('yfs==>',res);
        if (res.status === 200 && res.data.code === 200) {
          this.setData({
            items: reserveData.concat(res.data.result.dataList || []),
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
  lower(e) {
    console.log(11);
  },
});
