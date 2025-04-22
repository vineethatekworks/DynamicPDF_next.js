// deno-lint-ignore-file
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export async function POST(req: NextRequest , res: NextResponse) {
    try{
        const data = await req.json();
        const {username, useremail, userpassword} = data;

        const userExists = await prisma.user.findUnique({
            where: {
                useremail: useremail,
            },
        });
        if (userExists) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 }as any);
        }

         //hash password
         const hashedPassword = await bcrypt.hash(userpassword,10);

         //create user
         const newUser = await prisma.user.create({
             data:{
                 username,
                 useremail,
                 userpassword:hashedPassword}
         });

         return NextResponse.json({ message: "User registered successfully" }, { status: 200 }as any);
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 } as any);
    }
    }