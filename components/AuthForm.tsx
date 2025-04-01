"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/client";
import {signIn, signUp} from "@/lib/actions/auth.action";


const authFormSchema = (type: FormType)=> {
    return z.object({
        name: type==="sign-up" ? z.string().min(3).max(50) : z.string(),
        email: z.string().email(),
        password: z.string().min(6).max(50),
    });
}

const AuthForm = ({type}: {type:FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if(type==="sign-up"){
                const { name, email, password} = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email: email,
                    password: password!,
                });

                if(!result?.success){
                    toast.error(result?.message);
                    return;
                }

                toast.success("Account created successfully. Please sign in.");
                router.push("/sign-in");
            }else{
                const {email, password} = values;
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();
                if(!idToken){
                    toast.error("Sign in failed.");
                    return;
                }
                await signIn({
                    email, idToken
                })

                toast.success("Sign in successfully.");
                router.push("/");
            }
        }catch(error){
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    }

    const isSignin = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[560px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>

                <h3>Practice job interview with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-4 form">
                        {!isSignin && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your name"
                                type="text"
                            />
                        ) }
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Enter your email address"
                            type="email"
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your Password"
                            type="password"
                        />
                        <Button type="submit" className="btn">
                            {isSignin ? "Submit" : "Create an Account"}
                        </Button>
                        <div className="text-center">
                            {isSignin ? "No account yet?" : "Have an account already?"} &nbsp;
                            <Link href={isSignin ? "/sign-up" : "/sign-in"}>
                                {isSignin ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </form>
                </Form>

                <p>

                </p>
            </div>
        </div>
    )
}

export default AuthForm
