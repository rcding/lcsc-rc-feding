Page({
  data: {
    dingUserId: '',
    meetingName: '',
    timeSpan: '',
    timeSpanList: [
      {code:'',name:'全部'},
      {code:'0-30',name:'30分总以内'},
      {code:'30-60',name:'30~60分钟'},
      {code:'0-60',name:'60分钟以内'}
    ],
  },
  onLoad() {},
  dingUserNameInput(e) {
    this.setData({
      dingUserId: e.detail.value
    });
  },
  meetingNameInput(e) {
    this.setData({
      meetingName: e.detail.value
    });
  },
  bindObjPickerChange(e) {
    console.log(e);
  },
  formSubmit() {},
  formReset() {},
  queryDataList() {
    const params = 'dingUserId='+this.dingUserId+'&meetingName='+this.meetingName+'&timeSpan='+this.timeSpan;
    dd.navigateTo({url:'/page/meetingList/meetingList?'+params});
  },
});