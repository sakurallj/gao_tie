const EARTH_RADIUS = 6378.137; //地球半径
let utils = {}

utils.getSystemInfo = function() {
    let info = wx.getStorageSync("system_info");
    if (!info) {
        info = wx.getSystemInfoSync();
        wx.setStorageSync("system_info", info);
    }
    return info;
}
utils.rpxToPx = function(rpx_num) {
    if (!rpx_num) {
        return 0;
    }
    let info = utils.getSystemInfo(),
        screenWidth = info.screenWidth;
    return rpx_num / (750 / screenWidth);
}
utils.pxToRpx = function(px_num) {
    if (!px_num) {
        return 0;
    }
    let info = utils.getSystemInfo(),
        screenWidth = info.screenWidth;
    return (750 / screenWidth) * px_num;
}
/**
 * 计算两点(经纬度)的距离
 */
utils.calculateDistanceTwoLTPoint = function(point1, point2) {
    let radLat1 = utils.rad(point1.latitude);
    let radLat2 = utils.rad(point2.latitude);
    let a = radLat1 - radLat2;
    let b = utils.rad(point1.longitude) - utils.rad(point2.longitude);

    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
utils.rad = function(d) {
    return d * Math.PI / 180.0;
}
module.exports = utils;