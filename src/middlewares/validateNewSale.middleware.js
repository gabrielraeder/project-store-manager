module.exports = (req, res, next) => {
  const array = req.body;
  
  for (let ind = 0; ind < array.length; ind += 1) {
    if (array[ind].productId === undefined) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (array[ind].quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }
  return next();
};