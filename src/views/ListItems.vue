<template>
  <div class="wrapper mx-15">
    <div class="wrapper__container">
      <div class="flex flex-col justify-start items-center" style="height: 100%">
        <Button
          class="text-white bg-black hover:bg-black/80"
          @clickEvent="getData"
          :variant="variantBtn"
        >
          Получить данные
        </Button>
        <div
          class="wrapper__container__status"
          v-if="$store.state.loadingList || !$store.state.listUsers.length"
        >
          <template v-if="$store.state.loadingList">
            <Loader />
          </template>
          <template v-else>
            <Notification />
          </template>
        </div>
        <template v-else>
          <transition-group name="list" class="wrapper__container__list mt-10">
            <UserCard
              v-for="(item, index) in $store.state.listUsers"
              :key="index + 1"
              :item="item"
            />
          </transition-group>
          <h3 class="text-3xl font-normal leading-normal mt-0 mb-2 text-black-600">
            Гистограмма с помощью canvas
          </h3>
          <BarChart :items="$store.state.listUsers" />
          <!-- <h3 class="text-3xl font-normal leading-normal mt-0 mb-2 text-black-600">-->
          <!-- Гистограмма с помощью библиотеки Chart.js-->
          <!-- </h3>-->
          <!-- <BarChartLib :items="$store.state.listUsers" />-->
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import UserCard from "@/components/UserCard.vue";
import Loader from "@/components/Loader.vue";
import Notification from "@/components/Notification.vue";
import { getUserInfo } from "@/services/businessList";
import BarChart from "@/components/BarChart.vue";
import BarChartLib from "@/components/BarChartLib.vue";

@Component({
  components: { BarChartLib, BarChart, Notification, Loader, UserCard, Button },
})
export default class ListItems extends Vue {
  async getData(): Promise<void> {
    const todos = await this.$store.dispatch("getListTodos");
    const result = getUserInfo(todos);
    this.$store.commit("changeListUsers", result);
    console.log(this.$store.state.listUsers);
  }
  get variantBtn(): string {
    return this.$store.state.notification.show ? "danger" : "primary";
  }
  get isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/list";

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in-out;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
