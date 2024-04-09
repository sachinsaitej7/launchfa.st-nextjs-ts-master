import { Writable } from 'stream'
import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from 'firebase/app'
import { getSession } from '@/lib/utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import fireBaseConfig from '@/lib/db/firebaseConfig.example'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const formidableConfig = {
  maxFields: 7,
  multiples: false,
  keepExtensions: true,
  allowEmptyFiles: false,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
}

function formidablePromise(req: NextApiRequest, opts?: Parameters<typeof formidable>[0]): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((accept, reject) => {
    const form = formidable(opts)
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      return accept({ fields, files })
    })
  })
}

const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk)
      next()
    },
  })
  return writable
}

export const config = {
  api: {
    bodyParser: false,
  },
}

async function GET(request: NextApiRequest, res: NextApiResponse) {
  // Check if the user is authenticated using the getSession function
  const user = await getSession(request, res)
  // If the user is not authenticated, return a 403 (Forbidden) response
  if (!user) return res.status(403).end()
  // Extract the 'image' parameter from the request URL.
  const image = request.query.image
  // Check if the 'image' parameter exists in the URL.
  if (image && typeof image === 'string') {
    try {
      // Initialize the Firebase app with the provided configuration.
      const app = initializeApp(fireBaseConfig)
      // Get a reference to the Firebase storage.
      const storage = getStorage(app)
      // Create a reference to the specified image in storage.
      const fileRef = ref(storage, image)
      // Get the download URL of the image.
      const imagePublicURL = await getDownloadURL(fileRef)
      // Return a JSON response with the image's public URL and a 200 status code.
      return res.status(200).json({ imagePublicURL })
    } catch (e: any) {
      // If an error occurs, log the error message and return a JSON response with a 500 status code.
      const tmp = e.message || e.toString()
      console.log(tmp)
      return res.status(500).send(tmp)
    }
  }
  // If the 'image' parameter is not found in the URL, return a JSON response with a 400 status code.
  return res.status(400).json({ error: 'Invalid Request' })
}

async function POST(request: NextApiRequest, res: NextApiResponse) {
  // Check if the user is authenticated using the getSession function
  const session = await getSession(request, res)
  const user = session?.user
  // If the user is not authenticated, return a 403 (Forbidden) response
  if (!user) return res.status(403).end()
  // Check if the user has an email (an additional check for authentication)
  if (user.email) {
    // Initialize the Firebase app with the provided configuration
    const app = initializeApp(fireBaseConfig)
    // Get a reference to the Firebase Storage and parse the request data as a FormData object
    const storage = getStorage(app)
    const chunks: never[] = []
    const { fields, files } = await formidablePromise(request, {
      ...formidableConfig,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    })
    const file = files.file
    const fileBuffer = Buffer.concat(chunks)
    if (!file || !file[0]) {
      return res.status(400).json({ error: 'No File Provided' })
    }
    if (file[0].size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size exceeds the limit of 5 MB.' })
    }
    try {
      const fileId = uuidv4()
      const storageRef = ref(storage, `uploads/${fileId}/${file[0].originalFilename}`)
      const { metadata } = await uploadBytes(storageRef, fileBuffer)
      const { fullPath } = metadata
      if (!fullPath) {
        return res.status(403).json({
          error: 'There was some error while uploading the file. Report an issue with the current URL that you are on and with the code XXX.',
        })
      }
      const imageURL = `https://storage.googleapis.com/${storageRef.bucket}/${storageRef.fullPath}`
      console.log(imageURL)
      return res.status(200).json({ message: 'Uploaded Successfully' })
    } catch (e: any) {
      const tmp = e.message || e.toString()
      console.log(tmp)
      return res.status(500).send(tmp)
    }
  } else {
    return res.status(403).end()
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') return await GET(req, res)
  if (req.method === 'POST') return await POST(req, res)
}
