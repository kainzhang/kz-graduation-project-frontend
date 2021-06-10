<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-7">
          <div class="form-group">
            <label for="analysis-search-input">Search</label>
            <input type="text" class="form-control" v-model="dadId" id="analysis-search-input" placeholder="Douban ID">
            <small class="form-text text-muted">输入电影或图书的 Douban ID 查询所属分析结果</small>
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
              <h4 class="card-title">分析列表</h4>
              <p class="card-category">Analysis List</p>
            </template>
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">OBJECT</th>
                <th scope="col">CMT NUM</th>
                <th scope="col">POSITIVE RATE</th>
                <th scope="col">ANALYZING DATE</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="analysis in analysisList" :key="analysis.url">
                <td>{{ analysis.dad_id }}</td>
                <td>{{ analysis.comment_num }}</td>
                <td>{{ analysis.pos_rate.toFixed(6) }}</td>
                <td>{{ formatDate(analysis.create_date) }}</td>
                <td>
                  <router-link
                    :to="{name:'Analysis Detail', query:{analysis_id:analysis.id}}"
                    class="table-btn btn btn-b btn-round btn-fill btn-default"
                  >detail</router-link>
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
              &nbsp;&nbsp;{{ numAnalysis }} analyses in the database;
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
        analysisApi: 'douban/item_analysis/',
        analysisList: {},
        nextUrl: null,
        prevUrl: null,
        numAnalysis: 0,
        numPage: 0,
        nowPage: 1,
        dadId: '',
      }
    },
    methods: {
      getAll() {
        axios.get(this.analysisApi, {
          params: {
            search: this.dadId,
            page: this.nowPage
          }
        }).then(res => {
          this.analysisList = res.data.results;
          this.numAnalysis = res.data.count;
          this.prevUrl = res.data.previous;
          this.nextUrl = res.data.next;
          this.numPage = Math.ceil(this.numAnalysis / 10);
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
      this.dadId = this.$route.query.douban_id;
      this.getAll();
    }
  }
</script>

<style>
</style>
