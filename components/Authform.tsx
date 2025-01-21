'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { AuthformSchema } from '@/lib/utils'
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'

const Authform = ({type}:{type :string}) => {
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const formSchema=AuthformSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })
      const onSubmit=async(values: z.infer<typeof formSchema>) =>{
        setIsLoading(true);
        try {
          
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false);
        }
      }
  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="icons/logo.svg"
            width={34}
            height={34}
            alt="Origin logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Origin</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                {user ?'Link Account':type==='sign-in'?'sign-In':'sign-Up'}
                <p className='text-16 font-normal text-gray-600'>
                    {user?'Link your account to get started':'Please enter your details'}
                </p>
            </h1>
        </div>
        </header>
        {user?(<div className="flex flex-col gap-4">

        </div>):
        (
            <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {type==='sign-up'&&(
                    <>
                    <div className='flex gap-4'>
                      <CustomInput control={form.control} name='firstname' label="First Name" placeholder="Enter your first name"/>
                      <CustomInput control={form.control} name='lastname' label="Last Name" placeholder="Enter your last name"/>
                    </div>
                    <CustomInput control={form.control} name='address1' label="Address" placeholder="Enter your specific address"/>
                    <div className='flex gap-4'>
                      <CustomInput control={form.control} name='state' label="State" placeholder="Example: AP"/>
                      <CustomInput control={form.control} name='postalcode' label="Postal Code" placeholder="Example: 517001"/>
                    </div>
                    <div className='flex gap-4'>
                      <CustomInput control={form.control} name='dateofbirth' label="Date Of Birth" placeholder="yyy-mm-dd"/>
                      <CustomInput control={form.control} name='ssn' label="SSN" placeholder="Example:1234"/>
                    </div>
                    </>
                  )}
                    <CustomInput control={form.control} name='email' label="Email" placeholder="Enter your email"/>                    
                    <CustomInput control={form.control} name='password' label="Password" placeholder="Enter your password"/>  
                <div className='flex flex-col gap-4'>                 
                  <Button type="submit" className='form-btn' disabled={isLoading}>
                    {isLoading ? <>
                      <Loader2 size={20}
                      className='animate-spin'/>&nbsp;
                      Loading...
                    </>:type==='sign-in'?'Sign In':'Sign Up'}
                  </Button>
                  </div>
            </form>
        </Form>
        <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {type==='sign-in'?'Don\'t have an account?':'Already have an account?'}
            </p>
              <Link href={`/${type==='sign-in'?'sign-up':'sign-in'}`} className='form-link'>
                {type==='sign-in'?'Sign Up':'Sign In'}
              </Link>
        </footer>
            </>
        )}
    </section>
  )
}

export default Authform