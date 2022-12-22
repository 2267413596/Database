<template>
    <div id="root">
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
            <el-table :data="tableData" style="width: 100%" max-height="250">
                <el-table-column prop="date" label="Id" width="150" />
                <el-table-column prop="name" label="Title" width="120" />
                <el-table-column prop="state" label="类型" width="120" />
                <el-table-column prop="city" label="操作" width="120" />
                <el-table-column prop="address" label="操作日期" width="500" />
                <el-table-column fixed="right" label="Operations">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                            撤销
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                layout="total, prev, pager, next" :total="10">
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
    data() {
        return {
            currentPage: 1,
            search_content: '',
            tableData: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Home',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Home',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
            ]
        }
    },
    methods: {
        handleCurrentChange() {
            Console.log(currentPage)
        },
        editPage() {
            this.$router.replace('/administrator/edit')
        }
    }
}
</script>