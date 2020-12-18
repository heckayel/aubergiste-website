<template>
    <v-btn class="button" v-on:click="googleSignIn()">Sign in with google</v-btn>
</template>

<script lang="ts">
    import socket from '@/plugins/socket.io.js';

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class ConnectionForm extends Vue {

        $auth:any;
        popup: any;

        created() {
            socket.on('google', async (data: any) => {
                this.popup.close();
                this.$auth.setToken('local', 'Bearer ' + data.token);
                await this.$auth.fetchUser();
                await this.$router.push('/user/profile');
            });
        }

        googleSignIn() {
            const url = `${process.env.API_URL}auth/google?socketId=${socket.id}`;
            this.popup = window.open(url, '',
                `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no`
            );
        }
    }
</script>
