<template>
    <div id="root" class="basic-box" style="margin:20px; padding-bottom:20px" v-on:load="loading">
        <!-- 对话框 -->
        <el-dialog v-model="this.error" width="30%" center>
            <span>
                {{ this.warning }}
            </span>
        </el-dialog>
        <div id="title">
            <h3 style="text-align: left">标题</h3>
            <el-input v-model="problem.pr_name" type="text"></el-input>
        </div>
        <div id="background" style="text-align: left;">
            <h3 style="text-align: left">题目背景</h3>
            <el-input v-model="problem.pr_background" type="textarea" :rows="3"></el-input>
        </div>
        <h3 style="text-align: left">题目描述</h3>
        <div id="descript">
            <el-input v-model="problem.pr_description" type="textarea" :rows="3"></el-input>
        </div>
        <h3 style="text-align: left">提示</h3>
        <div id="descript">
            <el-input v-model="problem.pr_tips"></el-input>
        </div>
        <h3 style="text-align: left">输入格式</h3>
        <div id="descript">
            <el-input v-model="problem.input_format" type="textarea"></el-input>
        </div>
        <h3 style="text-align: left">输出格式</h3>
        <div id="descript">
            <el-input v-model="problem.output_format" type="textarea"></el-input>
        </div>
        <div id="sample">
            <el-row :gutter="40" style="padding: 5px;">
                <el-col :span="2" :offset="1">
                    <p>展示样例</p>
                </el-col>
                <el-col :span="2">
                    <p>输入：</p>
                </el-col>
                <el-col :span="6"><el-input v-model="problem.input" type="textarea" size="small"></el-input></el-col>
                <el-col :span="2">
                    <p>输出：</p>
                </el-col>
                <el-col :span="6"><el-input v-model="problem.output" type="textarea" size="small"></el-input></el-col>
            </el-row>
        </div>
        <div id="alg">
            <el-row :gutter="40" style="padding: 5px;">
                <el-col :span="2" :offset="1">
                    <p>算法标签</p>
                </el-col>
                <el-col :span="5"><el-input v-model="problem.alg_label_1"></el-input></el-col>
                <el-col :span="5"><el-input v-model="problem.alg_label_2"></el-input></el-col>
                <el-col :span="5"><el-input v-model="problem.alg_label_3"></el-input></el-col>
            </el-row>
        </div>
        <div id="diff">
            <el-row :gutter="40" style="padding: 5px;">
                <el-col :span="2" :offset="1">
                    <p>难度</p>
                </el-col>
                <el-select v-model="this.problem.label_1" class="m-2" placeholder="Select">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-row>
        </div>
        <div v-for="(sample, index) in problem.testcases" id="sample_editor"
            style="text-align: left; box-shadow: 0px 0px 5px black;">
            <el-row :gutter="40" style="padding: 5px;">
                <el-col :span="2" :offset="1">
                    <p>样例{{ (index + 1) }}</p>
                </el-col>
                <el-col :span="2">
                    <p>输入：</p>
                </el-col>
                <el-col :span="6"><el-input v-model="sample.input" type="textarea" size="small"></el-input></el-col>
                <el-col :span="2">
                    <p>输出：</p>
                </el-col>
                <el-col :span="6"><el-input v-model="sample.output" type="textarea" size="small"></el-input></el-col>
                <el-col :span="3"><el-button icon="Close" circle @click="deleteSample(index)"
                        style="margin-top: 8px"></el-button></el-col>
            </el-row>
        </div>
        <div id="add">
            <el-button type="primary" icon="Plus" @click="addSample">添加样例</el-button>
        </div>
        <el-row :gutter="200" style="margin-top: 30px">
            <el-col :span="8">

            </el-col>
            <el-col :span="2">
                <el-button type="danger" icon="DeleteFilled" @click="back">取消</el-button>
            </el-col>
            <el-row>
                <el-col :span="2">
                    <el-button type="primary" icon="Download" @click="save">保存</el-button>
                </el-col>
            </el-row>
        </el-row>
        <div style="clear:both;"></div>
    </div>
