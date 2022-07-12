import Vue from "vue";

export default class Logging {
  static checkCookie(): boolean {
    console.log(Vue.$cookies.get("accessToken"));
    return Vue.$cookies.get("accessToken") !== null;
  }
  static generateToken(): string {
    let a = "";
    for (let b = 36; a.length < 40; ) {
      a += ((Math.random() * b) | 0).toString(b);
    }
    return a;
  }
}
