<template>
    <div>
        <v-row>
            <v-col>
                <v-alert v-model="error" type="error" dismissible dense transition="fade-transition">
                    {{ messageError }}
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="scenario.titre" outlined label="Titre" dense @keydown.enter="save" />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-lg-right">
                <v-btn @click="save">Enregistrer</v-btn>
            </v-col>
        </v-row>
        <v-spacer />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator';
    import {Action, Getter} from "nuxt-class-component";

    @Component({})
    export default class ScenarioCreate extends Vue {

        @Action('scenario/post') postScenario: any;
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;

        error: boolean = false;
        messageError: string = "";
        scenario: any = {
            titre: ''
        };

        async save() {
            try {
                const data = await this.postScenario({
                    scenario: {
                        ...this.scenario,
                        monde: {id: this.getCurrentMondeId}
                    }
                });
                this.$router.push(`/scenarios/${data.id}`);
            } catch (error) {
                this.messageError = error.data.error;
                this.error = true;
            }
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
