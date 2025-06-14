import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];
    
    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'properties');
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        continue; // Skip files that are too large
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const extension = path.extname(file.name);
      const filename = `property-${timestamp}-${randomString}${extension}`;
      
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Write file to disk
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      
      // Add URL to results (relative to public folder)
      uploadedUrls.push(`/images/properties/${filename}`);
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid images were uploaded' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: `Successfully uploaded ${uploadedUrls.length} image(s)`,
      urls: uploadedUrls
    });

  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

// GET endpoint to list existing images
export async function GET() {
  try {
    const { readdir } = await import('fs/promises');
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'properties');
    
    try {
      const files = await readdir(uploadDir);
      const imageFiles = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => `/images/properties/${file}`);
      
      return NextResponse.json({ images: imageFiles });
    } catch (dirError) {
      // Directory doesn't exist yet
      return NextResponse.json({ images: [] });
    }
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    );
  }
}

