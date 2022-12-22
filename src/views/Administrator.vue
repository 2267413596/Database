<template>
    <div id="root">
        <el-container style="box-sizing: border-box;">
            <el-header>
                <p style="color: white; margin-top: 10px; margin-left: 20px; text-align: center">管理员主页</p>
            </el-header>
            <div>
                <el-container>
                    <el-scrollbar>
                    <el-aside :width="isCollapse ? '64px' : '200px'">
                        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                            text-color="#fff" @open="handleOpen" @close="handleClose">
                            <el-menu-item index="1" @click="comment">
                                <el-icon><View /></el-icon>
                                <span>评论审核</span>
                            </el-menu-item>
                            <el-menu-item index="2" @click="question">
                                <el-icon>
                                    <setting />
                                </el-icon>
                                <span>编辑题目</span>
                            </el-menu-item>
                            <el-menu-item index="3" @click="log">
                                <el-icon>
                                    <document />
                                </el-icon>
                                <span>审核日志</span>
                            </el-menu-item>
                        </el-menu>
                    </el-aside>
                </el-scrollbar>
                    <el-main class="main">
                        <router-view/>
                    </el-main>
                </el-container>
            </div>
        </el-container>
    </div>
</template>

<style>
@import '../assets/styles/global.css';

</style>


<script>
export default {
    methods: {
        handleClose() {

        },
        handleOpen() {

        },
        comment() {
            this.$router.replace('/administrator/comment')
        },
        question() {
            this.$router.replace('/administrator/question')
        },
        log() {
            this.$router.replace('/administrator/checkLog')
        }
    },
    data() {
        return {
            input1: '',
            input2: '',
            isCollapse: false
        }
    }
}
</script>