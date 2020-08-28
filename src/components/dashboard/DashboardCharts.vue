<template>
  <div class="row">
    <div class="flex xl7 md7 xs8">
      <va-card
        class="chart-widget"
        :title="$t('Historical Pulse Data')"
      >
        <div id="myChart" :style="{width: '900px', height: '400px'}"></div>
      </va-card>
    </div>
    <div class="flex xl5 md5 xs4">
      <va-card
        class="chart-widget justify-content-around"
        :title="$t('Pie Chart - Daily activity')"
      >
        <div id="pieChart" class="justify-content-around" :style="{width: '700px', height: '400px'}"></div>
      </va-card>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// import { store } from './store'
// import qs from 'qs'
let myChart = null
let pieChart = null
export default {
  name: 'echarts',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      line: {},
      loop: null,
      chart_data: {},
      info: '某图',
    }
  },
  mounted () {
    this.chartInit()
    this.pieChartInit()
    this.getData()
  },
  methods: {
    chartInit () {
      myChart = echarts.init(document.getElementById('myChart'), null, {
        renderer: 'canvas',
      })
    },
    pieChartInit () {
      pieChart = echarts.init(document.getElementById('pieChart'), null, {
        renderer: 'canvas',
      })
    },
    drawLine (data) {
      const xdata = []
      const ydata = []
      for (const item of data[3]) {
        xdata.push(item.time)
        ydata.push(item.pulse)
      }
      console.log(data)
      pieChart.setOption({
        color: [this.$themes.primary, this.$themes.info, this.$themes.danger],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          fontSize: 30,
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['Sitting', 'Standing', 'Laying', 'TV', 'Exercise', 'Sleeping', '百度', '谷歌', '必应', '其他'],
        },
        series: [
          {
            name: 'Activity',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '50%'],
            label: {
              fontSize: 15,
              position: 'inner',
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: 'Sitting' },
              { value: 679, name: 'Standing' },
              { value: 1548, name: 'Laying' },
            ],
          },
          {
            color: [this.$themes.dark, this.$themes.gray, this.$themes.success],
            name: 'Data cluster',
            type: 'pie',
            radius: ['65%', '100%'],
            label: {
              show: false,
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#ec5800',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              shadowBlur: 3,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center',
                },
                abg: {
                  backgroundColor: '#333',
                  width: '100%',
                  align: 'right',
                  height: 22,
                  borderRadius: [4, 4, 0, 0],
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: [
              { value: 60, name: 'TV' },
              { value: 50, name: 'Exercise' },
              { value: 30, name: 'Sleeping' },
            ],
          },
        ],
      })
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          offset: 20,
          data: xdata,
        },
        yAxis: {
          scale: true,
          splitLine: {
            show: false,
          },
        },
        dataZoom: [{
          startValue: 'Sun, 12 Jul 2020 03:02:43 GMTT',
        }, {
          type: 'slider',
        }],
        visualMap: {
          top: 10,
          right: 5,
          pieces: [{
            gt: 55,
            lte: 65,
            color: this.$themes.primary,
          }, {
            gt: 65,
            lte: 70,
            color: this.$themes.success,
          }, {
            gt: 70,
            lte: 85,
            color: this.$themes.warning,
          }, {
            gt: 85,
            lte: 110,
            color: '#FF0900',
          }, {
            gt: 110,
            color: '#F8706D',
          }],
          outOfRange: {
            color: '#999',
          },
        },
        series: {
          areaStyle: {
            normal: {
              color: '#fff',
            },
          },
          name: 'Pulse',
          type: 'line',
          data: ydata,
          markLine: {
            silent: true,
            data: [{
              yAxis: 50,
            }, {
              yAxis: 65,
            }, {
              yAxis: 70,
            }, {
              yAxis: 120,
            }],
          },
        },
      })
    },

    getData () {
      this.axios.get('/js/1.json', {})
      // this.axios.get('/js/1.json', {})
        .then(ress => {
          this.chart_data = ress.data
          console.log(this.chart_data)
          this.drawLine(this.chart_data)
        })
    },
  },
}
</script>

<style>
.my-chart {
  width: 800px;
  height: 500px;
}
</style>
