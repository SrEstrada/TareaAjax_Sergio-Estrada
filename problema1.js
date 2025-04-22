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
        const tipos = ["confirmed", "recover", "death", "hospital", "hospitaluci", "nohospital"];

        tipos.forEach(tipo => {
        const datasets = regionesFiltradas.map(region => {
            const datos = region[tipo];
            const fechas = datos.map(d => d.date);
            const valores = datos.map(d => Number(d.value));

            return {
            label: region.region,
            data: valores,
            borderColor: generarColor(region.region),
            fill: false,
            tension: 0.1
            };
        });

        const canvasId = `grafico-${tipo}`;
        const ctx = document.getElementById(canvasId).getContext("2d");

        new Chart(ctx, {
            type: "line",
            data: {
            labels: regionesFiltradas[0][tipo].map(d => d.date),
            datasets: datasets
            },
            options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: false }
            }
            }
        });
        });
      })
      .catch(error => {
        console.error('Error al cargar el archivo data.json:', error);
      });
  });
  
  function generarColor(nombre) {
    let hash = 0;
    for (let i = 0; i < nombre.length; i++) {
      hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  }