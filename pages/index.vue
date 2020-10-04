<template>
    <div class="container">
        <commands />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Commands from "~/components/bot/commands.vue";
    import {Component} from "vue-property-decorator";
    import {RolesEnum} from "~/core/enums/roles.enum";


    @Component({
        components: {Commands},
        middleware: ['auth', 'role'],
        meta: {
            roles: [RolesEnum.ADMIN]
        }
    })
    export default class Index extends Vue {

    }
</script>
