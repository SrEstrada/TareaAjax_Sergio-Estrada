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
  
        // Inicializamos objetos para cada tipo de caso
        const totales = {
          confirmed: {},
          recover: {},
          death: {},
          hospital: {},
          hospitalUci: {},
          noHospital: {}
        };
  
        regionesFiltradas.forEach(region => {
          const nombreRegion = region.region;
  
          // Para cada tipo de caso, sumamos los valores si existen
          Object.keys(totales).forEach(tipo => {
            const registros = Array.isArray(region[tipo]) ? region[tipo] : [];
            const total = registros.reduce((suma, entrada) => {
              return suma + parseInt(entrada.value);
            }, 0);
            totales[tipo][nombreRegion] = total;
          });
        });
  
        console.log("Totales por tipo de caso:", totales);
  
        // Siguiente paso: graficar con estos totales
      })
      .catch(error => {
        console.error('Error al cargar data.json:', error);
      });
  });
  