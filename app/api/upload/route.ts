import { Buffer } from "node:buffer";

import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import {
  s3Client,
  SPACES_BUCKET,
  SPACES_URL,
} from "../../helpers/common/digitalOceanConfig";

function reduce(numerator: number, denominator: number) {
  const gcd = function gcd(a: number, b: number): number {
    return b ? gcd(b, a % b) : a;
  };

  const result = gcd(numerator, denominator);

  return [numerator / result, denominator / result];
}

export async function POST(req: NextRequest) {
  const sharp = (await import("sharp")).default;
  const res = NextResponse;
  const images: string[] = [];
  const errors: string[] = [];
  const defaultImage = "image.webp";

  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const minWidth = +(formData.get("width") as string);
    const minHeight = +(formData.get("height") as string);

    if (!files.length) {
      return res.json({ message: "No files uploaded" }, { status: 400 });
    }

    for (const file of files) {
      if (file.size > 1024 * 1024 * 2) {
        errors.push("File size can not be larger than 2mb");
      }
      const buffer = await file.arrayBuffer();
      const sharpImage = sharp(Buffer.from(buffer));

      const { width = 0, height = 0 } = await sharpImage.metadata();

      const isStandard =
        minWidth && minHeight
          ? (width ?? 0) >= minWidth || (height ?? 0) >= minHeight
          : true;

      if (!isStandard) {
        errors.push(
          `${file.name} does not meet minimum requirements of ${minWidth}x${minHeight}`,
        );
        continue;
      }

      let optimizedBuffer;

      if (minWidth && minHeight) {
        // const [x, y] = reduce(minWidth, minHeight);

        optimizedBuffer = await sharpImage
          .resize({
            width: minWidth,
            height: minHeight,
            fit: "cover",
          })
          .toFormat("webp", { compressionLevel: 9, quality: 80 })
          .toBuffer();
      } else {
        optimizedBuffer = await sharpImage
          .toFormat("webp", { compressionLevel: 9, quality: 80 })
          .toBuffer();
      }

      const fileName = `${file.name.substring(0, file.name.lastIndexOf("."))}-${crypto.randomUUID()}.webp`;

      const bucketParams = {
        Bucket: SPACES_BUCKET,
        Key: fileName,
        Body: Buffer.from(optimizedBuffer),
        ContentType: "image/webp",
        ContentLength: file.length,
        ACL: "public-read" as const,
      };

      const resp = await s3Client.send(new PutObjectCommand(bucketParams));

      if (resp) {
        images.push(`${SPACES_URL}/${fileName}`);
      }
    }

    return res.json(
      {
        images,
        errors,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return res.json(
      {
        message: error.message || "Error processing image",
        error: error,
      },
      { status: 500 },
    );
  }
}
