/**
 * @TODO : controller elkészítése, mely kapcsolódik a megfelelő service osztályhoz
 *
 * Kezelje a http-error üzeneteket:
 * - hiányos értékek @update műveletkor: BadREquest => 'Missing field'
 * - ha valamiért nem tudta a server frissíteni a building entitást:
 *  InternalServerError => 'Could not updated building'
 *
 * A szerver a megfelelő válaszokat küldje el a kliens felé
 */

const httpError = require('http-errors');
const BuildingModel = require('../../models/building.model');
const ClassroomModel = require('../../models/classroom.model');

exports.updateBuilding = (req, res, next) => {
    const { buildingId, className} = req.body;
    if (buildingId === undefined || className === undefined) {
        return next(
            new createError.BadRequest('Missing field')
        );
    }

    return service.update(buildingId, className)
        .then(entity => {
            res.json(entity);
        })
        .catch(err => {
            console.error(err)
            return next(new createError.InternalServerError('Could not update building'));
        });
};




exports.getAllBuildingWithClassrooms = (req, res, next) => {
    return service.getAll()
        .then(list => {
            res.json(list);
        }).catch(err => {
            console.error(err);
            return new createError.InternalServerError('List could nost send')
        })
};
