const Record = require('../models/recordModel')

exports.createRecord = async (req, res) => {
  try {
    const { data } = req.body
    await Record.insertMany(data);

    res.status(201).json({
      status: "success",
      data: {
        message: 'Record/s created successfully.'
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

exports.getRecords = async (req, res) => {
  const { user } = req.body
  try {
    const records = await Record.find({ user }, { division: 1, title: 1, date: 1, notes: 1, bunting: 1, _id: -1 });

    if (!records) return res.status(200).json({
      status: "success",
      data: {
        message: 'No records found'
      }
    })
    res.status(200).json({
      status: "success",
      data: {
        records
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

exports.deleteRecord = async (req, res) => {
  const { id } = req.body
  try {
    await Record.findByIdAndDelete(id)
    res.status(200).json({
      status: "success",
      data: {
        message: 'Record deleted successfully.'
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'failure',
      data: {
        message: 'Unable to delete record.'
      }
    })
  }
}