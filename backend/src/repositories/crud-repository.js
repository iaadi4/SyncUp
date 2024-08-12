class CrudRepository {
    
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            if(!result) {
                throw new Error('User not found');
            }
            return result;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async getAll() {
        try {
            const result =  await this.model.find({});
            return result;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async destroy(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findById(id);
            if(!result) {
                throw new Error('User not found');
            }
            return await this.model.findByIdAndUpdate(id, data, {new: true});
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

export default CrudRepository;