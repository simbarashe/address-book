import { Contact } from './contact';
import { Tag } from './tag';

export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    designation: string;
    communicationDetails: Contact[]=[];
    tags: Tag[]=[];
}
