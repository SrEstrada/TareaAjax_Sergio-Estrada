document.getElementById('generar').addEventListener('click', function () {
    const select = document.getElementById('regiones');
    const regionesSeleccionadas = Array.from(select.selectedOptions).map(option => option.value);
  
    // Cargar el archivo JSON
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Filtrar solo las regiones seleccionadas
        const regionesFiltradas = data.filter(regionData => regionesSeleccionadas.includes(regionData.region));
  
        // Mostrar en consola para verificar
        console.log("Regiones seleccionadas:", regionesSeleccionadas);
        console.log("Datos filtrados:", regionesFiltradas);
      })
      .catch(error => {
        console.error('Error al cargar el archivo data.json:', error);
      });
  });
  