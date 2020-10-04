<template>
    <div id="app">
        <v-app id="inspire">
            <v-app id="inspire">
                <v-navigation-drawer
                    v-model="drawer"
                    app
                    clipped
                >
                    <navigation-left />
                </v-navigation-drawer>

                <navigation @drawer="drawer = !drawer"/>

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

    @Component
    ({
        components: {
            Navigation,
            NavigationLeft,
            SpToggle

        }
    })
    export default class Default extends Vue {


        drawer: boolean = false;

    }
</script>
