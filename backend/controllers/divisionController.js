const Division = require('../models/divisionModel')

exports.createDivision = async (req, res) => {
  try {
    await Division.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        message: 'Record created successfully.'
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failure',
      data: {
        message: 'Unable to create record.'
      }
    })
  }
};

exports.getDivisions = async (req, res) => {
  try {
    const divisions = await Division.find({}, { division: 1, _id: -1 });

    if (!divisions) return res.status(200).json({
      status: "success",
      data: {
        message: 'No records found'
      }
    })
    res.status(200).json({
      status: "success",
      data: {
        divisions
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failure',
      data: {
        message: 'Unable to create record.'
      }
    })
  }
};