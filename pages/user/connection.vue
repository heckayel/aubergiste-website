<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <v-card>
                    <v-card-text>
                        <v-tabs v-model="tab">
                            <v-tab>Se connecter</v-tab>
                            <v-tab>Créer son compte</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <connection-form />
                            </v-tab-item>
                            <v-tab-item>
                                <register-form />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col>
                <v-card>
                    <v-card-text>
<!--                        <google-auth />-->
                        <discord-auth />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>


    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ConnectionForm from "~/components/user/connection-form.vue";
    import RegisterForm from "~/components/user/register-form.vue";
    import GoogleAuth from "~/components/user/google-auth.vue";
    import DiscordAuth from "~/components/user/discord-auth.vue";

    @Component({
        components: {DiscordAuth, GoogleAuth, RegisterForm, ConnectionForm}
    })
    export default class Connection extends Vue {
        tab = null;

    }
</script>
