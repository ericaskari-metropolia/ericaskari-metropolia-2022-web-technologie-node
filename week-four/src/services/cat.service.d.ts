interface CatModel {
    id: number;
    name: string;
    weight: number;
    ownerId: string;
    fileName: string;
    birthdate: Date;
}

export const getList: () => Promise<CatModel[]>;
export const save: (
    user: Omit<CatModel, 'id' | 'role'>
) => Promise<CatModel | null>;
export const getByEmail: (email: string) => Promise<CatModel | null>;
export const getById: (id: string) => Promise<CatModel | null>;
export const edit: (user: CatModel) => Promise<void>;
export const deleteById: (id: string) => Promise<void>;
export const patch: (
    model: CatModel,
    allowedKeys: Partial<
        Record<`allow${Capitalize<keyof Partial<CatModel>>}Update`, boolean>
    >
) => Promise<void>;
