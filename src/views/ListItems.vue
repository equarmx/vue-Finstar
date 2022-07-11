<template>
  <div class="wrapper mt-20 mx-15">
    <div class="flex flex-col justify-start items-center">
      <Button
        class="text-white bg-black hover:bg-black/80"
        @getData="getData"
        :variant="variantBtn"
      >
        Получить данные
      </Button>
      <div
        class="wrapper__status"
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
        <transition-group name="list" class="wrapper__list mt-10">
          <UserCard v-for="(item, index) in $store.state.listUsers" :key="index" :item="item" />
        </transition-group>
      </template>
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

@Component({
  components: { Notification, Loader, UserCard, Button },
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
  transition: all 2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
