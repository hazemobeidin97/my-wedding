import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  weddingMedia: f({
    image: { maxFileSize: "32MB", maxFileCount: 20 },
    video: { maxFileSize: "512MB", maxFileCount: 5 },
  })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => {
      console.log("Wedding media uploaded:", file.ufsUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
