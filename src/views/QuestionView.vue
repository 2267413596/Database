<template>
    <div class="common-layout" v-if="sp == 1">
        <el-container style="box-sizing: border-box;">
            <el-header>
                <QuestionHeader :title='pname' :user="username" :id="userid" :pid="pid" />
            </el-header>
            <!-- <el-main style = "background-color:rgb(239,239,239); padding: 30px;"> -->
            <el-main style="background-color: black; opacity: calc(0.75); padding: 30px; min-height: max-content;">
                <div class="container1">
                    <div class="container2">
                        <!--提交代码-->
                        <div class="container2_1" v-if="submit">
                            <div class="questiontext" style="background-color: rgba(230, 238, 232, 0.65);">
                                <div
                                    style="float:left; margin: 0.5em 0.5em; font-weight: bolder; font-size:2em; color: black;">
                                    代码提交</div>
                                <div
                                    style="float:left; clear: left; margin: 0.5em 1em; font-weight: bolder; font-size: large; color: black;">
                                    语言选择</div>
                                <div style="float:left; clear: left; margin: 1em 1em; box-sizing:border-box">
                                    <el-select-v2 v-model="value" :options="options"
                                        placeholder="Please select"></el-select-v2>
                                </div>
                                <div
                                    style="float:left; clear: left; margin: 1em 1em; font-weight: bolder; font-size: large; color: black;">
                                    请写入这里</div>
                                <div style="clear: both; margin: 1em 1em; box-sizing:border-box">
                                    <el-input v-model="textarea2" :autosize="{ minRows: 20, maxRows: 20 }"
                                        type="textarea" placeholder="Please input" />
                                </div>
                                <div style="float:right; margin-top: 2em;margin-left: 1em;">
                                    <button class="button_submit" @click="(submit = !submit)">
                                        <div class="colorRotate" style="font-size:1.5em; font-weight:bolder">返回</div>
                                    </button>
                                </div>
                                <div style="float:right; margin-top: 2em;">
                                    <button class="button_submit" @click="CodeSubmit()">
                                        <div class="colorRotate" style="font-size:1.5em; font-weight:bolder">提交</div>
                                    </button>
                                </div>
                                <!--弹窗评测结果-->
                                <el-dialog v-model="resultWindowVisible" title="" width="32%" align-center
                                    :before-close="handleClose">
                                    <div class="rw">
                                        <div
                                            style="line-height: 1.2; font-weight:bolder; float: left; margin-bottom: 5px;">
                                            评测结果</div>
                                        <div
                                            style="line-height: 1.2; font-weight:bolder; float: right; margin-bottom: 5px;">
                                            提交时间：{{ t }}</div>
                                        <div style="clear:both;"></div>
                                        <div v-for="eva in evaluationResult" style="float: left;padding-top: 10px;">
                                            <el-tooltip effect="dark" placement="top">
                                                <template #content>{{ eva.re }}</template>
                                                <div style="position: relative; display: inline-block;">
                                                    <div v-if="(eva.re == 'Accept')" class="test-case">
                                                        <div class="test-case-content">
                                                            <div
                                                                style="padding-top: 2px; padding-bottom: 2px;text-align: center;font-size: 0.7em;">
                                                                {{ eva.time }}ms<!--/{{eva.size}}KB--></div>
                                                            <div
                                                                style="padding-top: 2px; padding-bottom: 2px;font-size: 1.25em;text-align: center;">
                                                                AC</div>
                                                        </div>
                                                        <div style="padding: 6px; font-size: .65em;text-align:left;">
                                                            #{{ eva.rank }}</div>
                                                    </div>
                                                    <div v-if="(eva.re == 'Wrong')" class="test-case"
                                                        style="background-color: rgb(231, 76, 60);">
                                                        <div class="test-case-content">
                                                            <div
                                                                style="padding-top: 2px; padding-bottom: 2px;text-align: center;font-size: 0.7em;">
                                                                {{ eva.time }}ms<!--/{{eva.size}}KB--></div>
                                                            <div
                                                                style="padding-top: 2px; padding-bottom: 2px;font-size: 1.25em;text-align: center;">
                                                                WA</div>
                                                        </div>
                                                        <div style="padding: 6px; font-size: .65em;text-align: left;">
                                                            #{{ eva.rank }}</div>
                                                    </div>
                                                    <div v-if="(eva.re == 'Compile Error')" class="test-case"
                                                        style="background-color: rgb(250, 219, 20);">
                                                        <div class="test-case-content">
                                                            <div
                                                                style="padding-top: 2px; padding-bottom: 2px;text-align: center;font-size: 0.7em;">
                                                                {{ eva.time }}ms<!--/{{eva.size}}KB--></div>
                                                            <div
                                                                style="padding-top: 2px; padding-bottom: 2px;font-size: 1.25em;text-align: center;">
                                                                CE</div>
                                                        </div>
                                                        <div style="padding: 6px; font-size: .65em;text-align: left;">
                                                            #{{ eva.rank }}</div>
                                                    </div>
                                                </div>
                                            </el-tooltip>
                                        </div>
                                        <div style="clear:both;"></div>
                                    </div>
                                    <!--<template #footer>
                                        <el-button @click="resultWindowVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="resultWindowVisible = false">确 定</el-button>
                                    </template>-->
                                </el-dialog>
                                <div style="clear:both"></div>
                            </div>
                        </div>
                        <div class="container2_1" v-if="!submit">
                            <div class="questiontext">
                                <h2 class="questiontext_1">题目背景</h2>
                                <div class="questiontext_2">
                                    <p style="white-space: pre-wrap;">{{ text_background }}</p>
                                </div>
                                <h2 class="questiontext_1">题目描述</h2>
                                <div class="questiontext_2">
                                    <p style="white-space: pre-wrap;">{{ text_description }}</p>
                                </div>
                                <h2 class="questiontext_1">输入格式</h2>
                                <div class="questiontext_2">
                                    <p style="white-space: pre-wrap;">{{ text_inputFormat }}</p>
                                </div>
                                <h2 class="questiontext_1">输出格式</h2>
                                <div class="questiontext_2">
                                    <p style="white-space: pre-wrap;">{{ text_outputFormat }}</p>
                                </div>
                                <h2 class="questiontext_1">输入输出样例</h2>
                                <div class="questiontext_2">
                                    <div style="overflow:hidden; display:flex; margin-top:1em">
                                        <div style="margin-right: .5em; flex:1; overflow:hidden">
                                            <div style="font-weight:bolder; font-size:large">输入</div>
                                            <div class="inoutput">{{ text_input }}</div>
                                        </div>
                                        <div style="margin-left: .5em; flex:1; overflow:hidden">
                                            <div style="font-weight:bolder; font-size:large">输出</div>
                                            <div class="inoutput">{{ text_output }}</div>
                                        </div>
                                    </div>
                                </div>
                                <h2 class="questiontext_1">说明/提示</h2>
                                <div class="questiontext_2">
                                    <p style="white-space: pre-wrap;">
                                        {{ text_tips }}
                                        <!--<v-md-preview :text="text_tips"></v-md-preview>-->
                                    </p>
                                </div>
                                <div style="float:right; margin-top: 2em; margin-left: 1em;">
                                    <button class="button_submit" @click="collectionP()">
                                        <div class="colorRotate" style="font-size:1.5em; font-weight:bolder">{{ collect
                                        }}</div>
                                    </button>
                                </div>
                                <div style="float:right; margin-top: 2em;">
                                    <button class="button_submit" @click="submit = !submit">
                                        <div class="colorRotate" style="font-size:1.5em; font-weight:bolder">提交</div>
                                    </button>
                                </div>
                                <div style="clear:both"></div>
                            </div>
                            <div class="comments-template" style="box-sizing: border-box;">
                                <div class="comments">
                                    <div class="comments-title">{{ comment_num }} 条评论</div>
                                    <div class="commentlist" style="margin-bottom:10px">
                                        <!--评论的开始-->
                                        <div v-for="c in comment">
                                            <div class="comment-a" style="display:block">
                                                <!--评论头-->
                                                <div class="comment-head">
                                                    <div>
                                                        <!--图片和名字-->
                                                        <router-link
                                                            :to="{ path: '/UserView', query: { uid: c.uid, flag: (c.uid == this.userid) } }"
                                                            style="text-decoration: none;color:white">
                                                            <img src="../photos/1.jpg" width="54" height="54" alt="头像"
                                                                class="comment-author-photo">
                                                        </router-link>
                                                        <router-link
                                                            :to="{ path: '/UserView', query: { uid: c.uid, flag: (c.uid == this.userid) } }"
                                                            style="text-decoration: none;color:black">
                                                            <div class="comment-author"
                                                                style="float:left; box-sizing:border-box">{{ c.name }}
                                                            </div>
                                                        </router-link>
                                                    </div>
                                                    <div class="comment-data">{{ c.data }}</div>
                                                </div>
                                                <!--评论内容-->
                                                <div class="comment-content">
                                                    <div style="margin-bottom:10px; text-align: left;">{{ c.val }}</div>
                                                </div>
                                                <!--评论回复-->
                                                <div class="comment-reply">
                                                    <div :id=c.id class="comment-reply-link"
                                                        @click="Replyclick($event, c.id)">回复</div>
                                                    <div class="comment-reply-link" @click="Cclicksup(c.id)">点赞 <span
                                                            v-if="c.sup != 0">{{ c.sup }}</span></div>
                                                </div>
                                                <div style="clear:both"></div>
                                                <div><!--回复列表-->
                                                    <div v-for="rc in replycomment">
                                                        <div v-if="rc.replyid == c.id">
                                                            <div class="comment-a"
                                                                style="display:block; margin-left: 30px;">
                                                                <div class="comment-head">
                                                                    <div>
                                                                        <!--图片和名字-->
                                                                        <router-link
                                                                            :to="{ path: '/UserView', query: { uid: rc.uid, flag: (rc.uid == this.userid) } }"
                                                                            style="text-decoration: none;color:white">
                                                                            <img src="../photos/1.jpg" width="54"
                                                                                height="54" alt="头像"
                                                                                class="comment-author-photo">
                                                                        </router-link>
                                                                        <router-link
                                                                            :to="{ path: '/UserView', query: { uid: rc.uid, flag: (rc.uid == this.userid) } }"
                                                                            style="text-decoration: none;color:black">
                                                                            <div class="comment-author"
                                                                                style="float:left; box-sizing:border-box">
                                                                                {{ rc.name }}</div>
                                                                        </router-link>
                                                                    </div>
                                                                    <div class="comment-data">{{ rc.data }}</div>
                                                                </div>
                                                                <!--评论内容-->
                                                                <div class="comment-content">
                                                                    <div
                                                                        style="margin-bottom:10px; text-align: left;white-space: pre-wrap;">
                                                                        {{ rc.val }}</div>
                                                                </div>
                                                                <!--评论回复-->
                                                                <div class="comment-reply">
                                                                    <div :id=c.id class="comment-reply-link"
                                                                        @click="Replyclick($event, rc.id, 'c')">回复</div>
                                                                    <div class="comment-reply-link"
                                                                        @click="RCclicksup(rc.id)">点赞 <span
                                                                            v-if="rc.sup != 0">{{ rc.sup }}</span></div>
                                                                </div>
                                                                <div style="clear:both"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="replyControl == c.id">
                                                    <!--回复comment-reply-container-->
                                                    <div style="padding: 25px 0 10px 80px; box-sizing: border-box;">
                                                        <div class="reply-box">
                                                            <div class="reply-box-cotainer">
                                                                <div class="reply-head"> <img src="../photos/1.jpg"
                                                                        width="54" height="54" alt="头像"
                                                                        class="comment-replyauthor-photo"></div>
                                                                <div class="reply-text"><textarea v-model="replydata"
                                                                        class="reply-textarea" placeholder="回复" /></div>
                                                                <div class="reply-box-send"
                                                                    @click="Replysend(c.id, c.name, 'r')">
                                                                    <div class="reply-send">发布</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="clear:both"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--评论导航-->
                                    <div class="comment-nav">
                                        <div
                                            style="border-radius: 4px; float: right !important; display: inline-block; box-sizing: border-box">
                                            <el-pagination v-model:current-page="nowpage" background
                                                layout="prev, pager, next" :total="comment_num" />
                                            <!--<div v-for="cn in comment_num" style=" float: left !important;">
                                                <div v-if="nowpage != cn" class="comment-page" @click="ChangePage(cn)">{{cn}}</div>
                                                <div v-if="nowpage == cn" class="comment-page" style="color: white;background-color: #1890ff;">{{cn}}</div>
                                            </div>-->
                                        </div>
                                    </div>
                                    <div style="clear:both"></div>
                                    <!--增加评论-->
                                    <div class="comment-a comment-head">
                                        <div class="reply-box-cotainer"
                                            style="margin:5px; padding:10px;min-height: 120px">
                                            <div>
                                                <router-link
                                                    :to="{ path: '/UserView', query: { uid: this.userid, flag: true } }"
                                                    style="text-decoration: none;color:black">
                                                    <img src="../photos/1.jpg" width="54" height="54" alt="头像"
                                                        class="comment-author-photo">
                                                </router-link>
                                            </div>
                                            <div class="reply-text" style="box-sizing:border-box; margin-top: 10px;">
                                                <textarea v-model="replydata" class="reply-textarea" placeholder="回复" />
                                            </div>
                                            <div class="reply-box-send" @click="NewComment()"
                                                style="margin-top:20px;margin-bottom:10px;">
                                                <div class="reply-send">发布</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--页面右侧部分-->
                        <div class="container2_2">
                            <div class="questiontext" style="padding = 1em;">
                                <div style="margin-bottom = 1em;">
                                    <div v-for="d in description"
                                        style="display:flex; align-items:center; margin-bottom: 1em; color: black;">
                                        <div style="flex:1 0 auto; text-align: left;">{{ d.des1 }}</div>
                                        <div style="text-overflow: ellipsis; overflow: hidden;font-weight: bold">
                                            {{ d.des2 }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="questiontext" style="padding = 1em;">
                                <div style="margin-bottom: 1em;">
                                    <div style="font-size:1.25em; font-weight:bolder; text-align:left;">标签</div>
                                </div>
                                <div v-show="label" style="margin-bottom: 4em;">
                                    <div v-for="l in labels">
                                        <div class="questionlabel">{{ l.lab }}</div>
                                    </div>
                                </div>
                                <div style="color:black; clear: both; cursor: pointer;">
                                    <div @click="label = !label" v-if="!label">显示标签</div>
                                    <div @click="label = !label" v-if="label">隐藏标签</div>
                                </div>
                            </div>
                            <div style="box-sizing:border-box; min-height:0px">
                                <div class="questiontext" style="margin:0; padding:0; min-height: 0;">
                                    <EvaluationHistory :name="username" :id="userid" :pid="pid" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </el-main>
            <div style="clear:both"></div>
        </el-container>
    </div>
</template>

<script>
import QuestionHeader from '@/components/QuestionHeader.vue'
import EvaluationHistory from '@/components/EvaluationHistory.vue'
import { h, watch } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const resultWindowVisible = ref(false)
const nowpage = ref()
var t = 1.00


export default {
    name: 'QuestionView',
    components: {
        QuestionHeader,
        EvaluationHistory
        // QuestionContent
    },
    mounted() {

        this.userid = this.$route.query.uid;
        this.pid = this.$route.query.pid;
        axios.post('http://database.vip.cpolar.cn/problem_page/get_total', null, { params: { pr_id: this.pid } }).then((res) => {
            this.comment_num = res.data;
        })
        axios.post('http://database.vip.cpolar.cn/personal_page/get_info', null, { params: { user_id: this.userid } }).then((res) => {
            this.fff = res.data.private_status
        })
        axios.post('http://database.vip.cpolar.cn/problem_page/get_name', null, { params: { user_id: this.userid } }).then((res) => {

            this.username = res.data;
        })
        axios.post('http://database.vip.cpolar.cn/problem_page/is_collect', null, { params: { pr_id: this.pid, user_id: this.userid } }).then((res) => {
            if (res.data == true) {
                this.collect = '取消收藏'
            } else this.collect = '收藏'
        })
        axios.post('http://database.vip.cpolar.cn/problem_page/get_problem', null, { params: { pr_id: this.pid } }).then((res) => {

            this.pname = res.data.pr_name
            this.text_background = res.data.pr_background;
            this.text_description = res.data.pr_description;
            this.text_inputFormat = res.data.input_format;
            this.text_outputFormat = res.data.output_format;
            this.text_input = res.data.input;
            this.text_output = res.data.output;
            if (res.data.pr_tips == '') this.text_tips = '无'
            else this.text_tips = res.data.pr_tips;
            this.description = [{ des1: '提交', des2: res.data.total_submit },
            { des1: '通过', des2: res.data.total_pass },
            { des1: '时间限制', des2: '1.00s' },
            { des1: '内存限制', des2: '128.00MB' }];
            if (res.data.label_1 != '') this.labels.push({ lab: res.data.label_1 })
            if (res.data.alg_label_1 != '') this.labels.push({ lab: res.data.alg_label_1 })
            if (res.data.alg_label_2 != '') this.labels.push({ lab: res.data.alg_label_2 })
            if (res.data.alg_label_3 != '') this.labels.push({ lab: res.data.alg_label_3 })
            this.sp = 1;
        })
        watch(nowpage, (newdata, lastdata) => {
            this.comment.splice(0, this.comment.length)
            this.replycomment.splice(0, this.replycomment.length)
            axios.post('http://database.vip.cpolar.cn/problem_page/get_review', null, { params: { pr_id: this.pid, page: newdata } }).then((res) => {
                for (var c in res.data) {
                    this.comment.push({ uid: res.data[c].Review.user_id, name: res.data[c].Review.user_name, data: res.data[c].Review.review_date, val: res.data[c].Review.content, id: res.data[c].Review.review_id, sup: res.data[c].Review.likes })
                    for (var rc in res.data[c].Child) {
                        this.replycomment.push({
                            name: res.data[c].Child[rc].user_name,
                            data: res.data[c].Child[rc].review_date,
                            val: res.data[c].Child[rc].content,
                            id: res.data[c].Child[rc].review_id,
                            uid: res.data[c].Child[rc].user_id,
                            replyid: res.data[c].Child[rc].parent_id,
                            sup: res.data[c].Child[rc].likes,
                        })
                    }
                }
            })
        });
        this.nowpage = 1;
    },
    methods: {
        CodeSubmit: function () {
            if (this.value == undefined) {
                ElMessage({
                    message: h('p', null, [h('span', null, '请选择语言种类'),]),
                });
                return 0;
            }
            this.evaluationResult.splice(0, this.evaluationResult.length)
            if (this.textarea2 == undefined || this.textarea2 == "") {
                ElMessage({
                    message: h('p', null, [h('span', null, 'no code'),]),
                })
            } else {
                var addtime = new Date()
                var month = (addtime.getMonth() + 1).toString().padStart(2, '0')
                var day = addtime.getDate().toString().padStart(2, '0')
                var hour = addtime.getHours().toString().padStart(2, '0')
                var minutes = addtime.getMinutes().toString().padStart(2, '0')
                var seconed = addtime.getSeconds().toString().padStart(2, '0')
                this.t = addtime.getFullYear() + '年' + month + '月' + day + '日 ' + hour + ':' + minutes + ':' + seconed
                ElMessage({
                    message: h('p', null, [h('span', null, '请耐心等待'),]),
                })
                this.resultWindowVisible = true
                axios.post('http://database.vip.cpolar.cn/problem_page/submit', null, { params: { program: this.textarea2, type: initials[this.value], pr_id: this.pid, user_id: this.userid } }).then((res) => {
                    for (var i in res.data) {
                        this.evaluationResult.push({
                            rank: i,
                            time: res.data[i].time,
                            re: res.data[i].result
                        })
                    }
                    this.textarea2 = ''
                    this.value = undefined;
                })
                /* 
                evaRes: [{ rank: 1, pass: true, time: 3, size: 888, re: 'accepted!' },
                 { rank: 2, pass: true, time: 3, size: 828, re: 'accepted!' },
                 { rank: 3, pass: false, time: 1000, size: 999, re: 'wrong answer!' },
                 { rank: 4, pass: true, time: 3, size: 623, re: 'accepted!' },
                 { rank: 5, pass: false, time: 123, size: 128, re: 'wrong answer!' },
                 { rank: 6, pass: false, time: 321, size: 422, re: 'wrong answer!' }],
                axios.post('/questionview/code', { userId: this.userid, pid: this.pid , text: this.textarea2, type: this.value}).then((res) =>{
                     this.evaluationResult = res.data.evaRes;
                 })*/
            }

        },
        Replyclick: function (a, b, c) {//展开回复框
            this.replydata = ''
            this.replyControl = a.currentTarget.id
            this.replyid = b;
            this.replytype = c;
        },
        RCclicksup: function (a) {
            for (var i = 0; i < this.replycomment.length; i++) {
                if (this.replycomment.at(i).id == a) {
                    this.replycomment.at(i).sup++;
                    axios.post('http://database.vip.cpolar.cn/problem_page/like', null, { params: { review_id: a } }).then((res) => {

                    })
                }
            }
        },
        Cclicksup: function (a) {
            for (var i = 0; i < this.comment.length; i++) {
                if (this.comment.at(i).id == a) {
                    this.comment.at(i).sup++;
                    axios.post('http://database.vip.cpolar.cn/problem_page/like', null, { params: { review_id: a } }).then((res) => {

                    })
                }
            }
        },
        Replysend: function (parentid, newname) {//回复发表
            if (this.replydata == undefined || this.replydata == "") {
                ElMessage({
                    message: h('p', null, [h('span', null, '还没有回复哦！'),]),
                })
            } else {
                var addtime = new Date()
                var month = (addtime.getMonth() + 1).toString().padStart(2, '0')
                var day = addtime.getDate().toString().padStart(2, '0')
                var hour = addtime.getHours().toString().padStart(2, '0')
                var minutes = addtime.getMinutes().toString().padStart(2, '0')
                var seconed = addtime.getSeconds().toString().padStart(2, '0')
                var newtime = addtime.getFullYear() + '年' + month + '月' + day + '日 ' + hour + ':' + minutes + ':' + seconed
                axios.post('http://database.vip.cpolar.cn/problem_page/reply', null, { params: { content: this.replydata, user_id: this.userid, pr_id: this.pid, parent_id: parentid } }).then((res) => {
                    var addreplydata = { uid: this.userid, name: this.username, data: newtime, val: this.replydata, id: res.data, replyid: parentid, sup: 0 }
                    this.replycomment.push(addreplydata)
                    this.replydata = ''
                });
                this.replyControl = 0
            }
        },
        ChangePage: function () {//暂时无用
            //this.nowpage = newcn
        },
        NewComment: function () {//新评论
            if (this.replydata == undefined || this.replydata == "") {
                ElMessage({
                    message: h('p', null, [h('span', null, '还没有评论哦！'),]),
                })
            } else {
                var addtime = new Date()
                var month = (addtime.getMonth() + 1).toString().padStart(2, '0')
                var day = addtime.getDate().toString().padStart(2, '0')
                var hour = addtime.getHours().toString().padStart(2, '0')
                var minutes = addtime.getMinutes().toString().padStart(2, '0')
                var seconed = addtime.getSeconds().toString().padStart(2, '0')
                var newtime = addtime.getFullYear() + '年' + month + '月' + day + '日 ' + hour + ':' + minutes + ':' + seconed
                axios.post('http://database.vip.cpolar.cn/problem_page/review', null, { params: { content: this.replydata, user_id: this.userid, pr_id: this.pid } }).then((res) => {
                    if (this.comment.length < 10) {
                        var addcomment = { uid: this.userid, name: this.username, data: newtime, val: this.replydata, id: res.data }
                        this.comment.push(addcomment);
                    }
                    this.replydata = ''
                });
                this.comment_num++
                this.replyControl = 0
            }
        },
        handleClose(done) {
            this.$confirm('确定关闭吗').then(() => {
                // function(done)，done 用于关闭 Dialog
                done();
            }).catch(() => {
                console.log("Wrong");
            });
        },
        collectionP: function () {
            if (this.collect == '收藏') {
                this.collect = '取消收藏';
                axios.post('http://database.vip.cpolar.cn/problem_page/collect', null, { params: { pr_id: this.pid, user_id: this.userid } }).then((res) => {
                    ElMessage({
                        message: h('p', null, [h('span', null, '已收藏'),]),
                    })
                })

            } else if (this.collect = '取消收藏') {
                this.collect = '收藏'
                axios.post('http://database.vip.cpolar.cn/problem_page/uncollect', null, { params: { pr_id: this.pid, user_id: this.userid } }).then((res) => {
                    ElMessage({
                        message: h('p', null, [h('span', null, '已取消收藏'),]),
                    })
                })

            }
        }
    },
    data() {
        return {
            sp: 0,
            username: 'asd',
            userid: '1',
            pname: '',
            pid: '1',
            collect: '',
            comment_num: 0,
            text_background: '',
            text_description: '',
            text_inputFormat: '',
            text_outputFormat: '',
            text_input: '',
            text_output: '',
            text_tips: '',
            description: [],
            labels: [],
            comment: [],
            replycomment: [],
            label: false,//显示label
            submit: false,//显示提交
            value,//语言种类选择
            options,//同上
            textarea2,//输入代码
            replyControl: 0,//显示回复
            replyid: 0,
            replytype: 0,
            replydata: '',
            nowpage,
            evaluationResult: [],
            initials,
        }
    }
}
//标签
import { ref } from 'vue'
const initials = ['java', 'C', 'C++']
const value = ref()
const options = Array.from({ length: 3 }).map((_, idx) => ({
    value: idx % 10,
    label: `${initials[idx % 10]}`,
}))
//输入代码
const textarea2 = ref('')
</script>

<style>
@import '../assets/styles/questionView.css';
</style>
