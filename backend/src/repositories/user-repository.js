import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({email: userEmail});
            if(!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

export default UserRepository;