import AppDataSource  from "../config/db";
import { Category } from "../entities/Category";

    const categoryRepository = AppDataSource.getRepository(Category);



export const createCategory = async (category: Partial<Category>) => {

    return categoryRepository.save(categoryRepository.create(category))
}

export const updateCategory = async (categoryId: number, category: Partial<Category>) => {
    const updatedCategory = await categoryRepository.findOneBy({id: categoryId })
    if(!updatedCategory) {
        return 
    }
       const res = await categoryRepository.update(categoryId,category)

      return res.affected !== 0;

}   

export const findAllCategories = () => {

    return categoryRepository.find()
}

export const findCategoryById = (categoryId: number) => {

    return categoryRepository.findOneBy({ id: categoryId })
}

export const deleteCategory = async (categoryId: number) => {

    const res = await categoryRepository.delete(categoryId);
    return res.affected !== 0;
}   

