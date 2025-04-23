import { z } from "zod";


export const formdata = z.object({
    name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z ]+$/, "Name must contain only letters"),


  fatherName: z
    .string()
    .min(1, "Father name is required")
    .regex(/^[A-Za-z ]+$/, "Father name must contain only letters"),


  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .gt(26, "Age must be greater than 25")
    .lt(99, "Age must be less than 100"),


  email: z
    .string()
    .email("Invalid email address")
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com",
    }),


  designation: z
    .string()
    .min(1, "Designation is required")
    .regex(/^[A-Za-z ]+$/, "Designation should contain only letters"),


  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address must be less than 255 characters"),


  postalAddress: z
    .string()
    .min(1, "Postal Address is required")
    .max(255, "Postal Address must be less than 255 characters"),


  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits"),


  aadhaarNumber: z
    .string()
    .length(12, "Aadhaar number must be exactly 12 digits")
    .regex(/^\d{12}$/, "Aadhaar number must contain only digits"),
});


export const step1Schema = formdata.pick({
    name: true,
    fatherName: true,
    age: true,
    email: true,
  });
 
  export type Step1Data = z.infer<typeof step1Schema>;


  export const step2Schema = formdata.pick({
    designation: true,
    address: true,
    postalAddress: true,
    phoneNumber: true,
    aadhaarNumber: true,
  });


  export type Step2Data = z.infer<typeof step2Schema>;
