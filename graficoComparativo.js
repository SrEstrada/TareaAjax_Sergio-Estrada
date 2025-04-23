document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Filtrar regiones excepto Lima y Callao
      const regiones = data.filter(region => region.region !== "Lima" && region.region !== "Callao");

      // Obtener fechas de una región como referencia
      const fechas = regiones[0].confirmed.map(d => d.date);

      // Construir datasets por región
      const datasets = regiones.map(region => ({
        label: region.region, // 🟢 Aquí usamos el nombre correcto
        data: region.confirmed.map(d => Number(d.value)),
        fill: false,
        borderColor: colorAleatorio(),
        tension: 0.1
      }));

      const ctx = document.getElementById('grafico-comparativo').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: fechas,
          datasets: datasets
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Confirmados por Día (sin Lima y Callao)'
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
});

function colorAleatorio() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h}, 70%, 50%)`;
}
