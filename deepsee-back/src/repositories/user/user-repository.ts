import { SignUpBody } from '../../controllers/auth/auth-types';
import { client } from '../../database';
import { User } from '../../models/user-model';

import { parseUser } from './user-parser';

export const fetchUserById = async ({ id }: { id: number }): Promise<User | undefined> => {
    const queryResult = (await client.query('SELECT * FROM user_info WHERE id = $1', [id])).rows[0];

    return queryResult ? parseUser({ queryResult }) : undefined;
};

export const fetchUserByEmail = async ({ email }: { email: string }): Promise<User | undefined> => {
    const queryResult = (await client.query('SELECT * FROM user_info WHERE email = $1', [email])).rows[0];

    return queryResult ? parseUser({ queryResult }) : undefined;
};

export const saveUser = async ({ user }: { user: SignUpBody }): Promise<User> => {
    const userDB = await client.query(
        'INSERT INTO user_info (email, first_name, last_name, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
            user.email,
            user.firstName,
            user.lastName,
            user.password,
            user.type,
        ],
    );

    return parseUser({ queryResult: userDB.rows[0] });
};
