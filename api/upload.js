import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
    const body = await request.json();

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
                // Here you can implement your own logic to check if the user is authorized
                // For now, we'll allow it if the request is valid
                // In a real app, you'd check a session/cookie here
                return {
                    allowedContentTypes: ['application/pdf'],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // This callback is called once the upload is completed.
                // The results of this can be used to update your database.
                console.log('blob upload completed', blob, tokenPayload);
            },
        });

        return response.status(200).json(jsonResponse);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
}
