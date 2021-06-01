<template>
  <div class="content">
    <div class="container-fluid">
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

        <!-- <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Table on Plain Background</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="tableColumns"
                       :data="tableData">
              </l-table>
            </div>
          </card>
        </div>

        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Small table</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <l-table class="table-hover table-striped table-sm"
                     :columns="tableColumns"
                     :data="tableData">
            </l-table>
          </card>

        </div> -->

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
        commentApi: 'http://localhost:8000/douban/comment/',
        commentList: {},
        nextUrl: null,
        prevUrl: null,
        numComment: 0,
        numPage: 0,
      }
    },
    methods: {
      getAll() {
        axios.get(this.commentApi)
          .then(res => {
            this.commentList = res.data.results;
            this.numComment = res.data.count;
            this.prevUrl = res.data.previous;
            this.nextUrl = res.data.next;
            this.numPage = Math.ceil(this.numComment / 10);
          });
      },
      getNextPage() {
        this.commentApi = this.nextUrl;
        this.getAll();
      },
      getPreviousPage() {
        this.commentApi = this.prevUrl;
        this.getAll();
      }
    },
    mounted() {
      this.getAll();
      console.log(this.numPage);
    }
  }
</script>
<style>
</style>
