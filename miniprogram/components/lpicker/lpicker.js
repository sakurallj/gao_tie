let app = getApp();
let utils = app.utils;
let titleHeight = 88, //title的高度
    optionHeight = 115, //option的高度
    oToCancelHeight = 16, //option到cancel的距离
    bottomHeight = 115, //取消的高度
    bToScreenHeight = 16 // bottom到屏幕底部的高度
; //单位 rpx

Component({

    properties: {
        pickerData: {
            type: Object,
            value: {},
        }
    },

    data: {

    },
    ready() {
        let pickerData = this.data.pickerData,
            pickerContainerHeight = 0;
        pickerContainerHeight += typeof pickerData.title != "undefined" ? titleHeight : 0;
        pickerContainerHeight += typeof pickerData.options != "undefined" ? pickerData.options.length * optionHeight : 0;
        pickerContainerHeight += bottomHeight + oToCancelHeight + bToScreenHeight;
        pickerContainerHeight = utils.rpxToPx(pickerContainerHeight);
        this.setData({
            pickerContainerHeight: pickerContainerHeight
        });
        console.log(pickerContainerHeight);
        this.showAnimation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease',
        });
    },
    methods: {
        hide: function() {
            let pickerContainerHeight = this.data.pickerContainerHeight;
            this.showAnimation.translate(0, pickerContainerHeight).step();
            this.setData({
                showAnimation: this.showAnimation.export()
            });
            this.setData({
                isShow: !1
            });
            wx.setNavigationBarColor({
                frontColor: "#000000",
                backgroundColor: "#fff",
                animation: {
                    duration: 0
                }
            });
        },
        show: function() {
            console.log("showDialog");
            this.setData({
                withdrawValue: "",
                isShow: !0
            });
            wx.setNavigationBarColor({
                frontColor: "#000000",
                backgroundColor: "#7F7F7F",
                animation: {
                    duration: 0
                }
            });
            this.showAnimation.translate(0, 0).step({
                duration: 300
            });
            this.setData({
                showAnimation: this.showAnimation.export()
            });
        },
        _cancelEvent: function(e) {
            console.log(e);
            let type = e.currentTarget.dataset.type;
            this.triggerEvent("cancelEvent", {});
        },
        choose(e) {
            let item = e.currentTarget.dataset.item;
            this.triggerEvent("chooseOption", {
                item: item
            });
            this.hide()
        }
    }
})