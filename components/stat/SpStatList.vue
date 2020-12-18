<template>
    <div class="stats">
        <span v-for="stat of stats" class="pa-1">
            <v-chip>
                <v-avatar class="grey darken-4 pa-3 mr-1">{{ stat.quantite }}</v-avatar>
                {{ stat.unite.libelle }}
            </v-chip>
        </span>
    </div>
</template>

<script lang="ts">
    import {Action, Component} from "nuxt-property-decorator";
    import {Prop, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class SpStatList extends Vue {

        @Prop({type: Array, required: true}) stats!: any;

    }
</script>

<style scoped>

</style>
