//index, show, store, update, destroy
const User = require('../models/User');
module.exports = {
  async index(req, res) {
    const users = await User.find();
    return res.json(users);
  },
  async store(req, res) {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if(!user){
      user = await User.create({ email });
    }
    return res.json(user);
  },
  async destroy(req, res) {
    const { session_id } = req.params;
    const user = await User.findById(session_id);
    if(user) {
      await user.remove();
    }
    return res.json({message: "The user has been deleted"});
  },
};