
// SEHR WICHTIG damit der KIOSK funktioniert

// Die Personen_ID wird hier wie eine globale Variable behandelt damit jede Page und Component, die aktuelle Personen_ID nutzen/importieren kann 
// Vorher wurde global.js mit einem global store benutzt, jedoch wurde damit nach jeder session(z.B. Reload der Seite) die Personen_ID auf null zurückgesetzt 

import { ref, watch } from 'vue';

// hier wird die function exportiert damit jede page und component zugreifen können 
export function useGlobalState() {
  // Initialisiert den Zustand mit null, wenn die Anwendung nicht auf der Client-Seite (SSR) bzw. auf NUXT läuft
  // Terminal im VSCode zeigt bei z.B. initial Personen_ID: null 

  const Personen_ID = ref(process.client ? localStorage.getItem('Personen_ID') : null);

  // Synchronisiert den state nur auf der Client-Seite mit localStorage
  if (process.client) {
    watch(Personen_ID, (newID) => {
      localStorage.setItem('Personen_ID', newID);
    });
  }
 // hier wird die Personen_ID bestimmt; siehe user.vue 
  function setPersonen_ID(newID) {
    Personen_ID.value = newID;
  }
// hier wird die Personen_ID auf null zurückgesetzt; siehe Logoutbtn.vue 
  function resetPersonen_ID() {
    Personen_ID.value = null;
  }

  return { Personen_ID, setPersonen_ID, resetPersonen_ID };
}
