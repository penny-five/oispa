<template>
  <header>
    <div class="wrapper">
      <img class="logo" src="../../assets/logo.png"></img>
      <h1>{{ i18n('app_title' )}}</h1>
      <div class="slot">
        <slot></slot>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  width: 100%;
  height: $header-height;

  background-color: $color-background-dark;

  .wrapper {
    position: relative;

    margin: auto;
    padding: $baseline;

    width: 100%;
    max-width: $content-max-width;

    text-align: center;
  }

  h1 {
    display: inline-block;
    margin: 0;

    vertical-align: top;

    font-size: 2.8rem;
    font-weight: $font-weight-bold;
    letter-spacing: 6px;
    line-height: $logo-height;

    text-transform: uppercase;

    color: $color-text-light;
  }

  .logo {
    display: inline-block;
    max-height: $logo-height;
    margin-right: 2*$baseline;
  }

  .slot {
    position: absolute;
    top: 0; right: 0;
  }
}


</style>