</template>
    
<style>
#add_sample {
    margin-top: 20px;
    margin-right: 300px;
}

#descript {
    margin-bottom: 20px;
}

#sample_editor {
    margin-top: 20px;
}

#add {
    padding-left: 400px;
    margin-top: 20px;
}
</style>
      
<script>


export default {
    mounted() {
        if (this.$route.query.pr_id > 0) {
            this.problem.pr_id = this.$route.query.pr_id;
        }
        if (this.problem.pr_id != -1) {
            this.loading = true;
            this.$axios.post(this.get_problemurl, null,
                {
                    params: {
                        pr_id: this.problem.pr_id
                    }
                })
                .then(res => {
                    console.log(res)
                    this.problem.pr_name = res.data.pr_name
                    this.problem.pr_background = res.data.pr_background
                    this.problem.pr_description = res.data.pr_description
                    this.problem.input_format = res.data.input_format
                    this.problem.output_format = res.data.output_format
                    this.problem.input = res.data.input
                    this.problem.output = res.data.output
                    this.problem.alg_label_1 = res.data.alg_label_1
                    this.problem.alg_label_2 = res.data.alg_label_2
                    this.problem.alg_label_3 = res.data.alg_label_3
                    this.problem.label_1 = res.data.label_1
                    this.problem.pr_tips = res.data.pr_tips
                    for (var i = 0; i < res.data.testcases.length; i++) {
                        var item = res.data.testcases[i]
                        this.problem.testcases.push(item)
                        console.log(item)
                    }
                    this.loading = false
                })
                .catch(res => {
                    console.log(res)
                    this.loading = false
                    this.warning = '请求错误';
                    this.error = true;
                })
        }
    },
    data() {
        return {
            warning: '',
            error: false,
            options1: [
                {
                    label: '简单',
                    value: '简单',
                },
                {
                    label: '中等',
                    value: '中等',
                },
                {
                    label: '困难',
                    value: '困难',
                }
            ],
            loading: false,
            problem: {
                pr_id: -1,
                pr_name: '',
                pr_background: '',
                pr_description: '',
                pr_tips: '',
                input: '',
                output: '',
                label_1: '',
                alg_label_1: '',
                alg_label_2: '',
                alg_label_3: '',
                input_format: '',
                output_format: '',
                testcases: [

                ],
                pr_tips: '',
            },
            get_problemurl: 'http://database.vip.cpolar.cn/admin_page/get_problem',
            modify_problemurl: 'http://database.vip.cpolar.cn/admin_page/modify_problem',
        }
    },
    methods: {
        jump: function (id) {
            this.content = this.list_test[id].content
        },
        addSample: function () {
            this.problem.testcases.push({
                input: "",
                output: ""
            });
        },
        deleteSample: function (index) {
            this.problem.testcases.splice(index, 1)
        },
        back() {
            this.$router.replace('/administrator/question')
        },  
        save() {
            this.loading = true
            this.$axios.post(this.modify_problemurl,
                {
                    pr_id: this.problem.pr_id,
                    pr_background: this.problem.pr_background,
                    pr_description: this.problem.pr_description,
                    pr_name: this.problem.pr_name,
                    input: this.problem.input,
                    output: this.problem.output,
                    label_1: this.problem.label_1,
                    alg_label_1: this.problem.alg_label_1,
                    alg_label_2: this.problem.alg_label_2,
                    alg_label_3: this.problem.alg_label_3,
                    input_format: this.problem.input_format,
                    output_format: this.problem.output_format,
                    testcases: this.problem.testcases,
                    pr_tips: this.problem.pr_tips
                }
            ).then(res => {
                console.log(res)
                this.loading = false
                if (res.data > 0) {
                    this.warning = '保存成功';
                    this.error = true
                } else {
                    this.warning = '保存失败';
                    this.error = true
                }
            }).catch(res => {
                console.log(res)
                this.loading = false
                this.warning = '请求错误';
                this.error = true;
            })
        }
    }
}
</script>