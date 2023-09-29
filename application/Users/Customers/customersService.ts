import customerRepository from '../../../repositories/customerRepository';

class CustomerServices {
  async findAll(page: number) {
    return await customerRepository.findAll(page);
  }
  async findByQuery(query: string, page: number) {
    const q: object = {
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    };
    return await customerRepository.findByQuery(q, page);
  }
  async findById(id: string) {
    return await customerRepository.findById(id);
  }
  async createCustomer(body: object) {
    return await customerRepository.create(body);
  }
  async updateCustomer(id: string, info: object) {
    return await customerRepository.update(id, info);
  }
  async deleteCustomer(id: string) {
    return await customerRepository.delete(id);
  }
}

const customerService = new CustomerServices();

export default customerService;
