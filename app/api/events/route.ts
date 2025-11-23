import { v2 as cloudinary } from "cloudinary";
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// @desc : Create a new event
// @route : POST /api/events
// @access : Private
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData(); // in next is req.formData not req.body

    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid JSON data format ",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 400 }
      );
    }

    // image
    const file = formData.get("image") as File;

    if (!file)
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event Created Successfully", event: createEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      {
        message: "Event Creation Failed ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// @desc : Get all events
// @route : GET /api/events
// @access : Public
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Event Fetched Successfully", events },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        message: "Event Fetch Failed ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// a route that accepts a slug as input =>  return the event details

// ====================

// @desc : Delete an event
// @route : DELETE /api/events/:id
// @access : Private
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id") as string;
    await Event.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Event Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      {
        message: "Event Deletion Failed ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

//@desc : Update an event
// @route : PUT /api/events/:id
// @access : Private
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Get event ID from query params
    // const id = req.nextUrl.searchParams.get("id");
    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    // Get form data
    const formData = await req.formData();
    const eventData: any = Object.fromEntries(formData.entries());

    // Handle image if exists
    const file = formData.get("image") as File;
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "DevEvent" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      eventData.image = uploadResult.secure_url;
    }

    // Update event in DB
    const updateEvent = await Event.findByIdAndUpdate(id, eventData, {
      new: true, // return updated document
      runValidators: true, // validate schema
    });

    if (!updateEvent) {
      return NextResponse.json(
        { message: `Event with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event Updated Successfully", event: updateEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      {
        message: "Event Update Failed ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
