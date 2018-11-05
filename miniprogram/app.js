let utils = require('./public/js/utils.js');
let apis = require('./public/js/apis.js');
App({
    onLaunch: function() {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }

        this.globalData = {}
    },
    utils: utils,
    apis: apis
})