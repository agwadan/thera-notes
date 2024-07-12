import Journal, { JournalDocument } from '../models/journal';

export class JournalRepository {
  async findByUser(userId: string): Promise<JournalDocument[]> {
    return Journal.find({ user: userId }).exec();
  }

  async save(journal: JournalDocument): Promise<JournalDocument> {
    return journal.save();
  }

  async findByIdAndUpdate(id: string, update: Partial<JournalDocument>): Promise<JournalDocument | null> {
    return Journal.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async findByIdAndDelete(id: string): Promise<JournalDocument | null> {
    return Journal.findByIdAndDelete(id).exec();
  }
}
