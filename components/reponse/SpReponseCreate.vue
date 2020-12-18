<template>
    <v-form id="reponse-form" class="pl-4" ref="reponseFormRef" v-model="valid">
        <v-row>
            <v-col>
                <v-alert v-model="error" type="error" dismissible dense transition="fade-transition">
                    {{ messageError }}
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-text-field
                    v-model="modelReponse.libelle" :prefix="discordPrefix + 'reponse'"
                    label="Commande à saisir" required
                    outlined dense
                />
            </v-col>
            <v-col>
                <v-text-field v-model="modelReponse.titre" label="Titre" required outlined dense />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    outline
                    v-model="modelReponse.texte"
                    name="text"
                    label="Texte"
                    rows="3"
                    dense
                />
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
    import {Action, Component, Vue} from 'nuxt-property-decorator';
    import {Prop} from "vue-property-decorator";
    import SpReponse from "~/components/reponse/SpReponse.vue";

    @Component({
        components: {
            SpReponse
        }
    })
    export default class SpReponseCreate extends Vue {

        @Prop({required: true}) etapeId: any;
        @Action('reponse/post') postReponse: any;
        valid: boolean = false;
        modelReponse: any = {};
        error: boolean = false;
        messageError: string = "";
        discordPrefix: string = "!";

        async save() {
            try {
                const data = await this.postReponse({
                    reponse: {
                        ...this.modelReponse,
                        etape: {id: this.etapeId}
                    }
                });
                this.modelReponse = {};
                this.$emit('created', {reponse: data});
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
