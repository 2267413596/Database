<template>
    <div v-if="sp == 1" class="user-main" style="box-sizing: border-box;height: 100%;">
        <div style="width:200px;flex: 1 1 auto;">
            <el-aside style="position:fixed;background-color:#545c64;width:200px;min-height:100%;padding-top: 60px;">
                <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64"
                    text-color="#fff" active-text-color="#1890ff">
                    <UserViewMenu :navMenus="navMenus" :mflag="flag" :id="userid" />
                </el-menu>
            </el-aside>
        </div>
        <div style="flex: 10000 1 auto;display: flex;flex-direction: column;">
            <div class="user-header">
                <div class="user-header-l">你所热爱的 就是你的生活</div>
                <div class="user-header-r">{{ username }}</div>
            </div>
            <div style="clear:both;height:60px;visibility: hidden;"></div>
            <div v-if="(flag == 'false' && fff == '隐藏')" class="user-body"
                style="box-sizing: border-box;padding-top: 15px; flex:1;overflow: auto;">
                <div class="basic-box" style="margin:20px 4%;float:left; width: 88%;">
                    该用户暂未公开系统通知
                </div>
            </div>
            <div v-if="!(flag == 'false' && fff == '隐藏')" class="user-body"
                style="box-sizing: border-box;padding-top: 5px;overflow: auto;flex: 1;">
                <div v-for="m in sysmessage">
                    <div class="basic-box" style="margin:20px;">
                        <div class="sys-message-box">
                            <div style="box-sizing:border-box">
                                <span style="color: #333; font-weight: 700;">{{ m.title }}</span>
                                <span
                                    style="color: #999;font-size: 12px;line-height: 22px;margin: 0 10px;">{{ m.time }}</span>
                            </div>
                            <div style="color: #666; padding-left:8px">
                                <span
                                    style="word-break: break-word;line-height: 19px;white-space: pre-wrap;">{{ m.content }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserViewMenu from '@/components/UserViewMenu.vue'
import { ref, h, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

var sysmessage = [];

export default {
    name: 'UserViewmessage',
    components: {
        UserViewMenu,
    },
    mounted() {
        this.sysmessage.splice(0, this.sysmessage.length);
        this.userid = this.$route.query.uid;
        this.flag = this.$route.query.flag;
        axios.post('http://database.vip.cpolar.cn/problem_page/get_name', null, { params: { user_id: this.userid } }).then((res) => {
            this.username = res.data;
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.fff = res.data.private_status
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_messages', null, { params: { user_id: this.userid, page: this.num } }).then((res) => {
            for (var i in res.data) {
                this.sysmessage.push({
                    title: '系统通知',
                    time: res.data[i].create_time,
                    content: res.data[i].content,
                })
            }
            this.sp = 1;
        })
        window.addEventListener('scroll', this.listenBottomOut, true)
    },
    methods: {
        listenBottomOut() {
            //if (this.noMore || this.loadingMore) return;
            let scrollTop = document.querySelector(".user-body").scrollTop;
            let clientHeight = document.querySelector(".user-body").clientHeight;
            let scrollHeight = document.querySelector(".user-body").scrollHeight;
            if (scrollTop + clientHeight >= scrollHeight - 48) {
                this.num = this.num + 1;
                axios.post('http://database.vip.cpolar.cn/problem_page/get_messages', null, { params: { user_id: this.userid, page: this.num } }).then((res) => {
                    for (var i in res.data) {
                        this.sysmessage.push({
                            title: '系统通知',
                            time: res.data[i].create_time,
                            content: res.data[i].content,
                        })
                    }
                    this.sp = 1;
                })
            }
        },
    },
    data() {
        return {
            username: '旅行者',
            userid: '0',
            num: 1,
            fff: '隐藏',
            usertime: '2022-12-11',
            navMenus: [
                {
                    title: '主页',
                    url: '/UserView',
                },
                {
                    title: '个人信息',
                    url: '/UserView/userinfo',
                },
                {
                    title: '收藏夹',
                    url: '/UserView/collection',
                },
                {
                    title: '提交记录',
                    url: '/UserView/submitHistory',
                },
                {
                    title: '题单',
                    url: '/UserView/mylist'
                },
                {
                    title: '系统通知',
                    url: '/UserView/sysmessage'
                },
            ],
            sp: 0,
            sysmessage,
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.listenBottomOut, false)
    },
}
</script>

<style>
@import '../assets/styles/userView.css';
</style>