const mongoose = require("mongoose"); // importando el componente mogoose
const EspaciosSchema = mongoose.Schema({
    TipoEspacio: {
        type: String,
        require: true,
    },
    CodigoEspacio: {
        type: String,
        require: true,
    },
    CodigoModulo:{
        type: Number,
        require: true,
    }
});
module.exports = mongoose.model("Espacios", EspaciosSchema);