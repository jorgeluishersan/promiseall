// Simula peticiones a una API con posible fallo
function obtenerUsuario(id) {
    return () =>
      new Promise((resolve, reject) => {
        const tiempo = Math.random() * 2000 + 500;
        const fallo = Math.random() < 0.3; // 30% de chance de fallar
  
        setTimeout(() => {
          if (fallo) {
            reject(`❌ Error al cargar usuario ${id}`);
          } else {
            resolve(`✅ Usuario ${id} cargado`);
          }
        }, tiempo);
      });
  }
  
  // Simulación de Promise.all
  function promiseAll(funciones) {
    return new Promise((resolve, reject) => {
      const resultados = new Array(funciones.length);
      let completados = 0;
  
      funciones.forEach((fn, i) => {
        fn()
          .then((resultado) => {
            resultados[i] = resultado;
            completados++;
            if (completados === funciones.length) {
              resolve(resultados);
            }
          })
          .catch((error) => {
            reject(error); // En cuanto uno falle, todo falla
          });
      });
    });
  }
  
  // Interacción
  function cargarUsuarios() {
    const salida = document.getElementById("salida");
    salida.textContent = "⌛ Cargando usuarios...";
  
    const tareas = [
      obtenerUsuario(1),
      obtenerUsuario(2),
      obtenerUsuario(3),
      obtenerUsuario(4),
      obtenerUsuario(5)
    ];
  
    promiseAll(tareas)
      .then((resultados) => {
        salida.textContent = resultados.join("\n");
      })
      .catch((error) => {
        salida.textContent = `💥 Falló la carga: ${error}`;
      });
  }