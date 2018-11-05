let that;
let app = getApp();
let apis = app.apis;
Page({
    data: {
        map: {}
    },
    onLoad: function(options) {
        console.log(options);
        that = this;
        this.doItemOptions(options);
    },
    doItemOptions(options) {
        let item = options.item;
        if (typeof item != "undefined" && typeof item == "string") {
            item = JSON.parse(item);
        }
        if (typeof item != "object") {
            return false;
        }
        if (item.key == "scenic") {
            this.loadScenic(item);
        }
    },
    loadScenic(item) {
        if (!item.station || !item.station.title) {
            return false;
        }
        wx.setNavigationBarTitle({
            title: item.station.title,
        });
        let scenics = apis.getScenic(item.station), len = scenics.length;
        let map = that.data.map;
        map.longitude = item.station.longitude;
        map.latitude = item.station.latitude;
        map.markers = [{
            iconPath: "/images/station_flag.png",
            id: 0,
            latitude: map.latitude,
            longitude: map.longitude,
            width:20,
            height:20
        }];
        for(let i=0;i<len;i++){
            let s = scenics[i];
            map.markers[map.markers.length] = {
                iconPath: i == 0 ?"/images/scenic_active.png":"/images/scenic.png",
                id: s.id,
                latitude: s.latitude,
                longitude: s.longitude,
                width: 20,
                height: 20
            }
        }
        that.setData({
            map: map
        });
    },
    onShow: function() {

    },
})