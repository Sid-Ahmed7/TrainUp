import { Type } from "class-transformer";
import { AppDataSource } from "../app";
import { TypeExercice } from "../entities/TypeExercice";
import { Category } from "../entities/Category";
import { Equipment } from "../entities/Equipment";
import { TypeExerciceEquipment } from "../entities/TypeExerciceEquipment";
import { Target } from "../entities/Target";
import { In } from "typeorm";
import * as typeExerciceEquipmentService from "./typeExerciceEquipment";
import { CreateTypeExerciceDTO } from "../DTO/TypeExercice/CreateTypeExerciceDTO";
import { UpdateTypeExerciceDTO } from "../DTO/TypeExercice/UpdateTypeExerciceDTO";



const typeExerciceRepository = AppDataSource.getRepository(TypeExercice);
const categoryRepository = AppDataSource.getRepository(Category);
const targetRepository = AppDataSource.getRepository(Target);
const typeExerciceEquipmentRepository = AppDataSource.getRepository(TypeExerciceEquipment);
const equipmentRepository = AppDataSource.getRepository(Equipment);


export const createTypeExercice = async (dto: CreateTypeExerciceDTO) => {


    const category = await categoryRepository.findOneBy({id : dto.categoryId});
    
    if(!category) { throw new Error("Categorie non trouvé") }

  const audiences = dto.audienceIds?.length
    ? await targetRepository.find({ where: { id: In(dto.audienceIds) } })
    : [];

    const complementaryExercices = dto.complementaryExerciceIds?.length
    ? await typeExerciceRepository.find({ where: { id: In(dto.complementaryExerciceIds) } })
    : [];

    const newTypeExercice = typeExerciceRepository.create({
    name: dto.name,
    description: dto.description,
    targetMuscles: dto.targetMuscles,
    category,
    difficultyLevel: dto.difficultyLevel,
    environment: dto.environment,
    instructions: dto.instructions,
    tips: dto.tips,
    imageUrl: dto.imageUrl,
    complementaryExercice: complementaryExercices,
    audience: audiences,
    usageCount: dto.usageCount ?? 0,
    averageRating: dto.averageRating,
    averageSuccessRate: dto.averageSuccessRate,
    duration: dto.duration,
    averageCalories: dto.averageCalories,
    repetitionsRecommended: dto.repetitionsRecommended,
    durationPerRep: dto.durationPerRep,
    equipments: [], 
  });

    const typeExercice = await  typeExerciceRepository.save(newTypeExercice)

        if (dto.equipments?.length) {
        const createEquipment = await Promise.all(
            dto.equipments.map((eq: { equipment: number }) =>
                 typeExerciceEquipmentService.createTypeExerciceEquipment(typeExercice.id, eq.equipment)
            )
        );
        typeExercice.equipments = createEquipment;
        await typeExerciceRepository.save(typeExercice)
    }

    return typeExercice;
}

export const updateTypeExercice = async (exerciceId: number, dto: UpdateTypeExerciceDTO) => {

    const exo = await typeExerciceRepository.findOne({where: {id: exerciceId}, relations: ["category", "audience", "complementaryExercice", "equipment"]});
    if(!exo) {return null;}

    const updateExercice: Partial<TypeExercice> = {}

  if (dto.name !== undefined) updateExercice.name = dto.name;
  if (dto.description !== undefined) updateExercice.description = dto.description;
  if (dto.targetMuscles !== undefined) updateExercice.targetMuscles = dto.targetMuscles;
  if (dto.difficultyLevel !== undefined) updateExercice.difficultyLevel = dto.difficultyLevel;
  if (dto.environment !== undefined) updateExercice.environment = dto.environment;
  if (dto.instructions !== undefined) updateExercice.instructions = dto.instructions;
  if (dto.tips !== undefined) updateExercice.tips = dto.tips;
  if (dto.imageUrl !== undefined) updateExercice.imageUrl = dto.imageUrl;
  if (dto.usageCount !== undefined) updateExercice.usageCount = dto.usageCount;
  if (dto.averageRating !== undefined) updateExercice.averageRating = dto.averageRating;
  if (dto.averageSuccessRate !== undefined) updateExercice.averageSuccessRate = dto.averageSuccessRate;
  if (dto.duration !== undefined) updateExercice.duration = dto.duration;
  if (dto.averageCalories !== undefined) updateExercice.averageCalories = dto.averageCalories;
  if (dto.repetitionsRecommended !== undefined) updateExercice.repetitionsRecommended = dto.repetitionsRecommended;
  if (dto.durationPerRep !== undefined) updateExercice.durationPerRep = dto.durationPerRep;


    if(dto.categoryId !== undefined) {
        const category = await categoryRepository.findOneBy({id : dto.categoryId});
        if(!category) { throw new Error("Categorie non trouvé") }
        updateExercice.category = category
    }

    if( dto.audienceIds !== undefined) {
       const audiences = dto.audienceIds.length ? await targetRepository.find({where: { id: In( dto.audienceIds)}}) : [];
        updateExercice.audience = audiences
        }

    if( dto.complementaryExerciceIds !== undefined) {
    const complementaryExercices = dto.complementaryExerciceIds.length ? await typeExerciceRepository.find({where: { id: In(dto.complementaryExerciceIds)}}) : []
    updateExercice.complementaryExercice = complementaryExercices
    }
      if (dto.equipments !== undefined) {

    await typeExerciceEquipmentRepository.delete({ exercice: { id: exerciceId } });
    const createdEquipments = await Promise.all(
      dto.equipments.map(eqDto =>
        typeExerciceEquipmentService.createTypeExerciceEquipment(exerciceId, eqDto.equipment)
      )
    );
    updateExercice.equipments = createdEquipments;
  }

    const res = await typeExerciceRepository.update(exerciceId, updateExercice)
    return res.affected !== 0;
}

export const findAllTypeExercices = () => {
    return typeExerciceRepository.find({relations: ["category", "audience", "complementaryExercice", "equipments", "equipments.equipment"],})
}

export const findTypeExerciceById = (exerciceId: number) => {
    return typeExerciceRepository.findOne({where: {id: exerciceId},     relations: ["category", "audience", "complementaryExercice", "equipments", "equipments.equipment"],
})
}
export const deleteTypeExercice = async (id: number) => {
  const result = await typeExerciceRepository.delete(id);
  return result.affected !== 0;
};





