const mongoose = require("mongoose"); // importando el componente mogoose
const EmpleadoSchema = mongoose.Schema({
    NumeroEmpleado: {
        type: Number,
        required: true,
    },
    Nombres: {
        type: String,
        required: true,
    },
    Apellidos: {
        type: String,
        required: true,
    },
    Identificacion: {
        type: Number,
        required: true,
    },
    fechaContratacion: {
        type: Date,
        requiered: true,
    },
    Dependencia: {
        type: String,
        required: true,
    },
    Estado: {
        type: String,
        required: true,
    },
    Reservas: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reservas'
    }]
});
module.exports = mongoose.model("Empleados", EmpleadoSchema);
