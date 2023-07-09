import * as z from 'zod';

export const quoteFormSchema = z.object({
  guests: z.array(z.number()),
  clientName: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres.',
    })
    .max(30, {
      message: 'El nombre no debe superar los 30 caracteres.',
    }),
  comments: z
    .string()
    .min(4, {
      message: 'El mensaje debe tener al menos 4 caracteres.',
    })
    .max(260, {
      message: 'El mensaje no debe superar los 260 caracteres.',
    }),
  shape: z
    .string({ required_error: 'Por favor, selecciona una forma.' })
    .nonempty({ message: 'El campo no puede estar vacio.' }),
  coverage: z
    .string({ required_error: 'Por favor, selecciona una cobertura.' })
    .nonempty({ message: 'Una cobertura debe ser seleccionada.' }),
  decoration: z
    .string({ required_error: 'Por favor, selecciona una decoracion.' })
    .nonempty({ message: 'Una decoracion debe ser seleccionada.' }),
  filling: z
    .array(
      z.object({
        value: z.string().nonempty({ message: 'Debes seleccionar un relleno.' }),
      })
    )
    .min(1, { message: 'Debe haber al menos un relleno seleccionado.' }),
  dateOrder: z.date({ required_error: 'La fecha de entrega es necesaria.' }),
});
