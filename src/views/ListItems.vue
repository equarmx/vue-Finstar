<template>
  <div class="wrapper mt-20">
    <div class="flex justify-center items-start h-screen">
      <Button
        :isLoading="isSubmitting"
        class="text-white bg-black hover:bg-black/80"
        @getData="getData"
        variant="danger"
      >
        Получить данные
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";

@Component({
  components: { Button },
  data: () => ({
    isSubmitting: false,
  }),
  methods: {
    getData(): void {
      console.log("test");
      this.isSubmitting = !this.isSubmitting;
    },
  },
})
export default class Home extends Vue {}
</script>
