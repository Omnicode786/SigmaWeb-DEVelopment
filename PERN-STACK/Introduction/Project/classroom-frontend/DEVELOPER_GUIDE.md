# Developer Guide — Forms & Tables Pattern

This guide explains the pattern used in this project to build forms and tables using Refine, `@refinedev/react-hook-form`, Zod, and shadcn UI components. It includes plain-language explanations of the functions and imports you use in the repo, integration tips, and a copy-paste boilerplate based on `src/pages/classes/create.tsx`.

---

## Goals

- Make creating CRUD forms predictable and consistent.
- Combine Refine's data/mutation helpers with React Hook Form + Zod validation.
- Use shadcn UI primitives for consistent layout and styling.

---

## Libraries & exact imports used in this project (what to import and why)

The following list shows the actual imports you see in the project and what each one provides. Copy these when you need similar behavior.

- From Refine / core / react integration:
  - `useBack` (from `@refinedev/core`) — navigation helper that calls history.back() or Refine's routing back logic.
  - `useList` (from `@refinedev/core`) — fetch a list of resources; helpful for populating selects or tables.
  - `useForm` (from `@refinedev/react-hook-form`) — adapter around `react-hook-form` configured for Refine. Use it in forms that should trigger Refine create/edit actions automatically.

- From react-hook-form / resolver:
  - `zodResolver` (from `@hookform/resolvers/zod`) — adapter that runs Zod schema validation inside `react-hook-form`.

- From Zod:
  - `z` (from `zod`) — schema builder for validation and TypeScript type inference (use `z.infer<typeof schema>` for types).

- UI primitives (shadcn-style components in this repo):
  - `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` — light wrappers that work with `react-hook-form`'s `control` to display labels, controls, and validation messages.
  - `Input`, `Textarea` — basic text input components.
  - `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` — controlled select primitives; `onValueChange` returns strings so convert when needed.
  - `Button`, `Card`, `CardHeader`, `CardContent`, `CardTitle`, `Separator` — layout and action components used throughout the forms and pages.

- Icons and helpers:
  - `Loader2` (from `lucide-react`) — spinner icon used with loading states.
  - `UploadWidget` — local component used for file uploads in the project.

---

## Detailed explanation of the core functions and how they fit together

This section explains what each hook, function, and component does and how you wire them together to create a robust form.

- `useForm()` (from `@refinedev/react-hook-form`)
  - Purpose: Provide a pre-configured `react-hook-form` instance that can call Refine create/edit mutations automatically.
  - Typical usage:
    - Pass `resolver: zodResolver(schema)` to run Zod validation.
    - Pass `refineCoreProps: { resource: 'resourceName', action: 'create' | 'edit' }` to let the adapter know which Refine mutation to execute.
  - Returns: `handleSubmit`, `control`, `formState`, `setValue`, `getValues`, etc. Use `control` for controlled fields (Selects, custom components).

- `zodResolver(schema)`
  - Purpose: Connect `zod` validation to `react-hook-form`. Runs schema validation on submit (or on change/blur if configured).
  - When validation fails, errors are available in `formState.errors` and shown via `FormMessage`.

- `Form` and `FormField` (shadcn primitives)
  - `Form` accepts the `useForm()` object and passes context to children.
  - `FormField` binds a named field to `control`. It provides a `render` prop where you receive `{ field }` (from `react-hook-form`) and wire it to your UI control (`Input`, `Select`, custom components).
  - `field` contains standard props: `value`, `onChange`, `onBlur`, `name`, `ref`.

- `Select` (shadcn)
  - The select primitives are composed; `Select` uses string values. When your backend or types expect numbers, convert string ↔ number when wiring `onValueChange` and `value`.
  - Example: `onValueChange={(v) => field.onChange(Number(v))}` and `value={field.value?.toString()}`.

- `useList()`
  - Use to fetch options for selects or to populate tables. It returns `{ data, isLoading, refetch }`. `data` typically is an object with `.data` array depending on your data provider.

- `handleSubmit(onSubmit)`
  - From `react-hook-form`. Handles running validation then calls your `onSubmit` handler with typed values.

- `formState.isSubmitting`
  - Handy boolean to disable submit button and show spinner while mutation runs.

---

## Zod validation and TypeScript types (how to do it reliably)

1. Define Zod schema near your resource model file (e.g., `src/lib/schema.ts`):

```ts
import { z } from 'zod';

export const classSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  subjectId: z.number(),
  teacherId: z.number().optional(),
  bannerUrl: z.string().optional(),
});

export type ClassFormValues = z.infer<typeof classSchema>;
```

2. Use `classSchema` when building the form:

```ts
const form = useForm({
  resolver: zodResolver(classSchema),
  refineCoreProps: { resource: 'classes', action: 'create' },
});
```

3. In `onSubmit`, values are typed: `(values: ClassFormValues) => { ... }`.

---

## Boilerplate: Copy/paste form template (based on `create.tsx`)

Replace occurrences of `classSchema`, resource name, and fields to match your resource.

```tsx
import React from 'react';
import { useForm } from '@refinedev/react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { CreateView } from '@/components/refine-ui/views/create-view';
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb';
import { classSchema } from '@/lib/schema';
import z from 'zod';

const ResourceCreate: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(classSchema),
    refineCoreProps: { resource: 'classes', action: 'create' },
    defaultValues: { status: 'active' },
  });

  const { handleSubmit, control, formState } = form;

  const onSubmit = (values: z.infer<typeof classSchema>) => {
    console.log('Submit', values);
  };

  return (
    <CreateView>
      <Breadcrumb />
      <h1>Create</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={formState.isSubmitting}>Submit</Button>
        </form>
      </Form>
    </CreateView>
  );
};

export default ResourceCreate;
```

---

## Tables quick-start

- Use `useList({ resource: 'classes' })` to fetch rows.
- Map `data?.data` into table rows. Use `isLoading` to show skeletons.
- Hook up action buttons to `useDelete` or navigation to `edit` pages.

Example:

```ts
const { data, isLoading } = useList({ resource: 'classes' });
const rows = data?.data ?? [];
```

---

## Practical tips and common patterns

- For select options: use `useList` to load options and map them into `SelectItem` elements.
- Convert `Select` values to numbers when needed with `Number()`.
- Use `FormMessage` to show `zod` error messages — they are automatically passed into `react-hook-form` errors by `zodResolver`.
- For server-side errors after mutation, `setError(fieldName, { message: '...' })` maps backend error to the UI.

---

If you want, I can also:

- Extract a `SelectField` helper that takes `useList` output and renders `Select` options.
- Add `edit.tsx` and `list.tsx` boilerplates matching this pattern.

Tell me which next step you prefer.
