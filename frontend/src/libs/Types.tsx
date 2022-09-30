//Interface for user and connections
export interface User {
    _id: string;
    fullname: string;
    color: string;
    connections: Array<User>;
};

export interface ConnectedUser {
    _id: string;
    fullname: string;
    color: string;
};