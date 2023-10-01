import { EventEmitter } from 'events';
import mongoose from 'mongoose';

export interface IUserEvents {
  emitUserConnected(userId: mongoose.Types.ObjectId): void;
  onUserConnected(
    listener: (data: { userId: mongoose.Types.ObjectId }) => void,
  ): void;
}

class UserEvents extends EventEmitter implements IUserEvents {
  constructor() {
    super();
  }

  emitUserConnected(userId: mongoose.Types.ObjectId) {
    this.emit('user_connected', { userId });
  }

  onUserConnected(
    listener: (data: { userId: mongoose.Types.ObjectId }) => void,
  ) {
    this.on('user_connected', listener);
  }
}

export default UserEvents;
