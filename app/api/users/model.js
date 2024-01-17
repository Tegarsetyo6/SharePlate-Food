const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { model, Schema } = mongoose;

let userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama harus diisi'],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email harus diisi'],
    },
    password: {
      type: String,
      required: [true, 'Password harus disi'],
      minLength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (nexy) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model('User', userSchema);
