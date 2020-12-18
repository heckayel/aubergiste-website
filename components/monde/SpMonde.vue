<template>
    <div v-if="monde">
        <h1>
            <v-icon @click="remove">mdi-delete-forever</v-icon>
            [
            <sp-text-editable
                v-model="monde.code"
                ref="mondeCode"
                label="Code"
                @save="updateMondeAttr"
                solo
                rounded
            />
            ]
            <sp-text-editable
                v-model="monde.titre"
                ref="mondeTitre"
                label="Titre"
                @save="updateMondeAttr"
                solo
                rounded
            />
        </h1>
        <v-subheader>
            Auteurs :&nbsp;{{ monde.auteurs.map(a => a.username).join(', ') }}&nbsp;
            <v-icon>mdi-account-multiple-plus-outline</v-icon>

        </v-subheader>
        <v-row>
            <v-col>
                <h1>L'histoire</h1>
                <vue-markdown>{{ monde.texte }}</vue-markdown>
            </v-col>
            <v-divider vertical />
            <v-col>
                <h1 @click="showUnites=!showUnites">Unités</h1>
                <v-list v-if="showUnites">
                    <v-list-item v-for="(unite,uniteIndex) of monde.unites" :key="uniteIndex">
                        <v-list-item-content>
                            <v-list-item-title>[{{ unite.code }}] {{ unite.libelle }}</v-list-item-title>
                            <v-list-item-subtitle>{{ unite.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                    <v-list-item-action>
                        <v-btn>
                            Ajouter une unité
                        </v-btn>
                    </v-list-item-action>
                </v-list>
            </v-col>
            <v-divider vertical />
            <v-col>
                <h1>Les scenarios <v-icon @click="createScenario">mdi-plus-circle-outline</v-icon></h1>
                <scenario-list v-on="$listeners" ref="scenarioList" />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Action, Component, Vue} from 'nuxt-property-decorator';
    import {Prop} from "vue-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import SpTextareaEditable from "~/components/generic/SpTextareaEditable.vue";
    import Monde from "~/models/Monde";
    import VueMarkdown from "vue-markdown";
    import ScenarioList from "~/components/scenarios/ScenarioList.vue";

    @Component({
        components: {
            ScenarioList,
            SpTextEditable, SpTextareaEditable, VueMarkdown
        }
    })
    export default class SpMonde extends Vue {

        @Prop() id: any;
        @Action('monde/remove') removeMonde: any;
        $refs: any;
        showUnites: boolean = true;

        get monde() {
            return Monde.findOneById(this.id) || null;
        }

        updateMondeAttr() {
            if (this.monde === null) return;

            Monde.update(this.monde);
        }

        remove() {
            if (this.monde) {
                //@ts-ignore
                this.removeMonde({id: this.monde.id});
            }

        }

        createScenario(){
            this.$refs.scenarioList.createScenario();
        }

    }
</script>

<style>
</style>
