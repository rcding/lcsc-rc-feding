Page({
  data: {
    dingUserId: '',
    meetingName: '',
    timeSpan: '',
    items: [
      {
        dingUserName: '喻福松',
        meetingName: '开了一个会',
        costTime: '会议中',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
      },
      {
        dingUserName: '李一凡',
        meetingName: '又开了一个会',
        costTime: '1h23min56sec',
      },
    ],
  },
  onLoad(query) {
    this.setData({
      dingUserId: query.dingUserId || '',
      meetingName: query.meetingName || '',
      timeSpan: query.timeSpan || ''
    });
    this.getList();
  },
  getList() {},
});
