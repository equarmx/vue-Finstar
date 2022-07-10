<template>
  <div class="wrapper mt-20">
    <div class="flex justify-center items-start h-screen">
      <Button
        class="text-white bg-black hover:bg-black/80"
        @getData="getData"
        :variant="variantBtn"
      >
        Получить данные
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { getTodos } from "@/services/request";

@Component({
  components: { Button },
})
export default class ListItems extends Vue {
  async getData(): Promise<void> {
    const todos = await getTodos();
    console.log(todos);
  }
  get variantBtn(): string {
    return this.$store.state.notification.show ? "danger" : "primary";
  }
}
</script>
