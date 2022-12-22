<template>
    <div id="root">
        <!-- 对话框 -->
        <el-dialog v-model="this.error" title="Warning" width="30%" center>
            <span>
                {{ this.warning }}
            </span>
        </el-dialog>
        <el-dialog v-model="this.success" title="Warning" width="30%" center>
            <span>
                注册成功！
            </span>
            <el-button type="primary" @click="jump">确定</el-button>
        </el-dialog>
        <!-- 输入框 -->
        <div id="box">
            <div id="input1" class="in">
                <el-input v-model="user_name" placeholder="用户名" type="text" size="small"></el-input>
            </div>
            <div id="input2" class="in">
                <el-input v-model="email" placeholder="邮箱" type="text" size="small"></el-input>
            </div>
            <div id="input3" class="in">
                <el-input v-model="password" placeholder="密码" type="text" size="small"></el-input>
            </div>
            <div id="input4" class="in">
                <el-input v-model="confirm" placeholder="确认密码" type="text" size="small"></el-input>
            </div>
            <div id="back">
                <el-button plain @click="back">返回</el-button>
            </div>
            <div id="sign_up">
                <el-button plain @click="sign_up">注册</el-button>
            </div>
        </div>
    </div>
</template>
  
<style>
#box {
    border-radius: 4px;
    margin-top: 30vh;
    margin-left: 35vw;
    height: auto;
    padding-bottom: 20px;
    width: 450px;
    background-color: rgba(0, 0, 0, .54);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.in {
    margin-top: 20px;
    margin-left: 80px;
    margin-right: 80px;
}

#back {
    margin-top: 20px;
    margin-left: 130px;
    width: 120px;
    float: left;
}

#sign_up {
    margin-top: 20px;
    margin-left: 30px;
}
</style>
  
<script>
export default {
    methods: {
        sign_up() {
            if (this.password === '' || this.confirm === ' '
                || this.email === ' ' || this.user_name === ' ') {
                    this.warning = '不能为空！';
                    this.error = true
            } else if (!(this.confirm === this.password)) {
                this.warning = '密码不一致！';
                this.error = true
            } else {
                this.loading = true
                this.$axios.post('http://database.vip.cpolar.cn/register_page/register',
                    null,
                    {
                        params: {
                            user_name: this.user_name,
                            email: this.email,
                            password: this.password
                        }
                    }
                )
                    .then(res => {
                        this.loading = false
                        if (res.data == -1) {
                            this.warning = '邮箱格式不规范'
                            this.error = true
                        } else if (res.data == -2) {
                            this.warning = '邮箱已被注册'
                            this.error = true
                        } else {
                            this.success = true;
                        }
                    })
                    .catch(res => {
                        this.loading = false
                        this.warning = '请求错误';
                        this.error = true;
                    })
            }
        },
        back() {
            this.$router.replace('/');
        },
        jump() {
            this.$router.push({
                path: '/',
                query: {
                    email: this.email
                }
            });
        }
    },
    data() {
        return {
            warning: '',
            success: false,
            user_name: '',
            email: '',
            password: '',
            confirm: '',
            error: false,
        }
    }
}
</script>
  