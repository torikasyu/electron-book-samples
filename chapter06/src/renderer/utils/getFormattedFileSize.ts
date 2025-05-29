export const getFormattedFileSize = (bytes: number): string => {
    if (bytes <= 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    // 対数の底変換公式：log(b)(x) = log(x) / log(b)
    // log(1024)(bytes) = log(bytes) / log(1024)
    //
    // つまり「何回1024を掛けるとbytesになるか」を求めている
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return parseFloat((bytes / Math.pow(1024, index)).toFixed(2)) + ' ' + sizes[index];
};