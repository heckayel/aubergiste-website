<template>

    <tr v-if="model">
        <td>
            <sp-text-editable v-model="model.key" label="key" :prefix="getPrefix" @save="save" />
        </td>
        <td>
            <v-row v-for="(answer,i) of model.answers" :key="`answer-${i}`">
                <v-col>
                    <sp-textarea-editable v-model="answer.content" label="key" @save="save" outlined />
                </v-col>
            </v-row>
        </td>
    </tr>

</template>


<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-class-component";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import SpTextareaEditable from "~/components/generic/SpTextareaEditable.vue";

    @Component({
        components: {SpTextEditable,SpTextareaEditable},
    })
    export default class CommandsRow extends Vue {
        @Prop({default: null}) command: any | null;
        @Action("commands/putCommand") putCommand: any;
        @Action("answer/putAnswer") putAnswer: any;
        @Getter("discord-server/getPrefix") getPrefix: any;

        model: any = null;

        mounted() {
            if (this.command) {
                this.model = JSON.parse(JSON.stringify(this.command));
            }
            if(this.model.answers.length <= 0){
                this.model.answers.push({content: "pas de réponse..."})
            }
        }

        save() {
            this.putCommand({command: this.model});
        }
    }
</script>
