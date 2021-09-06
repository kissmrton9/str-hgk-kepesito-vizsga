/**
 * @TODO : Mongoose modellek segítségével frissitsen egy 'building' entitást az adatbázisban.
 * - el kell menteni egy új "classroom" entitást.
 * - ki kell nyeri az új "classroom" id-ját.
 * - az id-t helyezze el a megfelelő 'Building' entitás 'classrooms' listájába
 *
 * A @getAll metódus adja vissza a populált teljes "building" listát
 */
const { findByIdAndUpdate } = require('../../models/building.model');
const BuildingModel = require('../../models/building.model');
const ClassroomModel = require('../../models/classroom.model');


exports.update = async (buildingId, className) => {
    const classroom = new ClassroomModel({name: className});
    await classroom.save();
    const id = await ClassroomModel.findOne({name: className}).lean()['_id'];
    console.log('id:',id);
    BuildingModel.findByIdAndUpdate(buildingId,{$push: {classrooms: id}})
};

exports.getAll = () => BuildingModel.find().populate(classrooms);