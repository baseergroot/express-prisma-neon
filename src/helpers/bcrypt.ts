import bcrypt from "bcryptjs";


const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };