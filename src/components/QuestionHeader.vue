<template>
    <div>
        <el-row>
            <el-col :span="3">
                <div style="float:left;font-size:1em">
                    <router-link :to="{ path: '/home', query: { user_id: this.id } }"
                        style="text-decoration: none;color:#3498db">
                        原题库
                    </router-link>
                </div>
                <router-link :to="{ path: '/QuestionView', query: { uid: id, pid: pid } }"
                    style="text-decoration: none;color:white">
                    <div class="grid-content title">{{ title }}</div>
                </router-link>
            </el-col>
            <el-col :span="18"></el-col>
            <el-col :span="3">
                <div class="grid-content">
                    <router-link :to="{ path: '/UserView', query: { uid: id, flag: true } }"
                        style="text-decoration: none;color:white">
                        <div class="user">{{ user }}</div>
                    </router-link>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'QuestionHeader',
    props: {
        user: String,
        title: String,
        id: String,
        pid: String
    }
}
</script>

<style scoped lang="scss">
.el-row {
    margin-bottom: 20px;
    margin-top: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    text-align: center;
    border-radius: 4px;
    min-height: 36px;
}

.user {
    min-width: 50px;
}
</style>