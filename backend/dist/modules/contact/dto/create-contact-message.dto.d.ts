import { ContactCategory } from '../entities/contact-message.entity';
export declare class CreateContactMessageDto {
    name: string;
    email: string;
    phone?: string;
    category: ContactCategory;
    company?: string;
    budgetRange?: string;
    deadline?: Date;
    subject: string;
    message: string;
    attachment?: string;
}
