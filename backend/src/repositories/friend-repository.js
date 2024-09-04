import models from "../models/index.js"

class FriendRepositoy {
    
    async addFriend(userId, friendId) {
        try {
            if(userId ==  friendId)
                throw new Error('Friend id cant be same as user id');
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

    async removeFriend(userId, friendId) {
        try {
            if(userId != friendId) {
                await models.User.updateOne(
                    { _id: userId },
                    { $pull: { friends: friendId } }
                );
            } else {
                throw new Error('Friend id cant be same as user id');
            }
            return true;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

export default FriendRepositoy;