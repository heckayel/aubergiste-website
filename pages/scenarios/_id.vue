<template>
    <div v-if="scenario">
        <!-- Titre and scenario infos -->
        <v-row>
            <h1>
                <v-icon @click="editTitle">mdi-circle-edit-outline</v-icon>
                <v-icon @click="askDeleteScenario">mdi-delete-circle</v-icon>
                <sp-text-editable
                    v-model="scenario.titre" ref="scenarioTitre" label="Titre"
                    @save="updateScenarioAttr" solo rounded
                />
                <sp-toggle :label="{on:'Actif',off:'Inactif'}" :value="scenario.actif" @input="updateScenarioActif" />
                <!--                <v-icon @click="$refs.scenarioTitre.edit()">edit</v-icon>-->
            </h1>
        </v-row>

        <!-- Etapes -->
        <v-row>
            <v-col>
                <sp-etape-list
                    v-if="scenario.etapes"
                    :scenario-id="scenario.id"
                    :etapes="scenario.etapes"
                    :premiere-etape="scenario.premiereEtape"
                    @created="refreshScenario"
                />
            </v-col>
        </v-row>

        <!-- Modales -->
        <sp-confirm-modal ref="confirmModalDelScenario" @confirm="deleteScenario">
            <template v-slot:title>Supprimer le scenario</template>
            <template v-slot:text>Es-tu sûr de supprimer ce scenario ?</template>
        </sp-confirm-modal>
    </div>
</template>

<script lang="ts">
    import {Action, Component, Mutation, Vue} from 'nuxt-property-decorator'
    import Scenario from "../../models/Scenario";
    import SpEtapeList from "../../components/etapes/SpEtapeList.vue";
    import SpTextEditable from "../../components/generic/SpTextEditable.vue";
    import SpToggle from "~/components/generic/SpToggle.vue";
    import {RolesEnum} from "~/core/enums/roles.enum";
    import SpConfirmModal from "~/components/generic/SpConfirmModal.vue";
    import {Getter} from "nuxt-class-component";

    @Component({
        components: {SpConfirmModal, SpToggle, SpEtapeList, SpTextEditable},
        middleware: ['auth', 'role'],
        meta: {
            roles: [RolesEnum.ADMIN, RolesEnum.MEMBER]
        }
    })
    export default class Id extends Vue {
        @Action('scenario/fetchById') fetchScenario: any;
        @Action('scenario/delete') delScenario: any;
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;
        @Mutation('scenario/setCurrentScenarioId') setCurrentScenarioId: any;
        @Action('updatePreferences') updatePreferences: any;
        @Getter('getPreferences') getPreferences: any;
        @Action('scenario/put') updateScenario: any;
        $refs: any;
        scenario: any = null;

        async mounted() {
            this.setCurrentScenarioId(this.$route.params.id)
            await this.fetchScenario({id: this.$route.params.id});
            this.scenario = await Scenario.findOneById(this.$route.params.id);

            if (!this.scenario) {
                console.log("scenario not found :'(");
                return;
            }

            await this.updatePreferences({
                preferences: {
                    ...this.getPreferences,
                    mondeId: this.scenario.mondeId,
                    scenarioId: this.scenario.id
                }
            });

            // if(!this.scenario){
            //     await this.$router.push('/scenarios/not-found');
            // }
        }

        askDeleteScenario() {
            this.$refs.confirmModalDelScenario.open();
        }

        async deleteScenario() {
            if (this.scenario) {
                await this.delScenario({id: this.scenario.id});
                await this.$router.push(`/mondes/${this.getCurrentMondeId}`);
            }
        }

        editTitle() {
            this.$refs.scenarioTitre.edit();
        }

        updateScenarioAttr() {
            if (this.scenario === null) return;
            Scenario.update(this.scenario);
        }

        async updateScenarioActif(value: any) {
            if (this.scenario === null) return;
            await this.updateScenario({scenario: {id: this.scenario.id, actif: value}});
            this.scenario.actif = value;
        }

        async refreshScenario(data: any) {
            this.scenario = await Scenario.findOneById(this.$route.params.id);
        }

    }
</script>

<style>
</style>
