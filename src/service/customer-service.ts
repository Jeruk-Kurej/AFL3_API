import { prismaClient } from "../util/database-util";
import { ResponseError } from "../error/response-error";
import { 
    CustomerCreateRequest, 
    CustomerResponse, 
    CustomerUpdateRequest, 
    toCustomerResponse 
} from "../model/customer-model";
import { CustomerValidation } from "../validation/customer-validation";
import { Validation } from "../validation/validation";
import { Customer } from "../../generated/prisma/client";

export class CustomerService {

    static async create(request: CustomerCreateRequest): Promise<CustomerResponse> {
        const validatedData = Validation.validate(CustomerValidation.CREATE, request);

        const countCustomer = await prismaClient.customer.count({
            where: {
                phone: validatedData.phone
            }
        });

        if (countCustomer > 0) {
            throw new ResponseError(400, "Phone number already exists!");
        }

        const customer = await prismaClient.customer.create({
            data: {
                name: validatedData.name,
                phone: validatedData.phone
            }
        });

        return toCustomerResponse(customer);
    }

    static async list(): Promise<CustomerResponse[]> {
        const customers = await prismaClient.customer.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return customers.map((customer: Customer) => toCustomerResponse(customer));
    }

    static async get(id: number): Promise<CustomerResponse> {
        const customer = await prismaClient.customer.findUnique({
            where: { id: id }
        });

        if (!customer) {
            throw new ResponseError(404, "Customer not found!");
        }

        return toCustomerResponse(customer);
    }

    static async update(id: number, request: CustomerUpdateRequest): Promise<CustomerResponse> {
        const validatedData = Validation.validate(CustomerValidation.UPDATE, request);

        const customerCheck = await prismaClient.customer.count({
            where: { id: id }
        });

        if (customerCheck === 0) {
            throw new ResponseError(404, "Customer not found!");
        }

        const customer = await prismaClient.customer.update({
            where: { id: id },
            data: validatedData
        });

        return toCustomerResponse(customer);
    }

    static async delete(id: number): Promise<string> {
        const customerCheck = await prismaClient.customer.count({
            where: { id: id }
        });

        if (customerCheck === 0) {
            throw new ResponseError(404, "Customer not found!");
        }

        await prismaClient.customer.delete({
            where: { id: id }
        });

        return "Customer data has been deleted successfully!";
    }
}