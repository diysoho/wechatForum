<style scoped>
    #wrapper {
        position: absolute;
        z-index: 1;
        top: 150px;
        bottom: 40px;
        left: 0;
        width: 100%;
        background: #fff;
        overflow: hidden;
    }

    #scroller {
        position: absolute;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: 100%;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none;
    }

    #scroller ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        text-align: left;
        overflow: hidden;
        background: #f0f0f0;
    }

    #scroller li {
        width: 100%;
        overflow: hidden;
        float: left;
    }

    .card_img {
        background: url("../../static/img/imgLoading.gif") no-repeat center;
        background-size: 30px 30px;
    }

    /*modal自定义样式*/

    .ivu-modal-footer {
        display: none;
    }

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ivu-modal {
        top: 0;
    }

    .ivu-modal-content {
        width: 60%;
        margin-left: 20%;

    }

    .ivu-modal-body {
        padding: 0px;
    }

    .cover_div {
        background: #000000;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 500;
        opacity: 0.6;
        filter: Alpha(opacity=70);
    }

    [v-cloak] {
        display: none;
    }
</style>

<template class="body_in">
<div id="personalCardList">

    <div class="share_box" :class="{show:clickShare}" @click="clickShare = false">
        <img class="share" :src="oCurUserInfo.iconUrl">
        <div class="shade"></div>
    </div>

    <div class="usercenter_top">
        <div class="usercenter_head">
            <img class="usercenter_head_img" :src="oCurUserInfo.iconUrl"/>
        </div>
        <span class="my_top_name">
            <span v-text="oCurUserInfo.username"></span>
            <span class="user_type2" v-text="oCurUserInfo.type" v-if="oCurUserInfo.type" v-cloak></span>
            </span>
    </div>

    <div id="wrapper">
        <div id="scroller">
            <ul>
                <li v-for="(item, index) in aPostList">
                    <div class="card">
                        <div class="card_in">
                            <div class="card_info">
                                <img class="card_info_head" :src="oCurUserInfo.iconUrl"/>
                                <div class="card_info_texts">
                                        <span class="card_info_name">
                                        <span v-text="oCurUserInfo.username"></span>
                                    </span>
                                    <span class="card_info_time" v-text="item.publishDate"></span>
                                </div>
                                <span class="card_label">
                                         <i class="icon ion-ios-pricetags-outline"></i>
                                         <span style="font-size: 12px" v-text="item.type"></span>
                                    </span>
                                <span v-cloak class="operate_btn ripple_box shineBox" @click="fnShowModal(index)" v-if="oCurUserInfo.isOwn">
                                    <Icon type="ios-gear"></Icon>
                                </span>
                            </div>
                            <div class="card_title" @click="fnGoToCardPage(item.id)">
                                <p v-text="item.title"></p>
                            </div>
                            <div class="card_texts" @click="fnGoToCardPage(item.id)">
                                <p v-text="item.content"></p>
                            </div>
                            <div class="card_imgs">
                                <div class="demo-gallery">
                                    <a v-for="imageItem in item.aFileImage" :href="imageItem.path" data-size=""
                                       :data-med="imageItem.path" data-med-size="">
                                        <img class="card_img" src="" alt="" :true-src="imageItem.path"/>
                                    </a>
                                </div>
                                <div class="demo-gallery" v-if="item.aFileVideo.length">
                                    <img v-for="videoItem in item.aFileVideo" class="card_img"
                                         src="../../static/img/video_player.jpg" alt=""/>
                                </div>
                                <div class="demo-gallery" v-if="item.oFileAudio.path">
                                    <audio :src="item.oFileAudio.path" controls></audio>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div class="card_bottom_btns flex_row" v-if="bIsShowDelay && !oCurUserInfo.isOwn" v-cloak>
            <span class="card_bottom_btn flex1" @click="fnFollow" :class="{selected:bIsFollow}">
            <i class="ion-ios-eye"></i>
            <span v-if="oCurUserInfo.attentionId">已关注</span>
            <span v-else="">关注</span>
            </span>
    </div>

    <Modal v-model="modal1" class-name="vertical-center-modal" :closable="false" width="50%" v-cloak>
        <span class="model_btn" @click="fnGoToModify" style="border-bottom: 1px solid #eee">修改</span>
        <span class="model_btn" @click="fnDelete">删除</span>

        <div slot="footer" style="display: none;"></div>
    </Modal>

</div>
</template>


<script>
import {global} from '../../static/js/lib/global'
import {initPhotoSwipeFromDOM} from '../../static/js/lib/PhotoSwipeDemo'
import IScroll from 'iscroll/build/iscroll-probe.js'
// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.css'
var myScroll, pullUpFlag;

