import { Category } from "@/models/Category";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
    const { name } = await req.json();
    if (await isAdmin()) {
        const categoryDoc = await Category.create({ name });
        return Response.json(categoryDoc);
    }
    return Response.json({});
}

export async function PUT(req) {
    const { _id, name } = await req.json();
    if (await isAdmin()) {
        const res = await Category.updateOne({ _id }, { name });
        return Response.json(res);
    }
    return Response.json({});
}

export async function GET(req) {
    return Response.json(
        await Category.find()
    );
}

export async function DELETE(req) {
    const { _id } = await req.json();
    // console.log(_id);
    if (await isAdmin()) {
        const res = await Category.deleteOne({ _id })
        return Response.json(res);
    }
    // console.log(res);
    return Response.json(true);
}