import repositories from '../repositories/index.js';

class FriendService {

    constructor() {
        this.friendRepositoy = new repositories.FriendRepositoy();
    }

    async addFriend(userId, friendId) {
        try {
            const response = await this.friendRepositoy.addFriend(userId, friendId);
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async getFriends(userId) {
        try {
            const friends = await this.friendRepositoy.getFriends(userId);
            return friends;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async removeFriend(userId, friendId) {
        try {
            const response = await this.friendRepositoy.removeFriend(userId, friendId);
            return response;
        } catch(error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default FriendService;