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
              <h4 class="card-title">分析列表</h4>
              <p class="card-category">Analysis List</p>
            </template>
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">OBJECT</th>
                <th scope="col">POSITIVE RATE</th>
                <th scope="col">ANALYZING DATE</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="analysis in analysisList" :key="analysis.url">
                <td>{{ analysis.dad_id }}</td>
                <td>{{ analysis.pos_rate.toFixed(6) }}</td>
                <td>{{ analysis.create_date }}</td>
                <td><button @click="getDetail(analysis.id)">detail</button></td>
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
        analysisApi: 'http://localhost:8000/douban/item_analysis/',
        analysisList: {},
        analysisDad: {},
        nextUrl: null,
        prevUrl: null,
        numAnalysis: 0,
        numPage: 0,
        dadId: '',
      }
    },
    methods: {
      getAll() {
        axios.get(this.analysisApi, {
          params: {
            search: this.dadId
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
        this.analysisApi = this.nextUrl;
        this.getAll();
      },
      getPreviousPage() {
        this.analysisApi = this.prevUrl;
        this.getAll();
      },
      getDetail(analysisId) {
        this.$router.push({
          path: '/analysis/detail/',
          query: {
            analysis_id: analysisId
          }
        })
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
