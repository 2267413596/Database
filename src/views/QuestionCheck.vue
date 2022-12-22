<template>
    <div id="root">
        <!-- 搜索框 -->
        <div class="basic-box" style="margin:20px;">
            <el-row :gutter="20">
                <el-col :span="5"></el-col>
                <el-col :span="5">
                    <el-input v-model="search_content" class="w-50 m-2" placeholder="搜索题目" />
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="Search" @click="search">搜索</el-button>
                </el-col>
                <el-col :span="3" :offset="2">
                    <el-button type="success" icon="Plus" @click="addProblem">新增题目</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 表格 -->
        <div id="table" class="basic-box" style="margin:20px;" v-on:load="this.loading">
            <el-table :data="pr_list" style="width: 100%" max-height="450">
                <el-table-column prop="pr_id" label="Id" width="150" />
                <el-table-column prop="pr_name" label="题目" width="120" />
                <el-table-column prop="date" label="编辑日期" width="500" />
                <el-table-column fixed="right" label="Operations">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                            Delete
                        </el-button>
                        <el-button link type="primary" size="small" @click="editPage(pr_list[scope.$index].pr_id)">
                            Edit
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                layout="total, prev, pager, next" :total="this.totalNum" :page-size="10">
            </el-pagination>
        </div>
    </div>
</template>

<style>
@import '../assets/styles/userView.css';

#search {
    background-color: aquamarine;
}
</style>

<script>
export default {
    mounted() {
        this.user_id = this.$route.query.user_id;
        this.loading = true;
        this.$axios.post(this.get_all_numurl)
            .then(res => {
                console.log(res)
                this.totalNum = res.data
                this.$axios.post(this.get_pageurl, null,
                    {
                        params: {
                            page: this.currentPage
                        }
                    }
                )
                    .then(res => {
                        console.log(res)
                        this.loading = false;
                        for (var i = 0; i < res.data.length; i++) {
                            var item = res.data[i]
                            this.pr_list.push(item)
                            console.log(item)
                        }
                    })
                    .catch(res => {
                        console.log(res)
                        this.loading = false;
                        this.warning = '获取题目失败';
                        this.error = true;
                    })
            })
            .catch(res => {
                console.log(res)
                this.loading = false;
                this.warning = '获取题目失败';
                this.error = true;
            })
    },
    data() {
        return {
            loading: false,
            totalNum: 0,
            currentPage: 1,
            search_content: '',
            pr_list: [
            ],
            get_all_numurl: 'http://database.vip.cpolar.cn/admin_page/get_total',
            get_pageurl: 'http://database.vip.cpolar.cn/admin_page/get_page',
            get_searchurl: 'http://database.vip.cpolar.cn/admin_page/search',
            delete_problem: 'http://database.vip.cpolar.cn/admin_page/delete_problem'
        }
    },
    methods: {
        editPage(index) {
            this.$router.push({
                path: '/administrator/edit',
                query: {
                    pr_id: index
                }
            });
        },
        addProblem() {
            this.$router.replace('/administrator/edit')
        },
        deleteRow(index) {
            this.$axios.post(this.delete_problem, null,
            {
                params: {
                    pr_id: this.pr_list[index].pr_id
                }
            }).then(res=>{
                console.log(res)
                if (res.data == true) {
                    this.pr_list.splice(index,1)
                }
            }).catch(res=>{
                console.log(res)
            })
        },
        search() {
            this.loading = true;
            this.$axios.post(this.get_searchurl, null,
                {
                    params: {
                        name: this.search_content,
                        diff_label: '',
                        alg_label: '',
                        page: 1,
                    }
                })
                .then(res => {
                    console.log(res)
                    this.pr_list = [];
                    this.loading = false;
                    for (var i = 0; i < res.data.length; i++) {
                        var item = res.data[i]
                        this.pr_list.push(item)
                    }
                })
                .catch(res => {
                    console.log(res)
                    this.loading = false;
                    this.warning = '获取题目失败';
                    this.error = true;
                })
        }
    }
}
</script>