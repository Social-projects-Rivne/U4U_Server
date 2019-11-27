const wishList = require('../models/wish-list.model');
const tokenservice = require('../services/token-service');
const { jwtConf } = require('../config/config');
const tokenService = new tokenservice(jwtConf);
const { getSearchPlace } = require('../models/places.model');
//const { getToken } = require('../utils/token')

exports.wishListGet = async (req, res) => {
    const userJwt = req.header('authorization');
    const tokenSplit = userJwt.split(" ");
    const decodedJWT = await tokenService.verify(tokenSplit[1]);
    wishList.find({ userId: decodedJWT })
        .then((lists) => {
            res.status(200).send(lists);
        })
}
exports.wishListPost = async (req, res) => {
    try {
        const { comment, done, inProgress } = req.body;
        const userJwt = req.header('authorization');
        const tokenSplit = userJwt.split(" ");
        const decodedJWT = await tokenService.verify(tokenSplit[1]);
        const mongoResponse = await wishList.create({
            comment,
            done,
            inProgress,
            userId: decodedJWT
        });
        await res.status(200).send({
            message: 'Your wish is added',
            id: mongoResponse.id
        });
    }
    catch (e) {
        res.status(500).send({ message: e });
    }
};

exports.wishListDelete = async (req, res) => {

    try {
        const { id } = req.params;
        const userJwt = req.header('authorization');
        const tokenSplit = userJwt.split(" ");
        const decodedJWT = await tokenService.verify(tokenSplit[1]);
        await wishList.findByIdAndDelete({
            _id: id,
            userId: decodedJWT
        })
        await res.status(200).send({ message: 'Your wish is deleted' });
    }
    catch (e) {
        res.status(500).send({ message: e });
    }
};

exports.markItemAsDone = async (req, res) => {
    try {
        const { done, important, id } = req.body;
        const userJwt = req.header('authorization');
        const tokenSplit = userJwt.split(" ");
        const decodedJWT = await tokenService.verify(tokenSplit[1]);
        await wishList.findByIdAndUpdate(
            { _id: id },
            { done: done, inProgress: important },
            { new: true });
        await res.status(200).send({ message: 'Your wish is marked as done' });
    }
    catch (e) {
        res.status(500).send({ message: e });
    }
};

exports.findPlaceByName = (req, res) => {
    const { SearchInput } = req.params;
    getSearchPlace(SearchInput).then((data) => {
        res.status(200).send(data);
    })
        .catch(() => {
            res.status(404).send({ message: 'Not Found' });
        });
}

