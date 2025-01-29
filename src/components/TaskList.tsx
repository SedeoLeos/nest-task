"use client"

import { useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import TaskForm from "@/components/TaskForm"

function TaskList() {
  const [open, setOpen] = useState(false);
  return (
    <div>
     <Card className="w-[16.25rem] h-[5.75rem] px-4 flex flex-col justify-center" >
        
           
           <div className="flex items-center relative">
           <RadioGroup defaultValue="comfortable" className="pt-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Agricoles</Label>
                </div>
             </RadioGroup>
             <div className="flex items-center space-x-2 absolute right-0 top-0">
            <Pencil className="size-[1.2rem] text-[#A4A7AE] cursor-pointer" />
            <Trash2 className="size-[1.2rem] text-[#A4A7AE] cursor-pointer" onClick={() => setOpen(true)}/>
            </div>
          
           </div>

           <p className="text-[#535862] text-sm pt-2 ps-[1.58rem]">Activités agricoles, culture de plantes, l'élevage d'animaux...</p>
            
    </Card>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[15.75rem] w-[26.438rem] flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-center text-[1.875rem] font-semibold">Suppression</DialogTitle>
          <DialogDescription class="pt-3 text-center text-[#535862] text-sm">
          Voulez vous vraiment supprimer la <br></br> tache #1256 ?
          </DialogDescription>
        </DialogHeader>
          <div className="flex justify-between space-x-3 px-[3rem]">
            <Button onClick={() => setOpen(false)} className="w-full bg-[#ADADAC]" type="button">
              Annuler
            </Button>
            <Button className="w-full" type="button">
              Valider
            </Button>
          </div>
      </DialogContent>
    </Dialog>

    </div>
  )
}

export default TaskList