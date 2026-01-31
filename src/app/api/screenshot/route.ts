import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, width = 1440, height = 900 } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      );
    }

    // Validate dimensions
    const finalWidth = Math.min(Math.max(width, 320), 3840);
    const finalHeight = Math.min(Math.max(height, 320), 2160);

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({
      width: finalWidth,
      height: finalHeight,
      deviceScaleFactor: 2, // For retina-quality screenshots
    });

    // Set a reasonable timeout
    page.setDefaultNavigationTimeout(30000);

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    // Wait a bit for any animations to settle
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
    });

    await browser.close();

    // Convert to base64
    const base64Screenshot = `data:image/png;base64,${Buffer.from(screenshot).toString('base64')}`;

    return NextResponse.json({ screenshot: base64Screenshot });
  } catch (error) {
    console.error('Screenshot error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to capture screenshot';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
