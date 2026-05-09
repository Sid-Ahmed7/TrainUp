import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import {CategoryService} from "../services/category.service";
import { CreateCategoryDTO } from "../DTO/Category/createCategory.dto";
import { UpdateCategoryDTO } from "../DTO/Category/updateCategory.dto";
import { AppError } from "../utils/AppError";

const categoryService = new CategoryService()
export class CategoryController {

 async createCategory(req: Request, res: Response) {
    const dto = plainToClass(CreateCategoryDTO, req.body);

    try {
        const category = await categoryService.createCategory(dto);
        res.status(201).json(category);

    } catch(error: any) {
        if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
            res.status(500).json({ error: "Erreur lors de la création d'une catégorie" });
            return
    }
}

 async getAllCategories(req: Request, res: Response) {
    const categories = await categoryService.findAllCategories();
    res.status(200).json(categories);
}

 async getCategory(req: Request, res: Response) {
    try {
        const category = await categoryService.findCategoryById(Number(req.params.id))
        res.status(200).json(category);
    } catch(error: any) {
        if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
            res.status(500).json({ error: "Erreur lors de la récupération d'une catégorie" });
            return
    }
 }
 
 async updateCategory(req: Request, res: Response) {
    const dto = plainToClass(UpdateCategoryDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedCategory = await categoryService.updateCategory(id, dto);
        return res.status(200).json(updatedCategory);
    } catch(error: any) {
        if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
            res.status(500).json({ error: "Erreur lors de la mise à jour d'une catégorie" });
            return
    }
 }

 async deleteCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
      const deletedCategory = await categoryService.deleteCategory(id);
      res.status(204).send();
    } catch(error: any) {
        if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
            res.status(500).json({ error: "Erreur lors de la suppression d'une catégorie" });
            return
    }
};


}