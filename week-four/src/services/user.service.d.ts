interface UserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    role: number;
}

export const getList: () => Promise<UserModel[]>;
export const save: (
    user: Omit<UserModel, 'id' | 'role'>
) => Promise<UserModel | null>;
export const getByEmail: (email: string) => Promise<UserModel | null>;
export const getById: (id: string) => Promise<UserModel | null>;
export const edit: (user: UserModel) => Promise<UserModel>;
export const deleteById: (id: string) => Promise<void>;
export const patch: (
    model: UserModel,
    allowedKeys: Partial<
        Record<`allow${Capitalize<keyof Partial<UserModel>>}Update`, boolean>
    >
) => Promise<void>;
