const wishList = require('../models/wish-list.model');
const tokenservice = require('../services/token-service');
const { jwtConf } = require('../config/config');
const tokenService = new tokenservice(jwtConf);
const { getSearchPlace } = require('../models/places.model');


exports.wishListGet = (req, res) => {
    wishList.find({})
        .then((lists) => {
            res.status(200).send(lists);
        })
}
exports.wishListPost = async (req, res) => {
    try {
    
        const { comment } = req.body;
        const userJwt = req.header('authorization');
        const tokenSplit = userJwt.split(" ");
        const decodedJWT = await tokenService.verify(tokenSplit[1]);
        debugger
        await wishList.create({
            comment,
            createdBy: decodedJWT
        });
        await res.status(200).send({ message: 'Your wish is added' });
    }
    catch (e) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.wishListDelete = async (req, res) => {
    try {
        const { _id } = req.body;
        const userJwt = req.header('authorization');
        const tokenSplit = userJwt.split(" ");
        const decodedJWT = await tokenService.verify(tokenSplit[1]);
        console.log(_id)
        const resultDelete = await wishList.deleteOne(_id)
        console.log(resultDelete)

        await res.status(200).send({ message: 'Your wish is deleted' });
    }
    catch (e) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.markItemAsDone = async (req, res) => {
    try {
        const { done, _id } = req.body;
        console.log(done)

        await wishList.findOneAndUpdate(_id)
        await res.status(200).send({ message: 'Your wish is deleted' });
    }
    catch (e) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.markItemAsImportant = async (req, res) => {
    try {
        const { _id } = req.body;
        console.log(_id)
        await wishList.findByIdAndUpdate(
            console.log(_id)

        )
        await res.status(200).send({ message: 'Your wish is deleted' });
    }
    catch (e) {
        res.status(500).send({ message: 'Something went wrong' });
    }
};
exports.findPlaceByName = (req, res) => {
    const {SearchInput} = req.params;
    getSearchPlace(SearchInput).then((data) => {
        res.status(200).send(data);
    })
        .catch(() => {
            res.status(404).send({ message: 'Not Found' });
        });
}

