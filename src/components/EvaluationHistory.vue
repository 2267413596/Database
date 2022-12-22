<template>
    <div style="box-sizing:border-box border-radius: 4px;">
        <div style="margin-bottom:30px; opacity: 1;">
            <div class="history-head">
                <div class="history-head-1">提交记录</div>
                <div v-if="!historydisable" style="float:right" @click="getHistoryList()">
                    <el-button size="small" circle style="font-size:30px;">▽</el-button>
                </div>
                <div v-if="historydisable" style="float:right" @click="clearHistoryList()">
                    <el-button size="small" circle style="font-size:30px;">▽</el-button>
                </div>
                <div style="clear:both"></div>
            </div>
            <div v-if="historydisable">
                <div v-for="h in historylist">
                    <div class="history-block" @click="getEData()">
                        <div class="history-block-content">
                            <span style="float:left;text-align:left;padding-bottom: 5px;">{{ h.submitTime }}</span>
                            <div style="clear:both"></div>
                            <span v-if="h.score == 0 && h.re != 'Compile Error'" style="color: rgb(231, 76, 60);"
                                class="history-block-pass">{{ h.re }}</span>
                            <span v-if="h.re == 'Compile Error'" class="history-block-pass"
                                style="color: rgb(250, 219, 20);">{{ h.re }}</span>
                            <span v-if="h.score == 100" class="history-block-pass"
                                style="color: rgb(82, 196, 26);">{{ h.re }}</span>
                            <span v-if="h.score == 0"
                                style="float:left;width:33%;text-align:left;font-weight:bold;color: rgb(231, 76, 60);">{{ h.score }}</span>
                            <span v-if="h.score > 0 && h.score < 100"
                                style="float:left;width:33%;text-align:left;font-weight:bold;color: rgb(250, 219, 20);">{{ h.score }}</span>
                            <span v-if="h.score == 100"
                                style="float:left;width:33%;text-align:left;font-weight:bold;color: rgb(82, 196, 26);">{{ h.score }}</span>
                            <span class="history-block-detail">
                                {{ h.time }}ms<!--/{{h.size}}K-->B/{{ h.kind }}</span>
                        </div>
                    </div>
                </div>
                <el-drawer v-model="evaluationDataVis" title="评测结果" direction="rtl" size="32%">
                    <el-table :data="evaluationData">
                        <el-table-column property="rank" label="testfile" width="100px" />
                        <el-table-column property="pass" label="status" width="150px" />
                        <el-table-column property="time" label="time" width="100px" />
                        <el-table-column property="size" label="size" />
                    </el-table>
                </el-drawer>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { ElDrawer } from 'element-plus'
import { ElMessage } from 'element-plus'
const evaluationDataVis = ref(false)
import axios from 'axios'
export default {
    name: 'EvaluationHistory',
    props: {
        name: String,
        id: String,
        pid: String
    },
    methods: {
        getHistoryList: function () {
            axios.post('http://database.vip.cpolar.cn/problem_page/get_submission', null, { params: { user_id: this.id, pr_id: this.pid } }).then((res) => {
                for (var i in res.data) {
                    this.historylist.push({
                        id: res.data[i].sub_id,
                        pass: true,
                        submitTime: res.data[i].sub_time,
                        time: 1,
                        kind: res.data[i].compile_type,
                        score: res.data[i].score,
                        re: res.data[i].pass_status
                    })
                }
                this.historydisable = true
            })/*
            var newhs = {id:1, pass: true, submitTime:'2022年12月09日 23:22:01', time: 123, size: 888, kind: 'C++', score: 100, re: 'Accepted!' }
            this.historylist.push(newhs)
            newhs = {id:2, pass: false, submitTime: '2022年12月09日 22:13:45', time: 999, size: 12, kind: 'C', score: 50, re: 'Unaccepted!' }
            this.historylist.push(newhs)
            newhs = {id:3, pass: false, submitTime: '2022年12月09日 20:01:30', time: 196, size: 321, kind: 'C', score: 0, re: 'Unaccepted!' }
            this.historylist.push(newhs)*/
        },
        clearHistoryList: function () {
            this.historydisable = false
            this.historylist.splice(0, this.historylist.length)
        },
        getEData: function () {
            this.evaluationData.splice(0, this.evaluationData.length)
            alert('非常抱歉，查看测试点结果功能暂不对普通用户开放!')
            ElMessage({
                message: h('p', null, [h('span', null, '非常抱歉，查看测试点结果功能暂不对普通用户开放'),]),
            })/*
            //this.evaluationDataVis = true;
            var newEvaData = { rank: 'testfile1', pass: 'Accepted!', time: 3 + 'ms', size: 623 + 'KB', }
            this.evaluationData.push(newEvaData)
            newEvaData = { rank: 'testfile2', pass: 'Wrong Answer!', time: 89 + 'ms', size: 577 + 'KB', }
            this.evaluationData.push(newEvaData)
            newEvaData = { rank: 'testfile3', pass: 'Accepted!', time: 5 + 'ms', size: 633 + 'KB', }
            this.evaluationData.push(newEvaData)*/
        },
    },
    data() {
        return {
            historydisable: false,
            historylist: [],
            evaluationDataVis,
            evaluationData: [],
        }
    }
}
</script>

<style>
.history-head {
    box-sizing: border-box;
    color: white;
    background-color: rgba(10, 10, 0, 0.9);
    border-color: #000;
    font-size: 18px;
    line-height: 14px;
    font-weight: normal;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 10px 15px;
}

.history-head-1 {
    float: left;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
}

.history-block {
    box-sizing: border-box;
    padding: 10px 15px;
    margin-bottom: -1px;
    border: 1px solid #dddddd;
    background-color: rgba(230, 238, 232, 0.3);
    transition: background-color .5s ease-in-out, box-shadow .5s ease-in-out;
}

.history-block:hover {
    -moz-box-shadow: 0px 0px 50px black;
    -webkit-box-shadow: 0px 0px 50px black;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 50px black;
}

.history-block-content {
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
}

.history-block-pass {
    float: left;
    display: block;
    height: 100%;
    text-align: left;
    width: 33%;
    color: rgb(82, 196, 26);

}

.history-block-detail {
    float: right;
    text-align: center;
}
</style>