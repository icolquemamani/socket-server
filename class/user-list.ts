import { User } from "./user";


export class UserList {
    private _list: User[] = [];

    constructor() {}

    public add( user: User ) {
        this._list.push(user);
        console.log(this._list);
        return user;
    }

    public updateName( id: string, newName: string ) {
        for( let user of this._list ) {
            if ( user.id === id ) {
                user.name = newName;
                break;
            }
        }

        console.log('update', this._list);
    }

    // Get List of users
    public getList() {
        return this._list.filter( user => user.name !== 'not-name' );
    }

    public getUser( id: string ) {
        return this._list.find( user => user.id === id );
    }

    // Get users for room
    public getUsersRoom( room: string ) {
        return this._list.filter( user => user.room === room );
    }

    // Delete User
    public deleteUser( id: string ) {
        const userTemp = this.getUser(id);

        this._list = this._list.filter( user => user.id !== id );

        return userTemp;
    }
}