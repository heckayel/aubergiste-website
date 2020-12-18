<template>
    <div id="etape-list">

        <!-- Si on a pas de première étape on propose d'en créer une -->
        <v-row v-if="!firstEtape">
            <v-col>
                <v-container class="elevation-5">
                    <sp-etape-create :scenario-id="scenarioId" :is-premiere-etape="true" v-on="$listeners" />
                </v-container>
            </v-col>
        </v-row>

        <!-- Première étape -->
        <h2>Première étape</h2>
        <v-container v-if="firstEtape">
            <v-expansion-panels focusable>
                <sp-etape :id="firstEtape.id" />
            </v-expansion-panels>
        </v-container>

        <!-- Etapes suivantes (il faut au moins la première étape pour avoir des étapes suivantes -->
        <h2>Etapes suivantes</h2>
        <v-container v-if="firstEtape">
            <v-row class="pt-5" v-for="(level,indexLevel) of etapeByDeepLvl" :key="indexLevel">
                <v-expansion-panels>
                    <sp-etape v-for="(etapeId,indexEtape) in level" :key="indexEtape" :id="etapeId" v-on="$listeners" />
                </v-expansion-panels>
            </v-row>
        </v-container>

        <!-- Etapes qui ne sont pas liées -->
        <h2>Etapes zombies (non liées à une réponse ni définies en première étape)</h2>
        <v-container>
            <v-row class="pt-5">
                <v-expansion-panels>
                    <sp-etape
                        v-if="etapesZombies"
                        v-for="(etapeZombie,indexLevelZombie) of etapesZombies"
                        :key="indexLevelZombie"
                        :id="etapeZombie"
                    />
                </v-expansion-panels>
            </v-row>
        </v-container>

    </div>
</template>

<script lang="ts">
    import {Action, Component, Vue} from 'nuxt-property-decorator';
    import SpEtape from "./SpEtape.vue";
    import SpEtapeCreate from "~/components/etapes/SpEtapeCreate.vue";
    import {Prop} from "vue-property-decorator";

    @Component({
        components: {SpEtapeCreate, SpEtape}
    })
    export default class SpEtapeList extends Vue {
        @Prop({required: true}) scenarioId: any;
        @Prop({required: true}) etapes: any;
        @Prop() premiereEtape: any;
        @Action('scenario/fetchById') fetchScenario: any;

        etapesZombies: string[] = [];

        get firstEtape() {
            if (!this.premiereEtape) return null;
            return this.etapes.find((e: any) => e.id === this.premiereEtape)
        }

        get etapeByDeepLvl() {
            if (!this.premiereEtape) return [];
            let res: any = [];
            this.etapesZombies = this.etapes.map((e: any) => e.id);
            this.etapesZombies.splice(this.etapesZombies.indexOf(this.premiereEtape), 1);
            this.mapEtapeByDeepLvl(this.firstEtape, 0, res);
            return res;
        }

        /**
         * Return un tableau avec les etapes par niveau de profondeur
         * [
         *  0 => ..premiere etape..,
         *  1 => ["idetape","idetape"] // ..étapes de 1er niveau (suite des réponses de la première étape..,
         *  2 => ["idetape","idetape","idetape","idetape"] // .. étapes de 2eme niveau..
         *  3 => [...] // ...
         * ]
         * @param scenario
         * @param etape
         * @param level
         * @param res
         */
        mapEtapeByDeepLvl(etape: any, level: any, res: any) {

            if (res[level] === undefined) {
                res[level] = [];
            }
            if (etape !== null && etape !== undefined && etape.reponses.length > 0) {
                etape.reponses.forEach((r: any) => {
                    r.consequencePossibles.forEach((cp: any) => {

                        if (!res[level].includes(cp.etapeSuivanteId) && cp.etapeSuivanteId !== null) {
                            res[level].push(cp.etapeSuivanteId);

                            // remove of etapes zombies
                            const indexEtapeZombie = this.etapesZombies.indexOf(cp.etapeSuivanteId);
                            if (indexEtapeZombie != -1) {
                                this.etapesZombies.splice(indexEtapeZombie, 1)
                            }

                            // Le if évite les boucles infinies
                            if(etape.id !== cp.etapeSuivanteId){
                                this.mapEtapeByDeepLvl(this.etapes.find((e: any) => e.id === cp.etapeSuivanteId), (level + 1), res);
                            }
                        }
                    });
                });
            }

            return res;
        }

        getEtape(etapeId: any) {
            return this.etapes.find((e: any) => e.id === etapeId);
        }

    }
</script>

<style>
</style>
