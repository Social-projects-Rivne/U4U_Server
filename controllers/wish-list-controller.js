exports.wishListGet = (req, res) => {
    wishList.find({})
     .then((lists) => {
        res.status(200).send(lists);
   })
  } 