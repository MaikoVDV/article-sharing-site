<template>
<div>
    <div class="dark-overlay" v-if="modal.active" v-on:click="function() { removeModal() }" />
    <div class="modal" v-if="modal.active" :class="(modal.active) ? 'animated' : ''">
        <p class="modal-title">{{modal.modalData.title}}</p>
        <p class="modal-desc">{{modal.modalData.description}}</p>
        <div class="options-text-input">
            <TextInput v-for="(option, index) in inputOptions" :key="index" :placeholder="option.text" :ref="`TextInput${index}`" />
        </div>
        <div class="options-buttons">
            <Button v-for="(option, index) in buttonOptions" :key="index" :text="option.text" :type="option.type" :onClick="option.action" />
        </div>
    </div>
</div>
</template>
<script>
import modalMixin from "~/mixins/modal.js"
import TextInput from "./TextInput.vue"
export default {
    mixins: [modalMixin],
    computed: {
        modal() {
            return this.$store.state.modal;
        },
        inputOptions() {
            return this.$store.state.modal.modalData.options.filter(option => option.type == "TextInput")
        },
        buttonOptions() {
            return this.$store.state.modal.modalData.options.filter(option => option.type != "TextInput")
        }
    },
    components: { TextInput }
}
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/generalSettings.scss";
    .modal {
        // Positioning
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        z-index: 10000;

        // Styling
        width: 30vw;
        background: $modal-background-color;
        padding: $modal-padding;
        border-radius: $modal-border-radius;
        box-shadow: 0px 0px 25px 0.4rem #00000033;

        // Flexbox
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            text-align: center;
            margin: 0px;
            &.modal-title {
                font-size: 36px;
                font-weight: 500;
            }
            &.modal-desc {
                font-size: 20px;
                font-weight: 350;
            }
        }
        .options-text-input {
            width: 100%;
        }
        .options-buttons {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
        // Animating
        &.animated {
            animation-name: zoom-in;
            animation-duration: 0.1s;
            animation-timing-function: ease-in-out;
        }
    }
    .dark-overlay {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: $modal-overlay-color;
        @include noOffsets;
        z-index: 9999;
    }
    .sdghsdlgh {
        position: absolute;
        z-index: 100;
        left: 5rem;
        top: 5rem;
        width: 5rem;
        height: 3rem;
    }

@keyframes zoom-in {
    from {
        transform: translate(-50%, -50%) scale(0)
    }
    to {
        transform: translate(-50%, -50%) scale(1)
    }
}
</style>