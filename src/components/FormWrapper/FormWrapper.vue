<template>
    <div ref="form" class="form-wrapper">
        <DisabledFormOverlay :whitelisted="whitelisted" @disableForm="blockFunctionalTags" />
        <slot />
    </div>
</template>

<script lang="ts">
// external dependencies
import { Component, Vue, Prop } from 'vue-property-decorator';

// child components
import DisabledFormOverlay from '@/components/DisabledFormOverlay/DisabledFormOverlay.vue';

@Component({ components: { DisabledFormOverlay } })
export default class FormWrapper extends Vue {
    /**
     * Overrides checks in disabled form overlay
     * @type{boolean}
     */
    @Prop({ default: false }) whitelisted: boolean;

    public $refs!: {
        form: HTMLElement;
    };

    /**
     * Blocks all content of form if restriction overlay appears.
     */
    protected blockFunctionalTags(): void {
        Vue.nextTick(() => {
            const childNodes = this.$refs.form.getElementsByTagName('*');

            for (const node of childNodes) {
                (node as any).disabled = true;
            }
        });
    }
}
</script>
