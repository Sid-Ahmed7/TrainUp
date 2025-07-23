import AppDataSource  from "../config/db";
import { CreateCategoryDTO } from "../DTO/Category/createCategory.dto";
import { UpdateCategoryDTO } from "../DTO/Category/updateCategory.dto";
import { Category } from "../entities/Category";

const categoryRepository = AppDataSource.getRepository(Category);
export class CategoryService {
    static async createCategory(dto: CreateCategoryDTO) {
        const existingCategory = await categoryRepository.findOne({
            where: { name: dto.name}
        })
        if(!existingCategory) {
            throw new Error(`La catégorie avec le nom ${dto.name} eiste déjà`);

        }
        const category = categoryRepository.create({ name: dto.name });
        return await categoryRepository.save(category);
    }

    static async updateCategory(categoryId: number, dto: UpdateCategoryDTO)  {
    const updatedCategory = await categoryRepository.findOneBy({id: categoryId })
    if(!updatedCategory) {
        throw new Error(`La catégorie avec l'ID ${categoryId} introuvable.`);
    }
    if(dto.name !== undefined) {
        updatedCategory.name = dto.name
    }
    const res = await categoryRepository.save(updatedCategory)
    return res;
    }   


    static async findAllCategories()  {
            return categoryRepository.find()
    }

    static async findCategoryById(categoryId: number){
      const category = await categoryRepository.findOneBy({ id: categoryId });
      if (!category) {
        throw new Error(`Catégorie avec l'ID ${categoryId} non trouvée.`);
      }
      return category;
    }

  static async deleteCategory(categoryId: number) {
    const category = await categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error(`Catégorie avec l'ID ${categoryId} non trouvée.`);
    } 
    const result = await categoryRepository.delete(categoryId);
    return result.affected !== 0;
  }
}
