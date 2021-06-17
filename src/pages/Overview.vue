<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Movies</p>
              <h4 class="card-title">{{ movieNum }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-puzzle-10 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Books</p>
              <h4 class="card-title">{{ bookNum }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-chat-round text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Comments</p>
              <h4 class="card-title">{{ commentNum }}</h4>
            </div>
            <div slot="footer">
             <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-chart-pie-36 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Analyses</p>
              <h4 class="card-title">{{ analysisNum }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

      </div>
      <!-- <div class="row">
        <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Users Behavior</h4>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Email Statistics</h4>
              <p class="card-category">Last Campaign Performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Bounce
                <i class="fa fa-circle text-warning"></i> Unsubscribe
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
              </div>
            </template>
          </chart-card>
        </div>
      </div> -->

      <div class="row">

        <div class="col-md-7">
          <card>
            <template slot="header">
              <h4 class="card-title">毕业设计 - 后端任务</h4>
              <p class="card-category">Graduation project backend development</p>
            </template>
            <l-table :data="tableDataBackend.data"
                     :columns="tableDataBackend.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-github-alt"></i>&nbsp;
                <a href="https://github.com/kainzhang/kz-graduation-project-backend">Backend repository</a>
              </div>
            </div>
          </card>
        </div>

        <div class="col-md-5">
          <card>
            <template slot="header">
              <h4 class="card-title">毕业设计 - 前端任务</h4>
              <p class="card-category">Graduation project frontend development</p>
            </template>
            <l-table :data="tableDataFrontend.data"
                     :columns="tableDataFrontend.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-github-alt"></i>&nbsp;
                <a href="https://github.com/kainzhang/kz-graduation-project-frontend">Frontend repository</a>
              </div>
            </div>
          </card>
        </div>

        <!-- <div class="col-md-5">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">毕业设计 - 前端任务</h4>
              <p class="card-category">Graduation project backend development</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Tesla Model S
                <i class="fa fa-circle text-danger"></i> BMW 5 Series
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div> -->

      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import axios from 'axios'

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        // pieChart: {
        //   data: {
        //     labels: ['40%', '20%', '40%'],
        //     series: [40, 20, 40]
        //   }
        // },
        // lineChart: {
        //   data: {
        //     labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        //     series: [
        //       [287, 385, 490, 492, 554, 586, 698, 695],
        //       [67, 152, 143, 240, 287, 335, 435, 437],
        //       [23, 113, 67, 108, 190, 239, 307, 308]
        //     ]
        //   },
        //   options: {
        //     low: 0,
        //     high: 800,
        //     showArea: false,
        //     height: '245px',
        //     axisX: {
        //       showGrid: false
        //     },
        //     lineSmooth: true,
        //     showLine: true,
        //     showPoint: true,
        //     fullWidth: true,
        //     chartPadding: {
        //       right: 50
        //     }
        //   },
        //   responsiveOptions: [
        //     ['screen and (max-width: 640px)', {
        //       axisX: {
        //         labelInterpolationFnc (value) {
        //           return value[0]
        //         }
        //       }
        //     }]
        //   ]
        // },
        // barChart: {
        //   data: {
        //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //     series: [
        //       [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        //       [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        //     ]
        //   },
        //   options: {
        //     seriesBarDistance: 10,
        //     axisX: {
        //       showGrid: false
        //     },
        //     height: '245px'
        //   },
        //   responsiveOptions: [
        //     ['screen and (max-width: 640px)', {
        //       seriesBarDistance: 5,
        //       axisX: {
        //         labelInterpolationFnc (value) {
        //           return value[0]
        //         }
        //       }
        //     }]
        //   ]
        // },
        movieNum: 0,
        bookNum: 0,
        commentNum: 0,
        analysisNum: 0,
        tableDataBackend: {
          data: [
            {title: '实现各模型及其序列化器和视图集', checked: true},
            {title: '实现豆瓣电影、读书、评论爬虫', checked: true},
            {title: '爬虫中间件：自动登录及自动完成人机验证', checked: true},
            {title: 'Django与Scrapy结合，前者请求后者启动爬虫', checked: true},
            {title: 'RESTful API完善，包括过滤和排序', checked: true},
            {title: 'Django Admin功能配置和完善', checked: true},
            {title: '数据分析和ECharts数据生成（以JSON字符串存入数据库）', checked: true},
            {title: 'JWT用户登录验证', checked: true},
          ]
        },
        tableDataFrontend: {
          data: [
            {title: '各模块LIST页面', checked: true},
            {title: '电影、图书详情页面', checked: true},
            {title: '分析结果页面ECharts图表', checked: true},
            {title: '配置路由', checked: true},
            {title: '用户登录及验证', checked: true},
            {title: '用户注册', checked: true},
          ]
        },
      }
    },
    created() {
      axios.get('douban/movie/').then(res => {
        this.movieNum = res.data.count;
      });
      axios.get('douban/book/').then(res => {
        this.bookNum = res.data.count;
      });
      axios.get('douban/comment/').then(res => {
        this.commentNum = res.data.count;
      });
      axios.get('douban/item_analysis/').then(res => {
        this.analysisNum = res.data.count;
      });
    }
  }
</script>
<style>

</style>
