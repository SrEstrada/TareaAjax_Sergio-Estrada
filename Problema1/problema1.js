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
          hospitaluci: {},
          nohospital: {}
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
        const ctxConfirmed = document.getElementById('grafico-confirmed').getContext('2d');
        // Destruimos gráfico anterior si existe (por si se vuelve a generar)
        if (window.graficoConfirmed) {
          window.graficoConfirmed.destroy();
        }
        
        // Creamos gráfico confirmados
        window.graficoConfirmed = new Chart(ctxConfirmed, {
          type: 'bar',
          data: {
            labels: Object.keys(totales.confirmed),
            datasets: [{
              label: 'Confirmados',
              data: Object.values(totales.confirmed),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Casos Confirmados por Región'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        // RECOVER
        const ctxRecover = document.getElementById('grafico-recover').getContext('2d');
        if (window.graficoRecover) window.graficoRecover.destroy();
        window.graficoRecover = new Chart(ctxRecover, {
        type: 'bar',
        data: {
            labels: Object.keys(totales.recover),
            datasets: [{
            label: 'Recuperados',
            data: Object.values(totales.recover),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
            legend: { display: false },
            title: { display: true, text: 'Recuperados por Región' }
            },
            scales: { y: { beginAtZero: true } }
        }
        });

        // DEATH
        const ctxDeath = document.getElementById('grafico-death').getContext('2d');
        if (window.graficoDeath) window.graficoDeath.destroy();
        window.graficoDeath = new Chart(ctxDeath, {
        type: 'bar',
        data: {
            labels: Object.keys(totales.death),
            datasets: [{
            label: 'Fallecidos',
            data: Object.values(totales.death),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
            legend: { display: false },
            title: { display: true, text: 'Fallecidos por Región' }
            },
            scales: { y: { beginAtZero: true } }
        }
        });

        // HOSPITAL
        const ctxHospital = document.getElementById('grafico-hospital').getContext('2d');
        if (window.graficoHospital) window.graficoHospital.destroy();
        window.graficoHospital = new Chart(ctxHospital, {
        type: 'bar',
        data: {
            labels: Object.keys(totales.hospital),
            datasets: [{
            label: 'Hospitalizados',
            data: Object.values(totales.hospital),
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
            legend: { display: false },
            title: { display: true, text: 'Hospitalizados por Región' }
            },
            scales: { y: { beginAtZero: true } }
        }
        });

        // HOSPITAL UCI
        const ctxHospitalUci = document.getElementById('grafico-hospitaluci').getContext('2d');
        if (window.graficoHospitalUci) window.graficoHospitalUci.destroy();
        window.graficoHospitalUci = new Chart(ctxHospitalUci, {
        type: 'bar',
        data: {
            labels: Object.keys(totales.hospitaluci),
            datasets: [{
            label: 'UCI',
            data: Object.values(totales.hospitaluci),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
            legend: { display: false },
            title: { display: true, text: 'Casos en UCI por Región' }
            },
            scales: { y: { beginAtZero: true } }
        }
        });

        // NO HOSPITAL
        const ctxNoHospital = document.getElementById('grafico-nohospital').getContext('2d');
        if (window.graficoNoHospital) window.graficoNoHospital.destroy();
        window.graficoNoHospital = new Chart(ctxNoHospital, {
        type: 'bar',
        data: {
            labels: Object.keys(totales.nohospital),
            datasets: [{
            label: 'Sin Hospitalización',
            data: Object.values(totales.nohospital),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
            legend: { display: false },
            title: { display: true, text: 'Casos sin Hospitalización por Región' }
            },
            scales: { y: { beginAtZero: true } }
        }
        });
      })
      .catch(error => {
        console.error('Error al cargar data.json:', error);
      });
  });
  