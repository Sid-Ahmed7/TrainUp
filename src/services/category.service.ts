import AppDataSource from "../config/db";
import { CreateCategoryDTO } from "../DTO/Category/createCategory.dto";
import { UpdateCategoryDTO } from "../DTO/Category/updateCategory.dto";
import { Category } from "../entities/Category";
import { AppError } from "../utils/AppError";

const categoryRepository = AppDataSource.getRepository(Category);
export class CategoryService {
  async createCategory(dto: CreateCategoryDTO) {
    const existingCategory = await categoryRepository.findOne({
      where: { name: dto.name },
    });
    if (existingCategory) {
      throw new AppError(`La catégorie avec le nom ${dto.name} existe déjà`, 409);
    }
    const category = categoryRepository.create({ name: dto.name });
    return await categoryRepository.save(category);
  }

  async updateCategory(categoryId: number, dto: UpdateCategoryDTO) {
    const updatedCategory = await categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!updatedCategory) {
      throw new AppError(`La catégorie avec l'ID ${categoryId} introuvable.`, 404);
    }
    if (dto.name !== undefined) {
      updatedCategory.name = dto.name;
    }
    const res = await categoryRepository.save(updatedCategory);
    return res;
  }

  async findAllCategories() {
    return categoryRepository.find();
  }

  async findCategoryById(categoryId: number) {
    const category = await categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new AppError(`Catégorie avec l'ID ${categoryId} non trouvée.`, 404);
    }
    return category;
  }

  async deleteCategory(categoryId: number) {
    const category = await categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new AppError(`Catégorie avec l'ID ${categoryId} non trouvée.`, 404);
    }
    const result = await categoryRepository.delete(categoryId);
    return result.affected !== 0;
  }
}
