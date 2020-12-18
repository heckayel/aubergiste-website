<template>
    <div class="scenario-list">
        <v-list dense>
            <v-list-item v-if="scenarios" v-for="(scenario,index) of scenarios" :key="index" dense>
                <v-list-item-content>
                    <v-list-item-title>
                        <span class="selectScenario" @click="selectScenario(scenario.id)">{{ scenario.titre }}</span>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-btn @click="createScenario">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
            </v-list-item>
        </v-list>
        <sp-modal ref="modalCreateScenario">
            <template v-slot:title>Créer un scenario</template>
            <template v-slot:text>
                <scenario-create />
            </template>
        </sp-modal>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator';
    import {Action, Getter} from "nuxt-class-component";
    import SpModal from "~/components/generic/SpModal.vue";
    import ScenarioCreate from "~/components/scenarios/ScenarioCreate.vue";
    import Scenario from "~/models/Scenario";

    @Component({
        components: {ScenarioCreate, SpModal}
    })
    export default class ScenarioList extends Vue {

        $refs: any;

        async mounted() {
        }

        get scenarios() {
            return Scenario.all();
        }

        selectScenario(id: string) {
            this.$emit('drawer');
            this.$router.push(`/scenarios/${id}`);
        }

        createScenario() {
            this.$refs.modalCreateScenario.open();
        }

    }
</script>

<style>
    .selectScenario {
        cursor: pointer;
    }

    .selectScenario:hover {
        font-weight: bold;
    }
</style>
