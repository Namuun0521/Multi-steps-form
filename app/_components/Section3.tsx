"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useContext, useState } from "react";
import { Header } from "./Header";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubHeader } from "./SubHeader";
import { StepContext } from "../page";
import { variants } from "./Section2";

const formSchema = z.object({
  datepicker: z.date("Please select a date"),
  uploading: z.string().min(1, "Image cannot be blank"),
});
export const Section3 = () => {
  const { data, handleNext, handleBack, setData } = useContext(StepContext);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedFoto, setSelectedFoto] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploading: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    form.setValue("uploading", file.name);
    setSelectedFoto(URL.createObjectURL(file));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("agadg");
    console.log(values);
    setData((prev) => ({
      ...prev,
      uploading: values.uploading,
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
        <div className="w-[480px] bg-white flex flex-col ">
          <Header />
          <SubHeader />
          <div className="px-8 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="datepicker"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="date"
                        className="text-[14px] font-semibold"
                      >
                        Date of birth *
                      </Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-104 justify-between font-normal "
                          >
                            {field.value
                              ? field.value.toLocaleDateString()
                              : "--/--/--"}
                            <CalendarIcon className="text-black h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              if (!date) return;
                              form.setValue("datepicker", date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uploading"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-semibold">
                        Profile image *
                      </FormLabel>
                      <FormControl className="flex flex-col">
                        <button
                          type="button"
                          className="h-45 w-104 bg-[#7F7F800D] rounded-md relative flex justify-center items-center"
                        >
                          <img src="/image.png" className="h-3 w-3" />
                          Add image
                          <Input
                            type="file"
                            onChange={handleFileChange}
                            className="opacity-0 absolute top-0 left-0 h-full w-full"
                          />
                          {selectedFoto && (
                            <img
                              src={selectedFoto}
                              className="absolute top-0 left-0 h-full w-full object-cover rounded-md "
                            />
                          )}
                        </button>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 ">
                  <Button
                    className="h-11 w-32 bg-white text-black border border-[#CBD5E1] text-[16px]  mt-[102px] mb-8 "
                    type="button"
                    onClick={handleBack}
                  >
                    {" "}
                    <ChevronLeft /> Back
                  </Button>
                  <Button
                    className="h-11 w-70 text-[16px]  mt-[102px] mb-8 "
                    type="submit"
                  >
                    Continue 3/3 <ChevronRight />
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
