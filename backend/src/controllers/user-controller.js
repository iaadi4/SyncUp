import UserService from "../services/user-service.js";

const userService = new UserService();

const signup = async(req, res) => {
    try {
        const response = await userService.signup(req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'user created'
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error
        });
    }
}

const login = async(req, res) => {
    try {
        const response = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'logged in successfully'
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error
        });
    }
}

const getAll = async(req, res) => {
    try {
        const users = await userService.getAll(req.user.id);
        return res.status(200).json({
            data: users,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            error: error
        });
    }
}

const favourite = async(req, res) => {
    try {
        const response = await userService.favourite(req.user.id, req.params.contactId);
        return res.status(200).json({
            data: response,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            error: error,
            success: false
        })
    }
}

const getFavourite = async(req, res) => {
    try {
        const response = await userService.getFavourites(req.user.id);
        return res.status(200).json({
            data: response,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            error: error,
            success: false
        })
    }
}

export default {
    signup,
    login,
    getAll,
    favourite,
    getFavourite
}