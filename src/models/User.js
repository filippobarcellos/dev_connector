import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

UserSchema.pre('save', async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

UserSchema.methods.checkPassword = function (requestedPassword) {
  return bcrypt.compare(requestedPassword, this.password);
};

module.exports = mongoose.model('user', UserSchema);
