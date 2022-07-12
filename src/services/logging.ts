import Vue from "vue";
import axios from "axios";

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
  static setToken(token: string): void {
    Vue.$cookies.set("accessToken", token, 60 * 60 * 12);
    if (Vue.$cookies.get("accessToken") !== null) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${Vue.$cookies.get("accessToken")}`;
    }
  }
}
