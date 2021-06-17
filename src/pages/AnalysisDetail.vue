<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-8">
          <card style="height: 400px">
            <template slot="header">
              <h4 class="card-title">电影基本信息</h4>
              <p class="card-category">The details of the movie</p>
            </template>

            <div style="padding: 15px">
              <div style="float: left; width: 30%; padding-left: 10px">
                <img :src="coverUrl" class="img-fluid" alt="itemData.name" style="height: 250px">
              </div>

              <div style="float: left; width: 70%; padding-left: 10px">
              
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">NAME:</label>
                  <div class="col-sm-9">
                    <input type="text" readonly class="form-control-plaintext" :value="itemData.name">
                  </div>
                </div>

                <div class="form-group row" v-if="chartData.dad_type==1" >
                  <label class="col-sm-3 col-form-label">DIRECTOR:</label>
                  <div class="col-sm-9">
                    <input type="text" readonly class="form-control-plaintext" :value="itemData.director">
                  </div>
                </div>
                <div class="form-group row" v-else-if="chartData.dad_type==2" >
                  <label class="col-sm-3 col-form-label">AUTHOR:</label>
                  <div class="col-sm-9">
                    <input type="text" readonly class="form-control-plaintext" :value="itemData.author">
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">PUB DATE:</label>
                  <div class="col-sm-9">
                    <input type="text" readonly class="form-control-plaintext" :value="itemData.pub_date">
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">RATING:</label>
                  <div class="col-sm-9">
                    <input type="text" readonly class="form-control-plaintext" :value="itemData.rating_val">
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">CMT NUM:</label>
                  <div class="col-sm-9">
                    <input type="text" readonly class="form-control-plaintext" :value="chartData.comment_num">
                  </div>
                </div>

                 <div class="form-group row">
                  <label class="col-sm-3 col-form-label">POS RATE:</label>
                  <div class="col-sm-9">
                    <input type="text" readonly class="form-control-plaintext" :value="chartData.pos_rate">
                  </div>
                </div>

              </div>
              
              <router-link
                :to="{name:'Comment', query:{douban_id:chartData.dad_id}}"
                class="analysis-btn btn btn-b btn-round btn-fill btn-success"
              >Comments</router-link>
              <a href="javascript:void(0)" @click="toDetail()" class="analysis-btn btn btn-b btn-round btn-fill btn-default" role="button" aria-pressed="true">Detail</a>

            </div>
            
          </card>
        </div>

        <div class="col-4">
          <card style="height: 400px">
            <template slot="header">
              <h4 class="card-title">各类型评论占比</h4>
              <p class="card-category">Percentage of each type of comments</p>
            </template>

            <div id="senti-rate" style="height: 100%"></div>
          </card>
        </div>

        <div class="col-3">
          <card style="height: 375px">
            <template slot="header">
              <h4 class="card-title">各星级评论统计</h4>
              <p class="card-category">The number of each star levels of comment</p>
            </template>

            <div id="stars-cnt" style="height: 100%"></div>
          </card>
        </div>

        <div class="col-3">
          <card style="height: 375px">
            <template slot="header">
              <h4 class="card-title">各类型评论统计</h4>
              <p class="card-category">The number of each type of comment</p>
            </template>

            <div id="senti-num" style="height: 100%"></div>
          </card>
        </div>

        <div class="col-6">
          <card style="height: 375px">
            <template slot="header">
              <h4 class="card-title">各类型评论历年走势</h4>
              <p class="card-category">Historical trends of each type of comments</p>
            </template>

            <div id="senti-sum-year" style="height: 100%"></div>
          </card>
        </div>

        <div class="col-12">
          <card style="height: 425px">
            <template slot="header">
              <h4 class="card-title">各类型评论每年发布量</h4>
              <p class="card-category">The annual number of each type of comments posted</p>
            </template>

            <div id="senti-per-year" style="height: 100%"></div>
          </card>
        </div>

        <div class="col-6">
          <card style="height: 375px">
            <template slot="header">
              <h4 class="card-title">情感分数统计图</h4>
              <p class="card-category">Sentiment score statistics chart</p>
            </template>

            <div id="senti-score-map" style="height: 100%"></div>
          </card>
        </div>

        <div class="col-6">
          <card style="height: 375px">
            <template slot="header">
              <h4 class="card-title">评论热词词云</h4>
              <p class="card-category">Word Cloud: Hot words in comments</p>
            </template>

            <div id="word-cloud" style="height: 100%"></div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from 'src/components/Cards/Card.vue'
