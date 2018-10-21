<template>
	<GridLayout rows="30, auto" marginBottom="5">
		<Label ref="label" row="1" :text="placeholder" opacity="0.4" fontSize="14" class="input" />
		<TextField ref="textField" :v-text="fieldVal" :secure="secure" row="1" @focus="onFocus" @blur="onBlur" borderBottomWidth="3" borderBottomColor="#cec8c8"
		 padding="0" />
	</GridLayout>
</template>

<script>
import { Color } from "color";
export default {
    props: {
        placeholder: {
            type: String
        },
        secure: {
            type: String
        },
        fieldVal: {
            type: String
        }
    },
    methods: {
        onFocus: function() {
            // get our elments to maninpulate.
            const label = this.$refs.label.nativeView;
            const textField = this.$refs.textField.nativeView;

            // animate the label sliding up and less transparent.
            label
                .animate({
                    translate: { x: 0, y: -25 },
                    opacity: 1
                })
                .then(() => {}, () => {});

            // set the border bottom color to green to indicate focus
            textField.borderBottomColor = new Color("#00b47e");
        },
        onBlur: function() {
            const label = this.$refs.label.nativeView;
            const textField = this.$refs.textField.nativeView;

            // if there is text in our input then don't move the label back to it's initial position.
            if (!textField.text) {
                label
                    .animate({
                        translate: { x: 0, y: 0 },
                        opacity: 0.4
                    })
                    .then(() => {}, () => {});
            }
            // reset border bottom color.
            textField.borderBottomColor = new Color("#cec8c8");
        }
    }
};
</script>

<style>
</style>
