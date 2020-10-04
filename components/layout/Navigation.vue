<template>
    <v-app-bar
        app
        clipped-left
    >
        <v-app-bar-nav-icon @click.stop="$emit('drawer')"></v-app-bar-nav-icon>
        <v-toolbar-title @click="$router.push('/')">
            <v-icon>mdi-beer</v-icon>
            Aubergiste !
        </v-toolbar-title>
        <v-spacer />
        <router-link v-if="isAdmin" to="/bot/aubergiste">Bot</router-link>
        <v-spacer />
        <span v-if="isAuthenticated">
              {{ loggedInUser.username }}
                </span>
        <span v-else>
                <router-link to="/user/connection">Se connecter</router-link>
        </span>
        <sp-toggle
            :label="{on:'Eteindre la lumière',off:'Allumer la lumière'}"
            v-model="light"
            @input="changeLight"
            :icon-custom="{on:'mdi-lightbulb-on-outline', off:'mdi-lightbulb-outline'}"
        />
    </v-app-bar>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter} from "nuxt-class-component";
    import SpToggle from "~/components/generic/SpToggle.vue";

    @Component({
        components: {SpToggle}
    })
    export default class Navigation extends Vue {

        @Getter('isAuthenticated') isAuthenticated: any;
        @Getter('loggedInUser') loggedInUser: any;
        @Getter('isAdmin') isAdmin: any;
        $auth!: any;
        $vuetify: any;
        light: boolean = false;

        logout() {
            this.$auth.logout();
        }

        mounted() {
            this.changeLight()
        }

        changeLight() {
            this.$vuetify.theme.dark = !this.light;
        }
    }
</script>
