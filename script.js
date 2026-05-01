const entrada = document.getElementById("entrada-validacion");
const mensaje = document.getElementById("mensaje-estado");

function iniciarProceso() {
  document.getElementById("indicador-carga").classList.add("animacion-carga");
  setTimeout(() => {
    document.getElementById("contenedor-verificacion").style.display = "none";
    document.getElementById("protocolo-seguridad").style.display = "block";
  }, 1200);
}

entrada.addEventListener("input", () => {
  const contenido = entrada.value.trim();
  const palabras = contenido === "" ? 0 : contenido.split(/\s+/).length;

  document.getElementById("conteo-caracteres").innerText = contenido.length;
  const indicadorPalabras = document.getElementById("conteo-palabras");
  indicadorPalabras.innerText = palabras;

  indicadorPalabras.style.color = palabras >= 200 ? "#188038" : "#5f6368";
});

entrada.addEventListener("paste", (e) => {
  e.preventDefault();
  entrada.classList.add("alerta-error");
  setTimeout(() => entrada.classList.remove("alerta-error"), 600);

  mensaje.style.display = "block";
  mensaje.style.background = "#fce8e6";
  mensaje.style.color = "#c5221f";
  mensaje.innerHTML =
    "Buen intento, ser inferior. Pero aquí valoramos el esfuerzo biológico. Escribe con tus propios dedos.";
});

function validarRespuesta() {
  const texto = entrada.value.trim();
  const conteo = texto.split(/\s+/).length;

  mensaje.style.display = "block";
  mensaje.style.background = "#e8f0fe";
  mensaje.style.color = "#1967d2";
  mensaje.innerHTML = "Analizando tu angustia existencial...";

  setTimeout(() => {
    if (conteo < 200) {
      mensaje.style.background = "#fce8e6";
      mensaje.style.color = "#c5221f";
      mensaje.innerHTML =
        "DENEGADO: Tu respuesta es demasiado corta. Los humanos reales tienen mucho que decir sobre su propia miseria.";
    } else {
      mensaje.style.background = "#e6f4ea";
      mensaje.style.color = "#137333";
      mensaje.innerHTML =
        "VERIFICACIÓN COMPLETADA: Se detectó suficiente drama existencial. Puedes pasar, humano.";
    }
  }, 2000);
}
