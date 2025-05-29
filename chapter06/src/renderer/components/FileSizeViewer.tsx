type Props = {
    fileSize: number;
    readableFileSize: string;
};

export const FileSizeViewer: React.FC<Props> = ({ fileSize, readableFileSize }: Props) => {
    return (
        <div data-testid="file-size-viewer">
            <p data-testid="file-size-bytes">バイト数: {fileSize}</p>
            <p data-testid="file-size-readable">読みやすい表示: {readableFileSize}</p>
        </div>
    );
};