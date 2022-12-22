<template>
    <div class="user-main" style="box-sizing: border-box;height: 100%;" v-if="sp == 1">
        <div style="width:200px;flex: 1 1 auto;">
            <el-aside style="position:fixed;background-color:#545c64;width:200px;min-height:100%;padding-top: 60px;">
                <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64"
                    text-color="#fff" active-text-color="#1890ff">
                    <UserViewMenu :navMenus="navMenus" :mflag="flag" :id="userid" />
                </el-menu>
            </el-aside>
        </div>
        <div style="flex: 10000 1 auto;">
            <div class="user-header">
                <div class="user-header-l">你所热爱的 就是你的生活</div>
                <div class="user-header-r">
                    <router-link :to="{ path: '/UserView', query: { uid: this.userid, flag: this.flag } }"
                        style="text-decoration: none;color:white">
                        {{ username }}
                    </router-link>
                </div>
            </div>
            <div class="user-body" style="box-sizing: border-box;">
                <div class="fade">
                    <div class="basic-box" style="margin:20px;width:50%;float: left;">
                        <div class="user-personal-introduction">
                            <div style="float:left;width: 94%;">个人介绍</div>
                            <el-button v-if="!(flag == 'false')" type="primary" @click="upiVis = !upiVis" />
                        </div>
                        <div style="margin:2em 0; ">{{ userpi }}</div>
                        <div v-if="upiVis" style="margin-bottom:2em; display:flex">
                            <div style="flex: 1; position: relative;"><el-input v-model="upi"
                                    placeholder="Please input" /></div>
                            <div class="change-upi" @click="upiclick()">
                                <div class="change-upi-send">修改</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin-top:20px;margin-right: 60px;width:30%;float: right;">
                    <div class="basic-box">
                        <div style="display:flex; align-items:center; margin-bottom: 1em;">
                            <div style="flex:1 0 auto">用户编号</div>
                            <div style="max-width:250px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                                {{ userid }}</div>
                        </div>
                        <div style="display:flex; align-items:center; margin-bottom: 1em;">
                            <div style="flex:1 0 auto">用户类型</div>
                            <div style="max-width:250px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                                普通用户</div>
                        </div>
                        <div style="display:flex; align-items:center; margin-bottom: 1em;">
                            <div style="flex:1 0 auto">注册时间</div>
                            <div style="max-width:250px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                                {{ usertime }}</div>
                        </div>
                    </div>
                    <div class="basic-box" style="background-color: rgba(230, 238, 232, 1);">
                        <div style="margin-bottom:20px">解题情况</div>
                        <div style="float:left; width: 45%;margin-left: 5%;">
                            <el-progress type="dashboard" :percentage=usereasy status="success">
                                <template #default="{ percentage }">
                                    <span class="percentage-value">{{ percentage }}%</span>
                                    <span class="percentage-label">简单</span>
                                </template>
                            </el-progress>
                        </div>
                        <div style="float:left;width:40%;margin-left: 10%;">
                            <el-progress type="dashboard" :percentage=usermiddle status="warning">
                                <template #default="{ percentage }">
                                    <span class="percentage-value">{{ percentage }}%</span>
                                    <span class="percentage-label">中等</span>
                                </template>
                            </el-progress>
                        </div>
                        <div style="float:left; width: 45%;margin-left: 5%;margin-top: 2em;">
                            <el-progress type="dashboard" :percentage=userhard status="exception">
                                <template #default="{ percentage }">
                                    <span class="percentage-value">{{ percentage }}%</span>
                                    <span class="percentage-label">困难</span>
                                </template>
                            </el-progress>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserViewMenu from '@/components/UserViewMenu.vue'
import { ref, h } from 'vue'
import { ElMessage } from 'element-plus'
const upi = ref('')
import axios from 'axios'
export default {
    name: 'UserView',
    components: {
        UserViewMenu
    },
    mounted() {
        this.userid = this.$route.query.uid;
        this.flag = this.$route.query.flag;
        axios.post('http://database.vip.cpolar.cn/personal_page/get_part_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.username = res.data.user_name;//res.data.userName;
            this.usertime = res.data.user_create_time;
            this.userpi = res.data.introduction;
            this.sp = 1;
            console.log(res)
        })
        .catch(res=>{
            console.log(res)
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.fff = res.data.private_status
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_analyze', null, { params: { user_id: this.userid } }).then((res) => {
            this.usereasy = (res.data.easy * 100).toFixed(2);
            this.usermiddle = (res.data.middle * 100).toFixed(2);
            this.userhard = (res.data.difficult * 100).toFixed(2);
        })

    },
    methods: {
        upiclick: function () {
            if (this.upi == undefined || this.upi == "") {
                ElMessage({
                    message: h('p', null, [h('span', null, '还未进行修改！'),]),
                })
            } else {
                this.userpi = this.upi
                axios.post('http://database.vip.cpolar.cn/personal_page/update_introduction', null, { params: { user_id: this.userid, introduction: this.upi } }).then((res) => {
                    this.upi = ''
                })
                this.upiVis = false;
            }

        },
    },
    data() {
        return {
            username: '',
            userid: '',
            flag: false,
            usertime: '',
            userpi: '',
            upiVis: false,
            usereasy: 0,
            usermiddle: 0,
            userhard: 0,
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
            upi,
            sp: 0,
            fff: '隐藏',
        }
    }
}
</script>

<style>
@import '../assets/styles/userView.css';
</style>