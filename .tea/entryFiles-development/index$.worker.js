if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../node_modules/mini-ddui/es/list/index');
require('../../node_modules/mini-ddui/es/list/list-item/index');
require('../../page/index/index');
require('../../page/lateList/lateList');
require('../../page/nosignList/nosignList');
require('../../page/subsidyList/subsidyList');
require('../../page/meetingList/meetingList');
require('../../page/meetingQuery/meetingQuery');
require('../../page/meeting/meeting');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}