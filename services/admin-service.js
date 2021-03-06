const { Moderator } = require('../models/moderator.model');

class AdminService {
  async createModerator(data) {
    try {
        const { file } = data;
        const avatar = file ? `/${file.path}` : '/uploads/default-images/moderator-default.jpeg';
  
        return await Moderator.create({
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