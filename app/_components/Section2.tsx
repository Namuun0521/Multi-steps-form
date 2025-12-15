"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { motion } from "framer-motion";

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

import { useContext, useRef } from "react";
import { StepContext } from "../page";

const formSchema = z
  .object({
    email: z.string().min(2, {
      message: "Please provide a valid email address.",
    }),
    phonenumber: z.string().min(8, {
      message: "Please enter a valid phone number.",
    }),
    password: z.string().min(2, {
      message: "Password must include letters and numbers.",
    }),
    confirmpassword: z.string().min(2, {
      message: "Passwords do not match. Please try again.",
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match. Please try again.",
    path: ["Confirmpassword"],
  });

export const variants = {
  enter: { opacity: 1, x: 0, transition: { duration: 1, delay: 1 } },
  exit: { opacity: 0, x: -100, transition: { duration: 1 }, delay: 1 },
  initial: { opacity: 0, x: 100 },
};

export const Section2 = () => {
  const { data, handleNext, handleBack, setData } = useContext(StepContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email,
      phonenumber: data.phonenumber,
      password: data.password,
      confirmpassword: data.confirmpass,
    },
  });

  console.log(form.formState.errors);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("agadg");
    console.log(values);
    setData((prev) => ({
      ...prev,
      email: values.email,
      phonenumber: values.phonenumber,
      password: values.password,
      confirmpassword: values.confirmpassword,
    }));
    handleNext();
  }
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <div className="w-screen h-screen bg-[#F4F4F4] flex flex-col justify-center items-center ">
        <div className="w-[480px]  bg-white flex flex-col ">
          <Header />
          <SubHeader />
          <div className="px-8 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                  name="password"
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
                  name="confirmpassword"
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
                    onClick={handleBack}
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
    </motion.div>
  );
};
