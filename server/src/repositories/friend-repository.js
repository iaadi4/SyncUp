import models from "../models/index.js"

class FriendRepositoy {
    
    async addFriend(userId, friendEmail) {
        try {
            const user = await models.User.findById(userId);
            const friend = await models.User.findOne({email: friendEmail});
            if(friend) {
                const friendId = friend._id;
                if(userId ==  friendId)
                    throw new Error('Friend id cant be same as user id');
                if(user.friends.includes(friendId)) {
                    throw new Error('User already exist in friend list');
                }
                else {
                    user.friends.push(friendId);
                    friend.friends.push(userId);
                    await Promise.all([user.save(), friend.save()]);
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
                await models.User.updateOne(
                    { _id: userId },
                    { $pull: { favourites: friendId }}
                )
                await models.User.updateOne(
                    {_id: friendId},
                    { $pull : { friends: userId } }
                )
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