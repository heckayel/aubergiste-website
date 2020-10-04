<template>
    <div>
        <h1>Aubergiste</h1>

        <div class="row">
            <v-col>
                <v-text-field label="ChannelId" v-model="directMessage.channelId" outlined />
            </v-col>
        </div>
        <div class="row">
            <v-col>
                <v-text-field label="Content" v-model="directMessage.content" outlined @keypress.enter="send"/>
            </v-col>
        </div>
        <div class="row">
            <v-col>
                <v-btn @click="send">Valider</v-btn>
            </v-col>
        </div>
    </div>
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import CommandRow from "~/components/bot/command-row.vue";
    import {Action} from "nuxt-class-component";

    @Component({
        components: {CommandRow, SpTextEditable},
    })
    export default class Aubergiste extends Vue {

        @Action("discord-server/send") discordSend: any;

        directMessage: any = {
            channelId: '',
            content: ''
        }

        async send() {
            await this.discordSend({directMessage: this.directMessage});
            this.directMessage.content = '';
        }

    }
</script>
