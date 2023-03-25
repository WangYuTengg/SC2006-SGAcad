import StudySpot from "../models/StudySpot.js";

/* CREATE */
export const createStudySpot = async (req, res) => {
  try {
    const { spotId, name, description, picturePath, location } = req.body;
    const newStudySpot = new StudySpot({
      spotId,
      name,
      description,
      picturePath,
      location,
    });
    await newStudySpot.save();

    const studyspot = await StudySpot.find();
    res.status(201).json(studyspot);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getAllStudySpots = async (req, res) => {
  try {
    const studyspot = await StudySpot.find();
    res.status(200).json(studyspot);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// By _id (Default object id in MONGODb)
export const getStudySpotById = async (req, res) => {
  try {
    const { id } = req.params;
    const studyspot = await StudySpot.findById(id);
    res.status(200).json(studyspot);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// By spotId (Defined by Schema)
export const getStudySpotBySpotId = async (req, res) => {
  try {
    const { spotId } = req.params;
    const studyspot = await StudySpot.findById(spotId);
    res.status(200).json(studyspot);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
