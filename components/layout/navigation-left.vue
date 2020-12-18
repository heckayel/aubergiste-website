<template>
    <div>
        <v-subheader>Le monde</v-subheader>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title @click="showUnite=!showUnite">Unités</v-list-item-title>
                    <v-list-item-subtitle>
                        <ul v-if="showUnite && currentMonde !== null">
                            <li v-for="(unite,uniteIndex) of currentMonde.unites" :key="uniteIndex">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <span v-bind="attrs" v-on="on">[{{ unite.code }}] {{ unite.libelle }}</span>
                                    </template>
                                    <span>{{ unite.description }}</span>
                                </v-tooltip>

                            </li>
                        </ul>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>Utilisateurs</v-list-item>
        </v-list>
        <v-divider />
        <v-subheader>Les scenarios</v-subheader>
        <scenario-list v-on="$listeners" />
    </div>
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-class-component";
    import ScenarioList from "~/components/scenarios/ScenarioList.vue";
    import Monde from "~/models/Monde";

    @Component({
        components: {ScenarioList},
    })
    export default class NavigationLeft extends Vue {
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;

        showUnite: boolean = true;

        get currentMonde() {
            return Monde.findOneById(this.getCurrentMondeId);
        }
    }
</script>
