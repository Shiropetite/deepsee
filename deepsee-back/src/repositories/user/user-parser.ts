import { User, UserDB } from '../../models/user-model';

export const parseUser = ({ queryResult }: { queryResult: UserDB }): User => ({
    __id: queryResult.id,
    email: queryResult.email,
    firstName: queryResult.first_name,
    lastName: queryResult.last_name,
    password: queryResult.password,
    type: queryResult.type,
});
