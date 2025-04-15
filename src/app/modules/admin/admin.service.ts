import { Prisma, PrismaClient } from "../../../generated/prisma";
import { adminSearchAbleFields } from "./admin.constant";

const prisma = new PrismaClient();

const getAllFormDb = async (params: any, options: any) => {

  const {limit, page} = options;
  const { searchTerm, ...filterData } = params;
  const addConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    addConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    addConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: addConditions };

  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip: (Number(page) - 1) * limit,
    take: Number(limit)
  });

  return result;
};

export const AdminService = {
  getAllFormDb,
};
