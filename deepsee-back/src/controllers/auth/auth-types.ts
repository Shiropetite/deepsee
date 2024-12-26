export type SignInBody = {
    email: string;
    password: string;
};

export type SignUpBody = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    type: string;
};
