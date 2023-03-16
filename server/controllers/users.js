import User from "../models/user";

/* READ */
export const getUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFavoriteSpots = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        const favoriteSpots = await Promise.all(
           // need to add logic here
        )
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}