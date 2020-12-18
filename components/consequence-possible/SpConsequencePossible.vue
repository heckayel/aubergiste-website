<template>
    <div class="consequence-possible">
        <p v-if="!editConsequencePossible">
            <v-chip>
                <v-avatar class="grey darken-4" style="width:50px">
                    <b>
                        <sp-text-editable
                            v-model="consequencePossible.poids"
                            ref="consequencePossiblePoids"
                            label="Poids"
                            @save="update"
                        />
                    </b>
                </v-avatar>
                <sp-select-editable
                    ref="consequencePossibleEtapeSuivante"
                    :value="etapeSuivante"
                    :items="etapes"
                    name="Etape suivante"
                    item-value="id"
                    item-text="titre"
                    label="Etape suivante..."
                    @input="e => modelConsequencePossible.etapeSuivante = e"
                    @save="update"
                    return-object
                />
                <v-icon small right @click="edit">mdi-circle-edit-outline</v-icon>
                <v-icon small right @click="deleteConsequencePossible">mdi-delete-circle</v-icon>
            </v-chip>
        </p>
    </div>
</template>

<script lang="ts">
    import {Action, Component, Getter, Vue} from 'nuxt-property-decorator';
    import {Prop} from "vue-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import SpSelectEditable from "~/components/generic/SpSelectEditable.vue";
    import Etape from "~/models/Etape";

    @Component({
        components: {
            SpTextEditable, SpSelectEditable
        }
    })
    export default class SpConsequencePossible extends Vue {
        @Prop({required: true}) consequencePossible: any;
        @Getter("scenario/getCurrentScenarioId") getCurrentScenarioId: any;
        @Action("consequence-possible/delete") delConsequencePossible: any;
        @Action('consequence-possible/put') putConsequencePossible: any;
        editConsequencePossible: boolean = false;
        modelConsequencePossible: any = {};

        mounted() {
            if (this.consequencePossible.etapeSuivante == null) {
                this.consequencePossible.etapeSuivante = {};
            }
        }

        get etapes() {
            return Etape.query().where('scenarioId', this.getCurrentScenarioId).all();
        }

        get etapeSuivante() {
            if (!this.consequencePossible.etapeSuivanteId) return null;
            return Etape.find(this.consequencePossible.etapeSuivanteId);
        }


        edit() {
            // this.$refs.consequencePossiblePoids.edit();
            // this.$refs.consequencePossibleEtapeSuivante.edit();
        }

        update(e: any) {
            this.putConsequencePossible({consequencePossible: {...this.consequencePossible, ...this.modelConsequencePossible}});
            // ConsequencePossible.api().put(`${this.consequencePossible.id}`, this.consequencePossible);
        }

        deleteConsequencePossible() {
            this.delConsequencePossible({id: this.consequencePossible.id})
        }
    }
</script>

<style scoped>

</style>
