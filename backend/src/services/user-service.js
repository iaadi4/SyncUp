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
            return user.genJwt();
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }

    async getAll() {
        try {
            const users = await this.userRepository.getAll();
            return users;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
}

export default UserService;