document.getElementById("generar").addEventListener("click", function () {
    const select = document.getElementById("regiones");
    const regionesSeleccionadas = [];
  
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].selected) {
        regionesSeleccionadas.push(select.options[i].value);
      }
    }
  
    console.log("Regiones seleccionadas:", regionesSeleccionadas);
  });