<template>
    <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
@import '~/assets/scss/variables.scss';
@import "~/assets/scss/generalSettings";

.sk-circle {
  position: relative;
  width: 100%;
  height: 100%;
}
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle .sk-child:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: $highlight-color-primary;
    border-radius: 100%;
    -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.sk-circle .sk-circle2 {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg); 

    &:before {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
}
.sk-circle .sk-circle3 {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);

    &:before {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }
}
.sk-circle .sk-circle4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);

    &:before {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
}
.sk-circle .sk-circle5 {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);

    &:before {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
}
.sk-circle .sk-circle6 {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);

    &:before {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
    }
}
.sk-circle .sk-circle7 {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);

    &:before {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
    }
}
.sk-circle .sk-circle8 {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);

    &:before {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s;
    }
}
.sk-circle .sk-circle9 {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);

    &:before {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s;
    }
}
.sk-circle .sk-circle10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);

    &:before {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s;
    }
}
.sk-circle .sk-circle11 {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);

    &:before {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s;
    }
}
.sk-circle .sk-circle12 {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);

    &:before {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s;
    }
}

@-webkit-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    } 
    40% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    } 40% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>