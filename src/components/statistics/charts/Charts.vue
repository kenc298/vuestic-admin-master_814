<template>
  <div class="row">
    <div class="flex xl12 markup-tables">
      <va-card :title="$t('tables.stripedHoverable')">
        <table class="va-table va-table--striped va-table--hoverable">
          <thead>
            <tr>
              <th>Name</th>
              <th>GWID</th>
              <th>devID</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.country }}</td>
              <td>
                <va-badge :color="getStatusColor(user.status)">
                  {{ user.status }}
                </va-badge>
              </td>
            </tr>
          </tbody>
        </table>
      </va-card>
    </div>
    <div class="flex xl12 md12 xs8">
      <va-card
        class="chart-widget"
        :title="$t('Scattered-TV and sit/stand ratio')"
      >
        <div id="myChart" :style="{width: '900px', height: '400px'}"></div>
      </va-card>
      <div class="row">
        <div class="flex xs12">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import echarts from 'echarts'
import table from './Table'
import data from './data.json'

let myChart = null
export default {
  name: 'echarts',
  data () {
    return {
      users: data.slice(0, 8),
      msg: 'Welcome to Your Vue.js App',
      line: {},
      loop: null,
      chart_data: {},
      info: '某图',
    }
  },
  mounted () {
    this.chartInit()
    this.getData()
  },

  methods: {
    getStatusColor (status) {
      if (status === 'paid') {
        return 'success'
      }

      if (status === 'processing') {
        return 'info'
      }

      return 'danger'
    },

    chartInit () {
      myChart = echarts.init(document.getElementById('myChart'), null, {
        renderer: 'canvas',
      })
    },
    drawLine (data) {
      const xdata1 = []
      const devid1 = []
      // const cluster1 = []
      const xdata2 = []
      const devid2 = []
      const xdata3 = []
      const devid3 = []
      for (const item of data.data) {
        if (item.label === '0') {
          xdata1.push([item.totalcalory, item.totalsteps, item.gwid])
          devid1.push(item.gwid)
        // cluster.push(item.label)
        } else if (item.label === '1') {
          xdata2.push([item.totalcalory, item.totalsteps, item.gwid])
          devid2.push(item.gwid)
        } else {
          xdata3.push([item.totalcalory, item.totalsteps, item.gwid])
          devid3.push(item.gwid)
        }
      }
      console.log(xdata1)
      console.log(xdata2)
      console.log(xdata3)
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          // formatter: '::{c}'
          formatter: function (data) {
            // const tmp = []
            // for (const item of data) {
            //   tmp.push(item[2])
            // }
            // console.log(data)
            return 'devID: ' + data.data[2]
          },
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['Cluster1', 'Cluster2', 'Cluster3'],
          left: 'center',
        },
        xAxis: {
          scale: true,
          axisLabel: {
            show: true,
            interval: 'auto',
          },
        },
        yAxis: {
          scale: true,
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            areaStyle: {
              normal: {
                color: '#fff',
              },
            },
            name: 'DevID',
            type: 'scatter',
            data: xdata1,
            color: 'orange',
          },
          {
            name: 'DevID',
            type: 'scatter',
            data: xdata2,
            color: 'blue',
          },
          {
            name: 'DevID',
            type: 'scatter',
            data: xdata3,
            color: 'green',
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
            },
          },
        ],
      })
    },

    getData () {
      this.axios.get('http://192.168.10.52:5000/api/getcluster', {
        // user_id: '742b62cdef85',
      })
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
