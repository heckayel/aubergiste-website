<template>
    <div class="effet-list">
        <v-row>
            <v-col>
                <sp-effet v-if="effets" v-for="effet of effets" :key="effet.id" :effet="effet" />
            </v-col>
        </v-row>
        <v-row v-if="showFormEffet">
            <v-col>
                <sp-effet-create-form :etape-id="etapeId" @created="effetCreated"/>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-btn class='text-transform-none' @click="createEffet">
                    <v-icon class="pr-2">mdi-plus-circle-outline</v-icon> Ajouter un effet
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator';
    import {Prop} from "vue-property-decorator";
    import SpEffet from "~/components/effet/SpEffet.vue";
    import SpEffetCreateForm from "~/components/effet/SpEffetCreateForm.vue";

    @Component({
        components: {
            SpEffetCreateForm,
            SpEffet
        }
    })
    export default class SpEffetList extends Vue {
        @Prop() effets: any;
        @Prop({required: true}) etapeId: any;
        valid: boolean = false
        showFormEffet:boolean = false;
        createEffet(){
            this.showFormEffet = true;
        }

        effetCreated() {
            this.showFormEffet = false;
            this.$emit('created');
        }
    }
</script>
