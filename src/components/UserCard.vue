<template>
  <div class="card_wrapper flex flex-col justify-start items-start p-3 mx-4">
    <div class="card_wrapper__header">
      <span class="card_wrapper__header__username">User 1</span>
      <div class="card_wrapper__header__count">
        <span class="card_wrapper__header__count__true Green-500">14</span>
        <span>/</span>
        <span class="card_wrapper__header__count__false">8</span>
      </div>
    </div>
    <ul class="card_wrapper__content">
      <li class="card_wrapper__content__todo">
        Необязательно: доступ к странице c данными todos разрешить только по токену, для этого
        добавить страницу с авторизацией
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Todos } from "@/services/request";

@Component({
  name: "UserCard",
})
export default class UserCard extends Vue {
  @Prop({ type: Todos, default: {} }) readonly item: Todos | undefined;
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/userCard";
</style>
