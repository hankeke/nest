<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
-->
<template>
  <div v-loading="mainLoading" class="msg-main">
    <div :id="'msg-div'+nowStr" class="msg-div">
      <div v-loading="tableLoading"></div>
      <div v-if="!tableLoading">
        <div v-if="loadMore" class="el-table__empty-block" @click="loadingMore"><span class="el-table__empty-text">点击加载更多</span>
        </div>
        <div v-if="!loadMore" class="el-table__empty-block"><span class="el-table__empty-text">没有更多了</span></div>
      </div>
      <div v-for="item in tableData" :key="item.id" class="execution">
        <div class="avue-comment" :class="item.type === '2' ? 'avue-comment--reverse' : ''">
          <div class="avatar-div">
            <name-avatar v-if="item.type === '1'" scale="2" :name="item.nickName"/>
            <name-avatar v-if="item.type !== '1'" scale="2" :face-url="item.appLogo"/>
          </div>
          <div class="avue-comment__main">
            <div class="avue-comment__header">
              <div class="avue-comment__create_time">{{ item.createTime }}</div>
            </div>
            <div class="avue-comment__body" :style="item.type === '2' ? 'background: #6BED72;' : ''">
              <div v-if="item.repType === 'event' && item.repEvent === 'subscribe'">
                <el-tag type="success" size="mini">关注</el-tag>
              </div>
              <div v-if="item.repType === 'event' && item.repEvent === 'unsubscribe'">
                <el-tag type="danger" size="mini">取消关注</el-tag>
              </div>
              <div v-if="item.repType === 'event' && item.repEvent === 'CLICK'">
                <el-tag size="mini">点击菜单</el-tag>
                ：【{{ item.repName }}】
              </div>
              <div v-if="item.repType === 'event' && item.repEvent === 'VIEW'">
                <el-tag size="mini">点击菜单链接</el-tag>
                ：【{{ item.repUrl }}】
              </div>
              <div v-if="item.repType === 'event' && item.repEvent === 'scancode_waitmsg'">
                <el-tag size="mini">扫码结果：</el-tag>
                ：【{{ item.repContent }}】
              </div>
              <div v-if="item.repType === 'text'">{{ item.repContent }}</div>
              <div v-if="item.repType === 'image'">
                <a target="_blank" :href="item.repUrl"><img :src="item.repUrl" style="width: 100px"></a>
              </div>
              <div v-if="item.repType === 'voice'">
                <WxVoicePlayer :obj-data="item"></WxVoicePlayer>
              </div>
              <div v-if="item.repType === 'video'" style="text-align: center">
                <WxVideoPlayer :obj-data="item"></WxVideoPlayer>
              </div>
              <div v-if="item.repType === 'shortvideo'" style="text-align: center">
                <WxVideoPlayer :obj-data="item"></WxVideoPlayer>
              </div>
              <div v-if="item.repType === 'location'">
                <el-link
                  type="primary"
                  target="_blank"
                  :href="'https://map.qq.com/?type=marker&isopeninfowin=1&markertype=1&pointx='+item.repLocationY+'&pointy='+item.repLocationX+'&name='+item.repContent+'&ref=joolun'">
                  <img
                    :src="'https://apis.map.qq.com/ws/staticmap/v2/?zoom=10&markers=color:blue|label:A|'+item.repLocationX+','+item.repLocationY+'&key=PFFBZ-RBM3V-IEEPP-UH6KE-6QUQE-C4BVJ&size=250*180'">
                  <p/><i class="el-icon-map-location"></i>{{ item.repContent }}
                </el-link>
              </div>
              <div v-if="item.repType === 'link'" class="avue-card__detail">
                <el-link type="success" :underline="false" target="_blank" :href="item.repUrl">
                  <div class="avue-card__title"><i class="el-icon-link"></i>{{ item.repName }}</div>
                </el-link>
                <div class="avue-card__info" style="height: unset">{{ item.repDesc }}</div>
              </div>
              <div v-if="item.repType === 'news'" style="width: 300px">
                <WxNews :obj-data="JSON.parse(item.content).articles"></WxNews>
              </div>
              <div v-if="item.repType === 'music'">
                <el-link type="success" :underline="false" target="_blank" :href="item.repUrl">
                  <div class="avue-card__body" style="padding:10px;background-color: #fff;border-radius: 5px">
                    <div class="avue-card__avatar"><img :src="item.repThumbUrl" alt=""></div>
                    <div class="avue-card__detail">
                      <div class="avue-card__title" style="margin-bottom:unset">{{ item.repName }}</div>
                      <div class="avue-card__info" style="height: unset">{{ item.repDesc }}</div>
                    </div>
                  </div>
                </el-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-loading="sendLoading" class="msg-send">
      <WxReplySelect :obj-data="objData"></WxReplySelect>
      <el-button type="success" size="small" class="send-but" @click="sendMsg">发送(S)</el-button>
    </div>
  </div>
