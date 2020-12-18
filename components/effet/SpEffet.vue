<template>
    <span class="pa-2">
        <v-chip>
<!--            <v-avatar class="grey darken-4 pa-5">-->
            <b class="mr-2">
                    <span v-if="effet.quantite > 0">+</span>
                    <sp-text-editable
                        v-model="effet.quantite" ref="effetQuantite" label="" solo filled rounded
                        @save="update"
                    />
            </b>
<!--            </v-avatar>-->
            <sp-select-editable
                ref="effetUnite" v-model="effet.unite" :items="unites" name="unite"
                item-value="id" item-text="libelle" label="Unite..." @save="update"
                return-object
            />
<!--            <v-icon small right @click="editEffet">mdi-circle-edit-outline</v-icon>-->
            <v-icon small right @click="deleteEffet">mdi-delete-circle</v-icon>
        </v-chip>

    </span>
</template>

<script lang="ts">
    import {Action, Component, Vue} from 'nuxt-property-decorator';
    import Scenario from "../../models/Scenario";
    import Etape from "../../models/Etape";
    import {Prop} from "vue-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import SpTextareaEditable from "~/components/generic/SpTextareaEditable.vue";
    import Monde from "~/models/Monde";
    import {Getter} from "nuxt-class-component";
    import SpSelectEditable from "~/components/generic/SpSelectEditable.vue";

    @Component({
        components: {
            SpSelectEditable,
            SpTextEditable
        }
    })
    export default class SpEffet extends Vue {
        @Prop({required: true}) effet: any;
        @Action("effet/delete") delEffet: any;
        @Action("effet/put") putEffet: any;
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;

        $refs: any;

        get currentMonde(): any {
            return Monde.findOneById(this.getCurrentMondeId);
        }

        get unites() {
            return this.currentMonde ? this.currentMonde.unites : [];
        }

        // editEffet() {
        //     this.$refs.effetQte.edit();
        // }

        update() {
            this.putEffet({effet: this.effet});
        }

        deleteEffet() {
            this.delEffet({id: this.effet.id});
        }

    }

</script>

<style scoped>
    /*.v-chip .v-avatar {*/
    /*    width: 100% !important;*/
    /*}*/
</style>


