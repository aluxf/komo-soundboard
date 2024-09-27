import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";



const formSchema = z.object({
    label: z.string().refine((label) => label.length > 0),
    file: z
    .custom<File>()
    .refine((file) => file?.type === "audio/mpeg")
});
  

export const SoundForm = () =>{
    const { toast } = useToast()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        label: undefined,
        file: undefined,
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      // Send form data to the server
      const formData = new FormData();
      formData.append("label", values.label);
      formData.append("file", values.file);
  
      const response = await fetch("/api/request-sound", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Request sent successfully");
        toast({
          description: "Sound request has been sent for review.",
        })
      } else {
        console.error("Failed to send request");
      }
    }

    return (
      <div>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="skeeyee" {...field} />
                </FormControl>
                <FormDescription>
                  This is the sound label.
                </FormDescription>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soundfile</FormLabel>
                <FormControl>
                  <Input 
                  type="file"
                  onChange={(e) => {
                      if (e.target.files?.length === 1) {
                        field.onChange(e.target.files[0])
                      }
                    }
                  } 
                  accept="audio/mpeg"
                  />
                </FormControl>
                <FormDescription>
                  This is the sound file in mp3 format.
                </FormDescription>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <Button type="submit">Send Request</Button>
          
        </form>

      </Form>
      <Toaster/>
    </div>
    
    )
}