import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import {CategoryService} from "../services/category.service";
import { CreateCategoryDTO } from "../DTO/Category/createCategory.dto";
import { UpdateCategoryDTO } from "../DTO/Category/updateCategory.dto";

const categoryService = new CategoryService()
export class CategoryController {

 async createCategory(req: Request, res: Response) {
    const dto = plainToClass(CreateCategoryDTO, req.body);

    try {
        const category = await categoryService.createCategory(dto);
        res.status(201).json(category);

    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

 async getAllCategories(req: Request, res: Response) {
    const categories = await categoryService.findAllCategories();
    res.status(200).json(categories);
}

 async getCategory(req: Request, res: Response) {
    const category = await categoryService.findCategoryById(Number(req.params.id))
    
    if(!category) {
        return res.status(404).json({ message: "Aucune category trouvé" })
    }
    
    res.status(200).json(category);
}


 async updateCategory(req: Request, res: Response) {
    const dto = plainToClass(UpdateCategoryDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedCategory = await categoryService.updateCategory(id, dto);
        if (!updatedCategory) {
            return res.status(404).json({ message: "Aucune category trouvé"})
    
        }
        return res.status(200).json(updatedCategory);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

 async deleteCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deletedCategory = await categoryService.deleteCategory(id);
  if (!deletedCategory){
    return res.status(404).json({ message: "Aucune category trouvé" });
  }
  res.status(204).send();
};


}