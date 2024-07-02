import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

const prisma = new PrismaClient();

export async function POST(request: Request){
    const body = await request.json();
    const {name, familyName, money, email} = body.data;
    if(!name || !familyName){
        return NextResponse.json({error: "Vennligst fyll ut alle felter", status: 400 });
    }

    const exists = await prisma.user.findFirst({
        where: {
            name: name
        }
    })

    if(exists){
        return NextResponse.json({error: "Bruker finnes allerede", status: 400 });
    }

    const hashedPassword = await bcrypt.hash("password", 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            familyName,
            money,
            hashedPassword
        }
    })

    return NextResponse.json(user, { status: 201 });
}