
// SEHR WICHTIG damit der KIOSK funktioniert

// Die Personen Daten (Personen_ID, Name, Vorname ) werden hier als globale Variablen behandelt damit jede Page und Component, die aktuelle Personen_ID nutzen/importieren kann 
// Vorher wurde global.js mit einem global store benutzt, jedoch wurde damit nach jeder session(z.B. Reload der Seite) die Personen_ID auf null zurückgesetzt 

import { ref, watch } from 'vue';

// hier wird die function exportiert damit jede page und component zugreifen können 
export function useGlobalState() {
  // Initialisiert den Zustand mit null, wenn die Anwendung nicht auf der Client-Seite (SSR) bzw. auf NUXT läuft
  // Terminal im VSCode zeigt bei z.B. initial Personen_ID: null 

  const Personen_ID = ref(process.client ? localStorage.getItem('Personen_ID') : null);
  const Name = ref(process.client ? localStorage.getItem('Name') : null); // Name und Vorname werden global benutzt
  const Vorname = ref(process.client ? localStorage.getItem('Vorname') : null);
  // Synchronisiert den state nur auf der Client-Seite mit localStorage
  if (process.client) {
    watch(Personen_ID, (newID) => {
      localStorage.setItem('Personen_ID', newID);
    });
    watch(Name, (newName) => {
      localStorage.setItem('Name', newName);
    });
    watch(Vorname, (newVorname) => {
      localStorage.setItem('Vorname', newVorname);
    });
  }
 // hier werden die Personen Daten auf null zurückgesetzt; siehe user.vue 
  function setPersonen_ID(newID) {
    Personen_ID.value = newID;
  }
  function setName(newName) {
    Name.value = newName;
  }
  function setVorname(newVorname) {
    Vorname.value = newVorname;
  }
// hier werden die  Personen Daten auf null zurückgesetzt; siehe Logoutbtn.vue 
function resetPersonen() {
  Personen_ID.value = null;
  Name.value = null;
  Vorname.value = null;
}

return { Personen_ID, Name, Vorname, setPersonen_ID, setName, setVorname, resetPersonen };
}
