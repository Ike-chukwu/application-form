import { S3 } from "@aws-sdk/client-s3";

const accessKeyId = process.env.NEXT_PUBLIC_SPACES_KEY_LIVE;
const secretAccessKey = process.env.NEXT_PUBLIC_SPACES_SECRET_LIVE;
const endpoint = process.env.NEXT_PUBLIC_SPACES_ENDPOINT;

if (!accessKeyId || !secretAccessKey || !endpoint) {
  throw new Error("Missing required environment variables for S3 client.");
}

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: endpoint,
  // endpoint: spacesEndpoint,
  region: "nyc3",
  credentials: {
    // accessKeyId: process.env.REACT_APP_SPACES_KEY_STG,
    // secretAccessKey: process.env.REACT_APP_SPACES_SECRET_STG,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    // accessKeyId: "DO00EE8PGZLQCMD2HRFF",
    // secretAccessKey: "HXVdV/65nWWM9/VtViUi614Qej+xV87Co6UFDlP8dtw",
  },
});

const SPACES_URL = process.env.NEXT_PUBLIC_SPACES_URL;
const SPACES_BUCKET = process.env.NEXT_PUBLIC_SPACES_BUCKET;

export { s3Client, SPACES_URL, SPACES_BUCKET };
