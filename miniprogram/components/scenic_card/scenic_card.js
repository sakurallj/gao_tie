// components/scenic_card/scenic_card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        componentData: {
            type: Object,
            value: {},
        }
    },
    ready() {
        console.log("scenic_card>>>", this.data.componentData);
        this.setData({
            detailInfo: this.data.componentData[0]
        });
        let e={
            currentTarget:{
                dataset:{
                    item: this.data.componentData[0]
                }
            }
        }
        this.showDetail(e);
    },
    /**
     * 组件的初始数据
     */
    data: {
        indicatorDots: false,
        autoplay: false,
        interval: 0,
        duration: 0,
        circular: true,
        isShowList: false,
        isShowDetail: false,
        index: 0,
        detailInfo: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        swiperChange: function(e) {
            console.log(e);
            let current = e.detail.current,
                componentData = this.data.componentData;
            this.setData({
                index: current
            });
            this.triggerEvent("scenicCardChange", {
                index: current,
                item: componentData[current]
            });
        },
        showList: function() {
            console.log("111");
            this.setData({
                isShowList: true
            });
            this.triggerEvent("showList");
        },
        hideList: function() {
            console.log("111");
            this.setData({
                isShowList: false
            });
            this.triggerEvent("hideList");
        },
        showDetail: function(e) {
            console.log(e);
            let item = e.currentTarget.dataset.item;
            if (!item) {
                wx.showToast({
                    title: '请重试',
                    icon: "none",
                    duration: 2e3
                })
                return false;
            }
            this.setData({
                isShowDetail:true,
                detailInfo: item
            });
            this.triggerEvent("showDetail");
        },
        hideDetailCom(){
            this.setData({
                isShowDetail: false,
                detailInfo: null
            });
            this.triggerEvent("hideDetail");
        }
    }
})