import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/market-reports/[id] - Get specific market report
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.marketReport.findUnique({
      where: { id: params.id }
    });
    
    if (!report) {
      return NextResponse.json(
        { error: 'Market report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error('Error fetching market report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market report' },
      { status: 500 }
    );
  }
}

// PUT /api/market-reports/[id] - Update market report
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // Check if report exists
    const existingReport = await prisma.marketReport.findUnique({
      where: { id: params.id }
    });
    
    if (!existingReport) {
      return NextResponse.json(
        { error: 'Market report not found' },
        { status: 404 }
      );
    }

    // If this is marked as latest, unmark all other reports as latest
    if (data.isLatest && !existingReport.isLatest) {
      await prisma.marketReport.updateMany({
        where: { 
          isLatest: true,
          id: { not: params.id }
        },
        data: { isLatest: false }
      });
    }

    // Update market report
    const updatedReport = await prisma.marketReport.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description || null,
        quarter: data.quarter || null,
        year: data.year ? parseInt(data.year) : undefined,
        location: data.location,
        reportType: data.reportType,
        pdfUrl: data.pdfUrl,
        coverImageUrl: data.coverImageUrl || null,
        isLatest: data.isLatest !== undefined ? data.isLatest : undefined,
        isFeatured: data.isFeatured !== undefined ? data.isFeatured : undefined,
        fileSize: data.fileSize || null,
        tags: data.tags || [],
        summary: data.summary || null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedReport);
  } catch (error) {
    console.error('Error updating market report:', error);
    return NextResponse.json(
      { error: 'Failed to update market report' },
      { status: 500 }
    );
  }
}

// DELETE /api/market-reports/[id] - Delete market report
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if report exists
    const existingReport = await prisma.marketReport.findUnique({
      where: { id: params.id }
    });
    
    if (!existingReport) {
      return NextResponse.json(
        { error: 'Market report not found' },
        { status: 404 }
      );
    }

    // Delete market report
    await prisma.marketReport.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Market report deleted successfully' });
  } catch (error) {
    console.error('Error deleting market report:', error);
    return NextResponse.json(
      { error: 'Failed to delete market report' },
      { status: 500 }
    );
  }
}

// POST /api/market-reports/[id]/download - Increment download count
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.marketReport.findUnique({
      where: { id: params.id }
    });
    
    if (!report) {
      return NextResponse.json(
        { error: 'Market report not found' },
        { status: 404 }
      );
    }

    // Increment download count
    const updatedReport = await prisma.marketReport.update({
      where: { id: params.id },
      data: {
        downloadCount: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ 
      message: 'Download count updated',
      downloadCount: updatedReport.downloadCount 
    });
  } catch (error) {
    console.error('Error updating download count:', error);
    return NextResponse.json(
      { error: 'Failed to update download count' },
      { status: 500 }
    );
  }
}