</template>

<script>
import {addObj, fetchList} from '@/api/mp/wx-fans-msg'
import WxReplySelect from '@/components/wechat/WxReply'
import nameAvatar from 'vue-cnname-avatar'
import WxNews from '@/components/wechat/WxNews'
import WxVideoPlayer from '@/components/wechat/WxVideoPlayer'
import WxVoicePlayer from '@/components/wechat/WxVoicePlayer'

export default {
  name: 'wxMsg',
  components: {
    nameAvatar,
    WxReplySelect,
    WxNews,
    WxVideoPlayer,
    WxVoicePlayer
  },
  props: {
    wxUserId: {
      type: String,
      default: ''
    },
    appId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      articles: undefined,
      nowStr: new Date().getTime(),
      objData: {
        repType: 'text',
        appId: undefined
      },
      mainLoading: false,
      sendLoading: false,
      tableLoading: false,
      loadMore: true,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        ascs: [], //升序字段
        descs: 'create_time'//降序字段
      },
      option: {
        props: {
          avatar: 'avatar',
          author: 'author',
          body: 'body'
        }
      }
    }
  },
  created() {
    this.objData.appId = this.appId
    this.refreshChange()
  },
  methods: {
    sendMsg() {
      if (this.objData) {
        if (this.objData.repType === 'news') {
          this.objData.content.newsItem = [this.objData.content.newsItem[0]]
          this.$message({
            showClose: true,
            message: '图文消息条数限制在1条以内，已默认发送第一条',
            type: 'success'
          })

          this.objData.content = JSON.stringify(this.objData.content)
        }
        this.sendLoading = true
        addObj(Object.assign({
          wxUserId: this.wxUserId,
          appId: this.appId
        }, this.objData)).then(data => {
          this.tableData = []
          this.refreshChange()
          this.sendLoading = false
        }).catch(() => {
          this.sendLoading = false
        })
      }
    },
    scrollToBottom: function () {
      this.$nextTick(() => {
        const div = document.getElementById('msg-div' + this.nowStr)
        div.scrollTop = div.scrollHeight
      })
    },
    loadingMore() {
      this.page.currentPage++
      this.getPage(this.page)
    },
    getPage(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize,
        descs: page.descs,
        ascs: page.ascs,
        wxUserId: this.wxUserId,
        appId: this.appId
      }, params)).then(response => {
        const msgDiv = document.getElementById('msg-div' + this.nowStr)
        let scrollHeight = 0
        if (msgDiv) {
          scrollHeight = msgDiv.scrollHeight
        }
        const data = response.data.data.records.reverse()
        this.tableData = [...data, ...this.tableData]
        this.page.total = response.data.data.total
        this.tableLoading = false
        if (data.length < this.page.pageSize || data.length === 0) {
          this.loadMore = false
        }
        if (this.page.currentPage === 1) { //定位到消息底部
          this.scrollToBottom()
        } else {
          if (data.length !== 0) {
            this.$nextTick(() => { //定位滚动条
              if (scrollHeight !== 0) {
                msgDiv.scrollTop = document.getElementById('msg-div' + this.nowStr).scrollHeight - scrollHeight - 100
              }
            })
          }
        }
        this.page.currentPage = page.currentPage
        this.page.pageSize = page.pageSize
      })
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getPage(this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-main {
  margin-top: -30px;
  padding: 10px;
}

.msg-div {
  height: 50vh;
  overflow: auto;
  background-color: #eaeaea;
}

.msg-send {
  padding: 10px;
}

.avue-comment__main {
  flex: unset !important;
  border-radius: 5px !important;
  margin: 0 8px !important;
}

.avue-comment__header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.avue-comment__body {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.avatar-div {
  text-align: center;
  width: 80px;
}

.send-but {
  float: right;
  margin-top: 8px !important;
}
</style>

