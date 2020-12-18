<template>
    <form>
        <div>
            <v-text-field v-model="user.username" label="Login" />
        </div>
        <div>
            <v-text-field v-model="user.email" label="Email" />
        </div>
        <div>
            <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                @keypress.enter="userRegister"
            />
        </div>
        <div>
            <v-btn @click="userRegister" rounded dense>Valider</v-btn>
        </div>
    </form>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter} from "nuxt-class-component";

    @Component({
        components: {}
    })
    export default class RegisterForm extends Vue {

        @Getter('isAuthenticated') isAuthenticated: any;
        @Getter('getPreferences') getPreferences: any;

        user = {
            username: '',
            password: '',
            email: ''
        };

        $auth: any;
        $axios: any;

        mounted() {
            if (this.isAuthenticated) {

            }
        }

        userRegister() {
            this.$axios.post('/auth/register', this.user);
        }

    }
</script>
