import * as mongoose from 'mongoose';

const RoomsSchema = new mongoose.Schema({
    title: String,
    owner: String, 
    users: {
      type: [String],

    },
    access_link: String,
    duration: Number,
    tags: {
        type: [String], // Define o tipo como um array de strings
        required: false, // Torna o campo tags opcional
    },
}, {
  timestamps: true
});

RoomsSchema.pre('save', function(next) {
  // Verifica se a sala (room) não tem o autor já na lista de usuários (users).
  if (!this.users.includes(this.owner)) {
      // Adiciona o autor (owner) à lista de usuários (users).
      this.users.push(this.owner);
  }
  next(); // Continua com o processo de salvamento.
});

  
export { RoomsSchema };