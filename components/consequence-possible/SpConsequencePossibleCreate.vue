<template>
    <v-form id="consequence-possible-form" ref="consequencePossibleFormRef" lazy-validation>
        <v-row v-if="error">
            <v-col>
                <v-alert v-model="error" type="error" dismissible dense transition="fade-transition">
                    {{ messageError }}
                </v-alert>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3">
                <v-text-field type="number" v-model="modelConsequencePossible.poids" label="poids" required />
            </v-col>

            <v-col>
                <v-row>
                    <v-col>
                        <v-select
                            clearable
                            :items="etapes"
                            name="etape-suivante"
                            item-value="id"
                            item-text="titre"
                            label="Choisir l'étape suivante..."
                            v-model="modelConsequencePossible.etapeSuivanteId"
                            return-object
                        />
                    </v-col>
                </v-row>
                <v-row v-if="!isEtapeDefined">
                    <v-col>
                        <v-divider>inset</v-divider>
                    </v-col>
                    <v-col cols="1" class="text-center">OU</v-col>
                    <v-col>
                        <v-divider />
                    </v-col>
                </v-row>
                <v-row v-if="!isEtapeDefined">
                    <v-col>
                        <h2>Créer l'étape suivante</h2>
                        <sp-etape-create :scenario-id="getCurrentScenarioId" @created="etapeCreated" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="text-center">
                <v-btn
                    :disabled="!isEtapeDefined"
                    @click="save"
                >Valider
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
    import {Action, Component, Getter, Vue} from 'nuxt-property-decorator';
    import {Prop} from "vue-property-decorator";
    import SpReponse from "~/components/reponse/SpReponse.vue";
    import Etape from "~/models/Etape";
    import SpEtapeCreate from "~/components/etapes/SpEtapeCreate.vue";

    @Component({
        components: {SpEtapeCreate}
    })
    export default class SpReponseCreate extends Vue {
        @Prop({required: true}) reponseId: any;
        @Action('consequence-possible/post') postConsequencePossible: any;
        @Getter("scenario/getCurrentScenarioId") getCurrentScenarioId: any;
        isCreateEtape: boolean = true;
        modelConsequencePossible: any = {};
        valid: boolean = false;
        error: boolean = false;
        messageError: string = "";

        get etapes() {
            return Etape.query().where('scenarioId', this.getCurrentScenarioId).all();
        }

        get isEtapeDefined(): boolean {
            return this.modelConsequencePossible.etapeSuivanteId || this.modelConsequencePossible.etapeSuivante && this.modelConsequencePossible.etapeSuivante.id;
        }

        async save() {
            try {
                const data = await this.postConsequencePossible({
                    consequencePossible: {
                        ...this.modelConsequencePossible,
                        reponse: {id: this.reponseId}
                    }
                });
                this.modelConsequencePossible = {};
                this.$emit('created', {consequencePossible: data});
            } catch (error) {
                this.messageError = 'Une erreur a eu lieu';
                if (error.data) {
                    this.messageError = error.data.error;
                }
                this.error = true;
            }
        }

        etapeCreated(data: any) {
            this.isCreateEtape = false;
            this.modelConsequencePossible.etapeSuivanteId = data.etape.id;
            this.modelConsequencePossible.etapeSuivante = {id: data.etape.id};
        }
    }
</script>
