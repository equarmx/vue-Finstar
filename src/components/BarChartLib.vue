<template>
  <div class="chart-container" style="position: relative; width: 70%">
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/services/businessList";

@Component({
  name: "BarChartLib",
  components: { Bar },
})
export default class BarChartLib extends Vue {
  @Prop({ type: String, default: "bar-chart" }) readonly chartId: string | undefined;
  @Prop({ type: String, default: "label" }) readonly datasetIdKey: string | undefined;
  @Prop({ type: Number, default: 400 }) readonly width: number | undefined;
  @Prop({ type: Number, default: 400 }) readonly height: number | undefined;
  @Prop({ type: String, default: "" }) readonly cssClasses: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ type: Object, default: () => {} }) readonly styles: Record<string, unknown> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ type: Object, default: () => {} }) readonly plugins: Record<string, unknown> | undefined;
  @Prop({ type: Array, default: [] }) readonly items: Array<User> | undefined;

  chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  get sortedItems(): Array<User> {
    return this.items?.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    });
  }

  get getLabels(): Array<string> {
    return this.sortedItems?.map((elem) => {
      return `User ${elem.id}`;
    });
  }

  get getTrue(): Array<number> {
    return this.sortedItems?.map((elem) => {
      return elem.countTrue;
    });
  }

  get getFalse(): Array<number> {
    return this.sortedItems?.map((elem) => {
      return elem.countFalse;
    });
  }

  get getTotal(): Array<number> {
    return this.sortedItems?.map((elem) => {
      return elem.countCompleted;
    });
  }

  get chartData(): Record<string, unknown> {
    return {
      labels: this.getLabels,
      datasets: [
        {
          label: "Всего",
          data: this.getTotal,
          borderWidth: 1,
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Completed = true",
          data: this.getTrue,
          borderWidth: 1,
          backgroundColor: "rgba(54, 162, 235, 1)",
        },
        {
          label: "Completed = false",
          data: this.getFalse,
          borderWidth: 1,
          backgroundColor: "rgba(255, 206, 86, 1)",
        },
      ],
    };
  }
}
</script>

<style lang="scss" scoped></style>
