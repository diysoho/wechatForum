webpackJsonp([8],{"+f9w":function(t,s,o){var a=o("xyLT"),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},"BS+A":function(t,s,o){"use strict";(function(t){var a=o("qWzu"),i=o.n(a);s.a={data:function(){return{oSysMsgDetails:{},aCmtList:[],modal1:!1,iSupport:0,isSupported:!1,bPreventClickSupport:!1,sSupportColor:"",aSupportInfoShow:[],aSupportInfoAll:[],bShowSupportButton:!0,iCurCmtId:null,clickShare:!1,loc:location.href.split("#")[0],iTotalCmtNum:0}},created:function(){this.fnGetSysMsgDetails()},computed:{bIsMoreCmt:function(){return!(!this.aCmtList||this.aCmtList.length>=this.iTotalCmtNum)}},methods:{fnGetSysMsgDetails:function(){var s=this,o={};o.id=parseFloat(t.GetArgsFromHref(this.loc,"id")),o.parmType=1,t.ajax("POST",o,"/topic/searchTopicDetail",function(t){var o=JSON.parse(i()(t));s.oSysMsgDetails=o,s.aCmtList=o.tReviewVos||[],s.iSupport=o.supports,s.isSupported=o.isSupported,s.iTotalCmtNum=o.reviews,s.sSupportColor=o.isSupported?"#ff566b":"#777",s.aSupportInfoAll=o.tSupportVos,s.aSupportInfoAll?s.aSupportInfoShow=s.aSupportInfoAll.slice(0,100):(s.bShowSupportButton=!1,s.aSupportInfoShow=[])})},fnGetTotalCmt:function(){var s=this,o={};o.pageSize=this.iTotalCmtNum,o.currentPage=1,o.param={topicVo:{id:t.GetArgsFromHref(this.loc,"id")}},t.ajax("POST",o,"/topic/searchTopicReviewsByParm",function(t){s.aCmtList=t.rows.concat()})},fnSupport:function(){var s=this,o="/wechat/",a={};this.bPreventClickSupport||(o+=this.isSupported?"cancelTopicSupport":"addTopicSupport",a.topicId=parseFloat(t.GetArgsFromHref(this.loc,"id")),t.ajax("PUT",a,o,function(t){t.success?s.fnGetSysMsgDetails():"USER_BAN_CODE"===t.message&&$.alert("账户禁用，无法操作"),setTimeout(function(){s.bPreventClickSupport=!1},300)}),this.bPreventClickSupport=!0)},fnShowModal:function(t,s){this.modal1=!0,this.iCurCmtId=t,this.sCurCmtContent=s},fnGoToCmtPage:function(){window.location.href="011-talk.html?id="+t.GetArgsFromHref(this.loc,"id")},fnGoToRewardPage:function(){window.location.href="012-reward.html?topicId="+t.GetArgsFromHref(this.loc,"id")+"&sHead="+this.oSysMsgDetails.head+"&sUserName="+encodeURI(this.oSysMsgDetails.username)},fnGoToPersonalCardListPage:function(t){window.location.href="008-personalCardList.html?id="+t},fnGoToModifyCmtPage:function(){window.location.href="011-talk.html?id="+this.iCurCmtId+"&mode=modify&content="+encodeURI(this.sCurCmtContent),this.modal1=!1},fnClickShowMoreSupport:function(){var t=this.aSupportInfoShow.length;t!=this.aSupportInfoAll.length?this.aSupportInfoShow.concat(this.aSupportInfoAll.slice(t,t+100)):this.bShowSupportButton=!1},fnDelete:function(){function s(t){t.success?($.toast("删除成功"),o.modal1=!1,o.fnGetSysMsgDetails()):$.toast("删除失败")}var o=this,a={};a.id=this.iCurCmtId,$.confirm({title:"确认删除",text:"确认删除此评论？",onOK:function(){t.ajax("DELETE",a,"/topic/removeTopicReview",s)},onCancel:function(){setTimeout(function(){o.modal1=!1},500)}})}}}}).call(s,o("SVFN"))},I3Ma:function(t,s,o){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=o("BS+A"),i=o("Qc0x"),n=function(t){o("oLSh")},e=o("U5Ua")(a.a,i.a,!1,n,"data-v-5b49424d",null);s.default=e.exports},Qc0x:function(t,s,o){"use strict";var a={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"news"}},[t._m(0),t._v(" "),a("div",{staticClass:"card"},[a("div",{staticClass:"share_box",class:{show:t.clickShare},on:{click:function(s){t.clickShare=!1}}},[a("img",{staticClass:"share",attrs:{src:o("QywV")}}),t._v(" "),a("div",{staticClass:"shade"})]),t._v(" "),a("div",{staticClass:"card_in"},[a("div",{staticClass:"card_info"},[a("img",{staticClass:"card_info_head",attrs:{src:t.oSysMsgDetails.head}}),t._v(" "),a("div",{staticClass:"card_info_texts"},[a("span",{staticClass:"card_info_name"},[t._v("平台")]),t._v(" "),a("span",{staticClass:"card_info_time",domProps:{textContent:t._s(t.oSysMsgDetails.createDate)}})])]),t._v(" "),a("div",{staticClass:"card_title"},[a("p",{domProps:{textContent:t._s("浏览量："+t.oSysMsgDetails.views)}})]),t._v(" "),a("div",{staticClass:"card_title"},[a("p",{domProps:{textContent:t._s(t.oSysMsgDetails.title)}})]),t._v(" "),a("div",{staticClass:"news_box",domProps:{innerHTML:t._s(t.oSysMsgDetails.content)}})])]),t._v(" "),0!==t.aSupportInfoShow.length?a("div",{staticClass:"zan"},[a("div",{staticClass:"flex_row zan_top"},[a("Icon",{attrs:{type:"ios-heart-outline"}}),t._v(" "),a("div",{staticClass:"flex1"},t._l(t.aSupportInfoShow,function(s){return a("img",{staticClass:"support_head",attrs:{src:s.head},on:{click:function(o){t.fnGoToPersonalCardListPage(s.id)}}})}))],1),t._v(" "),t.bShowSupportButton?a("span",{staticClass:"more_btn",on:{click:t.fnClickShowMoreSupport}},[t._v("点击显示更多点赞")]):t._e()]):t._e(),t._v(" "),a("div",{staticClass:"card_talk_box"},[a("div",{staticClass:"card_talk"},t._l(t.aCmtList,function(s,o){return a("div",{staticClass:"card_in"},[a("div",{staticClass:"card_info"},[a("img",{staticClass:"card_info_head",attrs:{src:s.head,onclick:"window.location.href='008-personalCardList.html'"}}),t._v(" "),a("div",{staticClass:"card_info_texts"},[a("span",{staticClass:"card_info_name",attrs:{onclick:"window.location.href='008-personalCardList.html'"}},[t._v("\n                            "+t._s(s.username)+"\n                            "),a("span",{staticStyle:{float:"right"},domProps:{textContent:t._s(o+1+"楼")}})]),t._v(" "),a("span",{staticClass:"card_info_time",domProps:{textContent:t._s(s.createDate)}}),t._v(" "),a("div",{staticClass:"talk_texts"},[a("p",{domProps:{textContent:t._s(s.content)}})])]),t._v(" "),s.isOwn?a("span",{staticClass:"operate_btn2 ripple_box",on:{click:function(o){t.fnShowModal(s.id,s.content)}}},[a("Icon",{attrs:{type:"ios-gear"}})],1):t._e()])])}))]),t._v(" "),t.bIsMoreCmt?a("span",{staticClass:"more_btn",on:{click:t.fnGetTotalCmt}},[t._v("点击查看更多评论")]):t._e(),t._v(" "),a("div",{staticStyle:{height:"40px",width:"100%",float:"left"}}),t._v(" "),a("div",{staticClass:"card_bottom_btns flex_row"},[a("span",{staticClass:"card_bottom_btn flex1 ripple_box",on:{click:function(s){t.clickShare=!0}}},[a("i",{staticClass:"ion-android-open"}),t._v("\n            分享\n        ")]),t._v(" "),a("span",{staticClass:"card_bottom_btn flex1 ripple_box",on:{click:t.fnGoToCmtPage}},[a("i",{staticClass:"ion-chatbubble-working"}),t._v("\n            评论 "+t._s(t.oSysMsgDetails.reviews||"")+"\n        ")]),t._v(" "),a("span",{staticClass:"card_bottom_btn flex1 ripple_box",on:{click:t.fnGoToRewardPage}},[a("i",{staticClass:"ion-eye"}),t._v("\n            打赏 "+t._s(t.oSysMsgDetails.rewards||"")+"\n        ")]),t._v(" "),a("span",{staticClass:"card_bottom_btn flex1 ripple_box",on:{click:t.fnSupport}},[a("i",{staticClass:"ion-thumbsup",style:{color:t.sSupportColor}}),t._v("\n            赞 "+t._s(t.iSupport||"")+"\n        ")])])])},staticRenderFns:[function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("div",{staticClass:"back_home",attrs:{onclick:"window.location.href='006-newsList.html'"}},[o("i",{staticClass:"ion-chatbubble-working"}),t._v("更多系统消息\n    ")])}]};s.a=a},QywV:function(t,s,o){t.exports=o.p+"static/img/share.00922fc.png"},oLSh:function(t,s,o){var a=o("si+R");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals),o("P+mm")("54bb5cab",a,!0,{})},qWzu:function(t,s,o){t.exports={default:o("+f9w"),__esModule:!0}},"si+R":function(t,s,o){(t.exports=o("5gvp")(!0)).push([t.i,".ivu-modal-footer[data-v-5b49424d]{display:none}.vertical-center-modal[data-v-5b49424d]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.ivu-modal[data-v-5b49424d]{top:0}.ivu-modal-content[data-v-5b49424d]{width:60%;margin-left:20%}.ivu-modal-body[data-v-5b49424d]{padding:0}.support_head[data-v-5b49424d]{height:25px;width:25px}","",{version:3,sources:["/Users/yuxin/Documents/code/wechatForum/views/src/pages/007-news.vue"],names:[],mappings:"AACA,mCACI,YAAc,CACjB,AACD,wCACI,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,sBAAwB,CACnC,AACD,4BACI,KAAO,CACV,AACD,oCACI,UAAW,AACX,eAAiB,CACpB,AACD,iCACI,SAAa,CAChB,AACD,+BACI,YAAa,AACb,UAAY,CACf",file:"007-news.vue",sourcesContent:["\n.ivu-modal-footer[data-v-5b49424d] {\n    display: none;\n}\n.vertical-center-modal[data-v-5b49424d] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.ivu-modal[data-v-5b49424d] {\n    top: 0;\n}\n.ivu-modal-content[data-v-5b49424d] {\n    width: 60%;\n    margin-left: 20%;\n}\n.ivu-modal-body[data-v-5b49424d] {\n    padding: 0px;\n}\n.support_head[data-v-5b49424d] {\n    height: 25px;\n    width: 25px;\n}\n"],sourceRoot:""}])},xyLT:function(t,s){var o=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=o)}});