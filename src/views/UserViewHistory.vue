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
            <div v-if="(flag == 'false' && fff == '隐藏')" class="user-body"
                style="box-sizing: border-box;padding-top: 65px; flex:1;overflow: auto;">
                <div class="basic-box" style="margin:20px 4%;float:left; width: 88%;">
                    该用户暂未公开提交记录
                </div>
            </div>
            <div v-if="!(flag == 'false' && fff == '隐藏')">
                <div class="user-body" style="box-sizing: border-box;">
                    <div class="basic-box" style="margin:20px;">
                        <div class="user-history-search-head">
                            <div style="font-size:1.4em;margin-right:1em;white-space: nowrap;">查找记录</div>
                            <div style="flex:4;mrgin-right:1em;">
                                <el-input v-model="input1" placeholder="题目名称" style="width:300px" />
                                <button class="user-history-search-button1" @click="searchexdata()">搜索</button>
                            </div>
                        </div>
                        <div class="user-history-search-head">
                            <b style="margin-right:1em; font-weight: bolder;">筛选选项</b>
                            <div class="user-history-search-box">
                                <span style="flex:1; margin-right: 0.5em;">记录状态</span>
                                <el-select-v2 v-model="value" :options="options"
                                    placeholder="Please select"></el-select-v2>
                            </div>
                        </div>
                        <span style="clear:both; margin-top:2em;">共计 {{ historydata.length }} 条结果</span>
                    </div>
                    <div class="basic-box" style="margin:20px;animation: fadein 1s;">
                        <div class="user-history-outbox">
                            <div style="overflow:auto">
                                <el-table :data="historydata" height="370" style="width: 100%">
                                    <el-table-column property="name" label="姓名" width="150px"></el-table-column>
                                    <el-table-column property="testtime" label="提交时间" width="200px"></el-table-column>
                                    <el-table-column prop="pass" label="评测结果" width="150px">
                                        <template #default="scope">
                                            <div :style="{ color: scope.row.color }">{{ scope.row.pass }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column property="score" label="分数" width="150px"></el-table-column>
                                    <el-table-column prop="title" label="题目" width="300px">
                                        <template #default="scope">
                                            <router-link
                                                :to="{ path: '/QuestionView', query: { uid: this.userid, pid: scope.row.pid } }"
                                                style="text-decoration: none;color:#3498db">
                                                <a style="text-decoration:none; color: #3498db;">{{ scope.row.title }}</a>
                                            </router-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="t" label="">
                                        <template #default="scope">
                                            <div style="">{{ scope.row.t }}ms<!-- / {{ scope.row.size }}KB--> / {{
                                                    scope.row.kind
                                            }}</div>
                                        </template>
                                    </el-table-column>
                                </el-table>
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
const input1 = ref('')

const initials = ['全部状态', 'Accepted', 'Wrong', 'Compile Error']
const initialss = [1, 2, 3, 4]
const value = ref('全部状态')
const options = Array.from({ length: 4 }).map((_, idx) => ({
    value: `${initialss[idx % 10]}`,
    label: `${initials[idx % 10]}`,
}))
var historydata = [];

export default {
    name: 'UserViewhistory',
    components: {
        UserViewMenu,
    },
    mounted() {
        this.userid = this.$route.query.uid;
        this.flag = this.$route.query.flag;
        this.historydata.splice(0, this.historydata.length);
        var newhist;
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.fff = res.data.private_status
        })
        axios.post('http://database.vip.cpolar.cn/problem_page/get_name', null, { params: { user_id: this.userid } }).then((res) => {
            this.username = res.data;

            axios.post('http://database.vip.cpolar.cn/personal_page/get_submission', null, { params: { user_id: this.userid } }).then((es) => {
                for (var i in es.data) {
                    if (es.data[i].pass_status == "Accept") {
                        this.historydata.push({
                            name: this.username,
                            testtime: es.data[i].sub_time,
                            pass: 'Accepted!',
                            color: "rgb(82, 196, 26)",
                            score: es.data[i].score,
                            title: es.data[i].pr_name,
                            pid: es.data[i].pr_id,
                            t: 16,
                            kind: es.data[i].compile_type,
                        })
                    } else if (es.data[i].pass_status == "Compile Error") {
                        this.historydata.push({
                            name: this.username,
                            testtime: es.data[i].sub_time,
                            pass: 'Compile Error!',
                            color: "rgb(250, 219, 20)",
                            score: es.data[i].score,
                            title: es.data[i].pr_name,
                            pid: es.data[i].pr_id,
                            t: 16,
                            kind: es.data[i].compile_type,
                        })
                    } else if (es.data[i].pass_status == "Wrong") {
                        this.historydata.push({
                            name: this.username,
                            testtime: es.data[i].sub_time,
                            pass: 'Wrong!',
                            color: "rgb(231, 76, 60)",
                            score: es.data[i].score,
                            title: es.data[i].pr_name,
                            pid: es.data[i].pr_id,
                            t: 16,
                            kind: es.data[i].compile_type,
                        })
                    }
                }
                this.hh = this.historydata.slice()
                this.sp = 1;
            })
        })
    },
    methods: {/*
        loadMore() {
            alert('sb')
            alert(this.dataList.length)
        },*/
        searchexdata: function () {
            this.historydata.splice(0, this.historydata.length)
            var hhh = this.hh.slice()
            for (var i in hhh) {
                if ((this.input1 == '' || this.input1 == undefined || hhh[i].title == this.input1) &&
                    (this.value == 1 || this.value == '全部状态' || (this.value == 2 && hhh[i].pass == 'Accepted!') || (this.value == 3 && hhh[i].pass == 'Wrong!') || (this.value == 4 && hhh[i].pass == 'Compile Error!'))) {
                    this.historydata.push(hhh[i])
                }
            }
            if (this.historydata.length == 0) {
                ElMessage({
                    message: h('p', null, [h('span', null, '没有该题的提交记录'),]),
                });
            }
        },
        judge: function () {
            if (this.flag == false && this.fff == '隐藏') {
                return false;
            }
            return true;
        }
    },
    data() {
        return {
            username: '旅行者',
            userid: '0',
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
            input1,
            options,
            value,
            historydata,
            hh: [],
            sp: 0,
        }
    }
}
</script>

<style>
@import '../assets/styles/userView.css';
</style>


