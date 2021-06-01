
export interface FileReader {
	tryReadFromAnyWorkspace(fileName: string): Promise<string | null>;
}
