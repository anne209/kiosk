import { reactive } from 'vue';

export const globalStore = reactive({
  Personen_ID: null,
    
  resetPersonen_ID() {
    this.Personen_ID = null;
  },
});