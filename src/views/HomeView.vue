<template>
  <div id="root">
    <!-- 走马灯 -->
    <div class="basic-box" style="margin:10px;">
      <el-row>
        <el-col :span="10" :offset="2">
          <a-carousel :autoPlay="true" animation-name="card" show-arrow="never" indicator-position="outer" :style="{
            width: '500px',
            height: '200px',
          }">
            <a-carousel-item v-for="image in 3" :style="{ width: '80%' }">
              <img :src="url[image - 1]" :style="{
                width: '100%',
              }" />
            </a-carousel-item>
          </a-carousel>
        </el-col>
        <!-- 排名 -->
        <el-col :span="6" :offset="2">
          <div style="font-weight: bold; font-size: 20px">排行榜</div>
          <el-table :data="pass_list" stripe style="width: 100%" v-loading="loading1">
            <el-table-column prop="No." label="No." />
            <el-table-column prop="name" label="用户名" width="180" />
            <el-table-column prop="rate" label="通过率">
              <template #default="scope">
                {{ parseFloat(scope.row.rate).toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="basic-box" style="margin:10px;">
        <el-row :gutter="20">
          <el-col :span="2">
            <div style="font-weight: bold; font-size: 20px">查找题目</div>
          </el-col>
          <el-col :span="5">
            <el-input v-model="search_content" class="w-50 m-2" placeholder="搜索题目" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="Search" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-row style="margin: 10px;">
          <el-col :span="1" :offset="0">
            <div style="font-weight: bold; font-size: 16px">难度：</div>
          </el-col>
          <el-col :span="2">
            <el-select v-model="diff_value" class="m-2" placeholder="Select">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="1" :offset="1">
            <div style="font-weight: bold; font-size: 16px">算法：</div>
          </el-col>
          <el-col :span="2">
            <el-input v-model="input" placeholder="算法" clearable />
          </el-col>
          <el-col :span="1" :offset="1">
            <div style="font-weight: bold; font-size: 16px">状态：</div>
          </el-col>
          <el-col :span="2">
            <el-select v-model="state" class="m-2" placeholder="Select">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-row>

      </div>
      <div id="table" class="basic-box" style="margin:10px; padding-bottom: 10px">
        <el-table :data="pr_list" style="width: 100%" max-height="250" v-loading="loading"
          :row-class-name="rowClassName">
          <el-table-column prop="pr_id" label="Id" width="150" />
          <el-table-column prop="pr_name" label="Name" width="270">
            <template #default="scope">
              <a style="text-decoration:none;" @click="enter(scope.row.pr_id)">{{
                  scope.row.pr_name
              }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="label_1" label="Difficulty" width="120" />
          <el-table-column prop="pass_status" label="Status" width="120">
            <template #default="scope">
              <p style="text-decoration:none;color: gray;" v-if="scope.row.pass_status == 'Unknow'">{{
                  scope.row.pass_status
              }}</p>
              <a style="text-decoration:none;color: red;" v-if="scope.row.pass_status == 'Wrong'">{{
                  scope.row.pass_status
              }}</a>
              <a style="text-decoration:none;color:darkkhaki;" v-if="scope.row.pass_status == 'Compile Error'">{{
                  scope.row.pass_status
              }}</a>
              <a style="text-decoration:none;color: green;" v-if="scope.row.pass_status == 'Accept'">{{
                  scope.row.pass_status
              }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="pass_rate" label="PassRate" width="120">
            <template #default="scope">
              {{ parseFloat(scope.row.pass_rate).toFixed(2) }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
          layout="total, prev, pager, next" :total="this.totalNum" :page-size="10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
  

<script>
export default {
  data() {
    return {
      search_content: '',
      diff_value: '',
      alg_value: '',
      totalNum: 0,
      currentPage: 1,
      url: [
        require('../assets/1.jpg'),
        require('../assets/2.jpg'),
        require('../assets/3.jpg')
      ],
      currentPage1: 1,
      loading1: true,
      title: "加载中...",
      c_1: true,
      options2: [
        {
          label: 'Wrong',
          value: 'Wrong',
        },
        {
          label: 'Unknown',
          value: 'Unknown',
        },
        {
          label: 'Compile Error',
          value: 'Compile Error',
        },
        {
          label: 'Accept',
          value: 'Accept',
        },
        {
          label: 'none',
          value: '',
        }
      ],
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
      pr_list: [

      ],
      pass_list: [

      ],
      loading1: false,
      get_all_numurl: 'http://database.vip.cpolar.cn/home_page/get_all_num',
      get_pageurl: 'http://database.vip.cpolar.cn/home_page/get_page',
      get_searchurl: 'http://database.vip.cpolar.cn/home_page/get_search',
      get_pass_list: 'http://database.vip.cpolar.cn/home_page/get_pass_list',
      loading: false,
      user_id: 0,
      page: 1,
      state: '',
    }
  },
  mounted() {
    this.user_id = this.$route.query.user_id;
    this.loading = true;
    this.loading1 = true;
    this.$axios.post(this.get_all_numurl)
      .then(res => {
        console.log(res)
        this.totalNum = res.data
        this.$axios.post(this.get_pageurl, null,
          {
            params: {
              user_id: this.user_id,
              page: this.page
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
    // 获取排行榜
    this.$axios.post(this.get_pass_list)
      .then(res => {
        this.loading1 = false;
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i]
          item['No.'] = i + 1
          this.pass_list.push(item)
          console.log(item)
        }
        console.log(res)
      })
      .catch(res => {
        this.loading1 = false;
        console.log(res)
      })
  },
  methods: {
    search() {
      this.loading = true;
      this.$axios.post(this.get_searchurl, null,
        {
          params: {
            name: this.search_content,
            diff_label: this.diff_value,
            alg_label: this.alg_value,
            page: this.currentPage,
            user_id: this.user_id
          }
        })
        .then(res => {
          console.log(res)
          this.pr_list = [];
          this.loading = false;
          for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i]
            if (this.state == item.pass_status || this.state == '') {
              this.pr_list.push(item)
            }
          }
        })
        .catch(res => {
          console.log(res)
          this.loading = false;
          this.warning = '获取题目失败';
          this.error = true;
        })
    },
    choose_1: function () {
      this.c_1 = !this.c_1;
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    enter(pr_id) {
      this.$router.push(
        {
          path: '/questionview',
          query: {
            uid: this.user_id,
            pid: pr_id
          }
        }
      )
    },
  }
}
</script>

<style>
#root {
  padding-bottom: 400px;
}

@import '../assets/styles/userView.css';
</style>
  
  https://autumnfish.cn/api/joke