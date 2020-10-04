<template>
    <div>
        <v-list dense>

            <v-list-item v-for="(discordServer,index) of getDiscordServers" :key="index" dense>
                <v-list-item-action>
                    <v-icon small>mdi-server</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ discordServer.name }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="visibilityAddServer" dense>
                <v-list-item-action>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                    </v-list-item-title>
                    <v-list-item-content>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="newServerModel.discordId" label="Id du serveur" outlined dense />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn @click="addServer">Valider</v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item-content>
            </v-list-item>
            <v-list-item dense>
                <v-list-item-action>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        <v-btn @click="showAddServer">Ajouter</v-btn>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-class-component";

    @Component({
        components: {},
    })
    export default class NavigationLeft extends Vue {

        @Action("discord-server/fetchAll") fetchDiscordServer: any;
        @Getter('discord-server/getDiscordServers') getDiscordServers: any;

        visibilityAddServer: boolean = false;
        newServerModel: any = {
            discordId: ''
        };

        async mounted() {
            await this.fetchDiscordServer();
        }

        showAddServer() {
            this.visibilityAddServer = true;
        }

        addServer() {
            this.visibilityAddServer = false;
        }

    }
</script>
