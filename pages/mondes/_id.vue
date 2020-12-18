<template>
    <sp-monde v-if="id" :id="id" />
</template>

<script lang="ts">
    import {Action, Component, Vue} from 'nuxt-property-decorator'
    import SpMonde from "~/components/monde/SpMonde.vue";
    import {RolesEnum} from "~/core/enums/roles.enum";

    @Component({
        components: {SpMonde},
        middleware: ['auth', 'role'],
        meta: {
            roles: [RolesEnum.ADMIN,RolesEnum.MEMBER]
        }
    })
    export default class Id extends Vue {

        @Action('monde/fetchById') fetchById: any;
        id:string|null = null;

        async mounted(){
            this.id = this.$route.params.id;
            // await this.fetchById({id:this.id});
        }
    }
</script>

<style>
</style>
