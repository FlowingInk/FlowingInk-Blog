export interface RequestOptions extends Omit<RequestInit, 'body'> {
	body?: unknown;
}
