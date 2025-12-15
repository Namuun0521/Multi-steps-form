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
import { ChevronRight } from "lucide-react";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import { Dispatch, SetStateAction, useContext } from "react";
import { StepContext } from "../page";
import { variants } from "./Section2";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name cannot contain special characters or numbers.",
  }),
  lastname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "This username is already taken. Please choose another one.",
  }),
});
export const Section1 = () => {
  const { data, handleNext, handleBack, setData } = useContext(StepContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("agadg");
    console.log(values);
    localStorage.setItem("FirstStep", JSON.stringify(values));
    handleNext();
    setData((prev) => ({
      ...prev,
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
    }));
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
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Placeholder" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Placeholder" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username *</FormLabel>
                      <FormControl>
                        <Input placeholder="Placeholder" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="text-white font-medium text-base h-11 w-[416px] mb-8 flex ">
                  Continue 1/3 <ChevronRight />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
