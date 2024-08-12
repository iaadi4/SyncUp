import UserService from "../services/user-service.js";

const userService = new UserService();

const signup = async(req, res) => {
    try {
        console.log('in controller');
        const response = await userService.signup(req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'user created'
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
    signup
}