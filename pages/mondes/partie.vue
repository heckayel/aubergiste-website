<template>
    <div class="monde-creation">
        <h1>Parties</h1>
        <v-row>
            <v-col cols="3">
                <v-select
                    :items="discordGuilds"
                    label="Sélectionner un serveur discord..."
                    outlined
                    item-text="name"
                    item-value="guildId"
                    :value="selectedGuild ? selectedGuild.guildId : null"
                    @change="changeSelectedGuild"
                />
            </v-col>
            <v-col cols="2">
                <v-text-field label="prefix" type="text" :value="selectedGuild ? selectedGuild.prefix : null"
                    rounded outlined @input="savePrefix"
                />
            </v-col>
        </v-row>
        <v-row v-if="currentPartie">
            <v-col>
                <h2>Partie en cours</h2>
                <sp-stat-list :stats="currentPartie.stats" />
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-btn @click="create">Créer une partie</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-class-component";
    import DiscordGuild from "~/models/DiscordGuild";
    import {RolesEnum} from "~/core/enums/roles.enum";
    import SpStatList from "~/components/stat/SpStatList.vue";

    @Component({
        components: {SpStatList},
        middleware: ['auth'],
        // meta: {
        //     roles: [RolesEnum.ADMIN,RolesEnum.MEMBER]
        // }
    })
    export default class Creation extends Vue {
        @Action('discord-guild/fetchMyGuilds') fetchMyGuilds: any;
        @Action('updatePreferences') updatePreferences: any;
        @Action('partie/createPartie') createPartie: any;
        @Action('discord-guild/put') updateDiscordGuild: any;
        @Getter('getPreferences') getPreferences: any;
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;

        async mounted() {
            await this.fetchMyGuilds();
        }

        get discordGuilds() {
            return DiscordGuild.findAllRecursive();
        }

        get selectedGuild() :any {
            return this.discordGuilds.find((d:any) => d.guildId === this.getPreferences.selectedGuild) || null;
        }

        get currentPartie() : {} | null {
            if(this.selectedGuild && this.selectedGuild.parties.length > 0){
                return this.selectedGuild.parties.find((p:any) => p.actif);
            }
            return null;
        }

        changeSelectedGuild(e:any) {
            this.updatePreferences({
                preferences: {
                    ...this.getPreferences,
                    selectedGuild: e
                }
            })
        }

        async create(){
            if(!this.selectedGuild){
                alert('Sélectionner un serveur pour créer une partie');
                return;
            }
            await this.createPartie({
                partie : {
                    discordGuildId: this.selectedGuild.id,
                    mondeId: this.getCurrentMondeId
                }
            });

        }

        async savePrefix(value:string){
            await this.updateDiscordGuild({
                discordGuild : {
                    id : this.selectedGuild.id,
                    prefix:value
                }
            });
        }

    }
</script>
