document.getElementById('generar').addEventListener('click', function () {
    // Obtener todas las regiones seleccionadas
    const checkboxes = document.querySelectorAll('#checkbox-regiones input[type="checkbox"]:checked');
    const regionesSeleccionadas = Array.from(checkboxes).map(cb => cb.value);
  
    // Mostrar en consola para verificar
    console.log("Regiones seleccionadas:", regionesSeleccionadas);

  });