// Variables globales para guardar los gráficos
const charts = {};

document.getElementById('generar').addEventListener('click', function () {
  const select = document.getElementById('regiones');
  const regionesSeleccionadas = Array.from(select.selectedOptions).map(option => option.value);

  // Cargar el archivo JSON
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const regionesFiltradas = data.filter(regionData => regionesSeleccionadas.includes(regionData.region));

      console.log("Regiones seleccionadas:", regionesSeleccionadas);
      console.log("Datos filtrados:", regionesFiltradas);

      const tipos = ["confirmed", "recover", "death", "hospital", "hospitaluci", "nohospital"];

      tipos.forEach(tipo => {
        const datasets = regionesFiltradas.map(region => {
          const datos = region[tipo];
          return {
            label: region.region,
            data: datos.map(d => Number(d.value)),
            borderColor: generarColor(region.region),
            fill: false,
            tension: 0.1
          };
        });

        const canvasId = `grafico-${tipo}`;
        const ctx = document.getElementById(canvasId).getContext("2d");

        // Si ya hay un gráfico para este tipo, destrúyelo
        if (charts[tipo]) {
          charts[tipo].destroy();
        }

        // Crear nuevo gráfico y guardarlo
        charts[tipo] = new Chart(ctx, {
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
  return `hsl(${hash % 360}, 70%, 50%)`;
}
