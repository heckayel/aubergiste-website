<template>
    <div class="consequence-possible-list">
        <sp-consequence-possible
            v-if="consequencePossibles"
            v-for="consequencePossible of consequencePossibles"
            :key="'consequence-possible-'+consequencePossible.id"
            :consequence-possible="consequencePossible"
        />
        <v-divider />
        <v-btn class="text-transform-none" @click="createConsequencePossible">
            <v-icon class="pr-2">mdi-plus-circle-outline</v-icon> Ajouter une conséquence possible
        </v-btn>
        <sp-modal ref="modalCreateConsequencePossible">
            <template v-slot:title>Ajouter une conséquence possible</template>
            <template v-slot:text>
                <sp-consequence-possible-create
                    :reponse-id="reponseId"
                    @created="consequencePossibleCreated"
                />
            </template>
        </sp-modal>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator';
    import {Prop} from "vue-property-decorator";
    import SpEffet from "~/components/effet/SpEffet.vue";
    import SpConsequencePossible from "~/components/consequence-possible/SpConsequencePossible.vue";
    import SpConsequencePossibleCreate from "~/components/consequence-possible/SpConsequencePossibleCreate.vue";
    import SpModal from "~/components/generic/SpModal.vue";

    @Component({
        components: {
            SpModal,
            SpConsequencePossibleCreate,
            SpConsequencePossible
        }
    })
    export default class SpConsequencePossibleList extends Vue {
        @Prop() consequencePossibles: any;
        @Prop({required: true}) reponseId: any;
        $refs: any;

        createConsequencePossible() {
            this.$refs.modalCreateConsequencePossible.open();
        }

        consequencePossibleCreated() {
            this.$refs.modalCreateConsequencePossible.close();
            this.$emit('created');
        }

    }
</script>
