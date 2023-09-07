import User from "../../models/user.js";

const getUser = async (username) => {
    try {
        const user = await User.findOne({
            username,
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserById = async (username) => {
    try {
        const user = await User.findOne(username);
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const createUser = async (username, password) => {
    try {
        const user = new User({
            username,
            password,
        });
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const addBio = async (username, bio) => {
    try {
        const user = await User.findOne(username);
        user.bio = bio;
        await user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const addFamilyMember = async (username, familyMember) => {
    try {
        const user = await User.findOne(username);
        if(user.family.includes(familyMember)) return user;
        user.family.push(familyMember);
        await user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const addFamilyRequest = async (username, familyRequest) => {
    try {
        const user = await User.findOne(username);
        if(user.familyRequests.includes(familyRequest)) return user;
        user.familyRequests.push(familyRequest);
        await user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const removeFamilyRequest = async (username, familyRequest) => {
    try {
        const user = await User.findOne(username);
        user.familyRequests = user.familyRequests.filter(member => member !== familyRequest);
        await user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const acceptFamilyRequest = async (username, familyRequest) => {
    try {

        const user = await User.findOne(username);
        if(!user.family.includes(familyRequest)) return user;
        user.family.push(familyRequest);
        user.familyRequests = user.familyRequests.filter(member => member !== familyRequest);
        await user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}



const removeFamilyMember = async (username, familyMember) => {
    try {
        const user = await User.findOne(username);
        user.family = user.family.filter(member => member !== familyMember);
        await user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}




const deleteUser = async (username) => {
    try {
        const user = await User.findOne(username);
        await user.delete();
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export {
    getUser,
    getUserById,
    getUsers,
    createUser,
    addBio,
    addFamilyMember,
    removeFamilyMember,
    addFamilyRequest,
    removeFamilyRequest,
    acceptFamilyRequest,
    deleteUser,
};
