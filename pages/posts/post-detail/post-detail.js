var postList = require("../../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic: false
  },

  onAutioTap: function (event) {
    this.setData({
      isPlayMusic: !this.data.isPlayMusic
    });
    if (this.data.isPlayMusic) {
      wx.playBackgroundAudio({
        dataUrl: this.data.detail.music.url,
        title: this.data.detail.music.title,
        coverImgUrl: this.data.detail.music.coverImg
      })
    }
    else {
      wx.stopBackgroundAudio();
    }
  },

  onCollectTap: function (event) {
    var postCollected = wx.getStorageSync('post_collected');
    var collectTmp = !postCollected[this.data.detail.postId];
    postCollected[this.data.detail.postId] = collectTmp;
    wx.setStorageSync('post_collected', postCollected);
    this.setData({
      collected: collectTmp
    });
    wx.showToast({
      title: collectTmp ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  onShareTap: function (event) {
    wx.showActionSheet({
      itemList: [
        "分享到微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博",
      ],
      itemColor: "#405f80",
      success: function (res) {
        wx.showToast({
          title: res.tapIndex.toString(),
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.post_id;
    this.setData({
      detail: postList.postList[postId],
    });
    // 判断音乐状态
    var _this = this;
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        var music;
        if (res.status == 1 && res.dataUrl == _this.data.detail.music.url) {
          music = true;
        }
        else {
          music = false;
        }
        _this.setData({
          isPlayMusic: music
        });
      }
    });
    var postCollected = wx.getStorageSync('post_collected');
    if (postCollected) {
      this.setData({
        collected: postCollected[postId]
      });
    }
    else {
      postCollected = {};
      postCollected[postId] = false;
      wx.setStorageSync('post_collected', postCollected);
      this.setData({
        collected: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})