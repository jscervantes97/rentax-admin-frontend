const spanish = {
    1: "Usuario o contraseña incorrectos",
    2: "Ya existe un usuario con ese correo electrónico",
    3: "No puedes eliminarte a ti mismo",
    4: "No se encontro el usuario"
  };
  
  module.exports = {
    translate: code => {
      const message = spanish[code];
      if (message) {
        return message;
      }
      return "Error inesperado";
    }
  };