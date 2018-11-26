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
        console.log(this.data.componentData);
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
        index: 0,
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
            this.triggerEvent("showList" );
        },
        hideList: function () {
            console.log("111");
            this.setData({
                isShowList: false
            });
            this.triggerEvent("hideList");
        },
    }
})