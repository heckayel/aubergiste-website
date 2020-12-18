<template>
    <div v-if="monde">
        <h1>[{{ monde.code }}] {{ monde.titre }}</h1>
        <v-row>
            <v-col v-for="(scenario,scenarioIndex) of monde.scenarios" :key="scenarioIndex" cols="3">
                <v-card elevation="5">
                    <v-card-title>{{ scenario.titre }}</v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-actions>
                        <v-btn @click="$router.push(`/scenarios/${scenario.id}`)">Editer</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>

<script lang="ts">

    import {Component} from "nuxt-property-decorator";
    import {Vue} from "vue-property-decorator";
    import Monde from "~/models/Monde";
    import {Getter} from "nuxt-class-component";
    import {Action} from "nuxt-class-component";

    @Component({})
    export default class All extends Vue {
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;
        get monde() {
            return Monde.findOneById(this.getCurrentMondeId);
        }


    }
</script>

<style>
</style>
