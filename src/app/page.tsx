'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/server-actions/auth.actions";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
type FormData = {
  email: string;
  password: string;
};
function LoginPage() {

 
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      mode: 'onBlur', // Changez ici selon la validation que vous souhaitez (onSubmit, onChange, onBlur)
    });
    const router = useRouter()
  
    const onLogin = async (data: FormData) => {
      console.log('Form Submitted:', data);
     const loginData =  await login(data.email,data.password)
     if(loginData.user && loginData.token){
      router.push('dashboard')
     }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[30rem] px-[5rem] h-[32rem] flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-center">Se connecter</CardTitle>
          </CardHeader>
          <CardContent className="mt-5">
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-[#17655B]">*</span>
                  </Label>
                  <Input
                    type="email"
                    className={`${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    id="email"
                    placeholder="Entrer votre email"
                    {...register('email', {
                      required: {
                        value: true,
                        message: "L'email est obligatoire",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {String(errors.email.message)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password">
                    Mot de passe <span className="text-[#17655B]">*</span>
                  </Label>
                  <Input
                    type="password"
                    className={`${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    id="password"
                    placeholder="Entrer votre mot de passe"
                    {...register('password', {
                      required: {
                        value: true,
                        message: "Le mot de passe est obligatoire",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {String(errors.password.message)}
                    </span>
                  )}
                </div>
  
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

export default LoginPage
