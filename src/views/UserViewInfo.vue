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
            <div class="user-body" style="box-sizing: border-box;">
                <div class="basic-box" style="margin:20px">
                    <div v-if="!changeIfoVis">
                        <el-form label-width="120px">
                            <el-form-item label="昵称">
                                ：{{ username }}
                            </el-form-item>
                            <el-form-item label="性别">
                                ：{{ nowsex }}
                            </el-form-item>
                            <el-form-item label="生日">
                                ：{{ nowbirthday }}
                            </el-form-item>
                            <el-form-item label="邮箱">
                                ：{{ nowpost }}
                            </el-form-item>
                            <el-form-item label="隐私公开">
                                <div>：{{ nowsecret }}</div>
                                <div style="margin-left:2em;font-size: small;color: gray;">(包括做题记录，收藏，题单)</div>
                            </el-form-item>
                            <el-form-item>
                                <div v-if="!(flag == 'false' && fff == '隐藏')">
                                    <el-button type="primary" @click="changeIfoVis = !changeIfoVis">修改</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="changeIfoVis">
                        <el-form :model="form" label-width="120px">
                            <el-form-item label="昵称">
                                <el-input v-model="form.name" style="width:200px" />
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="form.sex" placeholder="男 / 女 / 保密">
                                    <el-option label="男" value="male" />
                                    <el-option label="女" value="female" />
                                    <el-option label="保密" value="secrecy"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="生日">
                                <el-col :span="8">
                                    <el-date-picker v-model="form.birthday" value-format="YYYY-MM-DD" type="date"
                                        placeholder="请选择" style="width: 100%" />
                                </el-col>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                ：{{ nowpost }}
                                <div style="margin-left:2em;font-size: small;color: gray;">(不可修改)</div>
                            </el-form-item>
                            <el-form-item label="隐私公开">
                                <el-switch v-model="form.secret" />
                                <div style="margin-left:2em;font-size: small;color: gray;">(包括做题记录，收藏，题单)</div>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="changeForm()">保存</el-button>
                                <el-button @click="cancelChangeForm()">取消</el-button>
                            </el-form-item>
                        </el-form>
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
// do not use same name with ref
const form = reactive({
    name: '',
    sex: '',
    birthday: '',
    post: '',
    secret: false,
    resource: '',
    desc: '',
})

export default {
    name: 'UserInfo',
    components: {
        UserViewMenu
    },
    mounted() {
        this.userid = this.$route.query.uid;
        this.flag = this.$route.query.flag;
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.fff = res.data.private_status
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.username = res.data.username;
            if (res.data.birthday == '1900-01-01') this.nowbirthday = '保密';
            else this.nowbirthday = res.data.birthday;
            this.userpi = res.data.introduction;
            this.nowsex = res.data.gender
            this.nowpost = res.data.user_email;
            this.nowsecret = res.data.private_status;
            this.sp = 1;
        })
    },
    methods: {
        cancelChangeForm: function () {
            for (var key in form) {
                delete form[key];
            }
            this.changeIfoVis = !this.changeIfoVis;
        },
        changeForm: function () {
            if (form.name == '' || form.name == undefined) {
                ElMessage({
                    message: h('p', null, [h('span', null, '请输入昵称'),]),
                })
                return false;
            } else if (form.sex == '' || form.sex == undefined) {
                ElMessage({
                    message: h('p', null, [h('span', null, '请选择性别'),]),
                })
                return false;
            }
            if (form.sex == 'male') this.nowsex = '男';
            else if (form.sex == 'female') this.nowsex = '女';
            else this.nowsex = '未知';
            this.username = form.name;
            if (form.birthday == '' || form.birthday == undefined) this.nowbirthday = '1900-01-01';
            else {
                this.nowbirthday = form.birthday;
            }
            if (form.secret == true) this.nowsecret = '公开';
            else this.nowsecret = '隐藏';
            axios.post('http://database.vip.cpolar.cn/personal_page/update_info', null, {
                params: {
                    user_id: this.userid,
                    name: form.name,
                    gender: this.nowsex,
                    birthday: this.nowbirthday,
                    private_status: this.nowsecret
                }
            }).then((res) => {
                if (this.nowbirthday == '1900-01-01') this.nowbirthday = '保密';
                this.changeIfoVis = !this.changeIfoVis;
            })

        },
    },
    data() {
        return {
            username: '',
            userid: 0,
            usertime: '',
            flag: false,
            fff: '隐藏',
            form,
            changeIfoVis: false,
            nowsex: '未知',//男，女，未知
            nowbirthday: '1900-01-01',//xxxx-xx-xx
            nowpost: '2603232321@qq.com',
            nowsecret: '公开',//公开，隐藏
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
        }
    }
}
</script>

<style>
@import '../assets/styles/userView.css';
</style>