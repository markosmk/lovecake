'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import * as z from 'zod';

import { cn, daysUntilNextSaturday } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/react-hook-form/form';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { CalendarIcon, Circle, Hexagon, Square } from 'lucide-react';
import { coverage, decoration, filling, shapes } from '@/config/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const quoteFormSchema = z.object({
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
  filling: z.array(
    z.object({
      value: z.string().nonempty({ message: 'Debes seleccionar un relleno.' }),
    })
  ),
  dateOrder: z.date({
    required_error: 'La fecha de entrega es necesaria.',
  }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const defaultValues: Partial<QuoteFormValues> = {
  clientName: '',
  comments: '',
  filling: [],
  guests: [11],
  shape: 'circular',
};

export function QuoteForm() {
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'filling',
    control: form.control,
  });

  const onSubmit = (data: QuoteFormValues) => {
    console.log({ data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* count guests */}
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cantidad de Invitados <span className="text-green-600 font-bold">{field.value}</span>
              </FormLabel>
              <FormControl>
                <Slider onValueChange={field.onChange} defaultValue={field.value} max={70} min={5} step={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* shapes */}
        <FormField
          control={form.control}
          name="shape"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Formas disponibles</FormLabel>
              <RadioGroup defaultValue={field.value} onValueChange={field.onChange} className="grid grid-cols-3 gap-4">
                {shapes.map((item) => (
                  <Label
                    key={item.id}
                    htmlFor={item.name}
                    className={cn(
                      'flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary',
                      item.disable && 'opacity-30 select-none pointer-events-none'
                    )}
                  >
                    <RadioGroupItem value={item.name.toLowerCase()} id={item.name} className="sr-only" />
                    {item.name.toLowerCase() === 'circular' || item.name.toLowerCase() === 'redonda' ? (
                      <Circle className="mb-3 h-6 w-6 fill-black" />
                    ) : item.name.toLowerCase() === 'cuadrada' || item.name.toLowerCase() === 'rectangular' ? (
                      <Square className="mb-3 h-6 w-6 fill-black" />
                    ) : (
                      <Hexagon className="mb-3 h-6 w-6 fill-black" />
                    )}
                    {item.name}
                  </Label>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        {/* filling */}
        <div>
          <FormItem className="mb-2">
            <FormLabel>Rellenos</FormLabel>
            {/* <FormDescription>
              Tenemos Rellenos sugeridos, puedes elegir las combinaciones y agregarlas a tu pedido.
            </FormDescription> */}
          </FormItem>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`filling.${index}.value`}
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <div className="flex gap-2">
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona una opcion" />
                        </SelectTrigger>
                        <SelectContent>
                          {filling.map((item) => (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="button" variant="ghost" onClick={() => remove(index)}>
                        <Icons.trash className="h-4 w-4 " />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              append({ value: '' });
            }}
            disabled={fields.length >= 3}
          >
            Agregar Relleno
          </Button>
        </div>

        {/* coverage */}
        <FormField
          control={form.control}
          name="coverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cobertura</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona uno cobertura" />
                </SelectTrigger>
                <SelectContent>
                  {coverage.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.value && (
                <FormDescription>{coverage.find((item) => item.name === field.value)?.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* decoration */}
        <FormField
          control={form.control}
          name="decoration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decoracion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una decoracion" />
                </SelectTrigger>
                <SelectContent>
                  {decoration.map((item) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.value && (
                <FormDescription>{decoration.find((item) => item.name === field.value)?.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <hr />

        {/* date order */}
        <FormField
          control={form.control}
          name="dateOrder"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Entrega</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                        fieldState.error && 'border-destructive'
                      )}
                    >
                      {field.value ? (
                        format(field.value, "EEEE, dd 'de' MMMM", { locale: es })
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                  <Select onValueChange={(value) => field.onChange(addDays(new Date(), parseInt(value)))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selección Rápida (opcional)" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value={daysUntilNextSaturday().toString() || '0'}>El proximo Sabado</SelectItem>
                      <SelectItem value="3">En 4 dias</SelectItem>
                      <SelectItem value="7">En 1 Semana</SelectItem>
                      <SelectItem value="14">En 2 Semanas</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={es}
                      disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Descripcion Adicional
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* name order */}
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tu Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de quien realiza el pedido" value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* details order */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Detalles Adicionales</FormLabel> */}
              <FormControl>
                <Textarea
                  placeholder="Detalles adicionales, datos como el nombre del agasajado, alguna caracteristica o color particular, etc"
                  className="resize-none -mt-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sticky bottom-0 bg-white pb-2 pt-3 -mx-2 -px-2">
          {/* <div className="shadow shadow--top"></div> */}
          <div className="shadow shadow--bottom"></div>
          <Button type="submit" size="lg" className="w-full">
            Solicitar Pedido
          </Button>
        </div>
      </form>
    </Form>
  );
}
