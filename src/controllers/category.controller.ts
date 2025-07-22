import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import {CategoryService} from "../services/category.service";
import { CreateCategoryDTO } from "../DTO/Category/createCategory.dto";
import { UpdateCategoryDTO } from "../DTO/Category/updateCategory.dto";


export class CategoryController {

static async createCategory(req: Request, res: Response) {
    const dto = plainToClass(CreateCategoryDTO, req.body);

    try {
        const category = await CategoryService.createCategory(dto);
        res.status(201).json(category);

    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

static async getAllCategories(req: Request, res: Response) {
    const categories = await CategoryService.findAllCategories();
    res.status(200).json(categories);
}

static async getCategory(req: Request, res: Response) {
    const category = await CategoryService.findCategoryById(Number(req.params.id))
    
    if(!category) {
        return res.status(404).json({ message: "Aucune categoey trouvé" })
    }
    
    res.status(200).json(category);
}


static async updateCategory(req: Request, res: Response) {
    const dto = plainToClass(UpdateCategoryDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedCategory = await CategoryService.updateCategory(id, dto);
        if (!updatedCategory) {
            return res.status(404).json({ message: "Aucune categorie trouvé"})
        
        }
        return res.status(200).json(updatedCategory);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

static async deleteCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deletedCategory = await CategoryService.deleteCategory(id);
  if (!deletedCategory){
    return res.status(404).json({ message: "Aucune categorie trouvé" });
  }
  res.status(204).send();
};


}