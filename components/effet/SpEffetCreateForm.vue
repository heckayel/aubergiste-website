<template>
    <v-form id="effet-form" class="pl-4" ref="effetFormRef" v-model="valid">
        <v-row>
            <v-col>
                <v-alert v-model="error" type="error" dismissible dense transition="fade-transition">
                    {{ messageError }}
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-text-field v-model.number="modelEffet.quantite" label="Quantité" required outlined dense />
            </v-col>
            <v-col>
                <v-select
                    :items="unites" name="unite" item-value="id" item-text="libelle"
                    label="Unite..." v-model="modelEffet.unite" return-object
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea outline name="texte" label="Texte" rows="1" v-model="modelEffet.texte" />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-btn :disabled="!valid" @click="save">Valider</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
<script lang="ts">
    import Vue from "vue";
    import {Action, Component} from "nuxt-property-decorator";
    import SpTextEditable from "~/components/generic/SpTextEditable.vue";
    import {Prop} from "vue-property-decorator";
    import Unite from "~/models/Unite";
    import {Getter} from "nuxt-class-component";
    import Monde from "~/models/Monde";

    @Component({
        components: {
            SpTextEditable
        }
    })
    export default class SpEffetCreateForm extends Vue {
        @Prop({required: true}) etapeId: any;
        @Action('effet/post') postEffet: any;
        @Getter('monde/getCurrentMondeId') getCurrentMondeId: any;

        modelEffet: any = {};
        valid: boolean = false;
        error: boolean = false;
        messageError: string = "";


        get currentMonde() : any{
            return Monde.findOneById(this.getCurrentMondeId);
        }

        get unites(){
            return this.currentMonde ? this.currentMonde.unites : [];
        }

        async save() {
            try {
                const data = await this.postEffet({
                    effet: {
                        ...this.modelEffet,
                        etape: {id: this.etapeId}
                    }
                });
                this.modelEffet = {};
                this.$emit('created', {effet: data});
            } catch (error) {
                this.messageError = 'Une erreur a eu lieu';
                if (error.data) {
                    this.messageError = error.data.error;
                }
                this.error = true;
            }
        }
    }
</script>
