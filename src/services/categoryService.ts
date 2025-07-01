import { AppDataSource } from "../app";
import { Category } from "../entities/Category";





export const createCategory = async (category: Partial<Category>) => {
    const categoryRepository = AppDataSource.getRepository(Category);

    return categoryRepository.save(categoryRepository.create(category))
}

export const updateCategory = async (categoryId: number, category: Partial<Category>) => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const updatedCategory = await categoryRepository.findOneBy({id: categoryId })
    if(!updatedCategory) {
        return 
    }
        await categoryRepository.update(categoryId,category)

    return categoryRepository.save(updatedCategory);
}   

export const findAllCategories = () => {
    const categoryRepository = AppDataSource.getRepository(Category);

    return categoryRepository.find()
}

export const findCategoryById = (categoryId: number) => {
    const categoryRepository = AppDataSource.getRepository(Category);

    return categoryRepository.findOneBy({ id: categoryId })
}

export const deleteCategory = async (categoryId: number) => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const res = await categoryRepository.delete(categoryId);
    return res.affected !== 0;
}   

