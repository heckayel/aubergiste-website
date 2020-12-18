<template>
    <div id="app">
        <v-app id="inspire">
            <v-app id="inspire">
                <v-navigation-drawer v-model="drawer" app clipped>
                    <navigation-left v-if="isAuthenticated" @drawer="drawer = !drawer" />
                </v-navigation-drawer>

                <navigation @drawer="drawer = !drawer" />

                <v-main>
                    <div class="pa-5">
                        <nuxt />
                    </div>
                </v-main>

                <v-footer app>
                    <span>&copy; {{ new Date().getFullYear() }}</span>
                </v-footer>
            </v-app>
        </v-app>
    </div>
</template>

<script lang="ts">
    import SpToggle from "../components/generic/SpToggle.vue";
    import {Vue} from "vue-property-decorator";
    import Component from "vue-class-component";
    import NavigationLeft from "~/components/layout/navigation-left.vue";
    import Navigation from "~/components/layout/Navigation.vue";
    import {Getter} from "nuxt-class-component";

    @Component
    ({
        components: {
            Navigation,
            NavigationLeft,
            SpToggle

        }
    })
    export default class Default extends Vue {
        @Getter('isAuthenticated') isAuthenticated: any;
        drawer: boolean = false;

        head () {
            return {
                bodyAttrs: {
                    class: this.scrollbarTheme
                }
            }
        }
        get scrollbarTheme() {
            return this.$vuetify.theme.dark ? 'theme--dark' : 'theme--light';
        }

    }
</script>
<style>
    html { overflow-y: auto !important; }
</style>
