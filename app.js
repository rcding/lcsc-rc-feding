App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    console.log(this);
    this.globalData.corpId = options.query.corpId;
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    corpId: '',
    authCode : '',
    userId : '',
    userName : '',
    serviceurl : 'https://fatdingding.szlcsc.com',
    startDate:'2019-01',
    sysdate : new Date().getFullYear() +'-' + (new Date().getMonth() < 9 ? '0':'') + (new Date().getMonth() + 1)
  }
});