<template>
    <div>
        <h1>{{ loggedInUser.username }}</h1>
        <v-row>
            <v-col>
                <v-icon>mdi-discord</v-icon>
                <span v-if="socialDiscord">
                    {{ socialDiscord.username }}
                    <v-img
                        :src="socialDiscord.avatar"
                        max-height="24"
                        max-width="24"
                        aspect-ratio="1"
                    />
                </span>
                <span v-if="!socialDiscord">
                    <discord-auth />
                </span>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Component, Getter} from "nuxt-property-decorator";
    import {Vue} from "vue-property-decorator";
    import socket from "~/plugins/socket.io";
    import DiscordAuth from "~/components/user/discord-auth.vue";

    @Component({
        components: {DiscordAuth}
    })
    export default class SpModal extends Vue {
        // middleware: ['auth','role'],
        // meta: {
        //   roles: ['admin']
        // }
        @Getter('loggedInUser') loggedInUser: any;

        get socialDiscord() {
            return this.loggedInUser.socialDiscord || null;
        }

    }
</script>
