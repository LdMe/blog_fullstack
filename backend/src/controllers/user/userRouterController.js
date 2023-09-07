import { getUser,getUsers,addFamilyRequest,acceptFamilyRequest,removeFamilyRequest } from "./userController.js";

const getUserRoute = async (req, res) => {
    try {
        const user = await getUser(req.params.username);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUsersRoute = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addFamilyRequestRoute = async (req, res) => {
    try {
        const { username, familyRequest } = req.body;
        const user = await addFamilyRequest(username, familyRequest);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const acceptFamilyRequestRoute = async (req, res) => {
    try {
        const { username, familyRequest } = req.body;
        const user = await acceptFamilyRequest(username, familyRequest);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const removeFamilyRequestRoute = async (req, res) => {
    try {
        const { username, familyRequest } = req.body;
        const user = await removeFamilyRequest(username, familyRequest);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export { 
    getUserRoute,
    getUsersRoute,
    addFamilyRequestRoute,
    acceptFamilyRequestRoute,
    removeFamilyRequestRoute
 };