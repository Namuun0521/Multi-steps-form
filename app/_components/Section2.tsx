"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import { StepProps } from "./Section1";
import { useRef } from "react";

const formSchema = z
  .object({
    email: z.string().min(2, {
      message: "Please provide a valid email address.",
    }),
    phonenumber: z.string().min(8, {
      message: "Please enter a valid phone number.",
    }),
    Password: z.string().min(2, {
      message: "Password must include letters and numbers.",
    }),
    Confirmpassword: z.string().min(2, {
      message: "Passwords do not match. Please try again.",
    }),
  })
  .refine((data) => data.Password === data.Confirmpassword, {
    message: "Passwords do not match. Please try again.",
    path: ["Confirmpassword"],
  });

export const Section2 = ({ step, setStep }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phonenumber: "",
      Password: "",
      Confirmpassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(step + 1);
  }
  const backChange = () => {
    setStep(step - 1);
  };
  return (
    <div className="w-screen h-screen bg-[#F4F4F4] flex flex-col justify-center items-center ">
      <div className="w-[480px]  bg-white flex flex-col ">
        <Header />
        <SubHeader />
        <div className="px-8 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Placeholder"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Placeholder"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  className="h-11 w-32 bg-white text-black border border-[#CBD5E1] text-[16px] mb-8 "
                  type="button"
                  onClick={backChange}
                >
                  <ChevronLeft />
                  Back
                </Button>

                <Button className="text-white font-medium text-base h-11 w-[280px] mb-8 flex ">
                  Continue 2/3 <ChevronRight />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
