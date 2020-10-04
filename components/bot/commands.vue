<template>
    <div>
        <h1>Commands</h1>
        <v-subheader>Préfix : {{ getPrefix }}</v-subheader>
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left" width="200">
                            Commandes
                        </th>
                        <th class="text-left">
                            Réponses (double cliquer pour éditer)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <command-row v-for="(command,index) of commands" :key="index" :command="command" />
                </tbody>
            </template>
        </v-simple-table>
        <v-row>
            <v-col>
                <v-dialog v-model="showAddCommand">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                            Ajouter une commande
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            Ajouter une commande
                            <v-spacer />
                            <v-btn @click="showAddCommand=false">Annuler</v-btn>
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field v-model="model.key" label="key" :prefix="getPrefix" />
                                </v-col>
                                <v-col>
                                    <v-row v-for="(answer,i) of model.answers" :key="`answer-${i}`">
                                        <v-col>
                                            <v-textarea v-model="answer.content" label="Réponse" outlined />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="showAddCommand=false">Annuler</v-btn>
                            <v-btn @click="addNewCommand"> Ajouter</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </div>
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-class-component";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import CommandRow from "~/components/bot/command-row.vue";

    @Component({
        components: {CommandRow, SpTextEditable},
    })
    export default class CommandsAdmin extends Vue {

        @Action("commands/fetchAll") fetchCommands: any;
        @Action("commands/putCommand") putCommand: any;
        @Action("commands/postCommand") postCommand: any;
        @Getter("commands/getCommands") commands: any;
        @Getter("discord-server/getPrefix") getPrefix: any;
        showAddCommand: boolean = false;

        model:any = {key: "", answers: [{content: ""}]};

        async mounted() {
            await this.fetchCommands();
        }

        saveKey(command:any) {
            this.putCommand({command: {id: command.id, key: command.key}});
        }

        addNewCommand() {
            this.postCommand({command: this.model});
            this.model = {key: "", answers: [{content: ""}]};
            this.showAddCommand = false;
        }

    }
</script>
