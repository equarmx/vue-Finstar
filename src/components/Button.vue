<template>
  <button
    :type="type"
    :disabled="disableButton"
    :class="[btnClass, colorVariants]"
    :variant="variant"
    :variant-type="variantType"
    :size="size"
    @click="onClick()"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Button",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
    },
    variantType: {
      type: String,
      default: "normal",
    },
    size: {
      type: String,
      default: "normal",
    },
    rounded: {
      type: String,
      default: "medium",
    },
    type: {
      type: String,
      default: "",
    },
    to: {
      type: String,
    },
  },
  data: () => ({
    loading: false,
    disableButton: false,
  }),
  watch: {
    "disabled": {
      handler(v) {
        this.disableButton = v;
      },
    },
  },
  computed: {
    btnClass() {
      return {
        "base-spinner": this.loading,
        "cursor-not-allowed": this.disableButton,
        "base-button inline-flex align-middle align-items-center justify-center font-medium focus:outline-none border-2": true,

        "rounded-lg": this.rounded === "medium",
        "rounded-full": this.rounded === "large",

        "px-6 py-3": this.size == "normal",
        "px-4 py-2": this.size == "small",
      };
    },
    colorVariants() {
      switch (this.variant) {
        case "primary":
          switch (this.variantType) {
            case "normal":
              switch (this.disableButton) {
                case true:
                  return "border-blue-300 bg-blue-300 text-white";
                default:
                  break;
              }
              return "border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white";
          }
          break;
        case "danger":
          switch (this.variantType) {
            case "normal":
              switch (this.disableButton) {
                case true:
                  return "border-red-300 bg-red-300 text-white";
                default:
                  break;
              }
              return "border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white";
            default:
              break;
          }
          break;

        case "warning":
          switch (this.variantType) {
            case "normal":
              return "border-orange-600 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white";
            default:
              break;
          }
          break;

        case "success":
          switch (this.variantType) {
            case "normal":
              switch (this.disableButton) {
                case true:
                  return "border-green-300 bg-green-300 text-white";
                default:
                  break;
              }
              return "border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white";
            default:
              break;
          }
          break;

        default:
          break;
      }
    },
  },
  methods: {
    startLoading() {
      this.loading = true;
      this.disableButton = true;
    },
    stopLoading() {
      this.loading = false;
      this.disableButton = false;
    },
    onClick(): void {
      this.$emit("getData");
      this.startLoading();
    },
  },
})
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.base-button + .base-button {
  margin-left: 1em;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
}

.base-spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  top: 0;
  left: 0;
}

.base-spinner:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: inherit;
  animation: spinner 0.6s linear infinite;
  z-index: 2;
}
</style>
