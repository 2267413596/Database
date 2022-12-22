<template>
    <div id="root" v-on:load="this.loading">
        <!-- 搜索框 -->
        <div class="basic-box" style="margin:20px;">
            <el-row :gutter="20">
                <el-col :span="5"></el-col>
                <el-col :span="5">
                    <el-input v-model="search_content" class="w-50 m-2" placeholder="搜索记录" />
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="Search">搜索</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 表格 -->
        <div id="table" class="basic-box" style="margin:20px;">
            <el-table :data="log_list" style="width: 100%" max-height="420">
                <el-table-column prop="check_id" label="审核编号" width="120" />
                <el-table-column prop="review_id" label="评论编号" width="120" />
                <el-table-column prop="admin_id" label="管理员编号" width="120" />
                <el-table-column prop="pass_status" label="是否通过" width="120" />
                <el-table-column prop="reason" label="驳回理由" width="400" />
                <el-table-column prop="check_date" label="操作日期" width="200" />
                <el-table-column fixed="right" label="Operations">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click.prevent="revoke(scope.$index)">
                            撤销
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style>
@import '../assets/styles/userView.css';

#root {
    padding-bottom: 10px;
}

#search {
    background-color: aquamarine;
}
#table {
    padding-bottom: 20px;
    margin-bottom: 0;
}
</style>

<script>

export default {
    mounted() {
        this.loading = true;
        this.$axios.post(this.get_checksurl)
            .then(res => {
                this.loading = false;
                console.log(res)
                for (var i = 0; i < res.data.length; i++) {
                    var item = res.data[i]
                    this.log_list.push(item)
                    console.log(item)
                }
                if (res.data.length == 0) {
                    this.empty = true;
                } else {
                    this.empty = false;
                }
            })
            .catch(res => {
                console.log(res)
                this.warning = '获取记录失败';
                this.error = true;
            })
    },
    data() {
        return {
            review_id: -1,

            loading: false,
            empty: true,
            currentPage: 1,
            search_content: '',
            log_list: [

            ],
            get_checksurl: 'http://database.vip.cpolar.cn/admin_page/get_checks',
            revokeurl: 'http://database.vip.cpolar.cn/admin_page/revoke'
        }
    },
    methods: {
        handleCurrentChange() {
            Console.log(currentPage)
        },
        editPage() {
            this.$router.replace('/administrator/edit')
        },
        revoke(index) {
            this.loading = true;
            this.check_id = this.log_list[index].check_id
            this.$axios.post(this.revokeurl, null,
                {
                    params: {
                        check_id: this.check_id
                    }
                })
                .then(res => {
                    console.log(res)
                    this.log_list.splice(index, 1);
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                    this.loading = false
                })
        }
    }
}
</script>