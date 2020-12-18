<template>
    <div class="etape-create">
        <v-form v-model="valid">

            <v-row>
                <v-col>
                    <v-alert v-model="error" type="error" dismissible dense transition="fade-transition">
                        {{ messageError }}
                    </v-alert>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field label="Titre" v-model="modelEtape.titre" dense outlined />
                </v-col>
            </v-row>

            <v-row clas="pt-0">
                <v-col>
                    <v-textarea label="Texte" v-model="modelEtape.texte" dense />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn @click="save">Enregistrer</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script lang="ts">
    import {Action, Component, Vue} from 'nuxt-property-decorator';
    import {Prop} from "vue-property-decorator";

    @Component({
        components: {
            // SpReponseList,
            // SpEffetList,
            // SpTextEditable, SpTextareaEditable
        }
    })
    export default class SpEtapeCreate extends Vue {
        @Prop({required: true}) scenarioId: any;
        @Prop({required: false, default: false}) isPremiereEtape: any;
        @Action('etape/post') postEtape: any;
        @Action('scenario/put') putScenario: any;

        error: boolean = false;
        messageError: string = "";
        modelEtape: any = {};
        valid: boolean = false;

        async save() {
            try {
                const data = await this.postEtape({
                    etape: {
                        ...this.modelEtape,
                        scenario: {id: this.scenarioId}
                    }
                });

                if (this.isPremiereEtape) {
                    await this.putScenario({
                        scenario: {
                            id: this.scenarioId, premiereEtape: data.id
                        }
                    })
                }
                this.$emit('created',{etape:data,isPremiereEtape:this.isPremiereEtape});
                this.modelEtape = {};
            } catch (error) {
                this.messageError = 'Une erreur a eu lieu';
                if(error.data){
                    this.messageError = error.data.error;
                }
                this.error = true;
            }
        }
    }
</script>

<style>
</style>
