import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";
import { CreateCategoryDTO } from "../DTO/Category/CreateCategoryDTO";
import { UpdateCategoryDTO } from "../DTO/Category/UpdateCategoryDTO";



export const createCategory = async (req: Request, res: Response) => {
    const dto = plainToClass(CreateCategoryDTO, req.body);

    try {
        const category = await categoryService.createCategory(dto);
        res.status(201).json(category);

    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await categoryService.findAllCategories();
    res.status(200).json(categories);
}

export const getCategory = async (req: Request, res: Response) => {
    const category = await categoryService.findCategoryById(Number(req.params.id))
    
    if(!category) {
        return res.status(404).json({ message: "Aucune categoey trouvé" })
    }
    
    res.status(200).json(category);
}


export const updateCategory = async (req: Request, res: Response) => {
    const dto = plainToClass(UpdateCategoryDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedCategory = await categoryService.updateCategory(id, dto);
        if (!updatedCategory) {
            return res.status(404).json({ message: "Aucune categoey trouvé"})
        
        }
        return res.status(200).json(updatedCategory);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deletedCategory = await categoryService.deleteCategory(id);
  if (!deletedCategory){
    return res.status(404).json({ message: "Aucune categoey trouvé" });
  }
  res.status(204).send();
};

