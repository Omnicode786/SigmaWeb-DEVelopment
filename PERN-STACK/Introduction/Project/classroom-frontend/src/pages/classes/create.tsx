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
import UploadWidget from "@/components/upload-widget";
import { Subject, User } from "@/types";
import z from "zod";

// sample data arrays
const teachers: { id: number; name: string }[] = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
];

const subjects: { id: number; name: string; code: string }[] = [
    { id: 1, name: "Mathematics", code: "MATH" },
    { id: 2, name: "Biology", code: "BIO" },
];

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

const {handleSubmit, formState: {isSubmitting, control}}= form; 

const onSubmit = (values: z.infer<typeof classSchema>) => {
  try {
  console.log(values)

  }catch(e){
console.log(e);
  }
}


  return (
    <CreateView className='class-view'>
        <Breadcrumb/>

        <h1 className='page-title'> Create a Class</h1>

        <div className='intro-row'>
            <p>Provide the required information below to add a class.</p>
            <Button onClick={back} >Go Back</Button>
             </div>
            
            <Separator/>
        
<div className='my-4 w-full flex items-center'>
<Card
className='class-form-card w-full'>
    <CardHeader
     className='z-10 '
     >
        <CardTitle  className='text-2xl p-0 font-bold'>Fill out the form</CardTitle>
     </CardHeader>
     <Separator/>

     <CardContent
     className='mt-7 w-full '
     >

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
                       <Select onValueChange={(value) => field.onChange(Number(value))} value = {field?.value?.toString()}>
                      <FormControl>
                      <SelectTrigger className="w-full ">
                  <SelectValue
                  placeholder= "Select Subject"
                  />

                      </SelectTrigger>


                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem value={subject.id.toString()} key = {subject.id}>
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
                       <Select onValueChange={(value) => field.onChange(Number(value))} value = {field?.value?.toString()}>
                      <FormControl>
                      <SelectTrigger className="w-full ">
                  <SelectValue
                  placeholder= "Select a Teacher"
                  />

                      </SelectTrigger>


                      </FormControl>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem value={teacher.id.toString()} key = {teacher.id}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  </div>
          

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
  )
}

export default create