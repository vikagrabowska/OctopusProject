<!-- App.vue -->
<script setup>
import Head_panel from './components/Head_panel.vue'
import Row from './components/Row.vue'
import eksportJSON from './components/EksportJSON.vue'
import HardWrapComponent from './components/HW.vue'
import DashboardComponent from './components/DashboardComponent.vue'

// ICONS
import IconEye from './components/icons/Icon-M-Eye.vue'
// import IconEyeOff from './components/icons/Icon-M-Eye-off.vue'
import IconHelp from './components/icons/Icon-M-Help.vue'
import IconLayer from './components/icons/Icon-M-Layers.vue'
import IconTune from './components/icons/Icon-M-Tune.vue'
import IconAdd from './components/icons/Icon-M-Add.vue'
import IconMinus from './components/icons/Icon-M-Minus.vue'
</script>

<template>
  <DashboardComponent v-if="isDashboardVisible" @show-dashboard="showDashboard" />

  <header>
    <!-- Buttons in nav -->
    <Head_panel />
    <!-- A momentary runtime component that can run in the Head_panel component -->
    <eksportJSON />
  </header>

  <section id="body-section">
    <!-- Temporary "HardWrap", to transfer its functionality to a button in the Head_panel -->
    <div id="testHW">
      <HardWrapComponent />
    </div>

    <!-- Text bodies, columns and rows -->
    <Row
      v-for="rowIndex in parseInt(rowsCount)"
      :key="rowIndex"
      :columnsCount="parseInt(columnsCount)"
      :rowIndex="rowIndex"
    />
  </section>

  <footer>
    <div class="wrapper">
      <!-- For hide panels, the button will leave only a text body -->
      <div class="iconContent">
        <IconEye />
      </div>
      <!-- What is Octopus? -->
      <div class="iconContent">
        <IconHelp />
      </div>
      <!-- Window with layers - axis VF -->
      <div class="iconContent">
        <IconLayer />
      </div>
      <!-- Dashboard panel -->
      <!-- This window will show the settings of all columns in the form of a summary table -->
      <div class="iconContent">
        <IconTune @click="handleBtnFooterClick" />
      </div>
      <!-- Inputs to set the number of columns and rows -->
      <div id="column-menager" class="border-wrap">
        <div class="elementFooter-wrapper">
          <label>Rows</label>
          <div class="IconsGap-wrapper">
            <button class="RC-btn-footer" @click="decrementRows"><IconMinus /></button>
            <button class="RC-btn-footer" @click="incrementRows"><IconAdd /></button>
          </div>
        </div>

        <div class="elementFooter-wrapper">
          <label>Columns</label>
          <div class="IconsGap-wrapper">
            <button class="RC-btn-footer" @click="decrementColumns"><IconMinus /></button>
            <button class="RC-btn-footer" @click="incrementColumns"><IconAdd /></button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      minCount: 1,
      maxCount: 10,
      rowsCount: 2,
      columnsCount: 2,

      // Dashboard component
      isDashboardVisible: false
    }
  },
  components: {
    HardWrapComponent,
    DashboardComponent,
    Row
  },
  methods: {
    incrementRows() {
      if (this.rowsCount < this.maxCount) {
        this.rowsCount++
      }
    },
    decrementRows() {
      if (this.rowsCount > this.minCount) {
        this.rowsCount--
      }
    },
    incrementColumns() {
      if (this.columnsCount < this.maxCount) {
        this.columnsCount++
      }
    },
    decrementColumns() {
      if (this.columnsCount > this.minCount) {
        this.columnsCount--
      }
    },
    handleBtnFooterClick() {
      // Toggle the state between true and false
      this.isDashboardVisible = !this.isDashboardVisible
    },
    showDashboard() {
      // Logic related to displaying the DASHBOARD
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/main.scss';

$header-padding: 10px;
$header-gap: 10px;

$header-height: calc(41px + ($header-padding * 2));

$footer-btn-size: 24px;
$footer-height: calc($footer-btn-size + ($header-padding * 2)); // #

#testHW {
  position: fixed;
  top: 0;
  right: 0;

  padding: 10px;
  border: 1px solid $Akcent-basic;
  border-radius: $MAIN-radius-small;

  background-color: $Black-op_07;
  &::before {
    content: 'PRIORYTET';
    @include Font-Mono;
    font-weight: 900;
    color: $Color-red;
  }
}

// * HEADER *
header {
  width: calc(100dvw - ($header-padding * 2));
  height: auto;

  // y x
  padding: $header-padding $header-padding;
  background-color: $MAIN-White-op;

  border-bottom: 1px solid $MAIN-Black-op;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;

  gap: $header-gap;
}

// *  *
// * BODY *

$body-section-padding: 10px;

#body-section {
  width: calc(100dvw - ($body-section-padding * 2));
  padding: $body-section-padding;
  flex: 1;
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(0, auto));
  /* Zmiana minmax na auto */
  // background-color: #626262;
  gap: 10px;

  .row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    align-items: stretch;
    // background-color: yellow;
    gap: 10px;

    .element {
      width: 100%;
      // Adjust width based on the number of elements (3 elements in one row)
      height: 100%;
      background-color: rgb(228, 161, 161);
    }
  }
}

// *  *
// * FOOTER *

footer {
  width: calc(100dvw - ($header-padding * 2));
  padding: $header-padding $header-padding;

  background-color: $MAIN-White-op;
  border-top: 1px solid $MAIN-Black-op;

  display: flex;
  justify-content: space-between;
  z-index: 999;

  .border-wrap {
    border-left: 1px solid $Black-op-30;
    padding: 0 20px;
    gap: 20px;
  }

  #column-menager {
    height: 100%;

    // background-color: yellow;

    display: flex;
    align-items: center;

    label {
      @include Font-small;
    }

    input {
      width: 20px;
      height: fit-content;
      @include Font-Imput;
    }

    [type='text'] {
      background: none;
      border: none;
      outline: none;
      counter-reset: none;
      padding: 0 5px;

      &:focus {
        border: none;
        border-width: 0;
        box-shadow: none;
        outline: none;
      }
    }
  }

  .wrapper {
    display: flex;
    gap: 10px;
    align-items: center;

    .btn-footer {
      width: $footer-btn-size;
      height: $footer-btn-size;
      display: block;
      background-color: $MAIN-Gray-15;
      align-items: center;
    }

    span {
      @include Font-small;
    }
  }
  .elementFooter-wrapper {
    display: flex;
    gap: 10px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    .IconsGap-wrapper {
      display: flex;
      gap: 10px;
      .RC-btn-footer {
        width: auto;
        height: auto;
        display: flex;
        outline: none;
        border: none;
        margin: 0;
        padding: 4px;

        background-color: $Black-op_04;
        border: 1px solid $Black-op_07;
        border-radius: $MAIN-radius-small;

        &:hover {
          background-color: $Black-op_14;
        }
        @include activeBtn;
      }
    }
  }
}
</style>
../public/test
