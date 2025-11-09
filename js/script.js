const storage = window.localStorage;
let personas = [];
let storedPeople = storage.getItem("personas");
if (storedPeople) {
  personas = JSON.parse(storedPeople);
} else {
  storage.setItem("personas", JSON.stringify(personas));
}
function esEmailValido(email){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
actualizarLista();
function agregarPersona() {
    const msgErrorNombre = document.querySelector("#msg-error-nombre"); 
    msgErrorNombre.innerHTML = "";
    const msgErrorEdad = document.querySelector("#msg-error-edad");
    msgErrorEdad.innerHTML = "";
    const msgErrorEmail = document.querySelector("#msg-error-email");
    msgErrorEmail.innerHTML = "";
    const inputNombre = document.querySelector("#input-nombre");
    const inputEdad = document.querySelector("#input-edad");
    const inputEmail = document.querySelector("#input-email");
    inputNombre.classList.remove("error-input");
    inputEdad.classList.remove("error-input");
    inputEmail.classList.remove("error-input");
    let hayError = false;
    const nombre = inputNombre.value.trim();
    if (nombre === "") {
        msgErrorNombre.innerHTML = "Debe ingresar un nombre";
        inputNombre.classList.add("error-input");
        hayError = true;
    }
    let edad = inputEdad.valueAsNumber;
    if (isNaN(edad)) {
        msgErrorEdad.innerHTML = "Debe ingresar una edad";
        inputEdad.classList.add("error-input");
        hayError = true;
    } else if (!Number.isInteger(edad) || edad <= 0) {
        msgErrorEdad.innerHTML = "La edad debe ser un número entero positivo";
        inputEdad.classList.add("error-input");
        hayError = true;
    }
    const email = inputEmail.value.trim();
    if (email === "") {
        msgErrorEmail.innerHTML = "Debe ingresar un email";
        inputEmail.classList.add("error-input");
        hayError = true;
    } else if (!esEmailValido(email)) {
        msgErrorEmail.innerHTML = "El email ingresado no es válido";
        inputEmail.classList.add("error-input");
        hayError = true;
    }
    if (hayError) {
        return;
    }
    const nuevaPersona = {
        nombre: nombre,
        edad: edad,
        email: email    
    };
    personas.push(nuevaPersona);
    storage.setItem("personas", JSON.stringify(personas));
    inputNombre.value = "";
    inputEdad.value = "";
    inputEmail.value = "";
    actualizarLista();

}
function eliminar(i) {
    const respuesta = confirm("¿Está seguro que desea eliminar esta persona?");
    if (respuesta === false){
        return;
    }
    personas.splice(i, 1);
    storage.setItem("personas", JSON.stringify(personas));
    actualizarLista();
}
function actualizarLista() {
    const listaNombresHtml = document.getElementById("lista-nombres");
    if (personas.length === 0) {
    listaNombresHtml.innerHTML = `
              <tr>
                <td colspan="4">No hay personas registradas</td>
                </tr>`;
    return;
  }
    let html = "";
    for(let i in personas){
        const persona = personas[i];
        html +=
      `<tr>
        <td>
        <input class="btn-delete" type="button" onclick="eliminar(${i})" value="Eliminar"></td>` +
      "<td>" +
      persona.nombre +
      "</td><td>" +
      persona.edad +
      "</td><td>" +
      (persona.email ? persona.email : "") +
      "</td></tr>";
    }
    listaNombresHtml.innerHTML =  html;
}