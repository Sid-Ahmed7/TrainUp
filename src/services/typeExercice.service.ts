import { Type } from "class-transformer";
import AppDataSource from "../config/db";
import { TypeExercice } from "../entities/TypeExercice";
import { Category } from "../entities/Category";
import { Equipment } from "../entities/Equipment";
import { TypeExerciceEquipment } from "../entities/TypeExerciceEquipment";
import { Target } from "../entities/Target";
import { In } from "typeorm";
import * as typeExerciceEquipmentService from "./typeExerciceEquipment.service";
import { CreateTypeExerciceDTO } from "../DTO/TypeExercice/createTypeExercice.dto";
import { UpdateTypeExerciceDTO } from "../DTO/TypeExercice/updateTypeExercice.dto";

const typeExerciceRepository = AppDataSource.getRepository(TypeExercice);
const categoryRepository = AppDataSource.getRepository(Category);
const targetRepository = AppDataSource.getRepository(Target);
const typeExerciceEquipmentRepository = AppDataSource.getRepository(
  TypeExerciceEquipment
);

export const createTypeExercice = async (dto: CreateTypeExerciceDTO) => {
  const category = await categoryRepository.findOneBy({ id: dto.categoryId });

  if (!category) {
    throw new Error("Categorie non trouvé");
  }

  const audiences = dto.audienceIds?.length
    ? await targetRepository.find({ where: { id: In(dto.audienceIds) } })
    : [];

  const complementaryExercices = dto.complementaryExerciceIds?.length
    ? await typeExerciceRepository.find({
        where: { id: In(dto.complementaryExerciceIds) },
      })
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

  const typeExercice = await typeExerciceRepository.save(newTypeExercice);

  if (dto.equipments?.length) {
    const createEquipment = await Promise.all(
      dto.equipments.map((eq: { equipment: number }) =>
        typeExerciceEquipmentService.createTypeExerciceEquipment(
          typeExercice.id,
          eq.equipment
        )
      )
    );
    typeExercice.equipments = createEquipment;
    await typeExerciceRepository.save(typeExercice);
  }
  return typeExercice;
};

export const updateTypeExercice = async (
  exerciceId: number,
  dto: UpdateTypeExerciceDTO
) => {
  const exo = await typeExerciceRepository.findOne({
    where: { id: exerciceId },
    relations: [
      "category",
      "audience",
      "complementaryExercice",
      "equipments",
      "equipments.equipment",
    ],
  });
  if (!exo) {
    return null;
  }

  if (dto.name !== undefined) exo.name = dto.name;
  if (dto.description !== undefined) exo.description = dto.description;
  if (dto.targetMuscles !== undefined) exo.targetMuscles = dto.targetMuscles;
  if (dto.difficultyLevel !== undefined)
    exo.difficultyLevel = dto.difficultyLevel;
  if (dto.environment !== undefined) exo.environment = dto.environment;
  if (dto.instructions !== undefined) exo.instructions = dto.instructions;
  if (dto.tips !== undefined) exo.tips = dto.tips;
  if (dto.imageUrl !== undefined) exo.imageUrl = dto.imageUrl;
  if (dto.usageCount !== undefined) exo.usageCount = dto.usageCount;
  if (dto.averageRating !== undefined) exo.averageRating = dto.averageRating;
  if (dto.averageSuccessRate !== undefined)
    exo.averageSuccessRate = dto.averageSuccessRate;
  if (dto.duration !== undefined) exo.duration = dto.duration;
  if (dto.averageCalories !== undefined)
    exo.averageCalories = dto.averageCalories;
  if (dto.repetitionsRecommended !== undefined)
    exo.repetitionsRecommended = dto.repetitionsRecommended;
  if (dto.durationPerRep !== undefined) exo.durationPerRep = dto.durationPerRep;

  if (dto.categoryId !== undefined) {
    const category = await categoryRepository.findOneBy({ id: dto.categoryId });
    if (!category) throw new Error("Categorie non trouvé");
    exo.category = category;
  }
  if (dto.audienceIds !== undefined) {
    exo.audience = dto.audienceIds.length
      ? await targetRepository.find({ where: { id: In(dto.audienceIds) } })
      : [];
  }
  if (dto.complementaryExerciceIds !== undefined) {
    exo.complementaryExercice = dto.complementaryExerciceIds.length
      ? await typeExerciceRepository.find({
          where: { id: In(dto.complementaryExerciceIds) },
        })
      : [];
  }

  if (dto.equipments !== undefined) {
    await typeExerciceEquipmentRepository.delete({
      exercice: { id: exerciceId },
    });
    const createdEquipments = await Promise.all(
      dto.equipments.map((eqDto) =>
        typeExerciceEquipmentService.createTypeExerciceEquipment(
          exerciceId,
          eqDto.equipment
        )
      )
    );
    exo.equipments = createdEquipments;
  }

  const res = await typeExerciceRepository.save(exo);
  // Pour supprimer l'entite de liaison complete
  if (res.equipments && Array.isArray(res.equipments)) {
    res.equipments = res.equipments.map((teq: any) => teq.equipment);
  }
  return res;
};

export const findAllTypeExercices = () => {
  return typeExerciceRepository.find({
    relations: [
      "category",
      "audience",
      "complementaryExercice",
      "equipments",
      "equipments.equipment",
    ],
  });
};

export const findTypeExerciceById = (exerciceId: number) => {
  return typeExerciceRepository.findOne({
    where: { id: exerciceId },
    relations: [
      "category",
      "audience",
      "complementaryExercice",
      "equipments",
      "equipments.equipment",
    ],
  });
};
export const deleteTypeExercice = async (id: number) => {
  const result = await typeExerciceRepository.delete(id);
  return result.affected !== 0;
};
