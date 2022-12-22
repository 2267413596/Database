<template>
    <div id="root" v-loading="this.loading">
        <!-- 对话框 -->
        <el-dialog v-model="this.error" width="30%" center>
            <span>
                {{ this.warning }}
            </span>
        </el-dialog>
        <el-dialog v-model="this.success" title="Success" width="30%" center>
            <span>
                登录成功！
            </span>
            <el-button type="primary" @click="jump">确定</el-button>
        </el-dialog>
        <div id="title">
            <el-image style="width: 200px; left: 42%; top: 15vh" :src="require('../../public/1.png')" :loading="eager"/>
        </div>
        <div id="box">
            <div id="input1">
                <el-input v-model="input1" placeholder="账号" type="text" size="small"></el-input>
            </div>
            <div id="input2">
                <el-input v-model="input2" placeholder="密码" type="text" size="small" show-password></el-input>
            </div>
            <div id="login">
                <el-button plain @click="login">登录</el-button>
            </div>
            <div id="sign_up">
                <el-button plain @click="sign_up">注册</el-button>
            </div>
            <div id="isAd">
                <el-row>
                    <el-col :span="8" :offset="2">
                        <span>管理员登录</span>
                    </el-col>
                    <el-col :span="8" :offset="4">
                        <el-switch v-model="this.isAd" size="small" active-text="Open" inactive-text="Close" />
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
  
<style>
#box {
    border-radius: 4px;
    margin-top: 15vh;
    margin-left: 35vw;
    height: auto;
    padding-bottom: 20px;
    padding-top: 12px;
    width: 450px;
    background-color: rgba(0, 0, 0, .54);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#input1 {
    margin-top: 15px;
    margin-left: 80px;
    margin-right: 80px;
}

#input2 {
    margin-top: 20px;
    margin-left: 80px;
    margin-right: 80px;
}

#isAd {
    margin-top: 20px;
    margin-left: 80px;
    margin-right: 80px;
    background-color: rgba(93, 105, 148, 0.54);
}

#login {
    margin-top: 20px;
    margin-left: 130px;
    width: 120px;
    float: left;
}

#sign_up {
    margin-top: 20px;
    margin-left: 30px;
}

#root {
    min-height: 100%;
    padding-bottom: 40vh;
}
</style>
  
<script>

export default {
    mounted() {
        this.input1 = this.$route.query.email;
    },
    methods: {
        sign_up() {
            this.$router.replace('/signup/')
        },
        login() {
            this.loading = true
            if (this.isAd == false) {
                this.url1 = this.user_url1
                this.url2 = this.user_url2
            } else {
                this.url1 = this.ad_url1
                this.url2 = this.ad_url2
            }
            this.$axios.post(this.url1,
                null,
                {
                    params: {
                        email: this.input1,
                        password: this.input2
                    }
                }
            )
                .then(res => {
                    console.log(res)
                    if (res.data == 1) {
                        // success first
                        this.$axios.post(this.url2,
                            null,
                            {
                                params: {
                                    email: this.input1
                                }
                            }
                        )
                            .then(res => {
                                console.log(res)
                                this.id = res.data
                                this.loading = false
                                this.success = '登录成功';
                            })
                            .catch(res => {
                                console.log(res)
                                this.id = res.data
                                this.warning = '请求错误';
                                this.error = true;
                            })
                    } else {
                        this.loading = false
                        this.warning = '登录失败';
                        this.error = true;
                    }
                })
                .catch(err => {
                    this.warning = '请求错误';
                    this.error = true;
                    this.loading = false;
                })
        },
        jump() {
            if (this.isAd == false) {
                this.$router.push({
                    path: '/home',
                    query: {
                        user_id: this.id
                    }
                });
            } else {
                this.$router.push({
                    path: '/administrator',
                    query: {
                        admin_id: this.id
                    }
                });
            }
        }
    },
    data() {
        return {
            isAd: false.valueOf,
            error: false,
            loading: false,
            warning: '',
            params: {
                email: '',
                password: ''
            },
            title: require('../../public/1.png'),
            input1: '',
            input2: '',
            user_url1: 'http://database.vip.cpolar.cn/user_login_page/login',
            user_url2: 'http://database.vip.cpolar.cn/user_login_page/get_user_id',
            ad_url1: 'http://database.vip.cpolar.cn/admin_login_page/login',
            ad_url2: 'http://database.vip.cpolar.cn/admin_login_page/get_admin_id',
            url1: '',
            url2: '',
            success: false,
            id: '',
        }
    }
}
</script>
  