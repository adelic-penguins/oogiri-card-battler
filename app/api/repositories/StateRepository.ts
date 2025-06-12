/**
 * json-serverのリポジトリ
 */

function fetchBase(input: string | URL | globalThis.Request,
                   init?: RequestInit) {
    return fetch(input, init);
}

type ClientIdType = {
    id: string;
};

type ClientIdsType = ClientIdType[];

class ClientIdRepository {
    private static instance: ClientIdRepository;
    private baseUrl: string = "http://localhost:3020";

    private constructor() {
    }

    public static getInstance() {
        if (!ClientIdRepository.instance) {
            ClientIdRepository.instance = new ClientIdRepository();
        }
        return ClientIdRepository.instance;
    }

    public async addClient(client: string) {
        if (!client) {
            throw new Error("Client ID must be provided");
        }
        const currentClients = (await this.getClients());
        if (!currentClients.includes(client)) {
            await fetchBase(`${this.baseUrl}/client_ids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: client}),
            });
        }
    }

    public async deleteClient(client: string) {
        if (!client) {
            throw new Error("Client ID must be provided");
        }
        await fetchBase(`${this.baseUrl}/client_ids/${client}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    public async getClients() {
        const currentClients = (await fetchBase(`${this.baseUrl}/client_ids`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())) as ClientIdsType;
        return currentClients.map(client => client.id);
    }
}

export default ClientIdRepository.getInstance();