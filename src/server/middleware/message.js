const path = require('path');
const db = require(`${path.dirname(__filename)}/../db.json`);

module.exports = (req, res, next) => {
  if (/message/.test(req.url) && req.method === 'DELETE') {
    const messageId = Number(req.query?.id);
    const result = db?.messages?.filter((message) => message.id === messageId);
    const index = db?.messages?.findIndex(
      (message) => message.id === messageId
    );
    db?.messages?.splice(index, 1);
    res.status(200).json(result);
    return;
  }
  next();
};
