<template>
    <v-card>
        <v-card-text>
        <v-tabs v-model="tab">
            <v-tab>Se connecter</v-tab>
            <!--<v-tab>Créer son compte</v-tab>-->
        </v-tabs>
        <v-tabs-items v-model="tab">

            <v-tab-item>
                <form>
                    <v-alert v-if="showLoginError" type="error" dismissible>
                        Une erreur s'est produite lors de la connexion
                    </v-alert>
                    <div>
                        <v-text-field v-model="user.username" label="login" @keypress.enter="userLogin"/>
                    </div>
                    <div>
                        <v-text-field v-model="user.password" type="password" label="password" @keypress.enter="userLogin" />
                    </div>
                    <div>
                        <v-btn @click="userLogin">Submit</v-btn>
                    </div>
                </form>
            </v-tab-item>

<!--            <v-tab-item>-->
<!--                <form>-->
<!--                    <div>-->
<!--                        <v-text-field v-model="user.username" label="Login" />-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        <v-text-field v-model="user.email" label="Email" />-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        <v-text-field v-model="user.password" label="Password" type="password" @keypress.enter="userRegister"/>-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        <v-btn @click="userRegister" rounded dense>Valider</v-btn>-->
<!--                    </div>-->
<!--                </form>-->
<!--            </v-tab-item>-->

        </v-tabs-items>
        </v-card-text>
<!--        <v-card-actions>-->
<!--            <v-row>-->
<!--                <v-btn class="button" v-on:click="googleSignIn()">Sign in with google</v-btn>-->
<!--            </v-row>-->
<!--        </v-card-actions>-->
        <!--    <button @click="userLogin">FACEBOOK !</button>-->
        <!--    <button class="v-btn" @click="log('google')">GOOGLE !</button>-->
    </v-card>
</template>

<script>
    import socket from '@/plugins/socket.io.js';

    export default {
        data() {
            return {
                tab: null,
                popup: null,
                showLoginError : false,
                error: '',
                user: {
                    username: '',
                    password: '',
                    email: ''
                }
            }
        },
        created() {
            socket.on('google', async data => {
                this.popup.close();
                this.$auth.setToken('local', 'Bearer ' + data.token);
                await this.$auth.fetchUser();
                this.$router.push('/user/profile');
            });
        },
        methods: {
            async userLogin() {
                // this.$axios.post('/auth/login',this.user);
                try {
                    await this.$auth.loginWith('local', {
                        data: this.user,
                    });
                    this.$router.push('/');
                } catch (e) {
                    this.showLoginError = true;
                    this.error = e.response.data.message;
                }

            },
            userRegister() {
                this.$axios.post('/auth/register', this.user);
            },
            googleSignIn() {
                this.popup = this.openPopup();
            },
            // Launch popup authentication
            openPopup() {
                const url = `http://127.0.0.1:3000/auth/google?socketId=${ socket.id }`;
                return window.open(url, '',
                    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no`
                );
            }
        }
    }
</script>
