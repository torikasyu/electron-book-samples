import { getFormattedFileSize } from '../utils/getFormattedFileSize';

export const FileSizeViewer = ({ bytes }: { bytes: number }) => {
    return (
        <div>
            <h2>byte → KB, MB, GB 変換</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>bytes: {bytes}</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>formatted: {getFormattedFileSize(bytes)}</p>
        </div>
    );
};