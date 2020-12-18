<template>
    <div class="reponse pl-4">
        <v-row>
            <v-col cols="1">
<!--                Checkbox pour pouvoir suivre les étapes liées -->
            </v-col>
            <v-col>
                <v-row>
                    <kbd>{{ discordPrefix + 'reponse' }}
                        <sp-text-editable
                            v-model="reponse.libelle" ref="reponseLibelle" label="Libelle"
                            @save="update"
                        />
                    </kbd>
                    <v-icon @click="edit">mdi-circle-edit-outline</v-icon>
                    <v-icon @click="deleteReponse">mdi-delete-circle</v-icon>
                </v-row>
                <v-row>
                    <v-col>
                        <b>
                            <sp-text-editable v-model="reponse.titre" ref="reponseTitre" label="Titre" @save="update" />
                        </b>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <sp-textarea-editable
                            ref="reponseTexte" v-model="reponse.texte" name="texte" label="Texte"
                            @save="update"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-divider vertical />
            <v-col>
                <v-row>
                    <v-subheader>Conséquences possibles
                        <v-icon small @click="createConsequencePossible">mdi-plus-circle</v-icon>
                    </v-subheader>
                </v-row>
                <sp-consequence-possible-list
                    ref="consequencePossibleList"
                    :consequence-possibles="reponse.consequencePossibles"
                    :reponse-id="reponse.id"
                    v-on="$listeners"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Action, Component} from "nuxt-property-decorator";
    import {Prop, Vue} from "vue-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import SpTextareaEditable from "~/components/generic/SpTextareaEditable.vue";
    import SpConsequencePossibleList from "~/components/consequence-possible/SpConsequencePossibleList.vue";
    import {Getter} from "nuxt-class-component";
    import Scenario from "~/models/Scenario";
    import Etape from "~/models/Etape";

    @Component({
        components: {SpConsequencePossibleList, SpTextEditable, SpTextareaEditable}
    })
    export default class SpReponse extends Vue {

        @Prop({type: Object, required: true}) reponse!: any;
        @Action("reponse/delete") delReponse: any;
        @Action("reponse/put") putReponse: any;
        discordPrefix: string = "!";
        showConsequencePossibleForm: boolean = false;
        $refs:any;

        update() {
            this.putReponse({reponse: this.reponse});
        }

        edit() {

        }

        createConsequencePossible(){
            this.$refs.consequencePossibleList.createConsequencePossible();
        }

        deleteReponse() {
            this.delReponse({id: this.reponse.id})
        }
    }
</script>

<style scoped>

</style>
