import z from 'zod';

const loginSchemaValidation = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
  }),
});

const signUpSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    phone: z
      .string()
      .min(11, 'Phone number must be at least 11 characters long')
      .optional(),
    address: z
      .string()
      .min(5, 'Address must be at least 5 characters long')
      .optional(),
    profileImage: z.string().optional(),
  }),
});



const registerUserSchemaValidation = z.object({
  body: z.object({
    token: z.string(),
  }),
});

const changePasswordSchemaValidation = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

const resetPasswordSchemaValidation = z.object({
  body: z.object({
    changedPassword: z
      .string()
      .min(4, 'Password must be at least 4 characters long'),
  }),
});

export {
  loginSchemaValidation,
  signUpSchemaValidation,
  registerUserSchemaValidation,
  changePasswordSchemaValidation,
  resetPasswordSchemaValidation,
};
