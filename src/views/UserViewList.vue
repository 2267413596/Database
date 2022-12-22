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
            <div class="user-header">
                <div class="user-header-l">你所热爱的 就是你的生活</div>
                <div class="user-header-r">
                    <router-link :to="{ path: '/UserView', query: { uid: this.userid, flag: this.flag } }"
                        style="text-decoration: none;color:white">
                        {{ username }}
                    </router-link>
                </div>
            </div>
            <div style="clear:both;height:60px;visibility: hidden;"></div>
            <div v-if="(flag == 'false' && fff == '隐藏')" class="user-body"
                style="box-sizing: border-box;padding-top: 15px; flex:1;overflow: auto;">
                <div class="basic-box" style="margin:20px 4%;float:left; width: 88%;">
                    该用户暂未公开题单
                </div>
            </div>

            <div v-if="!(flag == 'false' && fff == '隐藏')" class="user-body"
                style="box-sizing: border-box; padding-top: 5px;overflow: auto;flex:1;">
                <div class="basic-box" style="margin:20px 4%;float:left; width: 38%">
                    <div class="title-list-head">
                        <p style="font-size: 18px;">创建题单数：{{ listlist.length }}</p>
                    </div>
                    <div v-for="ll in listlist" style="margin-bottom:1em;">
                        <div style="color:#d9534f;cursor: pointer;" @click="getListContent(ll.id)">
                            {{ ll.name }}
                        </div>
                    </div>
                    <el-drawer v-model="listContentVis" title="题单详情" direction="rtl" size="30%">
                        <p style="margin-bottom: 3em;margin-top: -20px;">题单描述 : {{ description }}</p>
                        <el-table :data="listcontent">
                            <el-table-column property="id" label="题号" width="100px" />
                            <el-table-column prop="name" label="题目">
                                <template #default="scope">
                                    <router-link
                                        :to="{ path: '/QuestionView', query: { uid: this.userid, pid: scope.row.id } }"
                                        style="text-decoration: none;color:#3498db">
                                        <a style="text-decoration:none;color: #3498db;">
                                            {{ scope.row.name }}
                                        </a>
                                    </router-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-drawer>
                </div>
                <!--题单创建-->
                <div class="basic-box"
                    style="margin:20px 4%;float:left; width: 38%; animation: fadein 1.5s; min-width: max-content;">
                    <div style="display:flex;padding:0.5em">
                        <span class="user-create-list-name">题单名称</span>
                        <div style="width:100%">
                            <div class="user-create-list-name-box">
                                <input v-model="input1" />
                            </div>
                        </div>
                    </div>
                    <!--<div style="display:flex;padding:0.5em">
                        <span class="user-create-list-name">题单类型</span>
                        <div style="width:100%">
                            <div class="user-create-list-name-box">
                                <el-select v-model="value" class="m-2" placeholder="Please select">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                    </div>-->
                    <div style="display:flex;padding:0.5em">
                        <span class="user-create-list-name">题单描述</span>
                        <div style="width:100%">
                            <div class="user-create-list-name-box">
                                <el-input v-model="textarea" :rows="4" style="width:340px" type="textarea"
                                    placeholder="Please input" />
                            </div>
                        </div>
                    </div>
                    <!--添加题目-->
                    <div style="display:flex;padding:0.5em">
                        <span class="user-create-list-name">搜索题目</span>
                        <div style="width:100%">
                            <div>
                                <input v-model="input2" />
                                <button class="user-create-list-addbutton" @click="addqToList()">添加</button>
                            </div>
                            <p style="font-size: 0.8em;">请填写题目ID (如199)</p>
                        </div>
                    </div>
                    <div>
                        <div class="user-history-outbox">
                            <div style="overflow:auto">
                                <el-table :data="qlist" height="230px" style="width: 100%">
                                    <el-table-column property="id" label="ID" width="100px"></el-table-column>
                                    <el-table-column property="name" label="题目" width="250px"></el-table-column>
                                    <el-table-column prop="del" label="">
                                        <template #default="scope">
                                            <button class="user-create-list-addbutton"
                                                @click="delqFromList(scope.row.id)">删除</button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!--确认生成题单-->
                    <div style="float:right; margin-right: 1.5em;">
                        <button class="user-create-list-addbutton" @click="createqlist()">创建</button>
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
const listContentVis = ref(false)
const input1 = ref('')
const input2 = ref('')
const value = ref('')
const options = [
    {
        value: '1',
        label: '私有',
    },
    {
        value: '2',
        label: '公开',
    },
]
const textarea = ref('')

