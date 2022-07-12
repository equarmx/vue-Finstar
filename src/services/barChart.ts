import { User } from "@/services/businessList";

export default class BarChartService {
  static getLongestValueWidth(
    numGridLines: number,
    maxValue: number,
    gridLineIncrement: number,
    context: CanvasRenderingContext2D
  ): number {
    let longestValueWidth = 0;
    for (let n = 0; n <= numGridLines; n++) {
      const value = "" + (maxValue - n * gridLineIncrement);
      longestValueWidth = Math.max(longestValueWidth, context.measureText(value).width);
    }
    return longestValueWidth;
  }
  static getLabelAreaHeight(data: Array<User>, context: CanvasRenderingContext2D): number {
    let maxLabelWidth = 0;
    console.log(data);
    for (let n = 0; n < data.length; n++) {
      const label = `Пользователь ${data[n].id}`;
      maxLabelWidth = Math.max(maxLabelWidth, context.measureText(label).width);
    }
    return Math.round(maxLabelWidth / Math.sqrt(2));
  }
}
