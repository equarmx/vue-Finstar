<template>
  <canvas id="myCanvas" ref="myCanvas" style="width: 70%"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/services/businessList";
import BarChartService from "@/services/barChart";

class Data {
  canvas: HTMLCanvasElement;
  data: Array<User>;
  color: string;
  barWidth: number;
  gridLineIncrement: number;
  maxValue: number;
  minValue: number;
  font: string;
  axisColor: string;
  gridColor: string;
  padding: number;
  context: CanvasRenderingContext2D | null;
  range: number;
  numGridLines: number;
  longestValueWidth: number;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(config) {
    const { canvas, data, color, barWidth, gridLineIncrement, maxValue, minValue, context } =
      config;
    this.canvas = canvas;
    this.data = data;
    this.color = color;
    this.barWidth = barWidth;
    this.gridLineIncrement = gridLineIncrement;

    this.maxValue = maxValue - Math.floor(maxValue % this.gridLineIncrement);
    this.minValue = minValue;

    // constants
    this.font = "12pt";
    this.axisColor = "#555";
    this.gridColor = "black";
    this.padding = 10;

    // relationships
    this.context = context;
    this.range = this.maxValue - this.minValue;
    this.numGridLines = parseInt(Math.round(this.range / this.gridLineIncrement));
    this.longestValueWidth = BarChartService.getLongestValueWidth(
      this.numGridLines,
      this.maxValue,
      this.gridLineIncrement,
      this.context
    );
    this.x = this.padding + this.longestValueWidth;
    this.y = this.padding * 2;
    this.width = this.canvas.width - (this.longestValueWidth + this.padding * 2);
    this.height =
      this.canvas.height -
      (BarChartService.getLabelAreaHeight(this.data, this.context) + this.padding * 4);
  }
}

@Component({
  name: "BarChart",
})
export default class BarChart extends Vue {
  @Prop({ type: Array, default: [] }) readonly items: Array<User> | undefined;

  mounted(): void {
    // this.draw();
    this.createBarChart();
  }

  colors = [
    "#FFBCD9",
    "#A9B2C3",
    "#FFA6C9",
    "#CD607E",
    "#8F00FF",
    "#915C83",
    "#9F2B68",
    "#E45959",
    "#E4AC59",
    "#5999E4",
    "#56D953",
  ];

  get sortedItems(): Array<User> {
    return this.items?.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    });
  }

  get getCanvas(): HTMLCanvasElement {
    return this.$refs.myCanvas as HTMLCanvasElement;
  }

  get maxValue(): number {
    return Math.max.apply(
      null,
      this.sortedItems.map((elem) => elem.countCompleted)
    );
  }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  createBarChart(): void {
    console.log(this.getRandomColor());
    const data = new Data({
      canvas: this.getCanvas,
      data: this.sortedItems,
      color: this.getRandomColor(),
      barWidth: 10,
      gridLineIncrement: 5,
      minValue: 0,
      maxValue: this.maxValue,
      context: this.getCanvas.getContext("2d"),
    });
    console.log(data);
    // draw bar chart
    this.drawGridlines(data);
    this.drawYAxis(data);
    this.drawXAxis(data);
    this.drawBars(data);
    this.drawYValues(data);
    this.drawXLabels(data);
  }

  drawXLabels(data: Data): void {
    let context = data.context;
    context.save();
    let arrayItems = data.data;
    let barSpacing = data.width / arrayItems.length;

    for (let n = 0; n < arrayItems.length; n++) {
      let label = `Пользователь ${arrayItems[n].id}`;
      context.save();
      context.translate(data.x + (n + 1 / 2) * barSpacing, data.y + data.height + 10);
      context.rotate((-1 * Math.PI) / 4); // rotate 45 degrees
      context.font = data.font;
      context.fillStyle = "black";
      context.textAlign = "right";
      context.textBaseline = "middle";
      context.fillText(label, 0, 0);
      context.restore();
    }
    context.restore();
  }

  drawYValues(data: Data): void {
    let context = data.context;
    context.save();
    context.font = data.font;
    context.fillStyle = "black";
    context.textAlign = "right";
    context.textBaseline = "middle";

    for (let n = 0; n <= data.numGridLines; n++) {
      let value = "" + data.maxValue - n * data.gridLineIncrement;
      let thisY = (n * data.height) / data.numGridLines + data.y;
      context.fillText(value, data.x - 5, thisY);
    }

    context.restore();
  }

  drawBars(data: Data): void {
    let context = data.context;
    context.save();
    let arrayItems = data.data;
    let barSpacing = data.width / arrayItems.length;
    let unitHeight = data.height / data.range;

    for (let n = 0; n < arrayItems.length; n++) {
      // let bar = arrayItems[n];
      let barHeight = (arrayItems[n].countTrue - data.minValue) * unitHeight;

      if (barHeight > 0) {
        context.save();
        context.translate(
          Math.round(data.x + (n + 1 / 2) * barSpacing),
          Math.round(data.y + data.height)
        );

        context.scale(1, -1);

        context.beginPath();
        context.rect(-data.barWidth / 2, 0, data.barWidth, barHeight);
        context.fillStyle = this.getRandomColor();
        context.fill();
        context.beginPath();
        context.rect(-data.barWidth / 2, barHeight, data.barWidth, barHeight);
        context.fillStyle = this.getRandomColor();
        context.fill();
        context.restore();
      }
    }
    context.restore();
  }

  drawGridlines(data: Data): void {
    let context = data.context;
    context.save();
    context.strokeStyle = data.gridColor;
    context.lineWidth = 2;

    // draw y axis grid lines
    for (let n = 0; n < data.numGridLines; n++) {
      let y = (n * data.height) / data.numGridLines + data.y;
      context.beginPath();
      context.moveTo(data.x, y);
      context.lineTo(data.x + data.width, y);
      context.stroke();
    }
    context.restore();
  }

  drawXAxis(data: Data): void {
    let context = data.context;
    context.save();
    context.beginPath();
    context.moveTo(data.x, data.y + data.height);
    context.lineTo(data.x + data.width, data.y + data.height);
    context.strokeStyle = data.axisColor;
    context.lineWidth = 2;
    context.stroke();
    context.restore();
  }

  drawYAxis(data: Data): void {
    let context = data.context;
    context.save();
    context.beginPath();
    context.moveTo(data.x, data.y);
    context.lineTo(data.x, data.height + data.y);
    context.strokeStyle = data.axisColor;
    context.lineWidth = 2;
    context.stroke();
    context.restore();
  }

  reset(): void {
    // Clearing the Canvas
    let canvas = this.$refs.myCanvas as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    window.location.reload();
  }
  draw(): void {
    const canvas = this.$refs.myCanvas as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    let width = 25; // bar width
    let X = 10; // first bar position

    if (!ctx) return;

    const arr = this.items?.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    });
    // Filling the Rectangle based on the input values
    arr?.forEach((elem) => {
      ctx.fillStyle = this.getRandomColor();
      let h = elem.countCompleted;
      ctx.fillRect(X, canvas.height - h, width, h);
      X += width + 45;
      // Text to display Bar number
      ctx.fillStyle = "#4da6ff";
      ctx.fillText("" + elem.id, X - 50, canvas.height - h - 10);
    });
    // Text to display scale

    ctx.fillStyle = "#000000";
    ctx.fillText("Scale X : " + canvas.width + " Y : " + canvas.height, 800, 10);
  }
}
</script>

<style scoped></style>
