import fs from 'fs';
import path from 'path';

export const saveBase64Images = async (
    base64Images: string[],
    reportId: string
): Promise<string[]> => {
    const reportDir = path.join(__dirname, '../assets/reports', reportId);

    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }

    const savedFiles: string[] = [];

    base64Images.forEach((base64, index) => {
        // Extraer el tipo de imagen (opcional si el base64 lo incluye)
        const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);
        const ext = matches ? matches[1].split('/')[1] : 'jpg';
        const data = matches ? matches[2] : base64;

        const filename = `${reportId}_${index}.${ext}`;
        const filepath = path.join(reportDir, filename);

        fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
        savedFiles.push(filename);
    });

    return savedFiles;
};

export const getImagesByReport = (reportId: string): string[] => {
    const reportDir = path.join(__dirname, '../assets/reports', reportId);
    if (!fs.existsSync(reportDir)) return [];

    const files = fs.readdirSync(reportDir);
    const imagesBase64 = files.map(file => {
        const filePath = path.join(reportDir, file);
        const fileData = fs.readFileSync(filePath);
        const ext = path.extname(file).substring(1); // jpg, png, etc.
        const base64 = fileData.toString('base64');
        return `data:image/${ext};base64,${base64}`;
    });

    return imagesBase64;
};

export const deleteImagesByReportId = (reportId: string): void => {
    const reportDir = path.join(__dirname, '../assets/reports', reportId);
    if (!fs.existsSync(reportDir)) return;

    const files = fs.readdirSync(reportDir);
    files.forEach(file => {
        fs.unlinkSync(path.join(reportDir, file));
    });

    // Opcional: elimina la carpeta vacía
    fs.rmdirSync(reportDir);
};
