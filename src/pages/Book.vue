<template>
  <div class="content">
    <div class="container-fluid">
      
      <div class="row">
        <div class="col-7">
          <label for="basic-url">Douban URL</label>
          <div class="input-group mb-9">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3">https://book.douban.com/subject/</span>
            </div>
            <input type="text" class="form-control" v-model="doubanId" id="basic-url" aria-describedby="basic-addon3" placeholder="Douban ID">
          </div>
          <br>
        </div> 

        <div class="col-5">
          <button type="button" class="operation-btn btn btn-round btn-fill btn-primary" @click="insertBook()">Crawl</button>
        </div>

        <div class="col-7">
          <div class="form-group">
            <label for="book-search-input">Search</label>
            <input type="text" class="form-control" v-model="searchStr" id="book-search-input" placeholder="Keyword or Douban ID">
            <small class="form-text text-muted">输入图书相关信息或豆瓣ID以查询电影条目</small>
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
                <a class="page-link" href="#" tabindex="-1" @click="getPreviousPage">Prev</a>
              </li>
              <li v-else class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1" @click="getPreviousPage">Prev</a>
              </li>

              <li v-if="nextUrl!=null" class="page-item">
                <a class="page-link" href="#" @click="getNextPage">Next</a>
              </li>
              <li v-else class="page-item disabled">
                <a class="page-link" href="#" @click="getNextPage">Next</a>
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
              <h4 class="card-title">已收录的图书列表</h4>
              <p class="card-category">Books in the database. All data was crawled from Douban.</p>
              
            </template>
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">AUTHOR</th>
                <th scope="col">RATING</th>
                <th scope="col">OPERATION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in bookList" :key="book.url">
                <td><a :href=book.douban_url>{{ book.id }}</a></td>
                <td>{{ book.name }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.rating_val }}</td>
                <td><button @click="getDetail(book.id)">detail</button></td>
              </tr>
            </tbody>
          </table>
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
        bookApi: 'http://127.0.0.1:8000/douban/book/',
        bookList: {},
        nextUrl: null,
        prevUrl: null,
        numBook: 0,
        numPage: 0,
        nowPage: 1,
        searchStr: '',
        doubanId: ''
      }
    },
    methods: {
      getAll() {
        axios.get(this.bookApi, {
          params: {
            ordering: '-create_date',
            page: this.nowPage,
            search: this.searchStr
          }
        })
          .then(res => {
            this.bookList = res.data.results;
            this.numBook = res.data.count;
            this.prevUrl = res.data.previous;
            this.nextUrl = res.data.next;
            this.numPage = Math.ceil(this.numBook / 10);
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
      getDetail(bookId) {
        this.$router.push({
          path: '/book/detail/',
          query: {
            book_id: bookId
          }
        })
      },
      insertBook() {
        axios.post(this.bookApi, {
          douban_url: 'https://book.douban.com/subject/' + this.doubanId
        }).then(() => {
          this.notifyVue('top', 'right');
        })
      },
      notifyVue (verticalAlign, horizontalAlign) {
        // const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            message: '<span>您提交的 添加/修改 请求：<b>' + this.doubanId + '</b> 已发送后台处理 <a href="http://localhost:6800/jobs">点击查看任务状态</a></span>',
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.notificationType[1]
          })
      }

    },
    mounted() {
      this.getAll();
    }
  }
</script>
<style type="text/css">

</style>
