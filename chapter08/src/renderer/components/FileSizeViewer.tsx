type Props = {
    fileSize: number;
    readableFileSize: string;
};

export const FileSizeViewer: React.FC<Props> = ({ fileSize, readableFileSize }: Props) => {
    return (
        <div>
            <p>バイト数: {fileSize}</p>
            <p>読みやすい表示: {readableFileSize}</p>
        </div>
    );
};