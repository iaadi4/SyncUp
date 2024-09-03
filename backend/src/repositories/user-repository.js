import models from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(models.User);
    }

    async getAll(currentUserId) {
        try {
            const users = await models.User.find({_id: {$ne: currentUserId}}).select("-password");
            return users;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await models.User.findOne({email: userEmail});
            if(!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async addFriend(userId, friendId) {
        try {
            const user = await models.User.findById(userId);
            const friend = await models.User.findById(friendId);
            if(friend) {
                if(user.friends.includes(friendId)) {
                    throw new Error('User already exist in friend list');
                }
                else {
                    user.friends.push(friend);
                    user.save();
                }
            } 
            else {
                throw new Error('Friend not found!');
            }
            return friend;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async getFriends(userId) {
        try {
            const user = await models.User.findById(userId).populate('friends', 'name email gender image _id');
            return user.friends;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

export default UserRepository;