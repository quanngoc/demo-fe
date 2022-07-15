<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div style="margin-top: 10px">
          <v-chart class="chart" :option="chartOptionsPie"/>
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div style="margin-top: 10px">
          <v-chart class="chart" :option="chartOptionsBar"/>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {BarChart, LineChart, PieChart} from 'echarts/charts';
import {LegendComponent, TitleComponent, TooltipComponent,} from 'echarts/components';
import VChart from 'vue-echarts';
import {Component, Vue} from "vue-property-decorator";
import UserService from "@/services/user-service";
import 'echarts/lib/component/grid';

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

@Component({
  components: {
    VChart
  }
})

@Component
export default class Chart extends Vue {
  private content = [];
  data = [
    {value: 'youngAdult', name: 'Thanh niên'},
    {value: 'middleAged', name: 'Trung tuổi'},
    {value: 'old', name: 'Già'},
    {value: 'unknown', name: 'Không xác định'},
  ];

  chartOptionsPie = {
    title: {
      text: 'Độ tuổi người dùng',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ["Thanh niên", "Trung tuổi", "Già", "Không xác định"],
    },
    series: [
      {
        name: 'Độ tuổi người dùng',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 1, name: 'Thanh niên'},
          {value: 1, name: 'Trung tuổi'},
          {value: 1, name: 'Già'},
          {value: 1, name: 'Không xác định'},
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  chartOptionsBar = {
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      data: ["Thanh niên", "Trung tuổi", "Già", "Không xác định"],
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        type: "bar",
        data: [63, 75, 24, 92]
      }
    ],
    title: {
      text: "Độ tuổi người dùng",
      x: "center",
      textStyle: {
        fontSize: 24
      }
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  }

  mounted() {
    this.chartAge();
  }

  populateData(content: any) {
    this.data.map(cur => {
      cur.value = content[`${cur.value}`];
    });
    this.chartOptionsPie.series[0].data = this.data;

    const resultArr: any = [];
    this.data.forEach(function (cur, i, arr) {
      resultArr.push(cur.value);
    });
    this.chartOptionsBar.series[0].data = resultArr;
  }

  chartAge() {
    UserService.chartAge().then(
        (response) => {
          this.content = response.data;
          this.populateData(response.data);
        },
        (error) => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$notify.error({
            title: 'Error',
            message: error.response.data.message
          });
        }
    );
  }
};

</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