function loaded() {
    myScroll = new IScroll('#wrapper', {
        probeType: 3,
        startX: 0,
        startY: 0,
    });
    myScroll.on('scroll', function () {
        if (this.y < (this.maxScrollY - 40)) { //判断上拉是否到底且超过一段距离，如超过则说明需要获取更多消息
            if (personalCardList.bIsMore) {
                pullUpFlag = 1;
            }
        }
    });

    myScroll.on('scrollEnd', function () {
        if (pullUpFlag == 1) {
            if (personalCardList.bIsMore) {
                pullUpFlag = 0;
                setTimeout(function () {
                    personalCardList.iCurrentPage++;
                    personalCardList.fnPersonalPostList();
                }, 500)
            }
        }
    });
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, global.isPassive() ? {
    capture: false,
    passive: false
} : false);
    export default({
        data () {
            return {
                ifFollow: false,
                clickShare: false,
                loc: location.href.split('#')[0],
                oCurUserInfo: {},
                iCurrentPage: 1,
                bIsMore: true,
                aPostList: [],
                bIsFollow: false,
                bIsShowDelay: false,     //解决v-if在vue实例化后才渲染而产生的延迟闪烁
                modal1: false,
                sCurPostId: null
            }
        },
        //加载组件时发出请求
        created: function () {
            this.fnPersonalPostList();
            this.fnPersonalInfo();
        },
        methods: {
            fnFollow: function () {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/';
                var postData = {};

                if (this.bIsFollow) {
                    url += 'unfollow';
                    postData.id = this.oCurUserInfo.attentionId;
                    type = 'DELETE';
                } else {
                    url += 'follow';
                    postData.attentionUserId = this.oCurUserInfo.id;
                }

                function ajaxSuccess(data) {
                    if (data.success) {
                        that.fnPersonalInfo();
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        }
                    }
                }

                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnPersonalInfo: function () {
                var that = this;
                var type = 'POST';
                var url = '/wechat/searchUserInfo';
                var postData = {};

                postData.id = global.GetArgsFromHref(this.loc, "id");

                function ajaxSuccess(data) {
                    that.oCurUserInfo = Object.assign({}, data);
                    that.bIsFollow = that.oCurUserInfo.attentionId || that.oCurUserInfo.attentionId == 0 ? true : false;
                    that.bIsShowDelay = true;
                }

                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnPersonalPostList: function () {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = '/wechat/searchTopicsList';

                postData.pageSize = 6;
                postData.currentPage = this.iCurrentPage;
                postData.param = {};
                postData.param.topicVo = {
                    queryType: 5,
                    owner: global.GetArgsFromHref(this.loc, "id")
                };

                function ajaxSuccess(data) {
                    var aData = JSON.parse(JSON.stringify(data));
                    if (aData.rows) {
                        aData.rows.forEach(function (ele) {
                            ele.aFileImage = [];
                            ele.aFileVideo = [];
                            ele.oFileAudio = {};
                            if (ele.tFileVos) {
                                ele.tFileVos.forEach(function (element) {
                                    if (element.type === 1) {
                                        element.path = global.baseurl + element.path;
                                        ele.aFileImage.push(element);
                                    } else if (element.type === 2) {
                                        element.path = global.baseurl + element.path.slice(2);
                                        ele.aFileVideo.push(element);
                                    } else {
                                        element.path = global.baseurl + element.path.slice(2);
                                        ele.oFileAudio = element;
                                    }
                                });
                            }
                            that.aPostList.push(ele);
                        });
                    }
                    if (that.aPostList.length == data.total) {
                        that.bIsMore = false;
                    }
                    if (myScroll != undefined) {
                        setTimeout(function () {
                            myScroll.refresh();
                        }, 100);
                    } else {
                        loaded();
                        setTimeout(function () {
                            myScroll.refresh();
                        }, 100);
                    }
                }

                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnGoToCardPage: function (id) {
                window.location.href = '005-card.html?id=' + id;
            },
            fnGoToModify: function () {
                window.location.href = '003-send.html?id=' + this.sCurPostId + '&mode=modify';
                this.modal1 = false;
            },
            fnDelete: function () {
                var that = this;
                var type = 'DELETE';
                var url = '/topic/removeTopic';
                var postData = {};

                postData.id = this.sCurPostId;

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.toast("删除成功");
                        that.modal1 = false;
                        that.iCurrentPage = 1;
                        that.aPostList = [];
                        that.fnPersonalPostList();
                    } else {
                        $.toast('删除失败');
                    }

                }

                $.confirm({
                    title: '确认删除',
                    text: '确认删除此帖子？',
                    onOK: function () {
                        global.ajax(type, postData, url, ajaxSuccess);
                    },
                    onCancel: function () {
                        setTimeout(function () {
                            that.modal1 = false;
                        }, 500);
                    }
                });
            },
            fnShowModal: function(index) {
                this.modal1 = true;
                this.sCurPostId = this.aPostList[index].id;
            }
        },
        updated: function () {
            this.$nextTick(function () {
                var w = $(window).get(0).innerWidth;
                $('.card_img').css('height', w * 0.94 * 0.303333);
                $('.card_talk_img').css('height', (w * 0.94 - 62) * 0.303333);
                global.fnAllImgDelayLoad(true);
                initPhotoSwipeFromDOM('demo-gallery');
            });
        }
    })
</script>
