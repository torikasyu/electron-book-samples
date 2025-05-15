import { getFormattedFileSize } from '../utils/getFormattedFileSize';

export const FileSizeViewer = ({ bytes }: { bytes: number }) => {
    return (
        <div>
            <h2>ファイルサイズ（bytes）</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>ファイルサイズ（bytes）: {getFormattedFileSize(bytes)}</p>
        </div>
    );
};