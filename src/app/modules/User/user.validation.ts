import { z } from "zod";
import { Gender } from "../../../generated/prisma";

const createAdmin = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is required",
    }),
  }),
});

const createDoctor = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  doctor: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    contactNumber: z.string({
      required_error: "Contact Number is required",
    }),
    address: z.string().optional(),
    registrationNumber: z.string({
      required_error: "Registration Number is required",
    }),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
      required_error: "Gender is required",
    }),
    appointmentFee: z.number({
      required_error: "Appointment Fee is required",
    }),
    qualification: z.string({
      required_error: "Qualification is required",
    }),
    currentWorkingPlace: z.string({
      required_error: "Current Working Place is required",
    }),
    designation: z.string({
      required_error: "Description is required",
    }),
    profilePhoto: z.string().url().optional(),
  }),
});

export const userValidation = {
  createAdmin,
  createDoctor
};
