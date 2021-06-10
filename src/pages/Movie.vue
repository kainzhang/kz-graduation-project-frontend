<template>
  <div class="content">
    <div class="container-fluid">
      
      <div class="row">
        <div class="col-7">
          <label for="basic-url">Douban URL</label>
          <div class="input-group mb-9">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3">https://movie.douban.com/subject/</span>
            </div>
            <input type="text" class="form-control" v-model="doubanId" id="basic-url" aria-describedby="basic-addon3" placeholder="Douban ID">
          </div>
          <br>
        </div> 

        <div class="col-5">
          <button type="button" class="operation-btn btn btn-round btn-fill btn-primary" @click="insertMovie()">Crawl</button>
        </div>

        <div class="col-7">
          <div class="form-group">
            <label for="movie-search-input">Search</label>
            <input type="text" class="form-control" v-model="searchStr" id="movie-search-input" placeholder="Keyword or Douban ID">
            <small class="form-text text-muted">输入电影相关信息或豆瓣ID以查询电影条目</small>
          </div>
        </div>

        <div class="col-5">
          <button type="button" class="operation-btn btn btn-round btn-fill btn-primary" @click="getAll()">Search</button>
        </div>
      </div>

      <!-- 分页器 -->
      <div class="row">
        <div class="col-12">
          <nav>
            <ul class="pagination justify-content-end">
              <li v-if="prevUrl!=null" class="page-item">
                <a class="page-link" href="javascript:void(0)" @click="getPreviousPage">Prev</a>
              </li>
              <li v-else class="page-item disabled">
                <a class="page-link" href="javascript:void(0)"  @click="getPreviousPage">Prev</a>
              </li>

              <li v-if="nextUrl!=null" class="page-item">
                <a class="page-link" href="javascript:void(0)" @click="getNextPage">Next</a>
              </li>
              <li v-else class="page-item disabled">
                <a class="page-link" href="javascript:void(0)" @click="getNextPage">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">已收录的电影列表</h4>
              <p class="card-category">Movies in the database. All data was crawled from Douban.</p>
              
            </template>
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">RATING</th>
                <th scope="col">UPDATE DATE</th>
                <th scope="col">OPERATION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movie in movieList" :key="movie.url">
                <td><a :href=movie.douban_url>{{ movie.id }}</a></td>
                <td>
                  {{ movie.name }}
                  <i v-if="movie.analyzed==true" class="fa fa-check text-success"></i>
                  <i v-else class="fa fa-times text-danger"></i>
                </td>
                <td>{{ movie.rating_val }}</td>
                <td>{{ formatDate(movie.create_date) }}</td>
                <td>
                  <router-link
                    :to="{name:'Movie Detail', query:{movie_id:movie.id}}"
                    class="table-btn btn btn-b btn-round btn-fill btn-default"
                  >detail</router-link>
                  <a href="javascript:void(0)" @click="toAnalyze(movie.id)"  class="table-btn btn btn-round btn-fill btn-success">analyze</a>
                </td>
              </tr>
            </tbody>
          </table>
          </card>
        </div>

        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <small class="table-small-text" >
              &nbsp;&nbsp;{{ numMovie }} movies in the database;
              &nbsp;&nbsp;Total Pages: {{ numPage }};
              &nbsp;&nbsp;Now at: {{ nowPage }}
            </small>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import axios from 'axios'

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        notificationType: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        },
        movieApi: 'douban/movie/',
        analysisApi: 'douban/item_analysis/',
        movieList: {},
        nextUrl: null,
        prevUrl: null,
        numMovie: 0,
        numPage: 0,
        nowPage: 1,
        searchStr: '',
        doubanId: ''
      }
    },
    methods: {
      getAll() {
        axios.get(this.movieApi, {
          params: {
            ordering: '-create_date',
            page: this.nowPage,
            search: this.searchStr
          }
        }).then(res => {
            this.movieList = res.data.results;
            this.numMovie = res.data.count;
            this.prevUrl = res.data.previous;
            this.nextUrl = res.data.next;
            this.numPage = Math.ceil(this.numMovie / 10);
        });
      },
      getNextPage() {
        this.nowPage += 1;
        this.getAll();
      },
      getPreviousPage() {
        this.nowPage -= 1;
        this.getAll();
      },
      toAnalyze(movieId) {
        axios.post(this.analysisApi, {
          dad_id: movieId,
          dad_type: 1
        }).then(() => {
          this.notifyVue('top', 'right', '<span>您提交的 分析 请求：<b>' + movieId + '</b> 已发送后台处理</span>');
          this.toAnalysis(movieId)
        })
      },
      toAnalysis(movieId) {
        this.$router.push({
          path: '/analysis/',
          query: {
            douban_id: movieId
          }
        })
      },
      insertMovie() {
        axios.post(this.movieApi, {
          douban_url: 'https://movie.douban.com/subject/' + this.doubanId
        }).then(() => {
          this.notifyVue('top', 'right', '<span>您提交的 添加/修改 请求：<b>' + this.doubanId + '</b> 已发送后台处理 <a href="http://localhost:6800/jobs">点击查看任务状态</a></span>');
        })
      },
      notifyVue(verticalAlign, horizontalAlign, message) {
        // const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            message: message,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.notificationType[2]
          })
      },
      formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
      }

    },
    mounted() {
      this.getAll();
    }
  }
</script>

<style type="text/css">
  .operation-btn {
    margin-top: 32px;
    line-height: 20px;
    width: 100px;
  }

  .table-btn {
    line-height: 16px;
    font-size: 14px;
    width: 90px;
    margin-right: 15px;
  }

  .table-small-text {
    display: block;
    float: left;
    padding: 0 0 5px 10px;
    color: #666;
  }
</style>
