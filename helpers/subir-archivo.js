const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];



        // Validar la extensión 

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, Solo se admiten archivos: ${extensionesValidas}`);
        }


        // llamamos a la funcion que genera el uuid y lo almacenamos en nombreTemp.
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });


    });










}

module.exports = {
    subirArchivo
}