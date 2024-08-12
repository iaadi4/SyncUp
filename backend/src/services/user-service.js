import UserRepository from '../repositories/user-repository.js';

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        try {
            console.log('in service');
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
}

export default UserService;