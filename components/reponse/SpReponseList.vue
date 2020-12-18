<template>
    <div class="reponse-list">
        <sp-reponse v-for="reponse of reponses" :key="'reponse-' + reponse.id" :reponse="reponse" v-on="$listeners" />
        <v-divider />
        <v-btn class='text-transform-none' @click="createReponse">
            <v-icon class="pr-2">mdi-plus-circle-outline</v-icon> Ajouter une réponse
        </v-btn>
        <sp-modal ref="modalCreateReponse">
            <template v-slot:title>Ajouter une réponse</template>
            <template v-slot:text>
                <sp-reponse-create :etape-id="etapeId" @created="reponseCreated" />
            </template>
        </sp-modal>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator';
    import Etape from "../../models/Etape";
    import {Prop} from "vue-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import SpTextareaEditable from "~/components/generic/SpTextareaEditable.vue";
    import SpEffetList from "~/components/effet/SpEffetList.vue";
    import SpReponse from "~/components/reponse/SpReponse.vue";
    import SpModal from "~/components/generic/SpModal.vue";
    import SpReponseCreate from "~/components/reponse/SpReponseCreate.vue";

    @Component({
        components: {
            SpReponseCreate,
            SpModal,
            SpReponse
        }
    })
    export default class SpReponseList extends Vue {
        @Prop() reponses: any;
        @Prop({required: true}) etapeId: any;
        valid: boolean = false;
        $refs: any;

        createReponse() {
            this.$refs.modalCreateReponse.open();
        }

        reponseCreated() {
            this.$refs.modalCreateReponse.close();
            this.$emit('created');
        }
    }
</script>
