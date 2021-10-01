// MUDAR PARA SQL

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inscricaoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: Number,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  local: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
