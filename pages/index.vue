<template>

    <v-container>
        <connection v-if="!isAuthenticated" />
    </v-container>

</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from "vue-property-decorator";
    import ScenarioCreate from "~/components/scenarios/ScenarioCreate.vue";
    import Connection from "~/pages/user/connection.vue";
    import {Getter} from "nuxt-class-component";
    import SpMonde from "~/components/monde/SpMonde.vue";
    import ConnectionForm from "~/components/user/connection-form.vue";

    @Component({
        components: {ConnectionForm, SpMonde, ScenarioCreate, Connection},
        // middleware: ['auth', 'role'],
        // meta: {
        //     roles: [RolesEnum.ADMIN]
        // }
    })
    export default class Index extends Vue {
        @Getter('isAuthenticated') isAuthenticated: any;
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;
    }
</script>
