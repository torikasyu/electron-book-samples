import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getConfig } from './config';
import { ImageInfo, ImageUploadResult, ImageListResult, ImageDeleteResult } from '../../shared/types';

/**
 * Supabaseクライアントの初期化関数
 * @returns 初期化されたSupabaseクライアント、または初期化に失敗した場合はnull
 */
function initSupabaseClient(): SupabaseClient | null {
  try {
    const config = getConfig();
    
    // URLとAPIキーの存在確認
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      console.error('Supabaseの設定が不足しています');
      return null;
    }    
    // クライアントの初期化
    // 追加オプションを指定して初期化
    const client = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        persistSession: false, // セッションを持続しない
        autoRefreshToken: false, // トークンの自動更新を行わない
      }
    });
    return client;
  } catch (error) {
    console.error('Supabaseクライアントの初期化中にエラーが発生しました:', error);
    return null;
  }
}

/**
 * 画像をアップロードする関数
 * @param filePath アップロードするファイルのパス
 * @returns アップロード結果
 */
export async function uploadImage(filePath: string): Promise<ImageUploadResult> {
  try {
    const supabase = initSupabaseClient();
    if (!supabase) {
      throw new Error('Supabaseクライアントの初期化に失敗しました');
    }

    const fileName = path.basename(filePath);
    // ファイルの拡張子を取得
    const fileExt = path.extname(fileName).toLowerCase();
    
    // UUID v4を使用して安全なファイル名を生成
    const uuid = uuidv4();
    const safeFileName = `${uuid}${fileExt}`;
    const fileContent = fs.readFileSync(filePath);

    // 設定からバケット名を取得
    const config = getConfig();
    const bucketName = config.supabaseBucket;
    
    // ファイルの拡張子からMIMEタイプを取得
    const ext = fileExt.substring(1);
    let contentType = 'application/octet-stream'; // デフォルトのMIMEタイプ
    
    // 一般的な画像ファイルのMIMEタイプを設定
    const mimeTypes: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'bmp': 'image/bmp'
    };
    
    if (ext in mimeTypes) {
      contentType = mimeTypes[ext];
    }
    
    console.log('アップロード情報:', {
      originalFileName: fileName,
      safeFileName,
      contentType,
      bucketName
    });
    
    // Supabaseのストレージにアップロード
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`public/${safeFileName}`, fileContent, {
        contentType,
        upsert: true // 同名ファイルが存在する場合は上書き
      });

    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('画像アップロードエラー:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
    };
  }
}

/**
 * 画像一覧を取得する関数
 * @returns 画像一覧
 */
export async function getImages(): Promise<ImageListResult> {
  try {
    const supabase = initSupabaseClient();
    if (!supabase) {
      throw new Error('Supabaseクライアントの初期化に失敗しました');
    }

    // 設定からバケット名を取得
    const config = getConfig();
    const bucketName = config.supabaseBucket;
    
    // Storageから画像一覧を取得
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('public', {
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      throw error;
    }

    // 各ファイルの公開URLを取得して画像情報を作成
    const imageList = data.map(file => {
      // ファイル名をそのまま使用（すでに安全な形式になっている）
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(`public/${file.name}`);
        
      return {
        id: file.id,
        name: file.name,
        url: publicUrl,
        createdAt: file.created_at,
        size: file.metadata?.size || 0,
        type: path.extname(file.name).substring(1),
      };
    });

    return { success: true, data: imageList };
  } catch (error) {
    console.error('画像取得エラー:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
    };
  }
}

/**
 * 画像を削除する関数
 * @param fileName 削除する画像のファイル名
 * @returns 削除結果
 */
export async function deleteImage(fileName: string): Promise<ImageDeleteResult> {
  try {
    const supabase = initSupabaseClient();
    if (!supabase) {
      throw new Error('Supabaseクライアントの初期化に失敗しました');
    }

    // 設定からバケット名を取得
    const config = getConfig();
    const bucketName = config.supabaseBucket;
    
    // ストレージから削除
    const { error: storageError } = await supabase.storage
      .from(bucketName)
      .remove([`public/${fileName}`]);

    if (storageError) {
      throw storageError;
    }

    return { success: true };
  } catch (error) {
    console.error('画像削除エラー:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '不明なエラーが発生しました' 
    };
  }
}
