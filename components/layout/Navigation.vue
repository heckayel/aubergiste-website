<template>
    <v-app-bar app clipped-left dense>
        <v-app-bar-nav-icon @click.stop="$emit('drawer')"></v-app-bar-nav-icon>
        <v-toolbar-title @click="$router.push('/')">
            <v-icon>mdi-rocket</v-icon>
            Spatiabot
        </v-toolbar-title>


        <span v-if="isAuthenticated" class="pl-5">
            <v-menu v-if="mondes.length > 0" open-on-hover>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-atom</v-icon>
                </template>
                <v-list dense>
                    <v-list-item v-for="(monde, indexMonde) in mondes" :key="indexMonde">
                        <v-list-item-title>
                            <span @click="selectMonde(monde.id)">{{ monde.titre }}</span>
                        </v-list-item-title>
                    </v-list-item>
                    <v-divider />
                    <v-list-item>
                        <v-list-item @click="$router.push('/mondes/creation')">Créer un nouveau monde</v-list-item>
                    </v-list-item>
                </v-list>
            </v-menu>
        </span>

        <span v-if="isAuthenticated" class="pl-5">
            <span v-if="currentMonde" class="titreMonde" @click="$router.push(`/mondes/${currentMonde.id}`)">
                {{ currentMonde.titre }}
            </span>
            <span v-else class="titreMonde">
                <v-btn @click="$router.push('/mondes/creation')">Créer un nouveau monde</v-btn>
            </span>
            <span class="pl-5">
                <router-link to="/scenarios/all">Scenarios</router-link>
            </span>
            <span v-if="isAuthenticated" class="pl-5">
                <router-link to="/mondes/partie">Partie</router-link>
            </span>
        </span>

        <v-spacer />

        <v-spacer />
        <span v-if="isAuthenticated">
            <v-btn @click="logout">Logout</v-btn>
              {{ loggedInUser.username }}
                </span>
        <span v-else>
                <router-link to="/user/connection">Se connecter</router-link>
        </span>
        <sp-toggle
            :label="{on:'',off:''}"
            v-model="light"
            @input="changeLight"
            :icon-custom="{on:'mdi-lightbulb-on-outline', off:'mdi-lightbulb-outline'}"
        />
    </v-app-bar>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter, Mutation} from "nuxt-class-component";
    import SpToggle from "~/components/generic/SpToggle.vue";
    import Monde from "~/models/Monde";

    @Component({
        components: {SpToggle}
    })
    export default class Navigation extends Vue {

        @Getter('isAuthenticated') isAuthenticated: any;
        @Getter('loggedInUser') loggedInUser: any;
        @Getter('getPreferences') getPreferences: any;
        @Getter('isAdmin') isAdmin: any;
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;
        @Getter('monde/getMondeById') getMondeById: any;
        @Action('monde/fetchById') fetchById: any;
        @Action('monde/fetchAll') fetchMondes: any;
        @Action('monde/remove') removeMonde: any;
        @Action('updatePreferences') updatePreferences: any;
        @Mutation('monde/setCurrentMondeId') setCurrentMondeId: any;

        $auth!: any;
        $vuetify: any;
        light: boolean = false;

        logout() {
            this.$auth.logout();
            this.$router.push('/');
        }

        async mounted() {
            this.changeLight();
            await this.fetchMondes();
            if (this.getPreferences.mondeId !== undefined && Monde.find(this.getPreferences.mondeId) !== null) {
                await this.fetchById({id: this.getPreferences.mondeId});
                this.setCurrentMondeId(this.getPreferences.mondeId);
            }
        }

        get mondes() {
            return Monde.all();
        }

        get currentMonde() {
            return Monde.find(this.getCurrentMondeId);
        }

        get mondeSelectedTitle() {
            return 'Créer un nouveau monde';
        }

        async selectMonde(id: string) {
            await this.fetchById({id});
            await this.setCurrentMondeId(id);
            await this.updatePreferences({preferences: {...this.getPreferences, mondeId: id}})
            await this.$router.push(`/mondes/${id}`);
        }

        changeLight() {
            this.$vuetify.theme.dark = !this.light;
        }
    }
</script>
<style scoped>
    .titreMonde {
        text-decoration: underline;
    }
</style>
