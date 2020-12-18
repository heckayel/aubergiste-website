<template>
    <v-expansion-panel v-if="etape" class="elevation-5">
        <v-expansion-panel-header>{{ etape.titre }}</v-expansion-panel-header>
        <v-expansion-panel-content>

            <h2 class="pt-2">
                <sp-text-editable
                    v-model="etape.titre" ref="etapeTitre" label="Titre"
                    @save="update" solo rounded
                />
                <v-icon @click="editEtape">mdi-circle-edit-outline</v-icon>
                <v-icon @click="deleteEtape">mdi-delete-circle</v-icon>
            </h2>

            <v-row class="pa-4">
                <v-col>
                    <sp-textarea-editable
                        ref="etapeTexte" v-model="etape.texte" name="texte"
                        label="Texte" @save="update"
                    />
                </v-col>
            </v-row>

            <v-divider />

            <v-row>
                <v-col>

                    <v-subheader>
                        Effets
                        <v-icon small right @click="createEffet">mdi-plus-circle</v-icon>
                    </v-subheader>
                    <v-row class="pb-2">
                        <v-col>
                            <sp-effet-list :etape-id="etape.id" ref="effetList" :effets="etape.effets" v-on="$listeners"/>
                        </v-col>
                    </v-row>

                    <!--                <sp-effet-create-form v-if="showEffetForm" :id-etape="etape.id" @created="showEffetForm=false"/>-->


                </v-col>
            </v-row>

            <v-divider />

            <v-row>
                <v-col>
                    <v-subheader>
                        Réponses
                        <v-icon small right @click="createReponse">mdi-plus-circle-outline</v-icon>
                    </v-subheader>
                    <sp-reponse-create v-if="!etape.reponses" :etape-id="id" />
                    <sp-reponse-list :etape-id="id" ref="reponseList" :reponses="etape.reponses" v-on="$listeners" />
                </v-col>
            </v-row>

        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
    import {Action, Component, Vue} from 'nuxt-property-decorator';
    import Etape from "../../models/Etape";
    import {Prop} from "vue-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import SpTextareaEditable from "~/components/generic/SpTextareaEditable.vue";
    import SpEffetList from "~/components/effet/SpEffetList.vue";
    import SpReponseList from "~/components/reponse/SpReponseList.vue";
    import SpReponseCreate from "~/components/reponse/SpReponseCreate.vue";

    @Component({
        components: {
            SpReponseCreate,
            SpReponseList,
            SpEffetList,
            SpTextEditable, SpTextareaEditable
        }
    })
    export default class SpEtapeList extends Vue {
        @Action('etape/delete') delEtape: any;
        @Action('etape/put') putEtape: any;
        @Prop() id: any;

        $refs: any;

        get etape(): any {
            return Etape.findOneById(this.id);
        }

        editEtape() {
            this.$refs.etapeTitre.edit();
        }

        update() {
            this.putEtape({etape: this.etape});
        }

        createEffet() {
            this.$refs.effetList.createEffet();
        }

        createReponse() {
            this.$refs.reponseList.createReponse();
        }

        async deleteEtape() {
            await this.delEtape({id: this.id})
        }

    }
</script>

<style>
</style>
