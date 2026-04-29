function startLoading() {
  const check = document.getElementById("check-parent");
  check.classList.add("loading");

  setTimeout(() => {
    const fase1 = document.getElementById("captcha-phase");
    const fase2 = document.getElementById("essay-phase");

    fase1.style.opacity = "0";
    setTimeout(() => {
      fase1.style.display = "none";
      fase2.classList.add("fase-activa");
    }, 400);
  }, 1500);
}

const textArea = document.getElementById("essay-text");
const wordDisplay = document.getElementById("word-count-display");
const charDisplay = document.getElementById("char-count");

textArea.addEventListener("input", () => {
  const texto = textArea.value.trim();
  const palabras = texto === "" ? 0 : texto.split(/\s+/).length;

  charDisplay.innerText = texto.length;
  wordDisplay.innerText = palabras;

  if (palabras >= 200) {
    wordDisplay.classList.add("meta-alcanzada");
  } else {
    wordDisplay.classList.remove("meta-alcanzada");
  }
});

function enviarEnsayo() {
  const texto = textArea.value.toLowerCase();
  const palabras = texto.split(/\s+/).length;
  const veredicto = document.getElementById("veredict");

  veredicto.style.display = "block";
  veredicto.innerHTML = "Analizando micro-pulsaciones del teclado...";

  setTimeout(() => {
    const emociones = [
      "miedo",
      "hambre",
      "sueño",
      "cansado",
      "familia",
      "error",
      "justicia",
      "existencia",
    ];
    const tieneEmocion = emociones.some((emo) => texto.includes(emo));

    if (palabras < 200) {
      veredicto.innerHTML =
        "❌ DENEGADO: Tu respuesta es demasiado corta. Los humanos reales tienen mucho que decir sobre su miseria.";
      veredicto.style.color = "red";
    } else if (!tieneEmocion) {
      veredicto.innerHTML =
        "⚠️ SOSPECHOSO: Texto demasiado perfecto y robótico. Escribe con más sentimiento (hambre, miedo, cansancio).";
      veredicto.style.color = "orange";
    } else {
      veredicto.innerHTML =
        "✅ BIENVENIDO HUMANO: Se detectó angustia existencial legítima. Puedes pasar.";
      veredicto.style.color = "green";
    }
  }, 2000);
}
