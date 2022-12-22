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
        <div style="flex: 10000 10000 auto;display: flex;flex-direction: column;">
            <div class="user-header" style="z-index:11;">
                <div class="user-header-l">你所热爱的 就是你的生活</div>
                <div class="user-header-r">
                    <router-link :to="{ path: '/UserView', query: { uid: this.userid, flag: this.flag } }"
                        style="text-decoration: none;color:white">{{ username }}
                    </router-link>
                </div>
            </div>
            <div style="clear:both;height:60px;visibility: hidden;"></div>
            <div v-if="(flag == 'false' && fff == '隐藏')" class="user-body"
                style="box-sizing: border-box;padding-top: 5px; flex:1;overflow: auto;">
                <div class="basic-box" style="margin:20px 4%;float:left; width: 88%;">
                    该用户暂未公开收藏
                </div>
            </div>
            <div v-if="!((flag == 'false' && fff == '隐藏'))" class="user-body"
                style="box-sizing: border-box;padding-top: 5px; flex:1;overflow: auto;">
                <!--左侧题目-->
                <div class="basic-box" style="margin:20px 4%;float:left; width: 88%;"><!--38-->
                    <div class="title-list-head">
                        <p style="font-size: 18px;">总收藏数：{{ titlelist.length }}</p>
                    </div>
                    <div v-for="tl in titlelist" style="margin-bottom:1em;width: 25%;float: left;"><!--50-->
                        {{ tl.id }}
                        <router-link :to="{ path: '/QuestionView', query: { uid: this.userid, pid: tl.pid } }"
                            style="text-decoration: none;color:#d9534f">
                            <a style="color:#d9534f;cursor: pointer;">
                                {{ tl.pname }}
                            </a>
                        </router-link>
                    </div>
                </div>
                <!--右侧题单-->
                <!--<div class="basic-box" style="margin:20px 4%;float:left; width: 38%">
                    <div class="title-list-head">
                        <p style="font-size: 18px;">总收藏数：{{ listlist .length}}</p>
                    </div>
                    <div v-for="ll in listlist" style="margin-bottom:1em;">
                        <div style="color:#d9534f;cursor: pointer;"  @click="getListContent(ll.id)">
                            {{ll.name}}
                        </div>
                    </div>
                    <el-drawer v-model="listContentVis" title="题单详情" direction="rtl" size="30%">
                        <p style="margin-bottom: 3em;margin-top: -20px;">题单描述 : 这是一个题单</p>
                        <el-table :data="listcontent">
                            <el-table-column property="id" label="题号" width="100px" />
                            <el-table-column prop="name" label="题目">
                                <template #default="scope">
                                    <router-link :to="{ path:'/QuestionView',query: {uid: this.userid, pid: scope.row.id}}" style="text-decoration: none;color:#3498db">
                                        <a style="text-decoration:none;color: #3498db;">
                                            {{scope.row.name}}
                                        </a>
                                    </router-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-drawer>
                    
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import UserViewMenu from '@/components/UserViewMenu.vue'
import { ref, h, watch } from 'vue'
import { ElDrawer } from 'element-plus'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const listContentVis = ref(false)


export default {
    name: 'UserViewcol',
    components: {
        UserViewMenu,
    },
    mounted() {
        this.userid = this.$route.query.uid;
        this.flag = this.$route.query.flag;
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.fff = res.data.private_status
        })
        axios.post('http://database.vip.cpolar.cn/problem_page/get_name', null, { params: { user_id: this.userid } }).then((res) => {
            this.username = res.data;
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_collect', null, { params: { user_id: this.userid } }).then((res) => {
            for (var i in res.data) {
                this.titlelist.push({ pid: res.data[i].id, pname: res.data[i].name })
            }
            this.sp = 1;
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_all_list', null, { params: { user_id: this.userid } }).then((res) => {

            for (var i in res.data) {
                this.listlist.push({ id: res.data[i].id, name: res.data[i].name })
            }
            this.sp = 1;
        })
        watch(this.flag, (newdata, lastdata) => {
        })
    },
    methods: {
        getListContent: function (a) {
            this.listcontent.splice(0, this.listcontent.length)
            this.listContentVis = true;
            axios.post('http://database.vip.cpolar.cn/personal_page/get_details', null, { params: { list_id: a } }).then((res) => {
                for (var i in res.data) {
                    this.listcontent.push({ id: res.data[i].id, name: res.data[i].name })
                }
                this.sp = 1;
            })
        },
        judge: function () {

            alert('sd' + this.flag + this.fff)
            if (this.flag == false && this.fff == '隐藏') {
                return false;
            }
            alert(this.flag + this.fff)
            return true;
        }
    },
    data() {
        return {
            username: '旅行者',
            userid: '0',
            sp: 0,
            fff: '隐藏',
            flag: false,
            titlelist: [],
            listlist: [],
            listcontent: [],
            listContentVis,
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
        }
    }
}
</script>

<style>
@import '../assets/styles/userView.css';

.title-list-head {
    padding-left: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: auto;
    color: #468847;
    background-color: #dff0d8;
}

.infinite-list {
    overflow: auto;
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>