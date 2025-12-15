import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    const { contact, contactType } = await request.json();

    const result = await convex.query(api.enrollments.verifyEnrollment, {
      identifier: contact,
    });

    if (!result.verified) {
      return new Response(JSON.stringify({ error: "Student not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, student: result.student }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Verification failed" }), {
      status: 500,
    });
  }
}
