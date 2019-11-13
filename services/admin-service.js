const moderatorModel = require('../models/moderator.model');

class AdminService {
  async createModerator(data) {
    try {
      const { file } = data;
      console.log(file);
      const avatar = file ? `/${file.path}` : '/uploads/default-images/moderator-default.jpeg';

      return await moderatorModel.create({
        ...data,
        is_admin: false,
        avatar,
        created_at: Date.now(),
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

module.exports = AdminService;
