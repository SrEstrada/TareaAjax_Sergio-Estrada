fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí tienes tus datos, ahora los puedes usar para graficar
  })
  .catch(error => console.error('Error cargando el JSON:', error));
//Aqui le estoy pidiendo información a chatgpt de como funciona el sacar datos del json
//y esto es un ejemplo básico