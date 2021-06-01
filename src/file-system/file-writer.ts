
export interface FileWriter {
	writeToFirstWorkspace(fileName: string, content: string): Promise<void>;
}
