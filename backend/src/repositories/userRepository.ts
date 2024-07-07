import User, { UserDocument } from '../models/user';

export class UserRepository {
  async findByUsername(username: string): Promise<UserDocument | null> {
    return User.findOne({ username }).exec();
  }

  async save(user: UserDocument): Promise<UserDocument> {
    return user.save();
  }
}
