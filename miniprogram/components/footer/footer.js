let app = getApp();
let appData = app.data;
let api = app.api;
Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        activeIndex: {
            type: Number,
            value: 2,
        }
    },
    data: {},
    ready: function() {
        let sysInfo = wx.getSystemInfoSync();
        console.log("ready", sysInfo.model);
        if (sysInfo.model.indexOf("iPhone X") != -1) {
            this.setData({
                isIphoneX: !0
            });
        }
    },
    methods: {
        clickCell: function(e) {
            let index = e.currentTarget.dataset.index,
                activeIndex = this.data.activeIndex,
                formId = e.detail.formId;
            console.log("clickCell", e, index, activeIndex, formId);
            if (activeIndex != 1 && index == 1) {
                wx.redirectTo({
                    url: '/pages/index/index',
                })
            } else if (activeIndex != 3 && index == 3) {
                wx.redirectTo({
                    url: '/pages/me/me',
                })
            } else if (activeIndex != 2 && index == 2) {
                wx.redirectTo({
                    url: '/pages/near/near',
                })
            }
            if (!!formId) {}
        } 
    }
})