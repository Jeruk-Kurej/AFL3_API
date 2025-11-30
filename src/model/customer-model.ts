import { Customer } from "../../generated/prisma/client";
//harusnya sih ga perlu /client, tapi gara" versi 6.19 jadinya perlu

export interface CustomerResponse {
  id: number;
  name: string;
  phone: string;
}

export interface CustomerCreateRequest {
  name: string;
  phone: string;
}

export interface CustomerUpdateRequest {
  name?: string;
  phone?: string;
}

export function toCustomerResponse(customer: Customer): CustomerResponse {
  return {
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
  };
}
