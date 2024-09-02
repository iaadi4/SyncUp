import repositories from '../repositories/index.js';

class UserService {

    constructor() {
        this.userRepository = new repositories.UserRepository();
    }

    async signup(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }

    async login(email, password) {
        try {
            const user = await this.userRepository.getByEmail(email);
            if(!user.comparePassword(password)) {
                throw new Error('incorrect password');
            }
            const token = user.genJwt();
            const userData = user._doc;
            delete userData.password;
            return {...userData, token}
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }

    async getAll(currentUserId) {
        try {
            const users = await this.userRepository.getAll(currentUserId);
            return users;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
}

export default UserService;