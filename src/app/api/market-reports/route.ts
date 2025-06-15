import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/market-reports - Get all market reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location')?.toLowerCase() || '';
    const reportType = searchParams.get('type')?.toLowerCase() || '';
    const year = searchParams.get('year');
    const quarter = searchParams.get('quarter');
    const featured = searchParams.get('featured');
    const latest = searchParams.get('latest');
    const sortBy = searchParams.get('sort_by') || 'newest';

    // Build where clause for filtering
    const where: any = {};

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      };
    }

    if (reportType) {
      where.reportType = {
        contains: reportType,
        mode: 'insensitive'
      };
    }

    if (year) {
      where.year = parseInt(year);
    }

    if (quarter) {
      where.quarter = quarter;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (latest === 'true') {
      where.isLatest = true;
    }

    // Build orderBy clause for sorting
    let orderBy: any = { publishedAt: 'desc' }; // default newest first

    if (sortBy === 'oldest') {
      orderBy = { publishedAt: 'asc' };
    } else if (sortBy === 'downloads') {
      orderBy = { downloadCount: 'desc' };
    } else if (sortBy === 'title') {
      orderBy = { title: 'asc' };
    }

    const reports = await prisma.marketReport.findMany({
      where,
      orderBy
    });

    return NextResponse.json({
      reports,
      total: reports.length
    });
  } catch (error) {
    console.error('Error fetching market reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market reports' },
      { status: 500 }
    );
  }
}

// POST /api/market-reports - Create new market report
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'year', 'location', 'reportType', 'pdfUrl'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // If this is marked as latest, unmark all other reports as latest
    if (data.isLatest) {
      await prisma.marketReport.updateMany({
        where: { isLatest: true },
        data: { isLatest: false }
      });
    }

    // Create market report in database
    const newReport = await prisma.marketReport.create({
      data: {
        title: data.title,
        description: data.description || null,
        quarter: data.quarter || null,
        year: parseInt(data.year),
        location: data.location,
        reportType: data.reportType,
        pdfUrl: data.pdfUrl,
        coverImageUrl: data.coverImageUrl || null,
        isLatest: data.isLatest || false,
        isFeatured: data.isFeatured || false,
        fileSize: data.fileSize || null,
        tags: data.tags || [],
        summary: data.summary || null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date()
      }
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error('Error creating market report:', error);
    return NextResponse.json(
      { error: 'Failed to create market report' },
      { status: 500 }
    );
  }
}

