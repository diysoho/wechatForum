<style scoped>
    #card {
      font-size: 12px;
      line-height: 1.5;
      text-align: left;
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

    .follow_btn {
        margin-left: 5px;
        margin-right: -5px;
    }

    .card_img {
        background: url("../../static/img/imgLoading.gif") no-repeat center;
        background-size: 30px 30px;
    }

    .card_info_head {
        background: url("../../static/img/imgLoading.gif") no-repeat center;
        background-size: 10px 10px;
    }

    .modal_div {
        width: 200px;
        height: 92px;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        z-index: 1001;
    }

    .curtain_div {
        position: fixed;
        padding: 0px;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        width: 100%;
        height: 112%;
        -moz-opacity:0.7;
        filter: alpha(opacity=40);
        background-color: #000000;
        display: block;
        z-index: 1000;
        opacity: 0.5;
    }

    .modal_top {
        background-color: white;
        border-radius: 5px 5px 0 0;
    }

    .modal_bottom {
        background-color: white;
        border-radius: 0 0 5px 5px;
    }

    [v-cloak] {
        display: none;
    }
</style>

<template>
    <div id="card">
        <div class="share_box" :class="{show:clickShare}" @click="clickShare = false">
            <img class="share" src="../../static/img/share.png">
            <div class="shade"></div>
        </div>
        <router-link to="/001-home">
            <div class="back_home">
              <i class="ion-chevron-left"></i>返回首页
            </div>
        </router-link>
            <div class="card">
            <div class="card_in">
                <div class="card_info">
                    <img class="card_info_head" @click="fnGoToPersonalCardListPage(false)" :true-src="oPostDetails.avatar"/>
                    <div class="card_info_texts" @click="fnGoToPersonalCardListPage(false)">
                        <span class="card_info_name" v-text="oPostDetails.username"></span>
                        <span class="card_info_time" v-text="oPostDetails.publishDate"></span>
                    </div>

                    <span class="card_label">
                        <i class="icon ion-ios-pricetags-outline"></i>
                        <span v-text="oPostDetails.type"></span>
                     </span>

                    <span v-cloak v-if="bIsShowDelay && oPostDetails.isOwn" class="operate_btn ripple_box shineBox" @click="fnShowModal(oPostDetails._id, oPostDetails.content, 'modifyPost')">
                        <i class="ion-ios-gear"></i>
                    </span>

                    <span v-cloak v-if="bIsShowDelay && !oPostDetails.isOwn" class="follow_btn ripple_box shineBox" @click="fnFollow" :class="{selected:bIsFollow}">
                        <span v-if="bIsFollow">已关注</span>
                        <span v-if="!bIsFollow">关注</span>
                    </span>
                </div>
                <div class="card_title">
                    浏览量：<span v-text="oPostDetails.views"></span>
                </div>
                <div class="card_title">
                    <p v-text="oPostDetails.title"></p>
                </div>
                <div class="card_texts">
                    <p v-text="oPostDetails.content"></p>
                </div>
                <div class="card_imgs">
                    <div class="demo-gallery">
                        <a v-for="item in aImages" :href="item.path" data-size="" :data-med="item.path" data-med-size="">
                            <img class="card_img" alt="" :true-src="item.path"/>
                        </a>
                    </div>
                </div>
                <div class="card_video"></div>
            </div>
        </div>

        <div class="zan" v-if="aSupportInfoShow.length !== 0" v-cloak>
            <div class="flex_row zan_top">
                <i class="ion-ios-heart-outline"></i>
                <div class="flex1">
                    <img v-for="item in aSupportInfoShow" class="support_head" @click="fnGoToPersonalCardListPage(item.id)" :true-src="item.avatar"/>
                </div>
            </div>

            <span class="more_btn" @click="fnClickShowMoreSupport" v-if="bShowSupportButton" v-cloak>点击显示更多点赞</span>
        </div>

        <div class="card_talk_box">
            <div v-for="(item, index) in aCmtList" class="card_talk">
                <div class="card_in">
                    <div class="card_info">
                        <img class="card_info_head" @click="fnGoToPersonalCardListPage(item._id)" :true-src="item.avatar"/>
                        <div class="card_info_texts">
                            <span class="card_info_name" @click="fnGoToPersonalCardListPage(item._id)">
                                <span v-text="item.username"></span>
                                <span style="float: right" v-text="index + 1 + '楼'"></span>
                            </span>
                            <span class="card_info_time" v-text="item.createDate"></span>
                            <div class="talk_texts">
                                <p v-text="item.content"></p>
                            </div>
                        </div>

                        <span v-if="item.isOwn" class="operate_btn2 ripple_box" @click="fnShowModal(item._id, item.content, 'modifyCmt')" v-cloak>
                            <i class="ion-ios-gear"></i>
                        </span>
                    </div>

                </div>
            </div>
        </div>

        <span class="more_btn" v-if="bIsMoreCmt" @click="fnGetTotalCmt" v-cloak>点击查看更多评论</span>

        <div style="height: 40px; width: 100%; float: left;"></div>

        <div class="card_bottom_btns flex_row" v-cloak>
            <span class="card_bottom_btn flex1 ripple_box" @click="clickShare = true">
                <i class="ion-android-open"></i>
                分享
            </span>
            <span class="card_bottom_btn flex1 ripple_box" @click="fnGoToCmtPage">
                <i class="ion-chatbubble-working"></i>
                评论  {{oPostDetails.reviews || ''}}
            </span>
            <span v-if="bIsShowDelay && !oPostDetails.isOwn" class="card_bottom_btn flex1 ripple_box" @click="fnGoToRewardPage">
                <i class="ion-eye"></i>
                打赏 {{oPostDetails.rewards || ''}}
            </span>
            <span class="card_bottom_btn flex1 ripple_box" @click="fnSupport">
                <i :style="{color: sSupportColor}" class="ion-thumbsup"></i>
                赞  {{iSupport || ''}}
            </span>
        </div>

        <div class="modal_div" v-show="editModal">
            <div class="model_btn modal_top" @click="fnGoToModify" :style="{borderBottom: sIsBorderBottomStyle}">修改</div>
            <div class="model_btn modal_bottom" v-if="sCurModifyType === 'modifyCmt'" @click="fnDelete">删除</div>
        </div>

        <div class="curtain_div" v-show="editModal" @click="editModal = false"></div>

    </div>
