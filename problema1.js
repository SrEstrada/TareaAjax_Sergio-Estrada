document.getElementById('generar').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#checkbox-regiones input[type="checkbox"]');
    const regionesSeleccionadas = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  
    if (regionesSeleccionadas.length === 0) {
      alert("Selecciona al menos una región.");
      return;
    }
  
    console.log("Regiones seleccionadas:", regionesSeleccionadas);
  
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const regionesFiltradas = data.filter(region => regionesSeleccionadas.includes(region.region));
        console.log("Regiones filtradas:", regionesFiltradas);
  
        // Aún no sumamos ni graficamos, ese es el próximo paso
      })
      .catch(error => {
        console.error('Error al cargar data.json:', error);
      });
  });
  