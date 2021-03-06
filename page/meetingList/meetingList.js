let app = getApp();
Page({
  data: {
    dingUserId: '',
    meetingName: '',
    timeSpan: '',
    currentPage: 1,
    pageSize: 1000,
    items: [],
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
    // this.getList();
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
    let timeList = ['', ''];
    if (this.data.timeSpan) {
      timeList = this.data.timeSpan.split('-');
    }
    dd.httpRequest({
      url: url,
      method: 'GET',
      data:{
        dingUserId: this.data.dingUserId,
        meetingName:this.data.meetingName,
        fromCostTime: timeList[0],
        toCostTime: timeList[1],
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
  filter() {
    dd.navigateTo({ url: '/page/meetingFilterSelect/meetingFilterSelect?'});
  },
  lower(e) {
    console.log(11);
  },
});
