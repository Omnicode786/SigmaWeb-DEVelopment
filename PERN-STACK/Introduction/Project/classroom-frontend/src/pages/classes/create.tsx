import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreateView } from "@/components/refine-ui/views/create-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";

import { Textarea } from "@/components/ui/textarea";
import { useBack, useList } from "@refinedev/core";
import { Loader2 } from "lucide-react";
import { classSchema } from "@/lib/schema";
import { Subject, User } from "@/types";
import z from "zod";
import { Label } from '@/components/ui/label';
import errorsToRecord from "@hookform/resolvers/io-ts/dist/errorsToRecord.js";
import UploadWidget from './../../components/upload-widget';

// sample data arrays
// const teachers: { id: number; name: string }[] = [
//   { id: 1, name: "Alice Johnson" },
//   { id: 2, name: "Bob Smith" },
// ];

// const subjects: { id: number; name: string; code: string }[] = [
//   { id: 1, name: "Mathematics", code: "MATH" },
//   { id: 2, name: "Biology", code: "BIO" },
// ];




const create = () => {
  const back = useBack();
  const form = useForm({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
      resource: "classes",
      action: "create",
    },
    defaultValues: {
      status: "active",
    },
  });
// now the above is no longer needed now lets get the data from the backend


// for subjects
const {query: subjectsQuery} = useList<Subject>({
  resource: 'subjects',
  pagination: {
    pageSize: 100
  }
})
// fotr teachers

const {query: teachersQuery} = useList<User>({
  resource: 'users',
  filters: [
    {field: 'role', operator: 'eq', value: 'teacher'},
  ],
  pagination: {
    pageSize: 100
  }
})


const subjects = subjectsQuery?.data?.data ||[];

const subjectsLoading= subjectsQuery.isLoading;

const teachers = teachersQuery?.data?.data ||[];

const teachersLoading= teachersQuery.isLoading;


    const bannerPublicId = form.watch('bannerCldPubId');
const {
  refineCore: {onFinish},
  handleSubmit,
  control,
  setValue,
  watch,
  formState: { isSubmitting, errors },
} = form;
  const onSubmit =async (values: z.infer<typeof classSchema>) => {
    try {
     
      await onFinish(values);

    } catch (e) {
      console.log(e);
    }
  };


const setBannerImage = (file: any, field: any) => {
  if (file) {
    field.onChange(file.url);

    setValue("bannerCldPubId", file.publicId, {
      shouldValidate: true,
      shouldDirty: true,
    });
  } else {
    field.onChange("");

    setValue("bannerCldPubId", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  }
};
  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title"> Create a Class</h1>

      <div className="intro-row">
        <p>Provide the required information below to add a class.</p>
        <Button onClick={back}>Go Back</Button>
      </div>

      <Separator />

      <div className="my-4 w-full flex items-center">
        <Card className="class-form-card w-full">
          <CardHeader className="z-10 ">
            <CardTitle className="text-2xl p-0 font-bold">
              Fill out the form
            </CardTitle>
          </CardHeader>
          <Separator />

          <CardContent className="mt-7 w-full ">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
    
                
             <FormField
  control={control}
  name="bannerUrl"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Banner Image <span className="text-orange-600">*</span>
      </FormLabel>

      <FormControl>
        <UploadWidget
          value={
            field.value
              ? { url: field.value, publicId: bannerPublicId ?? "" }
              : null
          }
          onChange={(file: any) => setBannerImage(file, field)}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class Name <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to Biology - Section A"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* subject field */}

                  <FormField
                    control={control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field?.value?.toString()}
                          disabled = {subjectsLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full ">
                              <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem
                                value={subject.id.toString()}
                                key={subject.id}
                              >
                                {subject.name} ({subject.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* teacher field */}
                  <FormField
                    control={control}
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Teacher <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange((value))
                          }
                          value={field?.value?.toString()}
                          disabled={teachersLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full ">
                              <SelectValue placeholder="Select a Teacher" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem
                                value={teacher.id.toString()}
                                key={teacher.id}
                              >
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* capacity */}
                  <FormField
                    control={control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Capacity <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Input
                          type="number"
                       
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />


{/* status */}
<FormField

  control={control}
  name="status"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Status <span className="text-orange-600">*</span>
      </FormLabel>

      <Select
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>



                </div>

{/* description */}

<FormField
  control={control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Description <span className="text-orange-600">*</span>
      </FormLabel>
    <Textarea  
            placeholder="Enter class description..."
          className="min-h-[120px] w-full"
    {...field}

    />

      <FormMessage />
    </FormItem>
  )}
/>
                <Separator />

                <Button type="submit" size="lg" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default create;
