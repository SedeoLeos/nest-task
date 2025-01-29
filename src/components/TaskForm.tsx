"use client";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";

function TaskForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = handleSubmit(async (data) => {
        console.log(data);
      });

  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="w-[20rem]  h-[22rem] flex flex-col justify-center" >
  <CardHeader>
    <CardTitle className="text-center text-[1.576rem]">Nouvelle tache</CardTitle>
  </CardHeader>
  <CardContent>
    <form onSubmit={onSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="titre">Titre <span className="text-[#17655B]">*</span></Label>
          <Input type="titre" className={`${errors.titre && 'border-red-500'}`} id="titre" placeholder="Titre"
            {...register("titre", {
                required: {
                  value: true,
                  message: "le titre est obligatoire",
                },
              })}
          />
          {errors.titre && (
      <span className="text-red-500 text-xs">
        {String(errors.titre.message)}
      </span>
    )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="Description">description <span className="text-[#17655B]">*</span></Label>
          <Textarea className={`${errors.description && 'border-red-500'}`} placeholder="Description"
            {...register("description", {
                required: {
                  value: true,
                  message: "La description est obligatoire",
                },
              })}
          />
          {errors.description && (
      <span className="text-red-500 text-xs">
        {String(errors.description.message)}
      </span>
    )}
        </div>

        <Button type="submit" className="w-full">Ajouter</Button>
      </div>
    </form>
  </CardContent>
</Card>
</div>
  )
}

export default TaskForm