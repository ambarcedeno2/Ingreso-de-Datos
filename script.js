document.getElementById('clienteForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('nombres').value;
  const apellido = document.getElementById('apellidos').value;
  const edad = document.getElementById('edad').value;
  const cedula = document.getElementById('cedula').value;
  const email = document.getElementById('email').value;
  const direccion = document.getElementById('direccion').value;
  const telefono = document.getElementById('telefono').value;

  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      alert('Nombre inválido. Solo se permiten letras y espacios.');
      return;
  }

  if (!/^[a-zA-Z\s]+$/.test(apellido)) {
      alert('Apellido inválido. Solo se permiten letras y espacios.');
      return;
  }

  if (!/^\d{1,3}$/.test(edad) || edad < 1 || edad > 100) {
      alert('Edad inválida. Debe ser un número entre 1 y 100.');
      return;
  }

  if (!/^\d{10}$/.test(cedula)) {
      alert('Cédula inválida. Debe tener 10 dígitos.');
      return;
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert('Correo electrónico inválido.');
      return;
  }

  if (direccion.trim() === '') {
      alert('La dirección no puede estar vacía.');
      return;
  }

  if (!/^\d{10}$/.test(telefono)) {
      alert('Teléfono inválido. Debe tener 10 dígitos.');
      return;
  }

  const cliente = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      cedula: cedula,
      email: email,
      direccion: direccion,
      telefono: telefono
  };

  // Verificar si la cédula ya está registrada
  const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || [];

  const cedulaExiste = clientesGuardados.some(cliente => cliente.cedula === cedula);

  if (cedulaExiste) {
      alert('Ya existe un cliente con esta cédula.');
      return;
  }

  // Guardar datos en localStorage
  clientesGuardados.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientesGuardados));

  console.log('Datos del cliente guardados en localStorage:');
  console.log(cliente);

  document.getElementById('clienteForm').reset();
});

window.onload = function() {
  const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || [];
  
  if (clientesGuardados.length > 0) {
      const ultimoCliente = clientesGuardados[clientesGuardados.length - 1];
      document.getElementById('nombres').value = ultimoCliente.nombre;
      document.getElementById('apellidos').value = ultimoCliente.apellido;
      document.getElementById('edad').value = ultimoCliente.edad;
      document.getElementById('cedula').value = ultimoCliente.cedula;
      document.getElementById('email').value = ultimoCliente.email;
      document.getElementById('direccion').value = ultimoCliente.direccion;
      document.getElementById('telefono').value = ultimoCliente.telefono;
  }
};
