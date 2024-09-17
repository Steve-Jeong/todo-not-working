import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  const name = formData.get('name');
  const email = formData.get('email');
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: '유효한 파일이 제공되지 않았습니다.' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 'public' 폴더 내의 'uploads' 디렉토리
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  // 'uploads' 디렉토리가 존재하지 않으면 생성
  if (!existsSync(uploadDir)) {
    try {
      await mkdir(uploadDir, { recursive: true });
      console.log('uploads 디렉토리가 생성되었습니다:', uploadDir);
    } catch (error) {
      console.error('디렉토리 생성 중 오류 발생:', error);
      return NextResponse.json({ message: '디렉토리 생성 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  try {
    await writeFile(filepath, buffer);
    console.log('파일이 성공적으로 저장되었습니다:', filepath);

    // 여기서 파일 경로와 기타 데이터를 데이터베이스에 저장할 수 있습니다.
    // 예: await saveToDatabase({ name, email, filePath: `/uploads/${filename}` });

    return NextResponse.json({ 
      message: `데이터 ${name}, ${email}와 파일${filename}이 성공적으로 업로드되었습니다.`,
      filePath: `/uploads/${filename}`
    });
  } catch (error) {
    console.error('파일 저장 중 오류 발생:', error);
    return NextResponse.json({ message: '파일 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}