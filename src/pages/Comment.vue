<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-7">
          <div class="form-group">
            <label for="comment-search-input">Search</label>
            <input type="text" class="form-control" v-model="dadId" id="comment-search-input" placeholder="Douban ID">
            <small class="form-text text-muted">输入电影或图书的 Douban ID 查询所属评论</small>
          </div>
        </div>

        <div class="col-5">
          <button type="button" class="operation-btn btn btn-round btn-fill btn-primary" @click="getAll()">Search</button>
        </div>
      </div>

        
      <div class="row">

        <div class="col-12">
            <nav>
              <ul class="pagination justify-content-end">
                <li v-if="prevUrl!=null" class="page-item">
                  <a class="page-link" href="javascript:void(0)" @click="getPreviousPage">Prev</a>
                </li>
                <li v-else class="page-item disabled">
                  <a class="page-link" href="javascript:void(0)" @click="getPreviousPage">Prev</a>
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


        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">评论列表</h4>
              <p class="card-category">Comment List</p>
            </template>
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">OBJECT</th>
                <th scope="col">CONTENT</th>
                <th scope="col">RATING</th>
                <th scope="col">SCORE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comment in commentList" :key="comment.url">
                <td>{{ comment.dad_id }}</td>
                <td>{{ comment.content }}</td>
                <td>{{ comment.rating_val }}</td>
                <td>{{ comment.senti_score.toFixed(6) }}</td>
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
              &nbsp;&nbsp;{{ numComment }} comments in the database;
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
        commentApi: 'douban/comment/',
        commentList: {},
        nextUrl: null,
        prevUrl: null,
        numComment: 0,
        numPage: 0,
        nowPage: 1,
        dadId: ''
      }
    },
    methods: {
      getAll() {
        axios.get(this.commentApi, {
          params: {
            search: this.dadId,
            page: this.nowPage
          }
        }).then(res => {
          this.commentList = res.data.results;
          this.numComment = res.data.count;
          this.prevUrl = res.data.previous;
          this.nextUrl = res.data.next;
          this.numPage = Math.ceil(this.numComment / 10);
        });
      },
      getNextPage() {
        this.nowPage += 1;
        this.getAll();
      },
      getPreviousPage() {
        this.nowPage -= 1;
        this.getAll();
      }
    },
    mounted() {
      this.dadId = this.$route.query.douban_id;
      this.getAll();
    }
  }
</script>
<style>
</style>
