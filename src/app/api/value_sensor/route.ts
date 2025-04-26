import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: value_sensor, error } = await supabase
        .from('sensor_value')
        .select('*')
    if (error) {
        throw error;
    }
    return NextResponse.json({result: value_sensor});
  }  catch (err: unknown) {
      console.error('Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return NextResponse.json({ 
        error: errorMessage, 
        details: err 
      });
  }
}

export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const { value_sensor } = body
  
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('sensor_value')
        .insert([{ value: value_sensor }])
        .select()
  
      if (error) throw error;
  
      return NextResponse.json({ result: data });
    }catch (err: unknown) {
        console.error('Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ 
          error: errorMessage, 
          details: err 
        });
    }
  }
  