</template>

<script>
    import { global } from '../../static/js/lib/global'
    import { initPhotoSwipeFromDOM } from '../../static/js/lib/PhotoSwipeDemo'

    export default({
        data() {
            return {
                loc: location.href.split('#')[1],
                editModal: false,
                oPostDetails: {},
                aCmtList: [],
                iSupport: 0,
                isSupported: false, //是否已点赞
                bPreventClickSupport: false, //防止过快点赞造成服务器产生错误数据
                sSupportColor: '',
                aSupportInfoShow: [],
                aSupportInfoAll: [],
                bShowSupportButton: true,
                iCurId: null,
                clickShare: false,
                aImages: [],
                sCurModifyType: '',
                iCmtNum: 0,
                iCurCmtPage: 1,
                bIsFollow: false,       //是否已关注
                bIsShowDelay: false,     //解决v-if在vue实例化后才渲染而产生的延迟闪烁
            }
        },
        //加载组件时发出请求
        created() {
            this.fnGetPostDetails();
        },
        computed: {
            bIsMoreCmt: function() {
                if (('length' in this.aCmtList) && ((this.aCmtList.length === 0) || (this.aCmtList.length >= this.iCmtNum))) return false;
                return true;
            },
            sIsBorderBottomStyle: function() {
                return this.sCurModifyType === 'modifyCmt' ? '1px solid #eee' : 'none';
            }
        },
        methods: {
            fnGetPostDetails() {
                axios.get('api/getPostDtl?id=' + this.$route.query.id)
                    .then(res => {
                        let oData = R.clone(res.data.row);
                        this.oPostDetails = oData;
                        this.bIsShowDelay = true;
                        this.aCmtList = oData.aCmtList;
                        this.iCmtNum = oData.iCmtNum;
                        this.aFileList = oData.tFileVos;
                        if (oData.tFileVos) this.aImages = oData.tFileVos;
                        this.iSupport = oData.supports;
                        this.isSupported = oData.isSupported;
                        this.bIsFollow = oData.attentionId || oData.attentionId == 0 ? true : false;
                        this.sSupportColor = oData.isSupported ? '#ff566b' : '#777';
                        this.aSupportInfoAll = oData.support;
                        if (!this.aSupportInfoAll) {
                            this.bShowSupportButton = false;
                            this.aSupportInfoShow = [];
                        } else {
                            this.aSupportInfoShow = this.aSupportInfoAll.slice(0, 100);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            fnGetTotalCmt() {
                axios.get('api/getCmtList?pageSize=' + (this.iCurCmtPage === 1 ? 15 : 20)
                    + '&currentPage=' + this.iCurCmtPage
                    + '&id=' + global.GetArgsFromHref(this.loc, 'id'))
                    .then(res => {
                        this.aCmtList = this.aCmtList.concat(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            fnSupport() {
                if (this.bPreventClickSupport) {
                    return;
                }
                axios.patch('api/support', {
                    postId: global.GetArgsFromHref(this.loc, "id"),
                    githubId: JSON.parse(localStorage.getItem("myInfo")).githubId
                })
                    .then(res => {
                        if (res.data.success) {
                            this.fnGetPostDetails();
                        } else {
                            if (res.data.message === 'USER_BAN_CODE') {
                                $.alert('账户禁用，无法操作');
                            }
                        }
                        //防止过快点赞造成服务器产生错误数据
                        setTimeout(() => this.bPreventClickSupport = false, 300);
                    })
                    .catch(err => {
                        if (err.response.status === 403 || err.response.status === 401) {
                            $.alert("请登录之后再操作");
                        }
                    })
                this.bPreventClickSupport = true;
            },
            fnFollow() {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/';
                var postData = {};

                if (this.bIsFollow) {
                    url += 'unfollow';
                    postData.id = this.oPostDetails.attentionId;
                    type = 'DELETE';
                } else {
                    url += 'follow';
                    postData.attentionUserId = this.oPostDetails.owner;
                }

                function ajaxSuccess(data) {
                    if (data.success) {
                        that.fnGetPostDetails();
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        }
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnDelete() {

                $.confirm({
                    title: '确认删除',
                    text: '确认删除此评论？',
                    onOK: () => {
                        axios.delete('api/deleteCmt', {data: {id: this.iCurId}})
                            .then(res => {
                                if (res.data.success) {
                                    $.toast("删除成功");
                                    this.editModal = false;
                                    this.fnGetPostDetails();
                                } else {
                                    $.toast('删除失败');
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    },
                    onCancel: () => {
                        setTimeout(() => {this.editModal = false;}, 500);
                    }
                });
            },
            fnShowModal(id, content, type) {
                this.editModal = true;
                this.iCurId = id;
                this.sCurCmtContent = content;
                this.sCurModifyType = type;
            },
            fnGoToCmtPage() {
                this.$router.push({path: '/011-talk', query: {id: global.GetArgsFromHref(this.loc, "id")}});
            },
            fnGoToRewardPage() {
                this.$router.push({path: '/012-reward', query: {
                    topicId: global.GetArgsFromHref(this.loc, "id"), 
                    sHead: this.oPostDetails.avatar, 
                    sUserName: this.oPostDetails.username
                }});
            },
            fnGoToPersonalCardListPage: function(id) {
                window.location.href='008-personalCardList.html?id=' + (id || this.oPostDetails.owner);
            },
            fnGoToModify: function() {
                if (this.sCurModifyType === 'modifyCmt') {
                    this.$router.push({path: '/011-talk', query: {
                        id: this.iCurId,
                        mode: 'modify',
                        content: this.sCurCmtContent
                    }});
                } else {
                    this.$router.push({path: '/003-send', query: {
                        id: this.iCurId,
                        mode: 'modify'
                    }});
                }
                this.editModal = false;
            },
            fnClickShowMoreSupport: function() {
                var iLength = this.aSupportInfoShow.length;
                if (iLength != this.aSupportInfoAll.length) {
                    this.aSupportInfoShow.concat(this.aSupportInfoAll.slice(iLength, iLength + 100));
                } else {
                    this.bShowSupportButton = false;
                }
            }
        },
        updated: function() {
            this.$nextTick(function() {
                var w = $(window).get(0).innerWidth;
                $('.card_img').css('height', w * 0.94 * 0.303333);
                $('.card_talk_img').css('height', (w * 0.94 - 62) * 0.303333);
                global.fnAllImgDelayLoad(true);
                initPhotoSwipeFromDOM('demo-gallery');
            })
        }
    });
</script>