var qlist = [];

export default {
    name: ' ',
    components: {
        UserViewMenu,
    },
    mounted() {
        this.userid = this.$route.query.uid;
        this.flag = this.$route.query.flag;
        axios.post('http://database.vip.cpolar.cn/problem_page/get_name', null, { params: { user_id: this.userid } }).then((res) => {
            this.username = res.data;
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.fff = res.data.private_status
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_all_list', null, { params: { user_id: this.userid } }).then((res) => {
            for (var i in res.data) {
                this.listlist.push({ id: res.data[i].id, name: res.data[i].name })
            }
            this.sp = 1;
        })
    },
    methods: {
        judge: function () {
            if (this.flag == false && this.fff == '隐藏') {
                return false;
            }
            return true;
        },
        getListContent: function (a) {
            this.listcontent.splice(0, this.listcontent.length)
            this.listContentVis = true;
            axios.post('http://database.vip.cpolar.cn/personal_page/get_details', null, { params: { list_id: a } }).then((res) => {
                for (var i in res.data) {
                    this.listcontent.push({ id: res.data[i].id, name: res.data[i].name })
                }
            })
            axios.post('http://database.vip.cpolar.cn/personal_page/get_description', null, { params: { pr_id: a } }).then((res) => {
                this.description = res.data
            })
        },
        addqToList: function () {
            if (this.input2 == '' || this.input2 == undefined) {
                ElMessage({
                    message: h('p', null, [h('span', null, '请输入题目ID'),]),
                })
                return false;
            }
            this.input2 = this.input2.replace(/\s*/g, "");
            var newq = this.input2.split(',');
            var flag;
            if (newq.length > 1) {
                ElMessage({
                    message: h('p', null, [h('span', null, '请仅输入一道题目的ID'),]),
                })
                return false;
            }
            for (var i = 0; i < newq.length; i++) {
                flag = true;
                for (var j = 0; j < this.qlist.length; j++) {
                    if (this.qlist.at(j).id == newq.at(i)) {
                        ElMessage({
                            message: h('p', null, [h('span', null, qlist[j].name + '已存在'),]),
                        });
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    this.tmpid = newq.at(i);
                    axios.post('http://database.vip.cpolar.cn/personal_page/search', null, { params: { pr_id: this.tmpid } }).then((res) => {

                        if (res.data == '') {
                            ElMessage({
                                message: h('p', null, [h('span', null, '题目不存在'),]),
                            });
                            return false;
                        }
                        this.qlist.push({ id: this.tmpid, name: res.data.name, del: '删除' })
                    })
                }
            }
            this.input2 = ''
        },
        delqFromList: function (a) {
            for (var i = 0; i < this.qlist.length; i++) {
                if (this.qlist.at(i).id == a) {
                    this.qlist.splice(i, 1);
                }
            }
        },
        createqlist: function () {
            if (this.input1 == '' || this.input1 == undefined) {
                ElMessage({
                    message: h('p', null, [h('span', null, '题单名称不能为空'),]),
                });
                return false;
            } else if (this.textarea == '' || this.textarea == undefined) {
                ElMessage({
                    message: h('p', null, [h('span', null, '题单描述不能为空'),]),
                });
                return false;
            }
            /*else if (this.value == '' || this.value == undefined) {
                ElMessage({
                    message: h('p', null, [h('span', null, '请选择题单类型'),]),
                });
                return false;
            }*/ else if (this.qlist.length == 0) {
                ElMessage({
                    message: h('p', null, [h('span', null, '题目不能为空'),]),
                });
                return false;
            }
            var tmpidlist = ''
            for (var i in this.qlist) {
                tmpidlist = tmpidlist + qlist[i].id.toString() + ' '
            }
            axios.post('http://database.vip.cpolar.cn/personal_page/create_list', null, { params: { user_id: this.userid, name: this.input1, description: this.textarea, problem_list: tmpidlist } }).then((res) => {
                this.listlist.push({ id: res.data, name: this.input1 })
                this.input1 = '';
                this.input2 = '';
                this.value = '';
                this.textarea = '';
                this.qlist.splice(0, this.qlist.length);
            })
        }
    },
    data() {
        return {
            username: '旅行者',
            userid: '0',
            usertime: '2022-12-11',
            fff: '隐藏',
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
            listlist: [],
            listcontent: [],
            listContentVis,
            description: '',
            input1,
            value,
            options,
            textarea,
            input2,
            qlist,
            sp: 0,
            tmpid: 0,
        }
    }
}
</script>

<style>
@import '../assets/styles/userView.css';
</style>