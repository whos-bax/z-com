import {User} from "@/model/User";

export interface Room {
    room: string;
    Receiver: User;
    content: string;
    createdAt: Date;
}
