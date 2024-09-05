import FriendService from "../services/friend-service.js";

const friendService = new FriendService();

const addFriend = async(req, res) => {
    try {
        const response = await friendService.addFriend(req.user.id, req.params.friendEmail);
        return res.status(200).json({
            data: response,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error
        })
    }
}

const getFriends = async(req, res) => {
    try {
        const friends = await friendService.getFriends(req.user.id);
        return res.status(200).json({
            data: friends,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error
        })
    }
}

const removeFriend = async(req, res) => {
    try {
        const response = await friendService.removeFriend(req.user.id, req.params.friendId);
        return res.status(200).json({
            data: response,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error
        })
    }
}

export default {
    addFriend,
    getFriends,
    removeFriend
}