import axios from 'axios'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

export default {
  components: {
    Card
  },
  data() {
    return {
      analysisId: -1,
      chartData: {},
      coverUrl: '',
      itemData: {},
      commentNum: 0,
      starsCnt: {},
      sentiNum: {},
      sentiPerYear: {},
      sentiSumYear: {},
      sentiScoreMap: {},
      wordCloud: {}
    }
  },
  methods: {
    sentiRateChart() {
      var chartDom = document.getElementById('senti-rate');
      var chart = echarts.init(chartDom);
      chart.setOption({
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [{
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
                borderWidth: 1,
                borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 40
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [{
            value: (this.sentiNum.val[0] / this.commentNum * 100).toFixed(2),
            name: 'Positive',
            title: {
              offsetCenter: ['0%', '-52%']
            },
            detail: {
              offsetCenter: ['0%', '-34%']
            }
          },
          {
            value: (this.sentiNum.val[1] / this.commentNum * 100).toFixed(2),
            name: 'Neutral',
            title: {
              offsetCenter: ['0%', '-12%']
            },
            detail: {
              offsetCenter: ['0%', '6%']
            }
          },
          {
            value: (this.sentiNum.val[2] / this.commentNum * 100).toFixed(2),
            name: 'Negtive',
            title: {
              offsetCenter: ['0%', '29%']
            },
            detail: {
              offsetCenter: ['0%', '47%']
            }
          }
          ],
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }]
      });
    },

    starsCntChart() {
      var chartDom = document.getElementById('stars-cnt');
      var chart = echarts.init(chartDom);
      chart.setOption({
          tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0%',
          top: '5%',
          right: '5%',
          bottom: '4%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: [
          {
            type: 'category',
            data: this.starsCnt.stars,
            axisTick: {
                alignWithLabel: true
            }
          }
        ],
        xAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '评论数量',
            type: 'bar',
            barWidth: '60%',
            data: this.starsCnt.val
          }
        ]
      });
    },

    sentiNumChart() {
      var chartDom = document.getElementById('senti-num');
      var chart = echarts.init(chartDom);
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'left'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [{
          name: '评论数量',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: [
            {value: this.sentiNum.val[0], name: 'Positive'},
            {value: this.sentiNum.val[1], name: 'Neutral'},
            {value: this.sentiNum.val[2], name: 'Negtive'},
          ]
        }]
      });
    },

    sentiPerYearChart() {
      var app = {};
      var chartDom = document.getElementById('senti-per-year');
      var chart = echarts.init(chartDom);


      var posList = [
        'left', 'right', 'top', 'bottom',
        'inside',
        'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            var labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            };
            chart.setOption({
                series: [{
                  label: labelOption
                }, {
                  label: labelOption
                }, {
                  label: labelOption
                }]
            });
          }
      };

      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
          }
        }
      };

      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
            data: ['Positive', 'Neutral', 'Negtive']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: this.sentiPerYear.years
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Positive',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: this.sentiPerYear.pos
          },
          {
            name: 'Neutral',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: this.sentiPerYear.neu
          },
          {
            name: 'Negtive',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: this.sentiPerYear.neg
          }
        ]
      });
    },

    sentiSumYearChart() {
      var chartDom = document.getElementById('senti-sum-year');
      var chart = echarts.init(chartDom);
      chart.setOption({
        title: {
        text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Positive', 'Neutral', 'Negtive']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sentiSumYear.years
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Positive',
            type: 'line',
            stack: '正面评论',
            data: this.sentiSumYear.pos
          },
          {
            name: 'Neutral',
            type: 'line',
            stack: '中立评论',
            data: this.sentiSumYear.neu
          },
          {
            name: 'Negtive',
            type: 'line',
            stack: '负面评论',
            data: this.sentiSumYear.neg
          }
        ]
      });
    },

    processWordCloudData(wordDict) {
      let res = [];
      for (let key in wordDict){
        let obj = {
          name: key,
          value: wordDict[key]
        };
        res.push(obj);
      }
      return res;
    },

    wordCloudChart() {
      var chartDom = document.getElementById('word-cloud');
      var chart = echarts.init(chartDom);
      chart.setOption({
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          series: [{
              type: 'wordCloud',
              shape: 'circle',

              // maskImage: maskImage,

              left: 'center',
              top: 'center',
              width: '90%',
              height: '90%',
              right: null,
              bottom: null,

              sizeRange: [12, 60],

              rotationRange: [-90, 90],
              rotationStep: 45,

              gridSize: 8,

              drawOutOfBound: false,

              layoutAnimation: true,

              textStyle: {
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  color: function () {
                      // Random color
                      return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                      ].join(',') + ')';
                  }
              },
              emphasis: {
                  focus: 'self',

                  textStyle: {
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              },
              // Data is an array. Each array item must have name and value property.
              data: this.processWordCloudData(this.wordCloud)
          }]
      });

    },

    processSentiScoreMapData(sentiScoreMap) {
      let res = [];
      for (var i = 0; i < 50; i++) {
        let tmp = i * 0.02;
        let key = '' + tmp.toFixed(2);
        if (sentiScoreMap[key]) {
          res.push(sentiScoreMap[key]);
        } else {
          res.push('0');
        }
      }
      return res;
    },

    sentiScoreMapChart() {
      var chartDom = document.getElementById('senti-score-map');
      var myChart = echarts.init(chartDom);
      var option;

      var xAxisData = [];
      for (var i = 0; i < 50; i++) {
          xAxisData.push((0.02 * i).toFixed(2));
      }

      option = {
          legend: {
              data: ['score']
          },
          toolbox: {
            feature: {
                saveAsImage: {}
            }
          },
            grid: {
            left: '0%',
            top: '5%',
            right: '5%',
            bottom: '4%',
            containLabel: true
          },
          tooltip: {},
          xAxis: {
              data: xAxisData,
              splitLine: {
                  show: false
              }
          },
          yAxis: {
          },
          series: [{
              name: 'sentiment score',
              type: 'bar',
              data: this.processSentiScoreMapData(this.sentiScoreMap),
              emphasis: {
                  focus: 'series'
              },
          }],
      };

      option && myChart.setOption(option);

    },

    getAnalysisDetail(analysisId) {
      axios.get('douban/item_analysis/' + analysisId).then(res => {
        this.chartData = res.data
        
        if (this.chartData.dad_type == 1) {
          this.getMovieDetail(this.chartData.dad_id);
        } else if (this.chartData.dad_type == 2) {
          this.getBookDetail(this.chartData.dad_id);
        }
        
        this.chartData.pos_rate = this.chartData.pos_rate.toFixed(6)
        this.commentNum = this.chartData.comment_num;
        
        this.itemId = this.chartData.dad_id;
        this.coverUrl = 'http://localhost:8000/media/img/'+ this.itemId + '.jpg';

        this.starsCnt = JSON.parse(this.chartData.stars_cnt);
        this.starsCntChart();

        this.sentiNum = JSON.parse(this.chartData.senti_num);
        this.sentiNumChart();

        this.sentiRateChart();

        this.sentiPerYear = JSON.parse(this.chartData.senti_per_year);
        this.sentiPerYearChart();

        this.sentiSumYear = JSON.parse(this.chartData.senti_sum_year);
        this.sentiSumYearChart();

        this.sentiScoreMap = JSON.parse(this.chartData.senti_score_map);
        this.sentiScoreMapChart();

        this.wordCloud = JSON.parse(this.chartData.word_cloud);
        this.wordCloudChart();
      });
    },
    getMovieDetail(movieId) {
      axios.get('douban/movie/', {
        params: {
          search: movieId
        }
      }).then(res => {
        this.itemData = res.data.results[0];
      })
    },
    getBookDetail(bookId) {
      axios.get('douban/book/', {
        params: {
          search: bookId
        }
      }).then(res => {
        this.itemData = res.data.results[0];
      })
    },
    toDetail() {
      if (this.chartData.dad_type == 1) {
        this.$router.push({
          path: '/movie/detail/',
          query: {
            movie_id: this.chartData.dad_id
          }
        });
      } else if (this.chartData.dad_type == 2) {
        this.$router.push({
          path: '/book/detail/',
          query: {
            book_id: this.chartData.dad_id
          }
        });
      }
    }

  },
  mounted() {
    this.analysisId = this.$route.query.analysis_id;
    this.getAnalysisDetail(this.analysisId);
  }

}

</script>
<style type="text/css">
  .form-group {
    margin: 0;
  }

  .analysis-btn {
    float: right;
    margin-right: 15px;
    line-height: 16px;
    max-width: 120px;
  }


</style>
