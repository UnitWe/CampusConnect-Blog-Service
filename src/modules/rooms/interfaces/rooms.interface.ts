import { Types } from 'mongoose';
export interface Rooms {
    title: string
    owner: string;
    access_link: string;
    tags?: string[];
    users: string[];
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}