<template>
    <div>
        <v-row>
            <h1> Oh non ! :'(</h1>
        </v-row>
        <v-row>
            <v-col>
                Ce scenario n'a pas été trouvé...
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator'
    import {RolesEnum} from "~/core/enums/roles.enum";

    @Component({
        components: {},
        middleware: ['auth', 'role'],
        meta: {
            roles: [RolesEnum.ADMIN, RolesEnum.MEMBER]
        }
    })
    export default class NotFound extends Vue {

    }
</script>

<style>
</style>
